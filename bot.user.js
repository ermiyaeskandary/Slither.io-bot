/*
Copyright (c) 2016 Ermiya Eskandary & Théophile Cailliau and other contributors
 
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.9.0
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @updateURL    https://github.com/ErmiyaEskandary/Slither.io-bot/raw/master/bot.user.js
// @downloadURL  https://github.com/ErmiyaEskandary/Slither.io-bot/raw/master/bot.user.js
// @supportURL   https://github.com/ErmiyaEskandary/Slither.io-bot/issues
// @grant        none
// ==/UserScript==
// Custom logging function - disabled by default

window.scores = [];

// Custom logging function - disabled by default
window.log = function() {
    if (window.logDebugging) {
        console.log.apply(console, arguments);
    }
};

window.getSnakeLength = function() {
    return (Math.floor(150 * (window.fpsls[window.snake.sct] + window.snake.fam / window.fmlts[window.snake.sct] - 1) - 50) / 10);
};
window.getSnakeWidth = function(sc) {
    if (sc === undefined) sc = window.snake.sc;
    return sc * 29 / 2;
};

var canvas = (function() {
    return {
        // Ratio of screen size divided by canvas size.
        canvasRatio: [window.mc.width / window.ww, window.mc.height / window.hh],

        // Spoofs moving the mouse to the provided coordinates.
        setMouseCoordinates: function(point) {
            window.xm = point.x;
            window.ym = point.y;
        },

        // Convert snake-relative coordinates to absolute screen coordinates.
        mouseToScreen: function (point) {
            var screenX = point.x + (window.ww / 2);
            var screenY = point.y + (window.hh / 2);
            return { x: screenX, y: screenY };
        },

        // Convert screen coordinates to canvas coordinates.
        screenToCanvas: function (point) {
            var canvasX = window.csc * (point.x * canvas.canvasRatio[0]) - parseInt(window.mc.style.left);
            var canvasY = window.csc * (point.y * canvas.canvasRatio[1]) - parseInt(window.mc.style.top);
            return { x: canvasX, y: canvasY };
        },

        // Convert map coordinates to mouse coordinates.
        mapToMouse: function (point) {
            var mouseX = (point.x - window.snake.xx) * window.gsc;
            var mouseY = (point.y - window.snake.yy) * window.gsc;
            return { x: mouseX, y: mouseY };
        },

        // Map cordinates to Canvas cordinate shortcut
        mapToCanvas: function (point) {
            var c = canvas.mapToMouse(point);
            c = canvas.mouseToScreen(c);
            c = canvas.screenToCanvas(c);
            return c ;
        },

        // Map to Canvas coordinate conversion for drawing circles.
        // Radius also needs to scale by .gsc
        circleMapToCanvas: function (circle) {
            var newCircle = canvas.mapToCanvas(circle);
            return {
                x: newCircle.x,
                y: newCircle.y,
                radius: circle.radius * window.gsc
            };
        },

        // Adjusts zoom in response to the mouse wheel.
        setZoom: function(e) {
            // Scaling ratio
            if (window.gsc) {
                window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
            }
        },

        // Restores zoom to the default value.
        resetZoom: function() {
            window.gsc = 0.9;
        },

        // Sets background to the given image URL.
        // Defaults to slither.io's own background.
        setBackground: function(url) {
            url = typeof url !== 'undefined' ? url : '/s/bg45.jpg';
            window.ii.src = url;
        },

        // Manual mobile rendering
        toggleMobileRendering: function(mobileRendering) {
            window.mobileRender = mobileRendering;
            window.log('Mobile rendering set to: ' + window.mobileRender);
            userInterface.savePreference('mobileRender', window.mobileRender);
            // Set render mode
            if (window.mobileRender) {
                canvas.setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
                window.render_mode = 1;
            } else {
                canvas.setBackground();
                window.render_mode = 2;
            }
        },

        // Draw a circle on the canvas.
        drawCircle: function(circle, colour, fill, alpha) {
            if (alpha === undefined) alpha = 1;
            if (circle.radius === undefined) circle.radius = 5;
            var context = window.mc.getContext('2d');
            context.globalAlpha = alpha;
            context.beginPath();
            context.strokeStyle = colour;
            context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            context.closePath();
            if (fill) {
                context.fillStyle = colour;
                context.fill();
            }
            context.stroke();
            context.globalAlpha = 1;
        },

        // Draw an angle.
        // @param {number} start -- where to start the angle
        // @param {number} angle -- width of the angle
        // @param {bool} danger -- green if false, red if true
        drawAngle: function(start, angle, danger) {
            var context = window.mc.getContext('2d');
            context.globalAlpha = 0.6;
            context.beginPath();
            context.moveTo(window.mc.width / 2, window.mc.height / 2);
            context.arc(window.mc.width / 2, window.mc.height / 2, window.gsc * 100, start, angle);
            context.lineTo(window.mc.width / 2, window.mc.height / 2);
            context.closePath();
            context.fillStyle = (danger) ? 'red' : 'green';
            context.fill();
            context.stroke();
            context.globalAlpha = 1;
        },

        // Draw a line on the canvas.
        drawLine: function(p1, p2, colour, width) {
            if (width === undefined) width = 5;
            var context = window.mc.getContext('2d');
            context.beginPath();
            context.lineWidth = width * window.gsc;
            context.strokeStyle = colour;
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
            context.lineWidth = 1;
        },

        // Check if a point is between two vectors.
        // The vectors have to be anticlockwise (sectorEnd on the left of sectorStart).
        isBetweenVectors: function(point, sectorStart, sectorEnd) {
            var center = [window.snake.xx, window.snake.yy];
            if (point.xx) {
                // Point coordinates relative to center
                var relPoint = {
                    x: point.xx - center[0],
                    y: point.yy - center[1]
                };
                return (!canvas.areClockwise(sectorStart, relPoint) &&
                    canvas.areClockwise(sectorEnd, relPoint));
            }
            return false;
        },

        // Angles are given in radians. The overall angle (endAngle-startAngle)
        // cannot be above Math.PI radians (180°).
        isInsideAngle: function(point, startAngle, endAngle) {
            // calculate normalized vectors from angle
            var startAngleVector = {
                x: Math.cos(startAngle),
                y: Math.sin(startAngle)
            };
            var endAngleVector = {
                x: Math.cos(endAngle),
                y: Math.sin(endAngle)
            };
            // Use isBetweenVectors to check if the point belongs to the angle
            return canvas.isBetweenVectors(point, startAngleVector, endAngleVector);
        },

        // Given two vectors, return a truthy/falsy value depending on their position relative to each other.
        areClockwise: function(vector1, vector2) {
            //Calculate the dot product.
            return -vector1.x * vector2.y + vector1.y * vector2.x > 0;
        },
        
        // Given the start and end of a line, is point left.
        isLeft: function(start, end, point)
        {
            return ((end.x - start.x)*(point.y - start.y) - (end.y - start.y)*(point.x - start.x)) > 0;
            
        },

        // Given an object (of which properties xx and yy are not null),
        // return the object with an additional property 'distance'.
        getDistanceFromSnake: function(point) {
            point.distance = canvas.getDistance(window.snake.xx, window.snake.yy,
                point.xx, point.yy);
            return point;
        },

        // Get a distance from point (x1; y1) to point (x2; y2).
        getDistance: function(x1, y1, x2, y2) {
            var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
            return distance;
        },
        
        // Get distance squared
        getDistance2: function(x1, y1, x2, y2) {
            var distance2 = Math.pow(x1-x2,2) + Math.pow(y1 - y2, 2);
            return distance2;
        },
        
        getDistance2FromSnake: function(point) {
            point.distance = canvas.getDistance2(window.snake.xx, window.snake.yy,
                point.xx, point.yy);
            return point;
        },

        // Check if circles intersect
        circleIntersect: function(circle1, circle2) {
            var bothRadii = circle1.radius + circle2.radius;

            // Pretends the circles are squares for a quick collision check.
            // If it collides, do the more expensive circle check.
            if (circle1.x + bothRadii > circle2.x &&
                circle1.y + bothRadii > circle2.y &&
                circle1.x < circle2.x + bothRadii &&
                circle1.y < circle2.y + bothRadii) {

                var distance2 = canvas.getDistance2(circle1.x,circle1.y,circle2.x,circle2.y);

                if (distance2 < bothRadii*bothRadii) {
                    if (window.visualDebugging) {
                        var collisionPointCircle = {
                            x: ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) / bothRadii,
                            y: ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) / bothRadii,
                            radius: 5
                        };
                        canvas.drawCircle(canvas.circleMapToCanvas(circle2), 'red', true);
                        canvas.drawCircle(canvas.circleMapToCanvas(collisionPointCircle), 'cyan', true)
                    }
                    return true;
                }
            }
            return false;
        }
    };
})();

var bot = (function() {
    // Save the original slither.io onmousemove function so we can re enable it back later
    var original_onmousemove = window.onmousemove;

    return {
        ranOnce: false,
        tickCounter: 0,
        isBotRunning: false,
        isBotEnabled: true,
        collisionPoints: [],
        
        hideTop: function () {
            var nsidivs = document.querySelectorAll('div.nsi');
            for (var i = 0; i < nsidivs.length; i++) {
                if (nsidivs[i].style.top == '4px' && nsidivs[i].style.width == '300px') {
                    nsidivs[i].style.visibility = 'hidden';
                    nsidivs[i].style.zIndex = -1;
                    bot.isTopHidden = true;
                }
            }
        },
        
        startBot: function () {
            if (window.autoRespawn && !window.playing && bot.isBotEnabled && bot.ranOnce && !bot.isBotRunning) {
                bot.connectBot();
                if (document.querySelector('div#lastscore').childNodes.length > 1) {
                    window.scores.push(parseInt(document.querySelector('div#lastscore').childNodes[1].innerHTML));
                }
            }
            if (window.bso !== undefined) {
                var generalStyle = '<span style = "opacity: 0.35";>';
                window.ip_overlay.innerHTML = generalStyle + 'Server: ' + window.bso.ip + ':' + window.bso.po;
            }
        },

        launchBot: function () {
            window.log('Starting Bot.');
            bot.isBotRunning = true;
            // Removed the onmousemove listener so we can move the snake manually by setting coordinates
            userInterface.onPrefChange();
            window.onmousemove = function () { };
            bot.hideTop();
        },

        // Stops the bot
        stopBot: function() {
            window.log('Stopping Bot.');
            window.setAcceleration(0); // Disable the "sprint"
            bot.isBotRunning = false;
            // Re-enable the original onmousemove function
            window.onmousemove = original_onmousemove;
        },

        // Connects the bot
        connectBot: function () {
            if (!window.autoRespawn) return;
            bot.stopBot(); // Just in case
            window.log('Connecting...');
            window.connect();
            
            // Wait until we're playing to start the bot
            window.botCanStart = setInterval(function () {
                if (window.playing) {
                    bot.launchBot();
                    clearInterval(window.botCanStart);
                }
            }, 100);
        },

        forceConnect: function() {
            if (!window.connect) {
                return;
            }
            window.forcing = true;
            if (!window.bso) {
                window.bso = {};
            }
            window.currentIP = window.bso.ip + ":" + window.bso.po;
            var srv = window.currentIP.trim().split(":");
            window.bso.ip = srv[0];
            window.bso.po = srv[1];
            window.connect();
        },

        quickRespawn: function() {
            window.dead_mtm = 0;
            window.login_fr = 0;
            bot.forceConnect();
        },

        changeSkin: function() {
            if (window.playing && window.snake !== null) {
                var skin = window.snake.rcv,
                    max = window.max_skin_cv || 30;
                skin++;
                if (skin > max) {
                    skin = 0;
                }
                window.setSkin(window.snake, skin);
            }
        },

        rotateSkin: function() {
            if (!window.rotateskin) {
                return;
            }
            bot.changeSkin();
            setTimeout(bot.rotateSkin, 500);
        },
        
        // Avoid collison point 180 degree
        avoidCollisionPoint: function(collisionPoint)
        {
            window.goalCoordinates = {
                x: window.snake.xx + (window.snake.xx - collisionPoint.xx), 
                y: window.snake.yy + (window.snake.yy - collisionPoint.yy)
            };
            canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
        },
                
        // Avoid collision using collision points
        avoidCollision: function(distance) {
            var cpts = bot.collisionPoints;
            var x = 0;
            var y = 0;
            
            for (var i = 0 ; i < cpts.length ; i++)
            {
                if (Math.abs(cpts[0].distance - cpts[i].distance) <= distance) {
                    x += cpts[i].xx;
                    y += cpts[i].yy;
                } else {
                    i--;
                    break;
                }
            }
            
            x = x / (i+1);
            y = y / (i+1);
                   
            window.goalCoordinates = {
                x: Math.round(window.snake.xx + (window.snake.xx - x)), 
                y: Math.round(window.snake.yy + (window.snake.yy - y))
            };
            
            if(cpts[0].sp > 8) {
                window.setAcceleration(1);
            } else {
                window.setAcceleration(0);
            }
            
            canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
        },

        // Sorting by  property 'distance'
        sortDistance: function(a, b) {
            return a.distance - b.distance;
        },

        // Sorting function for food, from property 'clusterCount'
		sortFood: function(a, b) {
			return (a.clusterScore == b.clusterScore ? 0 : a.clusterScore / a.distance  >  b.clusterScore / b.distance  ? -1 : 1);
		},

        // Get closest collision point per snake.
        getCollisionPoints: function () {
            bot.collisionPoints = [];
            var scPoint;

            for (var snake = 0, ls = window.snakes.length; snake < ls; snake++) {
                scPoint = undefined;

                if (window.snakes[snake].nk != window.snake.nk) {
                    if (window.visualDebugging) {
                        var hCircle = {
                            x: window.snakes[snake].xx,
                            y: window.snakes[snake].yy,
                            radius: window.getSnakeWidth(window.snakes[snake].sc)
                        };
                        canvas.drawCircle(canvas.circleMapToCanvas(hCircle), 'red', false);
                    }

                    for (var pts = 0, lp = window.snakes[snake].pts.length; pts < lp; pts++) {
                        if (!window.snakes[snake].pts[pts].dying) {
                            var collisionPoint = {
                                headxx: window.snakes[snake].xx,
                                headyy: window.snakes[snake].yy,
                                xx: window.snakes[snake].pts[pts].xx,
                                yy: window.snakes[snake].pts[pts].yy,
                                sc: window.snakes[snake].sc,
                                sp: window.snakes[snake].sp,
                                ang: window.snakes[snake].ang,
                                snake: snake,
                            };

                            canvas.getDistance2FromSnake(collisionPoint);

                            if (scPoint === undefined || scPoint.distance > collisionPoint.distance) {
                                scPoint = collisionPoint;
                            }
                        }
                    }
                }
                if (scPoint !== undefined) {
                    bot.collisionPoints.push(scPoint);
                    if (window.visualDebugging) {
                        var cCircle = {
                            x: scPoint.xx,
                            y: scPoint.yy,
                            radius: window.getSnakeWidth(scPoint.sc)
                        };
                        canvas.drawCircle(canvas.circleMapToCanvas(cCircle), 'red', false);
                    }
                }
            }
            bot.collisionPoints.sort(bot.sortDistance);
        },

        // Checks to see if you are going to collide with anything in the collision detection radius
        checkCollision: function (r) {
            if (!window.collisionDetection) return false;

            window.snake.cos = Math.cos(window.snake.ang);
            window.snake.sin = Math.sin(window.snake.ang);

            var ra = r;
            var inBigCircle = 0;
            var bigCirclePts = [];

            if (window.snake.sp > 7) ra = r * 2;

            var headCircle = {
                x: window.snake.xx,
                y: window.snake.yy,
                radius: ra / 2
            };

            var forwardCircle = {
                x: window.snake.xx + window.snake.cos * ra / 2,
                y: window.snake.yy + window.snake.sin * ra / 2,
                radius: ra / 2
            };

            var forwardBigCircle = {
                x: window.snake.xx + window.snake.cos * r * 1.9 / window.getSnakeWidth() * window.getSnakeWidth(1),
                y: window.snake.yy + window.snake.sin * r * 1.9 / window.getSnakeWidth() * window.getSnakeWidth(1),
                radius: r * 2.4 / window.getSnakeWidth() * window.getSnakeWidth(1)
            };

            var fullHeadCircle = {
                x: window.snake.xx + window.snake.cos * r / 2,
                y: window.snake.yy + window.snake.sin * r / 2,
                radius: r
            };

            if (window.visualDebugging) {
                canvas.drawCircle(canvas.circleMapToCanvas(fullHeadCircle), 'red');
                canvas.drawCircle(canvas.circleMapToCanvas(headCircle), 'blue', false);
                canvas.drawCircle(canvas.circleMapToCanvas(forwardCircle), 'blue', false);
                canvas.drawCircle(canvas.circleMapToCanvas(forwardBigCircle), 'yellow', false);
            }


            bot.getCollisionPoints();
            if (bot.collisionPoints.length === 0) return false;

            for (var i = 0; i < bot.collisionPoints.length; i++) {
                var collisionCircle = {
                    x: bot.collisionPoints[i].xx,
                    y: bot.collisionPoints[i].yy,
                    radius: window.getSnakeWidth(bot.collisionPoints[i].sc)
                };

                var eHeadCircle = {
                    x: bot.collisionPoints[i].headxx,
                    y: bot.collisionPoints[i].headyy,
                    radius: window.getSnakeWidth(bot.collisionPoints[i].sc)
                };

                if (canvas.circleIntersect(headCircle, collisionCircle) || canvas.circleIntersect(forwardCircle, collisionCircle)) {
                    if (bot.collisionPoints[i].sp > 10 && (canvas.circleIntersect(headCircle, eHeadCircle) || canvas.circleIntersect(forwardCircle, eHeadCircle))) {
                        window.setAcceleration(1);
                    } else {
                        window.setAcceleration(0);
                    }

                    bot.avoidCollisionPoint(bot.collisionPoints[i]);
                    return true;
                }

                if (canvas.circleIntersect(fullHeadCircle, eHeadCircle)) {
                    if (bot.collisionPoints[i].sp > 10) {
                        window.setAcceleration(1);
                    } else {
                        window.setAcceleration(0);
                    }
                    bot.avoidCollisionPoint({ xx: bot.collisionPoints[i].headxx, yy: bot.collisionPoints[i].headyy });
                    return true;
                }

                if (canvas.circleIntersect(forwardBigCircle, collisionCircle)) {
                    inBigCircle++;
                    bigCirclePts = bigCirclePts.concat(window.snakes[bot.collisionPoints[i].snake].pts);
                }
            }

            if (inBigCircle > 2) {
                bot.avoidCollisionPoint({ xx: window.snake.xx + window.snake.cos * 50, yy: window.snake.yy + window.snake.sin * 50 });
                if (window.visualDebugging) {
                    canvas.drawCircle(canvas.circleMapToCanvas(forwardBigCircle), 'yellow', true, .3);
                }
                return true;
            }

            if (bigCirclePts.length > 0) {
                bigCirclePts = bigCirclePts.map(function (p) {
                    p.distance = canvas.getDistance2(forwardBigCircle.x, forwardBigCircle.y, p.x, p.y);
                    return (p);
                }).sort(bot.sortDistance);

                if (bigCirclePts.findIndex(function (p) {
                    return p.distance > forwardBigCircle.radius * forwardBigCircle.radius;
                }) + 1 > 40) {
                    bot.avoidCollisionPoint({ xx: window.snake.xx + window.snake.cos * 50, yy: window.snake.yy + window.snake.sin * 50 });
                    if (window.visualDebugging) {
                        canvas.drawCircle(canvas.circleMapToCanvas(forwardBigCircle), 'blue', true, .3);
                    }
                    return true;
                }
            }

            window.setAcceleration(0);
            return false;
        },
		
        // Sort food based on distance
        getSortedFood: function() {
            // Filters the nearest food by getting the distance
            return window.foods.filter(function(val) {
                return val !== null && val !== undefined;
            }).map(canvas.getDistance2FromSnake).filter(function(val) {
                var isInsideDangerAngles = canvas.isInsideAngle(val, window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4);
                isInsideDangerAngles = isInsideDangerAngles || canvas.isInsideAngle(val, window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4);
                return !(isInsideDangerAngles && (val.distance <= 150*150));
            }).sort(bot.sortDistance);
        },

        computeFoodGoal: function() {
            var sortedFood = bot.getSortedFood();

            var bestClusterIndx = 0;
            var bestClusterScore = 0;
            var bestClusterAbsScore = 0;
            var bestClusterX = 20000;
            var bestClusterY = 20000;
            var clusterScore = 0;
            var clusterSize = 0;
            var clusterAbsScore = 0;
            var clusterSumX = 0;
            var clusterSumY = 0;

            // there is no need to view more points (for performance)
            var nIter = Math.min(sortedFood.length, 300);
            for (var i = 0; i < nIter; i += 2) {
                clusterScore = 0;
                clusterSize = 0;
                clusterAbsScore = 0;
                clusterSumX = 0;
                clusterSumY = 0;

                var p1 = sortedFood[i];
                for (var j = 0; j < nIter; ++j) {
                    var p2 = sortedFood[j];
                    var dist = canvas.getDistance2(p1.xx, p1.yy, p2.xx, p2.yy);
                    if (dist < 100*100) {
                        clusterScore += p2.sz;
                        clusterSumX += p2.xx * p2.sz;
                        clusterSumY += p2.yy * p2.sz;
                        clusterSize += 1;
                    }
                }
                clusterAbsScore = clusterScore;
                clusterScore /= p1.distance;
                if (clusterSize > 2 && clusterScore > bestClusterScore) {
                    bestClusterScore = clusterScore;
                    bestClusterAbsScore = clusterAbsScore;
                    bestClusterX = clusterSumX / clusterAbsScore;
                    bestClusterY = clusterSumY / clusterAbsScore;
                    bestClusterIndx = i;
                }
            }

            window.currentFoodX = bestClusterX;
            window.currentFoodY = bestClusterY;

            // if see a large cluster then use acceleration
            if (bestClusterAbsScore > 50) {
                window.foodAcceleration = 1;
            } else {
                window.foodAcceleration = 0;
            }
        },

        // Called by the window loop, this is the main logic of the bot.
        thinkAboutGoals: function() {
            // If no enemies or obstacles, go after what you are going after
            if (!bot.checkCollision(window.getSnakeWidth() * window.collisionRadiusMultiplier) ) {
                window.setAcceleration(0);
                // Save CPU by only calculating every Nth frame
                if (++bot.tickCounter >= 15) {
                    bot.tickCounter = 0;
                    // Current food
                    bot.computeFoodGoal();

                    var coordinatesOfClosestFood = {
                        x: window.currentFoodX, y: window.currentFoodY };
                    
                    window.goalCoordinates = coordinatesOfClosestFood;
                    canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
                }
            } else {
                bot.tickCounter = -userInterface.framesPerSecond.getFPS();
            }
        }
    };
})();

var userInterface = (function() {
    // Save the original slither.io functions so we can modify them, or reenable them later.
    var original_keydown = document.onkeydown;
    var original_onmouseDown = window.onmousedown;
    var original_oef = window.oef;

    return {
        // Save variable to local storage
        savePreference: function(item, value) {
            window.localStorage.setItem(item, value);
        },

        // Load a variable from local storage
        loadPreference: function(preference, defaultVar) {
            var savedItem = window.localStorage.getItem(preference);
            if (savedItem !== null) {
                if (savedItem == 'true') {
                    window[preference] = true;
                } else if (savedItem == 'false') {
                    window[preference] = false;
                } else {
                    window[preference] = savedItem;
                }
                window.log('Setting found for ' + preference + ': ' + window[preference]);
            } else {
                window[preference] = defaultVar;
                window.log('No setting found for ' + preference + '. Used default: ' + window[preference]);
            }
            return window[preference];
        },

        // Saves username when you click on "Play" button
        playButtonClickListener: function() {
            userInterface.saveNick();
            userInterface.loadPreference('autoRespawn', false);
        },

        // Preserve nickname
        saveNick: function() {
            var nick = document.getElementById('nick').value;
            userInterface.savePreference('savedNick', nick);
        },

        // Add interface elements to the page.
        // @param {string} id
        // @param {string} className
        // @param style
        appendDiv: function(id, className, style) {
            var div = document.createElement('div');
            if (id) div.id = id;
            if (className) div.className = className;
            if (style) div.style = style;
            document.body.appendChild(div);
        },

        // Store FPS data
        framesPerSecond: {
            startTime: 0,
            frameNumber: 0,
            filterStrength: 40,
            lastLoop: 0,
            frameTime: 0,
            getFPS: function() {
                var thisLoop = performance.now();
                var thisFrameTime = thisLoop - this.lastLoop;
                this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
                this.lastLoop = thisLoop;
                return (1000 / this.frameTime).toFixed(0);
            }
        },

        onkeydown: function(e) {
            // Original slither.io onkeydown function + whatever is under it
            original_keydown(e);
            if (document.activeElement.parentElement !== window.nick_holder) {
                // Letter `T` to toggle bot
                if (e.keyCode === 84) {
                    if (bot.isBotRunning) {
                        bot.stopBot();
                        bot.isBotEnabled = false;
                    } else {
                        bot.launchBot();
                        bot.isBotEnabled = true;
                    }
                }
                // Letter 'U' to toggle debugging (console)
                if (e.keyCode === 85) {
                    window.logDebugging = !window.logDebugging;
                    console.log('Log debugging set to: ' + window.logDebugging);
                    userInterface.savePreference('logDebugging', window.logDebugging);
                }
                // Letter 'Y' to toggle debugging (visual)
                if (e.keyCode === 89) {
                    window.visualDebugging = !window.visualDebugging;
                    console.log('Visual debugging set to: ' + window.visualDebugging);
                    userInterface.savePreference('visualDebugging', window.visualDebugging);
                }
                // Letter 'I' to toggle autorespawn
                if (e.keyCode === 73) {
                    window.autoRespawn = !window.autoRespawn;
                    console.log('Automatic Respawning set to: ' + window.autoRespawn);
                    userInterface.savePreference('autoRespawn', window.autoRespawn);
                }
                // Letter 'W' to auto rotate skin
                if (e.keyCode == 87) {
                    window.rotateskin = !window.rotateskin;
                    console.log('Auto skin rotator set to: ' + window.rotateskin);
                    userInterface.savePreference('rotateskin', window.rotateskin);
                    bot.rotateSkin();
                }
                // Letter 'O' to change rendermode (visual)
                if (e.keyCode === 79) {
                    canvas.toggleMobileRendering(!window.mobileRender);
                }
                // Letter 'C' to toggle Collision detection / enemy avoidance
                if (e.keyCode === 67) {
                    window.collisionDetection = !window.collisionDetection;
                    console.log('collisionDetection set to: ' + window.collisionDetection);
                    userInterface.savePreference('collisionDetection', window.collisionDetection);
                }
                // Letter 'A' to increase collision detection radius
                if (e.keyCode === 65) {
                    window.collisionRadiusMultiplier++;
                    console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                    userInterface.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
                }
                // Letter 'S' to decrease collision detection radius
                if (e.keyCode === 83) {
                    if (window.collisionRadiusMultiplier > 1) {                        
                        window.collisionRadiusMultiplier--;
                        console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                        userInterface.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
                    }
                }
                // Letter 'Z' to reset zoom
                if (e.keyCode === 90) {
                    canvas.resetZoom();
                }
                // Letter 'Q' to quit to main menu
                if (e.keyCode == 81) {
                    window.autoRespawn = false;
                    userInterface.quit();
                }
                // 'ESC' to quickly respawn
                if (e.keyCode == 27) {
                    bot.quickRespawn();
                }
                // Letter 'X' to change skin
                if (e.keyCode == 88) {
                    bot.changeSkin();
                }
                // Save nickname when you press "Enter"
                if (e.keyCode == 13) {
                    userInterface.saveNick();
                }
                userInterface.onPrefChange();
            }
        },

        onmousedown: function(e) {
            original_onmouseDown(e);
            e = e || window.event;
            if (window.playing) {
                switch (e.which) {
                    // "Left click" to manually speed up the slither
                    case 1:
                        window.setAcceleration(1);
                        window.log('Manual boost...');
                        break;
                        // "Right click" to toggle bot in addition to the letter "T"
                    case 3:
                        if (bot.isBotRunning) {
                            bot.stopBot();
                            bot.isBotEnabled = false;
                        } else {
                            bot.launchBot();
                            bot.isBotEnabled = true;
                        }
                        break;
                }
            }
        },
        
        onPrefChange: function() {
            var generalStyle = '<span style = "opacity: 0.35";>';
            window.botstatus_overlay.innerHTML = generalStyle + '(T / Right Click) Bot: </span>' + userInterface.handleTextColor(bot.isBotRunning);
            window.visualdebugging_overlay.innerHTML = generalStyle + '(Y) Visual debugging: </span>' + userInterface.handleTextColor(window.visualDebugging);
            window.logdebugging_overlay.innerHTML = generalStyle + '(U) Log debugging: </span>' + userInterface.handleTextColor(window.logDebugging);
            window.autorespawn_overlay.innerHTML = generalStyle + '(I) Auto respawning: </span>' + userInterface.handleTextColor(window.autoRespawn);
            window.rotateskin_overlay.innerHTML = generalStyle + '(W) Auto skin rotator: </span>' + userInterface.handleTextColor(window.rotateskin);
            window.rendermode_overlay.innerHTML = generalStyle + '(O) Mobile rendering: </span>' + userInterface.handleTextColor(window.mobileRender);
            window.collision_detection_overlay.innerHTML = generalStyle + '(C) Collision detection: </span>' + userInterface.handleTextColor(window.collisionDetection);
            window.collision_radius_multiplier_overlay.innerHTML = generalStyle + '(A/S) Collision radius multiplier: ' + window.collisionRadiusMultiplier + ' </span>';  
        },

        onFrameUpdate: function() {
            // Botstatus overlay
            var generalStyle = '<span style = "opacity: 0.35";>';
            window.fps_overlay.innerHTML = generalStyle + 'FPS: ' + userInterface.framesPerSecond.getFPS() + '</span>';

            if (window.position_overlay && window.playing) {
                // Display the X and Y of the snake
                window.position_overlay.innerHTML = generalStyle + 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0) + '</span>';
            }
            
            if (window.playing && window.visualDebugging && bot.isBotRunning) {
                // Only draw the goal when a bot has a goal.
                if (window.goalCoordinates) {
                    var headCoord = {x: window.snake.xx, y: window.snake.yy};
                    canvas.drawLine(
                        canvas.mapToCanvas(headCoord),
                        canvas.mapToCanvas(window.goalCoordinates),
                        'green');
                    canvas.drawCircle(canvas.mapToCanvas(window.goalCoordinates), 'red', true);
                    canvas.drawAngle(window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4, true);
                    canvas.drawAngle(window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4, true);
                }
            }
        },

        oef: function() {
            // Original slither.io oef function + whatever is under it
            // requestAnimationFrame(window.loop);
            original_oef();
            if (bot.isBotRunning) window.loop();
            userInterface.onFrameUpdate();
        },

        // Quit to menu
        quit: function() {
            if (window.playing && window.resetGame) {
                window.want_close_socket = true;
                window.dead_mtm = 0;
                if (window.play_btn) {
                    window.play_btn.setEnabled(true);
                }
                window.resetGame();
            }
        },

        // Update the relation between the screen and the canvas.
        onresize: function() {
            window.resize();
            // Canvas different size from the screen (often bigger).
            canvas.canvasRatio = [window.mc.width / window.ww,
                window.mc.height / window.hh
            ];
        },

        handleTextColor: function(enabled) {
            return '<span style=\"opacity: 0.8; color:' + (enabled ? 'green;\">enabled' : 'red;\">disabled') + '</span>';
        }
    };
})();
window.play_btn.btnf.addEventListener('click', userInterface.playButtonClickListener);
document.onkeydown = userInterface.onkeydown;
window.onmousedown = userInterface.onmousedown;
window.oef = userInterface.oef;
window.onresize = userInterface.onresize;


// Loop for running the bot
window.loop = function() {
    // If the game and the bot are running
    if (window.playing && bot.isBotEnabled) {
        bot.ranOnce = true;
        bot.thinkAboutGoals();
    } else {
        if (bot.ranOnce) {
            bot.stopBot();
        }
    }
};

// Main
(function() {
    // Load preferences
    userInterface.loadPreference('logDebugging', false);
    userInterface.loadPreference('visualDebugging', false);
    userInterface.loadPreference('autoRespawn', false);
    userInterface.loadPreference('mobileRender', false);
    userInterface.loadPreference('collisionDetection', true);
    userInterface.loadPreference('collisionRadiusMultiplier', 10);
    userInterface.loadPreference('rotateskin', false);
    window.nick.value = userInterface.loadPreference('savedNick', 'Slither.io-bot');

    // Overlays

    // Top left
    window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; z-index: 7;';
    userInterface.appendDiv('version_overlay', 'nsi', window.generalstyle + 'left: 30; top: 50px;');
    userInterface.appendDiv('botstatus_overlay', 'nsi', window.generalstyle + 'left: 30; top: 65px;');
    userInterface.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 80px;');
    userInterface.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 95px;');
    userInterface.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle + 'left: 30; top: 110px;');
    userInterface.appendDiv('rendermode_overlay', 'nsi', window.generalstyle + 'left: 30; top: 125px;');
    userInterface.appendDiv('rotateskin_overlay', 'nsi', window.generalstyle + 'left: 30; top: 140px;');
    userInterface.appendDiv('collision_detection_overlay', 'nsi', window.generalstyle + 'left: 30; top: 155px;');
    userInterface.appendDiv('collision_radius_multiplier_overlay', 'nsi', window.generalstyle + 'left: 30; top: 170px;');
    userInterface.appendDiv('resetzoom_overlay', 'nsi', window.generalstyle + 'left: 30; top: 185px;');
    userInterface.appendDiv('scroll_overlay', 'nsi', window.generalstyle + 'left: 30; top: 200px;');
    userInterface.appendDiv('quickResp_overlay', 'nsi', window.generalstyle + 'left: 30; top: 215px;');
    userInterface.appendDiv('changeskin_overlay', 'nsi', window.generalstyle + 'left: 30; top: 230px;');
    userInterface.appendDiv('quittomenu_overlay', 'nsi', window.generalstyle + 'left: 30; top: 245px;');
    
    // Set static display options here.
    var generalStyle = '<span style = "opacity: 0.35";>';
    window.resetzoom_overlay.innerHTML = generalStyle + '(Z) Reset zoom </span>';
    window.scroll_overlay.innerHTML = generalStyle + '(Mouse Wheel) Zoom in/out </span>';
    window.quittomenu_overlay.innerHTML = generalStyle + '(Q) Quit to menu </span>';
    window.changeskin_overlay.innerHTML = generalStyle + '(X) Change skin </span>';
    window.quickResp_overlay.innerHTML = generalStyle + '(ESC) Quick Respawn </span>';
    window.version_overlay.innerHTML = generalStyle + 'Version: ' + GM_info.script.version;
    
    // Pref display
    userInterface.onPrefChange();
    
    // Bottom right
    userInterface.appendDiv('position_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 120px;');
    userInterface.appendDiv('ip_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 150px;');
    userInterface.appendDiv('fps_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 170px;');

    // Listener for mouse wheel scroll - used for setZoom function
    document.body.addEventListener('mousewheel', canvas.setZoom);
    document.body.addEventListener('DOMMouseScroll', canvas.setZoom);

    // Set render mode
    if (window.mobileRender) {
        canvas.setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
        window.render_mode = 1;
    } else {
        canvas.setBackground();
        window.render_mode = 2;
    }

    // Unblocks all skins without the need for FB sharing.
    window.localStorage.setItem('edttsg', '1');

    // Remove social
    window.social.remove();

    // Start!
    bot.launchBot();
    window.startInterval = setInterval(bot.startBot, 1000);
})();

var original_redraw = window.redraw;
window.redraw = function() {
    fps++;
    var c = mc.getContext("2d");
    if (animating) {
        if (snake) {
            var f = .5 + .4 / Math.max(1, (snake.sct + 16) / 36);
            gsc != f && (gsc < f ? (gsc += 2E-4,
            gsc >= f && (gsc = f)) : (gsc -= 2E-4,
            gsc <= f && (gsc = f)))
        }
        var f = view_xx
          , b = view_yy;
        null  != snake && (0 < fvtg && (fvtg--,
        fvx = fvxs[fvpos],
        fvy = fvys[fvpos],
        fvxs[fvpos] = 0,
        fvys[fvpos] = 0,
        fvpos++,
        fvpos >= vfc && (fvpos = 0)),
        view_xx = snake.xx + snake.fx + fvx,
        view_yy = snake.yy + snake.fy + fvy,
        choosing_skin && (view_xx -= 104,
        gsc = 1),
        view_ang = Math.atan2(view_yy - grd, view_xx - grd),
        view_dist =
        Math.sqrt((view_xx - grd) * (view_xx - grd) + (view_yy - grd) * (view_yy - grd)),
        bpx1 = view_xx - (mww2 / gsc + 84),
        bpy1 = view_yy - (mhh2 / gsc + 84),
        bpx2 = view_xx + (mww2 / gsc + 84),
        bpy2 = view_yy + (mhh2 / gsc + 84),
        fpx1 = view_xx - (mww2 / gsc + 24),
        fpy1 = view_yy - (mhh2 / gsc + 24),
        fpx2 = view_xx + (mww2 / gsc + 24),
        fpy2 = view_yy + (mhh2 / gsc + 24),
        apx1 = view_xx - (mww2 / gsc + 210),
        apy1 = view_yy - (mhh2 / gsc + 210),
        apx2 = view_xx + (mww2 / gsc + 210),
        apy2 = view_yy + (mhh2 / gsc + 210));
        bgx2 -= 1 * (view_xx - f) / bgw2;
        bgy2 -= 1 * (view_yy - b) / bgh2;
        bgx2 %= 1;
        0 > bgx2 && (bgx2 += 1);
        bgy2 %= 1;
        0 > bgy2 && (bgy2 += 1);
        ggbg &&
        (high_quality || 0 < gla) ? (c.save(),
        c.fillStyle = "#000000",
        c.fillRect(0, 0, mww, mhh),
        c.globalAlpha = .3 * gla,
        c.drawImage(gbgmc, 0, 0),
        c.restore()) : (c.fillStyle = "#000000",
        c.fillRect(0, 0, mww, mhh));
        if (bgp2) {
            c.save();
            c.fillStyle = bgp2;
            c.translate(mww2, mhh2);
            c.scale(gsc, gsc);
            c.translate(bgx2 * bgw2, bgy2 * bgh2);
            c.globalAlpha = .4 + .6 * (1 - gla);
            c.fillRect(3 * -mww / gsc, 3 * -mhh / gsc, 5 * mww / gsc, 5 * mhh / gsc);
            if (high_quality || 0 < gla)
                c.globalCompositeOperation = "lighter",
                c.globalAlpha = .4 * gla,
                c.fillRect(3 * -mww / gsc, 3 * -mhh / gsc, 5 * mww / gsc, 5 * mhh /
                gsc);
            c.restore()
        }
        if (testing)
            for (f = sectors.length - 1; 0 <= f; f--)
                b = sectors[f],
                c.fillStyle = "rgba(0, 255, 0, .1)",
                c.fillRect(mww2 + (b.xx * sector_size - view_xx) * gsc, mhh2 + (b.yy * sector_size - view_yy) * gsc, sector_size * gsc - 4, sector_size * gsc - 4);
        if (high_quality || 0 < gla) {
            var h = 1.75;
            1 != gla && (h = 1.75 * gla);
            c.save();
            for (f = foods_c - 1; 0 <= f; f--)
                b = foods[f],
                b.rx >= fpx1 && b.ry >= fpy1 && b.rx <= fpx2 && b.ry <= fpy2 && (1 == b.rad ? (z = mww2 + gsc * (b.rx - view_xx) - b.ofw2,
                x = mhh2 + gsc * (b.ry - view_yy) - b.ofh2,
                c.globalAlpha = h * b.fr,
                c.drawImage(b.ofi, z, x)) : (z =
                mww2 + gsc * (b.rx - view_xx) - b.ofw2 * b.rad,
                x = mhh2 + gsc * (b.ry - view_yy) - b.ofh2 * b.rad,
                c.globalAlpha = h * b.fr,
                c.drawImage(b.ofi, 0, 0, b.ofw, b.ofh, z, x, b.ofw * b.rad, b.ofh * b.rad)));
            c.restore()
        }
        c.save();
        c.globalCompositeOperation = "lighter";
        if (high_quality || 0 < gla) {
            h = .75;
            1 != gla && (h = .75 * gla);
            var u = .75;
            1 != gla && (u = 1 - .25 * gla);
            for (f = foods_c - 1; 0 <= f; f--)
                b = foods[f],
                b.rx >= fpx1 && b.ry >= fpy1 && b.rx <= fpx2 && b.ry <= fpy2 && (1 == b.rad ? (z = mww2 + gsc * (b.rx - view_xx) - b.fw2,
                x = mhh2 + gsc * (b.ry - view_yy) - b.fh2,
                c.globalAlpha = u * b.fr,
                c.drawImage(b.fi, z,
                x),
                c.globalAlpha = h * (.5 + .5 * Math.cos(b.gfr / 13)) * b.fr,
                c.drawImage(b.fi, z, x)) : (z = mww2 + gsc * (b.rx - view_xx) - b.fw2 * b.rad,
                x = mhh2 + gsc * (b.ry - view_yy) - b.fh2 * b.rad,
                c.globalAlpha = u * b.fr,
                c.drawImage(b.fi, 0, 0, b.fw, b.fh, z, x, b.fw * b.rad, b.fh * b.rad),
                c.globalAlpha = h * (.5 + .5 * Math.cos(b.gfr / 13)) * b.fr,
                c.drawImage(b.fi, 0, 0, b.fw, b.fh, z, x, b.fw * b.rad, b.fh * b.rad)))
        } else
            for (f = foods_c - 1; 0 <= f; f--)
                b = foods[f],
                b.rx >= fpx1 && b.ry >= fpy1 && b.rx <= fpx2 && b.ry <= fpy2 && (1 == b.rad ? (z = mww2 + gsc * (b.rx - view_xx) - b.fw2,
                x = mhh2 + gsc * (b.ry - view_yy) - b.fh2,
                c.globalAlpha = b.fr,
                c.drawImage(b.fi, z, x)) : (z = mww2 + gsc * (b.rx - view_xx) - b.fw2 * b.rad,
                x = mhh2 + gsc * (b.ry - view_yy) - b.fh2 * b.rad,
                c.globalAlpha = b.fr,
                c.drawImage(b.fi, 0, 0, b.fw, b.fh, z, x, b.fw * b.rad, b.fh * b.rad)));
        c.restore();
        c.save();
        c.globalCompositeOperation = "lighter";
        for (f = preys.length - 1; 0 <= f; f--)
            if (h = preys[f],
            e = h.xx + h.fx,
            w = h.yy + h.fy,
            px = mww2 + gsc * (e - view_xx),
            py = mhh2 + gsc * (w - view_yy),
            -50 <= px && -50 <= py && px <= mwwp50 && py <= mhhp50) {
                if (h.eaten) {
                    var b = h.eaten_by
                      , q = Math.pow(h.eaten_fr, 2)
                      , e = e + (b.xx + b.fx + Math.cos(b.ang + b.fa) *
                    (43 - 24 * q) * (1 - q) - e) * q
                      , w = w + (b.yy + b.fy + Math.sin(b.ang + b.fa) * (43 - 24 * q) * (1 - q) - w) * q;
                    px = mww2 + gsc * (e - view_xx);
                    py = mhh2 + gsc * (w - view_yy)
                }
                1 == h.rad ? (z = px - h.fw2,
                x = py - h.fh2,
                c.globalAlpha = .75 * h.fr,
                c.drawImage(h.fi, z, x),
                c.globalAlpha = .75 * (.5 + .5 * Math.cos(h.gfr / 13)) * h.fr,
                c.drawImage(h.fi, z, x)) : (z = px - h.fw2 * h.rad,
                x = py - h.fh2 * h.rad,
                c.globalAlpha = .75 * h.fr,
                c.drawImage(h.fi, 0, 0, h.fw, h.fh, z, x, h.fw * h.rad, h.fh * h.rad),
                c.globalAlpha = .75 * (.5 + .5 * Math.cos(h.gfr / 13)) * h.fr,
                c.drawImage(h.fi, 0, 0, h.fw, h.fh, z, x, h.fw * h.rad, h.fh * h.rad))
            }
        c.restore();
        c.save();
        c.strokeStyle = "#90C098";
        for (var e, w, D, f = snakes.length - 1; 0 <= f; f--)
            b = snakes[f],
            e = b.xx + b.fx,
            w = b.yy + b.fy + 40,
            0 < b.na && e >= bpx1 - 100 && w >= bpy1 && e <= bpx2 + 100 && w <= bpy2 && (b == snake && (b.fnfr++,
            200 < b.fnfr && (b.na -= .004,
            0 > b.na && (b.na = 0))),
            c.save(),
            c.globalAlpha = .5 * b.na * b.alive_amt * (1 - b.dead_amt),
            c.font = "12px Arial, Helvetica Neue, Helvetica, sans-serif",
            c.fillStyle = b.csw,
            c.textBaseline = "middle",
            c.textAlign = "center",
            h = b.xx + b.fx,
            u = b.yy + b.fy,
            h = mww2 + (h - view_xx) * gsc,
            u = mhh2 + (u - view_yy) * gsc,
            c.fillText(b.nk, h, u + 32 +
            11 * b.sc * gsc),
            c.restore());
        for (f = snakes.length - 1; 0 <= f; f--)
            for (b = snakes[f],
            b.iiv = !1,
            t = b.pts.length - 1; 0 <= t; t--)
                if (E = b.pts[t],
                px = E.xx + E.fx,
                py = E.yy + E.fy,
                px >= bpx1 && py >= bpy1 && px <= bpx2 && py <= bpy2) {
                    b.iiv = !0;
                    break
                }
        for (f = snakes.length - 1; 0 <= f; f--)
            if (b = snakes[f],
            b.iiv) {
                h = b.xx + b.fx;
                u = b.yy + b.fy;
                px = h;
                py = u;
                D = b.ehang;
                var y = b.sc
                  , B = 29 * y
                  , G = b.cfl
                  , E = b.pts[b.pts.length - 1];
                if (1 == render_mode) {
                    c.save();
                    c.beginPath();
                    c.moveTo(mww2 + (px - view_xx) * gsc, mhh2 + (py - view_yy) * gsc);
                    e = !1;
                    for (var t = b.pts.length - 1; 0 <= t; t--) {
                        E = b.pts[t];
                        lpx =
                        px;
                        lpy = py;
                        px = E.xx;
                        py = E.yy;
                        var z = E.fx
                          , x = E.fy;
                        0 < G && (px += z,
                        py += x,
                        lax = ax,
                        lay = ay,
                        ax = (px + lpx) / 2,
                        ay = (py + lpy) / 2,
                        e || (lax = ax,
                        lay = ay),
                        1 > G && (q = 1 - G,
                        lpx += (lax - lpx) * q,
                        lpy += (lay - lpy) * q,
                        ax += (lax - ax) * q,
                        ay += (lay - ay) * q),
                        e ? G-- : G -= b.chl + b.fchl,
                        e ? c.quadraticCurveTo(mww2 + (lpx - view_xx) * gsc, mhh2 + (lpy - view_yy) * gsc, mww2 + (ax - view_xx) * gsc, mhh2 + (ay - view_yy) * gsc) : (c.lineTo(mww2 + (ax - view_xx) * gsc, mhh2 + (ay - view_yy) * gsc),
                        e = !0))
                    }
                    c.save();
                    c.lineJoin = "round";
                    c.lineCap = "round";
                    is_firefox ? (b.sp > b.fsp && (t = b.alive_amt * (1 - b.dead_amt) * Math.max(0,
                    Math.min(1, (b.sp - b.ssp) / (b.msp - b.ssp))),
                    c.save(),
                    c.strokeStyle = b.cs,
                    c.globalAlpha = .3 * t,
                    c.lineWidth = (B + 6) * gsc,
                    c.stroke(),
                    c.lineWidth = (B + 9) * gsc,
                    c.stroke(),
                    c.lineWidth = (B + 12) * gsc,
                    c.stroke(),
                    c.restore()),
                    c.globalAlpha = 1 * b.alive_amt * (1 - b.dead_amt),
                    c.strokeStyle = "#000000",
                    c.lineWidth = (B + 5) * gsc) : (b.sp > b.fsp && (t = b.alive_amt * (1 - b.dead_amt) * Math.max(0, Math.min(1, (b.sp - b.ssp) / (b.msp - b.ssp))),
                    c.save(),
                    c.lineWidth = (B - 2) * gsc,
                    c.shadowBlur = 30 * gsc,
                    c.shadowColor = "rgba(" + b.rr + "," + b.gg + "," + b.bb + ", " + Math.round(1E4 * t) /
                    1E4 + ")",
                    c.stroke(),
                    c.stroke(),
                    c.restore()),
                    c.globalAlpha = .4 * b.alive_amt * (1 - b.dead_amt),
                    c.strokeStyle = "#000000",
                    c.lineWidth = (B + 5) * gsc,
                    c.stroke(),
                    c.strokeStyle = b.cs,
                    c.lineWidth = B * gsc,
                    c.strokeStyle = "#000000",
                    c.globalAlpha = 1 * b.alive_amt * (1 - b.dead_amt));
                    c.stroke();
                    c.strokeStyle = b.cs;
                    c.globalAlpha = .8 * b.alive_amt * (1 - b.dead_amt);
                    c.lineWidth = B * gsc;
                    c.stroke();
                    c.restore();
                    c.strokeStyle = b.cs;
                    b.dead && (x = (.5 + .5 * Math.abs(Math.sin(5 * Math.PI * b.dead_amt))) * Math.sin(Math.PI * b.dead_amt),
                    c.save(),
                    c.lineJoin = "round",
                    c.lineCap =
                    "round",
                    c.globalCompositeOperation = "lighter",
                    c.lineWidth = (B - 3) * gsc,
                    c.globalAlpha = x,
                    c.strokeStyle = "#FFCC99",
                    c.stroke(),
                    c.restore());
                    c.restore()
                }
                if (2 == render_mode) {
                    var B = .5 * B, J, M, F, A, I, L, N, C, z = 0;
                    px = h;
                    py = u;
                    I = px;
                    L = py;
                    I >= bpx1 && L >= bpy1 && I <= bpx2 && L <= bpy2 ? (pbx[0] = I,
                    pby[0] = L,
                    pba[0] = Math.atan2(u - (E.yy + E.fy), h - (E.xx + E.fx)) + Math.PI,
                    pbu[0] = 1) : pbu[0] = 0;
                    z = 1;
                    n = (b.chl + b.fchl) % .25;
                    0 > n && (n += .25);
                    n = .25 - n;
                    G += 1 - .25 * Math.ceil((b.chl + b.fchl) / .25);
                    ax = px;
                    ay = py;
                    b.sep != b.wsep && (b.sep < b.wsep ? (b.sep += .01,
                    b.sep >= b.wsep && (b.sep =
                    b.wsep)) : b.sep > b.wsep && (b.sep -= .01,
                    b.sep <= b.wsep && (b.sep = b.wsep)));
                    for (var O = b.sep * qsm, K = 0, x = per_color_imgs[b.cv].kmcs, H, t = b.pts.length - 1; 0 <= t; t--)
                        if (E = b.pts[t],
                        lpx = px,
                        lpy = py,
                        px = E.xx + E.fx,
                        py = E.yy + E.fy,
                        -.25 < G) {
                            F = I;
                            A = L;
                            I = (px + lpx) / 2;
                            L = (py + lpy) / 2;
                            N = lpx;
                            C = lpy;
                            for (q = 0; 1 > q; q += .25) {
                                E = n + q;
                                e = F + (N - F) * E;
                                w = A + (C - A) * E;
                                J = N + (I - N) * E;
                                M = C + (L - C) * E;
                                lax = ax;
                                lay = ay;
                                ax = e + (J - e) * E;
                                ay = w + (M - w) * E;
                                0 > G && (ax += -(lax - ax) * G / .25,
                                ay += -(lay - ay) * G / .25);
                                J = Math.sqrt(Math.pow(ax - lax, 2) + Math.pow(ay - lay, 2));
                                if (K + J < O)
                                    K += J;
                                else {
                                    K = -K;
                                    for (E = (J - K) /
                                    O; 1 <= E; E--)
                                        K += O,
                                        pax = lax + (ax - lax) * K / J,
                                        pay = lay + (ay - lay) * K / J,
                                        pax >= bpx1 && pay >= bpy1 && pax <= bpx2 && pay <= bpy2 ? (pbx[z] = pax,
                                        pby[z] = pay,
                                        pbu[z] = 1,
                                        e = ax - lax,
                                        w = ay - lay,
                                        pba[z] = -15 <= e && -15 <= w && 15 > e && 15 > w ? at2lt[8 * w + 128 << 8 | 8 * e + 128] : -127 <= e && -127 <= w && 127 > e && 127 > w ? at2lt[w + 128 << 8 | e + 128] : Math.atan2(w, e)) : pbu[z] = 0,
                                        z++;
                                    K = J - K
                                }
                                if (1 > G && (G -= .25,
                                -.25 >= G))
                                    break
                            }
                            1 <= G && G--
                        }
                    ax >= bpx1 && ay >= bpy1 && ax <= bpx2 && ay <= bpy2 ? (pbu[z] = 1,
                    pbx[z] = ax,
                    pby[z] = ay,
                    pba[z] = Math.atan2(ay - lay, ax - lax)) : pbu[z] = 0;
                    z++;
                    c.save();
                    c.translate(mww2, mhh2);
                    q = gsc * B * 52 / 32;
                    I = gsc * B * 62 / 32;
                    G = b.alive_amt * (1 - b.dead_amt);
                    G *= G;
                    E = 1;
                    if (b.tsp > b.fsp) {
                        E = b.alive_amt * (1 - b.dead_amt) * Math.max(0, Math.min(1, (b.tsp - b.ssp) / (b.msp - b.ssp)));
                        H = .37 * E;
                        K = Math.pow(E, .5);
                        F = gsc * B * (1 + .9375 * K);
                        w = per_color_imgs[b.cv].kfmc;
                        c.save();
                        c.globalCompositeOperation = "lighter";
                        if (b.rbcs)
                            for (L = b.rbcs,
                            O = L.length,
                            t = z - 1; 0 <= t; t--)
                                1 == pbu[t] && (px = pbx[t],
                                py = pby[t],
                                w = per_color_imgs[L[t % O]],
                                w = w.kfmc,
                                c.save(),
                                c.globalAlpha = G * K * .38 * (.6 + .4 * Math.cos(t / 4 - 1.15 * b.sfr)),
                                c.translate((px - view_xx) * gsc, (py - view_yy) * gsc),
                                4 > t ? (e =
                                F * (1 + (4 - t) * b.swell),
                                c.drawImage(w, -e, -e, 2 * e, 2 * e)) : c.drawImage(w, -F, -F, 2 * F, 2 * F),
                                c.restore());
                        else
                            for (t = z - 1; 0 <= t; t--)
                                1 == pbu[t] && (px = pbx[t],
                                py = pby[t],
                                c.save(),
                                c.globalAlpha = G * K * .38 * (.6 + .4 * Math.cos(t / 4 - 1.15 * b.sfr)),
                                c.translate((px - view_xx) * gsc, (py - view_yy) * gsc),
                                4 > t ? (e = F * (1 + (4 - t) * b.swell),
                                c.drawImage(w, -e, -e, 2 * e, 2 * e)) : c.drawImage(w, -F, -F, 2 * F, 2 * F),
                                c.restore());
                        c.restore();
                        E = 1 - E
                    }
                    E *= G;
                    if (high_quality || 0 < gla)
                        for (w = E,
                        1 != gla && (w = E * gla),
                        c.globalAlpha = w,
                        t = z - 1; 0 <= t; t--)
                            1 == pbu[t] && (px = pbx[t],
                            py = pby[t],
                            c.save(),
                            c.translate((px - view_xx) * gsc, (py - view_yy) * gsc),
                            c.drawImage(komc, -q, -q, 2 * q, 2 * q),
                            9 > t && (c.globalAlpha = w * (1 - t / 9),
                            4 > t ? (e = I * (1 + (4 - t) * b.swell),
                            c.drawImage(ksmc, -e, -e, 2 * e, 2 * e)) : c.drawImage(ksmc, -I, -I, 2 * I, 2 * I),
                            c.globalAlpha = w),
                            c.restore());
                    c.globalAlpha = E;
                    if (b.rbcs) {
                        L = b.rbcs;
                        O = L.length;
                        for (t = z - 1; 0 <= t; t--)
                            1 == pbu[t] && (px = pbx[t],
                            py = pby[t],
                            2 <= t && (q = t - 2,
                            1 == pbu[q] && (e = pbx[q],
                            w = pby[q],
                            c.save(),
                            c.translate((e - view_xx) * gsc, (w - view_yy) * gsc),
                            9 > q ? (c.globalAlpha = q / 9 * E,
                            4 > q ? (e = I * (1 + (4 - q) * b.swell),
                            c.drawImage(ksmc, -e, -e,
                            2 * e, 2 * e)) : c.drawImage(ksmc, -I, -I, 2 * I, 2 * I)) : (c.globalAlpha = E,
                            c.drawImage(ksmc, -I, -I, 2 * I, 2 * I)),
                            c.restore())),
                            c.save(),
                            c.globalAlpha = G,
                            c.translate((px - view_xx) * gsc, (py - view_yy) * gsc),
                            c.rotate(pba[t]),
                            q = t % (2 * x.length),
                            q >= x.length && (q = 2 * x.length - (q + 1)),
                            w = per_color_imgs[L[t % O]],
                            4 > t ? (e = B * (1 + (4 - t) * b.swell),
                            c.drawImage(w.kmcs[q], -gsc * e, -gsc * e, 2 * gsc * e, 2 * gsc * e)) : c.drawImage(w.kmcs[q], -gsc * B, -gsc * B, 2 * gsc * B, 2 * gsc * B),
                            c.restore());
                        if (b.tsp > b.fsp && (high_quality || 0 < gla)) {
                            c.save();
                            c.globalCompositeOperation = "lighter";
                            for (t = z - 1; 0 <= t; t--)
                                1 == pbu[t] && (px = pbx[t],
                                py = pby[t],
                                c.save(),
                                c.translate((px - view_xx) * gsc, (py - view_yy) * gsc),
                                c.rotate(pba[t]),
                                c.globalAlpha = G * H * gla * (.5 + .5 * Math.cos(t / 4 - b.sfr)),
                                q = t % (2 * x.length),
                                q >= x.length && (q = 2 * x.length - (q + 1)),
                                4 > t ? (e = B * (1 + (4 - t) * b.swell),
                                c.drawImage(per_color_imgs[L[t % O]].kmcs[q], -gsc * e, -gsc * e, 2 * gsc * e, 2 * gsc * e)) : c.drawImage(per_color_imgs[L[t % O]].kmcs[q], -gsc * B, -gsc * B, 2 * gsc * B, 2 * gsc * B),
                                c.restore());
                            c.restore()
                        }
                    } else {
                        for (t = z - 1; 0 <= t; t--)
                            1 == pbu[t] && (px = pbx[t],
                            py = pby[t],
                            2 <= t && (q = t - 2,
                            1 == pbu[q] &&
                            (e = pbx[q],
                            w = pby[q],
                            c.save(),
                            c.translate((e - view_xx) * gsc, (w - view_yy) * gsc),
                            9 > q ? (c.globalAlpha = q / 9 * E,
                            4 > q ? (e = I * (1 + (4 - q) * b.swell),
                            c.drawImage(ksmc, -e, -e, 2 * e, 2 * e)) : c.drawImage(ksmc, -I, -I, 2 * I, 2 * I)) : (c.globalAlpha = E,
                            c.drawImage(ksmc, -I, -I, 2 * I, 2 * I)),
                            c.restore())),
                            c.save(),
                            c.globalAlpha = G,
                            c.translate((px - view_xx) * gsc, (py - view_yy) * gsc),
                            c.rotate(pba[t]),
                            q = t % (2 * x.length),
                            q >= x.length && (q = 2 * x.length - (q + 1)),
                            4 > t ? (e = B * (1 + (4 - t) * b.swell),
                            c.drawImage(x[q], -gsc * e, -gsc * e, 2 * gsc * e, 2 * gsc * e)) : c.drawImage(x[q], -gsc * B, -gsc * B,
                            2 * gsc * B, 2 * gsc * B),
                            c.restore());
                        if (b.tsp > b.fsp && (high_quality || 0 < gla)) {
                            c.save();
                            c.globalCompositeOperation = "lighter";
                            for (t = z - 1; 0 <= t; t--)
                                1 == pbu[t] && (px = pbx[t],
                                py = pby[t],
                                q = t % (2 * x.length),
                                q >= x.length && (q = 2 * x.length - (q + 1)),
                                c.save(),
                                c.translate((px - view_xx) * gsc, (py - view_yy) * gsc),
                                c.rotate(pba[t]),
                                c.globalAlpha = G * H * gla * (.5 + .5 * Math.cos(t / 4 - b.sfr)),
                                4 > t ? (e = B * (1 + (4 - t) * b.swell),
                                c.drawImage(x[q], -gsc * e, -gsc * e, 2 * gsc * e, 2 * gsc * e)) : c.drawImage(x[q], -gsc * B, -gsc * B, 2 * gsc * B, 2 * gsc * B),
                                c.restore());
                            c.restore()
                        }
                    }
                    if (b.antenna)
                        if (e =
                        Math.cos(b.ang),
                        w = Math.sin(b.ang),
                        ax = h - 8 * e * b.sc,
                        ay = u - 8 * w * b.sc,
                        2 <= z && ax >= apx1 && ay >= apy1 && ax <= apx2 && ay <= apy2) {
                            b.atx[0] = ax;
                            b.aty[0] = ay;
                            E = b.sc * gsc;
                            fj = b.atx.length - 1;
                            if (choosing_skin)
                                for (t = 1; t <= fj; t++)
                                    b.atvx[t] -= .3,
                                    b.atvy[t] += .14 * Math.cos(fr / 23 - 7 * t / fj);
                            else if (!b.antenna_shown)
                                for (b.antenna_shown = !0,
                                t = 1; t <= fj; t++)
                                    b.atx[t] = ax - e * t * 4 * b.sc,
                                    b.aty[t] = ay - w * t * 4 * b.sc;
                            for (t = 1; t <= fj; t++)
                                xx = b.atx[t - 1],
                                yy = b.aty[t - 1],
                                xx += 2 * Math.random() - 1,
                                yy += 2 * Math.random() - 1,
                                e = b.atx[t] - xx,
                                w = b.aty[t] - yy,
                                ang = -4 <= e && -4 <= w && 4 > e && 4 > w ?
                                at2lt[32 * w + 128 << 8 | 32 * e + 128] : -8 <= e && -8 <= w && 8 > e && 8 > w ? at2lt[16 * w + 128 << 8 | 16 * e + 128] : -16 <= e && -16 <= w && 16 > e && 16 > w ? at2lt[8 * w + 128 << 8 | 8 * e + 128] : -127 <= e && -127 <= w && 127 > e && 127 > w ? at2lt[w + 128 << 8 | e + 128] : Math.atan2(w, e),
                                xx += 4 * Math.cos(ang) * b.sc,
                                yy += 4 * Math.sin(ang) * b.sc,
                                b.atvx[t] += .1 * (xx - b.atx[t]),
                                b.atvy[t] += .1 * (yy - b.aty[t]),
                                b.atx[t] += b.atvx[t],
                                b.aty[t] += b.atvy[t],
                                b.atvx[t] *= .88,
                                b.atvy[t] *= .88,
                                e = b.atx[t] - b.atx[t - 1],
                                w = b.aty[t] - b.aty[t - 1],
                                J = Math.sqrt(e * e + w * w),
                                J > 4 * b.sc && (ang = -4 <= e && -4 <= w && 4 > e && 4 > w ? at2lt[32 * w + 128 << 8 | 32 *
                                e + 128] : -8 <= e && -8 <= w && 8 > e && 8 > w ? at2lt[16 * w + 128 << 8 | 16 * e + 128] : -16 <= e && -16 <= w && 16 > e && 16 > w ? at2lt[8 * w + 128 << 8 | 8 * e + 128] : -127 <= e && -127 <= w && 127 > e && 127 > w ? at2lt[w + 128 << 8 | e + 128] : Math.atan2(w, e),
                                b.atx[t] = b.atx[t - 1] + 4 * Math.cos(ang) * b.sc,
                                b.aty[t] = b.aty[t - 1] + 4 * Math.sin(ang) * b.sc);
                            c.globalAlpha = G;
                            c.strokeStyle = b.atc1;
                            c.lineWidth = 5 * E;
                            c.lineCap = "round";
                            c.lineJoin = "round";
                            c.beginPath();
                            fj = b.atx.length - 1;
                            e = (b.atx[fj] - view_xx) * gsc;
                            w = (b.aty[fj] - view_yy) * gsc;
                            c.moveTo(e, w);
                            for (t = fj - 1; 1 <= t; t--)
                                xx = (b.atx[t] - view_xx) * gsc,
                                yy = (b.aty[t] -
                                view_yy) * gsc,
                                1 <= Math.abs(xx - e) + Math.abs(yy - w) && (e = xx,
                                w = yy,
                                c.lineTo(e, w));
                            xx = (.5 * (b.atx[1] + b.atx[0]) - view_xx) * gsc;
                            yy = (.5 * (b.aty[1] + b.aty[0]) - view_yy) * gsc;
                            1 <= Math.abs(xx - e) + Math.abs(yy - w) && (e = xx,
                            w = yy,
                            c.lineTo(e, w));
                            c.stroke();
                            c.globalAlpha = b.atia * G;
                            c.strokeStyle = b.atc2;
                            c.lineWidth = 4 * E;
                            c.beginPath();
                            fj = b.atx.length - 1;
                            e = (b.atx[fj] - view_xx) * gsc;
                            w = (b.aty[fj] - view_yy) * gsc;
                            c.moveTo(e, w);
                            for (t = fj - 1; 0 <= t; t--)
                                xx = (b.atx[t] - view_xx) * gsc,
                                yy = (b.aty[t] - view_yy) * gsc,
                                1 <= Math.abs(xx - e) + Math.abs(yy - w) && (e = xx,
                                w = yy,
                                c.lineTo(e,
                                w));
                            c.stroke();
                            b.atwg && (c.lineWidth = 3 * E,
                            c.stroke(),
                            c.lineWidth = 2 * E,
                            c.stroke());
                            c.globalAlpha = G * b.blba;
                            if (b.abrot) {
                                c.save();
                                c.translate((b.atx[fj] - view_xx) * gsc, (b.aty[fj] - view_yy) * gsc);
                                vang = Math.atan2(b.aty[fj] - b.aty[fj - 1], b.atx[fj] - b.atx[fj - 1]) - b.atba;
                                if (0 > vang || vang >= pi2)
                                    vang %= pi2;
                                vang < -Math.PI ? vang += pi2 : vang > Math.PI && (vang -= pi2);
                                b.atba = (b.atba + .15 * vang) % pi2;
                                c.rotate(b.atba);
                                c.drawImage(b.bulb, b.blbx * b.bsc * E, b.blby * b.bsc * E, b.blbw * b.bsc * E, b.blbh * b.bsc * E);
                                c.restore()
                            } else
                                c.drawImage(b.bulb, (b.atx[fj] -
                                view_xx + b.blbx * b.bsc * b.sc) * gsc, (b.aty[fj] - view_yy + b.blby * b.bsc * b.sc) * gsc, b.blbw * b.bsc * E, b.blbh * b.bsc * E);
                            b.apbs && (c.globalAlpha = .5 * G,
                            c.lineWidth = 3 * E,
                            c.stroke(),
                            c.lineWidth = 2 * E,
                            c.stroke())
                        } else
                            b.antenna_shown && (b.antenna_shown = !1);
                    if (b.dead) {
                        c.save();
                        c.globalCompositeOperation = "lighter";
                        x = (.15 + .15 * Math.abs(Math.sin(5 * Math.PI * b.dead_amt))) * Math.sin(Math.PI * b.dead_amt);
                        B *= gsc;
                        for (t = z - 1; 0 <= t; t--)
                            1 == pbu[t] && (px = pbx[t],
                            py = pby[t],
                            c.save(),
                            c.globalAlpha = x * (.6 + .4 * Math.cos(t / 4 - 15 * b.dead_amt)),
                            c.translate((px -
                            view_xx) * gsc, (py - view_yy) * gsc),
                            4 > t ? (e = B * (1 + (4 - t) * b.swell),
                            c.drawImage(kdmc, -e, -e, 2 * e, 2 * e)) : c.drawImage(kdmc, -B, -B, 2 * B, 2 * B),
                            c.restore());
                        c.restore()
                    }
                    c.restore()
                }
                b.one_eye ? (t = 3 * y,
                B = Math.cos(D) * t,
                z = Math.sin(D) * t,
                x = y * b.ebisz,
                c.drawImage(b.ebi, 0, 0, b.ebiw, b.ebih, mww2 + (B + h - x / 2 - view_xx) * gsc, mhh2 + (z + u - x / 2 - view_yy) * gsc, x * gsc, x * gsc),
                B = Math.cos(D) * (t + .15) + b.rex * y,
                z = Math.sin(D) * (t + .15) + b.rey * y,
                x = y * b.episz,
                c.drawImage(b.epi, 0, 0, b.epiw, b.epih, mww2 + (B + h - x / 2 - view_xx) * gsc, mhh2 + (z + u - x / 2 - view_yy) * gsc, x * gsc, x * gsc)) : (t =
                1 == render_mode ? 4 * y : 6 * y,
                x = 6 * y,
                B = Math.cos(D) * t + Math.cos(D - Math.PI / 2) * (x + .5),
                z = Math.sin(D) * t + Math.sin(D - Math.PI / 2) * (x + .5),
                c.fillStyle = b.ec,
                c.globalAlpha = b.eca * b.alive_amt,
                c.beginPath(),
                c.arc(mww2 + (B + h - view_xx) * gsc, mhh2 + (z + u - view_yy) * gsc, b.er * y * gsc, 0, pi2),
                c.closePath(),
                c.fill(),
                c.globalAlpha = b.ppa,
                B = Math.cos(D) * (t + .5) + b.rex * y + Math.cos(D - Math.PI / 2) * x,
                z = Math.sin(D) * (t + .5) + b.rey * y + Math.sin(D - Math.PI / 2) * x,
                c.fillStyle = b.ppc,
                c.beginPath(),
                c.arc(mww2 + (B + h - view_xx) * gsc, mhh2 + (z + u - view_yy) * gsc, 3.5 * y * gsc, 0, pi2),
                c.closePath(),
                c.fill(),
                B = Math.cos(D) * t + Math.cos(D + Math.PI / 2) * (x + .5),
                z = Math.sin(D) * t + Math.sin(D + Math.PI / 2) * (x + .5),
                c.fillStyle = b.ec,
                c.globalAlpha = b.eca * b.alive_amt,
                c.beginPath(),
                c.arc(mww2 + (B + h - view_xx) * gsc, mhh2 + (z + u - view_yy) * gsc, b.er * y * gsc, 0, pi2),
                c.closePath(),
                c.fill(),
                c.globalAlpha = b.ppa,
                B = Math.cos(D) * (t + .5) + b.rex * y + Math.cos(D + Math.PI / 2) * x,
                z = Math.sin(D) * (t + .5) + b.rey * y + Math.sin(D + Math.PI / 2) * x,
                c.fillStyle = b.ppc,
                c.beginPath(),
                c.arc(mww2 + (B + h - view_xx) * gsc, mhh2 + (z + u - view_yy) * gsc, 3.5 * y * gsc, 0, pi2),
                c.closePath(),
                c.fill());
                c.globalAlpha = 1
            }
        if (high_quality || 0 < gla) {
            c.save();
            c.globalCompositeOperation = "lighter";
            for (f = foods_c - 1; 0 <= f; f--)
                b = foods[f],
                b.rx >= fpx1 && b.ry >= fpy1 && b.rx <= fpx2 && b.ry <= fpy2 && (e = b.rx - view_xx,
                w = b.ry - view_yy,
                h = e * e + w * w,
                fs = 1 + .06 * b.rad,
                z = e * fs,
                x = w * fs,
                H = .005 + .09 * (1 - h / (86E3 + h)),
                1 != b.rad && (H *= Math.pow(b.rad, .25)),
                1 != gla && (H *= gla),
                z = z * gsc + mww2,
                x = x * gsc + mhh2,
                1 == b.rad ? (z -= b.gfw2,
                x -= b.gfh2,
                c.globalAlpha = H * b.fr,
                c.drawImage(b.gfi, z, x),
                c.globalAlpha = H * (.5 + .5 * Math.cos(b.gfr / 13)) * b.fr,
                c.drawImage(b.gfi, z, x)) : (z -=
                b.gfw2 * b.rad,
                x -= b.gfh2 * b.rad,
                c.globalAlpha = H * b.fr,
                c.drawImage(b.gfi, 0, 0, b.gfw, b.gfh, z, x, b.gfw * b.rad, b.gfh * b.rad),
                c.globalAlpha = H * (.5 + .5 * Math.cos(b.gfr / 13)) * b.fr,
                c.drawImage(b.gfi, 0, 0, b.gfw, b.gfh, z, x, b.gfw * b.rad, b.gfh * b.rad)),
                fs = 1 + .32 * b.rad,
                z = e * fs,
                x = w * fs,
                H = .085 * (1 - h / (16500 + h)),
                1 != b.rad && (H *= Math.pow(b.rad, .25)),
                1 != gla && (H *= gla),
                z = z * gsc + mww2,
                x = x * gsc + mhh2,
                1 == b.rad ? (z -= b.g2fw2,
                x -= b.g2fh2,
                c.globalAlpha = H * b.fr,
                c.drawImage(b.g2fi, z, x),
                c.globalAlpha = H * (.5 + .5 * Math.cos(b.gfr / 13)) * b.fr,
                c.drawImage(b.g2fi, z,
                x)) : (z -= b.g2fw2 * b.rad,
                x -= b.g2fh2 * b.rad,
                c.globalAlpha = H * b.fr,
                c.drawImage(b.g2fi, 0, 0, b.g2fw, b.g2fh, z, x, b.g2fw * b.rad, b.g2fh * b.rad),
                c.globalAlpha = H * (.5 + .5 * Math.cos(b.gfr / 13)) * b.fr,
                c.drawImage(b.g2fi, 0, 0, b.g2fw, b.g2fh, z, x, b.g2fw * b.rad, b.g2fh * b.rad)));
            c.restore()
        }
        c.save();
        c.globalCompositeOperation = "lighter";
        for (f = preys.length - 1; 0 <= f; f--)
            h = preys[f],
            e = h.xx + h.fx,
            w = h.yy + h.fy,
            h.eaten && (b = h.eaten_by,
            q = Math.pow(h.eaten_fr, 2),
            e += (b.xx + b.fx + Math.cos(b.ang + b.fa) * (43 - 24 * q) * (1 - q) - e) * q,
            w += (b.yy + b.fy + Math.sin(b.ang +
            b.fa) * (43 - 24 * q) * (1 - q) - w) * q),
            e -= view_xx,
            w -= view_yy,
            b = e * e + w * w,
            fs = 1 + .08 * h.rad,
            px = e * fs,
            py = w * fs,
            H = .4 * (1 - b / (176E3 + b)),
            1 != h.rad && (H *= Math.pow(h.rad, .25)),
            px = px * gsc + mww2,
            py = py * gsc + mhh2,
            1 == h.rad ? -150 <= px && -150 <= py && px <= mwwp150 && py <= mhhp150 && (px -= h.gfw2,
            py -= h.gfh2,
            c.globalAlpha = H * h.fr,
            c.drawImage(h.gfi, px, py),
            c.globalAlpha = H * (.5 + .5 * Math.cos(h.gfr / 13)) * h.fr,
            c.drawImage(h.gfi, px, py)) : -150 <= px && -150 <= py && px <= mwwp150 && py <= mhhp150 && (px -= h.gfw2 * h.rad,
            py -= h.gfh2 * h.rad,
            c.globalAlpha = H * h.fr,
            c.drawImage(h.gfi, 0, 0, h.gfw,
            h.gfh, px, py, h.gfw * h.rad, h.gfh * h.rad),
            c.globalAlpha = H * (.5 + .5 * Math.cos(h.gfr / 13)) * h.fr,
            c.drawImage(h.gfi, 0, 0, h.gfw, h.gfh, px, py, h.gfw * h.rad, h.gfh * h.rad)),
            fs = 1 + .32 * h.rad,
            px = e * fs,
            py = w * fs,
            H = .35 * (1 - b / (46500 + b)),
            1 != h.rad && (H *= Math.pow(h.rad, .25)),
            b = 2 * h.rad,
            px = px * gsc + mww2,
            py = py * gsc + mhh2,
            -150 <= px && -150 <= py && px <= mwwp150 && py <= mhhp150 && (px -= h.gfw2 * b,
            py -= h.gfh2 * b,
            c.globalAlpha = H * h.fr,
            c.drawImage(h.gfi, 0, 0, h.gfw, h.gfh, px, py, h.gfw * b, h.gfh * b),
            c.globalAlpha = H * (.5 + .5 * Math.cos(h.gfr / 13)) * h.fr,
            c.drawImage(h.gfi, 0, 0, h.gfw,
            h.gfh, px, py, h.gfw * b, h.gfh * b));
        c.restore();
        if (4E3 > Math.abs(grd - view_dist)) {
            c.save();
            c.lineWidth = 23 * gsc;
            c.strokeStyle = "#800000";
            c.fillStyle = "#300000";
            c.beginPath();
            xx = grd + Math.cos(view_ang - 2E3 / grd) * grd * .98;
            yy = grd + Math.sin(view_ang - 2E3 / grd) * grd * .98;
            c.moveTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
            for (t = -2E3; 2E3 >= t; t += 100)
                xx = grd + Math.cos(view_ang + t / grd) * grd * .98,
                yy = grd + Math.sin(view_ang + t / grd) * grd * .98,
                c.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
            xx = grd + Math.cos(view_ang + 2E3 / grd) * (grd + 4E3);
            yy = grd + Math.sin(view_ang + 2E3 / grd) * (grd + 4E3);
            c.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
            xx = grd + Math.cos(view_ang - 2E3 / grd) * (grd + 4E3);
            yy = grd + Math.sin(view_ang - 2E3 / grd) * (grd + 4E3);
            c.lineTo(mww2 + (xx - view_xx) * gsc, mhh2 + (yy - view_yy) * gsc);
            c.closePath();
            c.stroke();
            c.fill();
            c.restore()
        }
        wumsts && 0 < rank && 0 < snake_count && playing && (wumsts = !1,
        b = "Your length",
        f = "of",
        H = "Your rank",
        "DE" == country ? (b = "Deine L\u00e4nge",
        f = "von",
        H = "Dein rang") : "FR" == country ? (b = "Votre longueur",
        f = "de",
        H = "Ton rang") : "BR" == country &&
        (b = "Seu comprimento",
        f = "do",
        H = "Seu classifica\u00e7\u00e3o"),
        b = "" + ('<span style="font-size: 14px;"><span style="opacity: .4;">' + b + ': </span><span style="opacity: .8; font-weight: bold;">' + Math.floor(15 * (fpsls[snake.sct] + snake.fam / fmlts[snake.sct] - 1) - 5) / 1 + "</span></span>"),
        b += '<BR><span style="opacity: .3;">' + H + ': </span><span style="opacity: .35;">' + rank + '</span><span style="opacity: .3;"> ' + f + ' </span><span style="opacity: .35;">' + snake_count + "</span>",
        lbf.innerHTML = b);
        c.restore()
    }
}