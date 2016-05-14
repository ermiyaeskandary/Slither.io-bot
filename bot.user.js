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

window.getWidth = function() {
    return window.ww;
};
window.getHeight = function() {
    return window.hh;
};
window.getX = function() {
    return window.snake.xx;
};
window.getY = function() {
    return window.snake.yy;
};

window.getSnakeLength = function() {
    return (Math.floor(150 * (window.fpsls[window.snake.sct] + window.snake.fam / window.fmlts[window.snake.sct] - 1) - 50) / 10);
};
window.getSnakeWidth = function(sc) {
    sc = sc || window.snake.sc;
    return sc * 14.5;
};

var canvas = (function() {
    return {
        // Ratio of screen size divided by canvas size.
        canvasRatio: [window.mc.width / window.ww, window.mc.height / window.hh],

        getScale: function() {
            return window.gsc;
        },



        //Screen coordinates
        // X = (0->WindowWidth)
        // Y = (0->WindowHeight)
        //
        //Mouse Coordinates
        // X = -Width  -> snake.xx -> Width
        // Y = -Height -> snake.yy -> Height
        //
        //Map Coordinates
        // X = 0 -> MapWidth
        // Y = 0 -> MapHeight
        //
        //Canvas Coordinates
        // X = 0 -> CanvasWidth
        // Y = 0 -> CanvasHeight

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

        // Draw a rectangle
        drawRect: function(x, y, width, height, color) {
            var context = window.mc.getContext('2d');
            context.beginPath();
            context.rect(x, y, width, height);
            context.fillStyle = color;
            context.fill();
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

        // Draw a line on the canvas.
        drawLine2: function(x1, y1, x2, y2, width, colour) {
            var context = window.mc.getContext('2d');
            context.beginPath();
            context.lineWidth = width * canvas.getScale();
            context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
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
                        canvas.drawCircle(canvas.circleMapToCanvas(collisionPointCircle), 'cyan', true);
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
        currentPath: [],
        radarResults: [],
        followLine: 0,

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

                //var collision = collisionGrid.lineTest(window.getX(), window.getY(), val.xx, val.yy);
                //if( collision !== false ) {
                //    return false;
                //}

                return !(isInsideDangerAngles && (val.distance <= 22500));
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
                    if (dist < 22500) {

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

        processSurround: function() {
            collisionGrid.initGrid(1000, 1000, 60);

            bot.radarResults = collisionHelper.radarScan(20,2000);
            
        },
        // Called by the window loop, this is the main logic of the bot.
        thinkAboutGoals: function() {
            // If no enemies or obstacles, go after what you are going after
            window.setAcceleration(0);
                
            // Save CPU by only calculating every Nth frame
            //if (++bot.tickCounter >= 15) {
            bot.tickCounter = 0;
            
            bot.processSurround();
            bot.astarFoodFinder();
        },

        astarFoodFinder: function() {
            var i;
            var lines = [];
            for(i=0; i<bot.radarResults.length; i++) {
                var line = bot.radarResults[i];
                if( line.cell ) 
                    continue;

                lines.push(line);
            }
            var randomLine = parseInt(Math.random() * lines.length);
            var pct = 0.0;
            if( bot.radarResults.length )
                pct = lines.length / bot.radarResults.length;
            if( !bot.followLine  ) {
                
                if( collisionGrid.foodGroups.length ) {
                    var foodCnt = 0;
                    var bestFood = collisionGrid.foodGroups[foodCnt++];
                    var destpos = collisionGrid.getCellByColRow(bestFood.x, bestFood.y);
                    while( destpos.cell && destpos.cell.length ) {
                        bestFood = collisionGrid.foodGroups[foodCnt++];
                        destpos = collisionGrid.getCellByColRow(bestFood.x, bestFood.y);
                    }
                    window.goalCoordinates = {x: bestFood.x, y:bestFood.y};
                    canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
                    bot.followLine = true;
                    bot.followTimer = setTimeout(bot.stopFollowLine, 8000*pct);
                }
            }
            else {

                var curpos = {x: window.getX(), y:window.getY()}
                var dist = canvas.getDistance(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y);
                var line = collisionGrid.lineTest(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y);
                var linePos = collisionGrid.getCellByColRow(line.x,line.y);
                
                if( dist < 50 ) {
                    bot.stopFollowLine();
                    return;
                }

                var collisionDist = canvas.getDistance(curpos.x, curpos.y, linePos.x, linePos.y);
                if( line.cell && collisionDist < 100 ) {
                    
                    var dir = {x:0,y:0};
                    dir.x = curpos.x - linePos.x;
                    dir.y = curpos.y - linePos.y;
                    window.goalCoordinates.x = curpos.x - dir.x;
                    window.goalCoordinates.y = curpos.y - dir.y;
                    canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
                    bot.stopFollowLine();
                    return;
                }

                var minpath = 0;

                var path = collisionGrid.generatePath(window.getX(), window.getY(), window.goalCoordinates.x, window.goalCoordinates.y);
                if( path.length > minpath ) {
                    bot.currentPath = path;
                    for(i=0; i<path.length; i++) {
                        if( i == minpath )
                            collisionGrid.drawCell(path[i].x, path[i].y, 'rgba(0,0,255,0.4)');
                        else
                            collisionGrid.drawCell(path[i].x, path[i].y, 'rgba(255,0,0,0.4)');
                    }
                        
                    
                    var cell = collisionGrid.getCellByColRow(path[minpath].x, path[minpath].y);
                    //window.goalCoordinates = {x: cell.x, y:cell.y};
                    canvas.setMouseCoordinates(canvas.mapToMouse(cell));
                }
                else {
                    bot.stopFollowLine();
                }

            }
        },
        followTimer: 0,
        stopFollowLine: function() {
            bot.followLine = false;
            clearTimeout(bot.followTimer);
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
                    //canvas.drawAngle(window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4, true);
                    //canvas.drawAngle(window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4, true);
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




function GridNode(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.visited = false;
    this.closed = false;
    this.parent = null;
}

GridNode.prototype.toString = function() {
    return "[" + this.x + " " + this.y + "]";
};

GridNode.prototype.getCost = function(fromNeighbor) {
    // Take diagonal weight into consideration.
    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
        return this.weight * 1.41421;
    }
    return this.weight;
};

GridNode.prototype.isWall = function() {
    return this.weight === 0;
};
// javascript-astar 0.4.1
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html
(function(definition) {
  /* global module, define */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && define.amd) {
    define([], definition);
  } else {
    var exports = definition();
    window.astar = exports.astar;
  }
})(function() {

function pathTo(node) {
  var curr = node;
  var path = [];
  while (curr.parent) {
    path.unshift(curr);


    curr = curr.parent;
  }
  return path;
}

function getHeap() {
  return new BinaryHeap(function(node) {
    return node.f;
  });
}

var astar = {
  /**
  * Perform an A* Search on a graph given a start and end node.
  * @param {Graph} graph
  * @param {GridNode} start
  * @param {GridNode} end
  * @param {Object} [options]
  * @param {bool} [options.closest] Specifies whether to return the
             path to the closest node if the target is unreachable.
  * @param {Function} [options.heuristic] Heuristic function (see
  *          astar.heuristics).
  */
  search: function(start, end, options) {
    //collisionGrid.cleanDirty();
    options = options || {};
    var heuristic = options.heuristic || astar.heuristics.diagonal;
    var closest = options.closest || true;

    var openHeap = getHeap();
    var closestNode = start; // set the start node to be the closest if required

    start.h = heuristic(start, end);
    collisionGrid.markDirty(start);
    var maxtries = 100;
    var trynum = 0;

    openHeap.push(start);

    while (openHeap.size() > 0) {
        if( ++trynum > maxtries ) {
            return [];
        }
      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      var currentNode = openHeap.pop();

      // End case -- result has been found, return the traced path.
      if (currentNode.x == end.x && currentNode.y == end.y) {
        return pathTo(currentNode);
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = collisionGrid.neighbors(currentNode.x, currentNode.y);

      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];

        if (neighbor.closed || collisionGrid.isWall(neighbor.x, neighbor.y)) {
          // Not a valid node to process, skip to next neighbor.
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.weight;//getCost(currentNode);
        var beenVisited = neighbor.visited;
        if( beenVisited ) {
            console.log('visited ('+neighbor.x+','+neighbor.y+')');
        }
        if (!beenVisited || gScore < neighbor.g) {

          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristic(neighbor, end);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          collisionGrid.markDirty(neighbor);
          if (closest) {
            // If the neighbour is closer than the current closestNode or if it's equally close but has
            // a cheaper path than the current closest node then it becomes the closest node
            if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
              closestNode = neighbor;
            }
          }

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            openHeap.push(neighbor);
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            openHeap.rescoreElement(neighbor);
          }
        }
      }
    }

    if (closest) {
      return pathTo(closestNode);
    }

    // No result was found - empty array signifies failure to find path.
    return [];
  },
  // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
  heuristics: {
    manhattan: function(pos0, pos1) {
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return d1 + d2;
    },
    diagonal: function(pos0, pos1) {
      var D = 1;
      var D2 = 1.41421; // 1.41421 == Math.sqrt(2)
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
    },
    chebyshev: function(pos0, pos1) {
        var d1 = Math.abs(pos1.x - pos0.x);
        var d2 = Math.abs(pos1.y - pos0.y);
        return Math.max(d1,d2);
    }
  },
  cleanNode: function(node) {
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }
};


function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);

    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
  },
  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  },
  remove: function(node) {
    var i = this.content.indexOf(node);

    // When it is found, the process seen in 'pop' is repeated
    // to fill up the hole.
    var end = this.content.pop();

    if (i !== this.content.length - 1) {
      this.content[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i);
      } else {
        this.bubbleUp(i);
      }
    }
  },
  size: function() {
    return this.content.length;
  },
  rescoreElement: function(node) {
    this.sinkDown(this.content.indexOf(node));
  },
  sinkDown: function(n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];

    // When at 0, an element can not sink any further.
    while (n > 0) {

      // Compute the parent element's index, and fetch it.
      var parentN = ((n + 1) >> 1) - 1;
      var parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  },
  bubbleUp: function(n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;
      // This is used to store the new position of the element, if any.
      var swap = null;
      var child1Score;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  }
};

return {
  astar: astar
};

});


var collisionHelper = (function() {
    return {
        unitTable: [],
        toRad: Math.PI / 180,
        toDeg: 180 / Math.PI,

        init: function() {
            collisionHelper.generateUnitTable();
            
        },

        /**
         *  Build the unit table grouping opposite angles and in 22.5 degree increments
         *
         */
        generateUnitTable: function() {
            var offset = 0;
            for(var a=0;a<360; a++) {
                var angle = collisionHelper.toRad * offset;
                collisionHelper.unitTable.push([Math.cos(angle), Math.sin(angle)]);
                offset++;
            }
            /*for(var a=0;a<4;a++) {
                collisionHelper.unitTable[a] = [];
                for(var b=0; b<4; b++) {
                    var angle = collisionHelper.toRad * (b*90+offset);
                    collisionHelper.unitTable[a].push([Math.cos(angle), Math.sin(angle)]);
                }
                offset+=22.5;
            }*/
        },

        /** 
         * Performs line scans in the E,N,W,S directions and rotates by 22.5 degrees * rotateCount
         *
         */
        radarScan: function(angleIncrement,scanDist) {
            var x = window.getX();
            var y = window.getY();

            var results = [];

            for(var dir=0; dir<collisionHelper.unitTable.length; dir+=angleIncrement) {
                var pos = collisionHelper.unitTable[dir];
                var x2 = x+pos[0]*scanDist;
                var y2 = y+pos[1]*scanDist;

                var result = collisionGrid.lineTest(x,y,x2,y2);
                if( result )
                    results.push(result);

                if( window.visualDebugging ) {
                    
                    var canvasPosA = canvas.mapToCanvas({
                        x: x,
                        y: y,
                        radius: 1
                    });
                    var canvasPosB = canvas.mapToCanvas({
                        x: x2,
                        y: y2,
                        radius: 1
                    });
                    


                    var r = 0;
                    var g = 0;
                    var b = 0;
                    //var color = 'rgb(' + r + ',' + g + ',' + b + ')';
                    var color = !result.cell ? 'green' : (!result.cell.length ? 'blue' : 'red');
                    canvas.drawLine2(canvasPosA.x, canvasPosA.y, canvasPosB.x, canvasPosB.y, 1, color);
                }
                
            }
            return results;
        }
    };
})();
/**
 * A 2d collision grid system for fast line to box collision
 * 
 * - Flagged cells are occupied by object(s)
 * - Non-flagged cells are empty
 * - Cells are world space cut up into squares of X size
 */
var collisionGrid = (function() {
    collisionHelper.init();

    return {
        width: 0,
        height: 0,

        //clone for fast slicing
        grid: [],
        bgrid: [],
        cellSize: 20,
        halfCellSize: 10,
        startX: 0,
        startY: 0,
        gridWidth: 0,
        gridHeight: 0,
        endX: 0,
        endY: 0,
        astarGraph: 0,
        astarResult: 0,
        foodGroups: [],
        
        dirty: [],

        initGrid: function(w, h, cellsz) {
            sx = Math.floor(window.getX());
            sy = Math.floor(window.getY());
            sx = sx - (sx % cellsz);
            sy = sy - (sy % cellsz);

            collisionGrid.height = h * cellsz;
            collisionGrid.width = w * cellsz;
            collisionGrid.gridWidth = w;
            collisionGrid.gridHeight = h;
            collisionGrid.cellSize = cellsz;
            collisionGrid.halfCellSize = cellsz / 2;

            collisionGrid.startX = Math.floor(sx - ((w/2)*cellsz));
            collisionGrid.startY = Math.floor(sy - ((h/2)*cellsz));
            //collisionGrid.startX = collisionGrid.startX - (collisionGrid.startX % cellsz);
            //collisionGrid.startY = collisionGrid.startY - (collisionGrid.startY % cellsz);

            collisionGrid.endX = collisionGrid.startX + collisionGrid.width;
            collisionGrid.endY = collisionGrid.startY + collisionGrid.height;

            
            collisionGrid.booleanGrid = [];
            collisionGrid.grid = [];
            collisionGrid.foodGroups = [];
            collisionGrid.addSnakes();
            collisionGrid.addFood();

            //var cell = collisionGrid.getCellByXY(window.getX(), window.getY());
            //collisionGrid.drawCell(cell.col, cell.row, 'yellow');
            
            //canvas.drawRect(window.getX()-collisionGrid.getWidth()/2, window.getY()-collisionGrid.getHeight()/2, collisionGrid.cellSize, collisionGrid.cellSize, 'yellow');
            //astarGraph = new Graph(collisionGrid.bgrid);
            //collisionGrid.setupGrid();
        },

        setupGrid: function() {
            
        },

        // Slice out a portion of the grid for less calculations
        // callback = function(x, y, gridValue) {}
        sliceGrid: function(col, row, width, height, callback) {
            //constrain the values between 0 and width/height
            col = Math.min(Math.max(col, 0), collisionGrid.gridWidth);
            row = Math.min(Math.max(row, 0), collisionGrid.gridHeight);
            width = col + Math.min(collisionGrid.gridWidth, Math.max(width, 0));
            height = row + Math.min(collisionGrid.gridHeight, Math.max(height, 0));

            for(var x=col; x<width; x++) {
                for(var y=row; y<height; y++) {
                    collisionGrid.grid[x] = collisionGrid.grid[x] || [];
                    collisionGrid.grid[x][y] = collisionGrid.grid[x][y] || [];
                    callback(x, y, collisionGrid.grid[x][y]);
                }
            }
        },

        // Find specific cell using map-space position
        getCellByXY: function(x, y) {
            //x = x;
           // y = y ;
            x = Math.floor(x) - collisionGrid.startX;
            y = Math.floor(y) - collisionGrid.startY;
            x = x - (x % collisionGrid.cellSize);
            y = y - (y % collisionGrid.cellSize);

            col = parseInt(Math.floor(x / collisionGrid.cellSize));
            row = parseInt(Math.floor(y / collisionGrid.cellSize));
            col = Math.min(Math.max(col, 0), collisionGrid.gridWidth);
            row = Math.min(Math.max(row, 0), collisionGrid.gridHeight);
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || [];
            return {col:col, row:row, cell:collisionGrid.grid[col][row]};
        },

        // Get cell's map-space position at top left corner of cell
        getCellByColRow: function(col, row) {
            var x = collisionGrid.startX + (col*collisionGrid.cellSize) + collisionGrid.halfCellSize;
            var y = collisionGrid.startY + (row*collisionGrid.cellSize) + collisionGrid.halfCellSize;
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || [];
            return {x:x, y:y, cell:collisionGrid.grid[col][row]};
        },

        // This is used to convert a width or height to the amount of cells it would occupy
        calculateMaxCellCount: function(sz) {
            return parseInt(Math.ceil(sz / collisionGrid.cellSize));
        },

        // set cell size
        setCellSize: function(sz) {
            collisionGrid.cellSize = sz;
        },

        getCell: function(col,row) {
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || [];
            return collisionGrid.grid[col][row];
        },

        markCellWall: function(col, row, obj) {
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || [];
            collisionGrid.grid[col][row].push(obj);
            //collisionGrid.dirty.push([col,row]);
            if( collisionGrid.grid[col][row].length == 1 )
            collisionGrid.drawCell(col,row);
            return collisionGrid.grid[col][row];
        },

        markCellEmpty: function(col, row, weight) {
            weight = weight || 1;
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            var node = collisionGrid.grid[col][row];
            if(node && !node.length){
                collisionGrid.grid[col][row] = new GridNode(col, row, weight);
                
            }
            
            //collisionGrid.dirty.push([col,row]);
            //collisionGrid.drawCell(col,row, 'red');
            return collisionGrid.grid[col][row];
        },

        markCellFood: function(col, row, weight) {
            weight = weight || 1;
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            var node = collisionGrid.grid[col][row];
            if(node && !node.length){
                collisionGrid.grid[col][row] = new GridNode(col, row, weight);
                
            }
            else if( !node || node.length) {
                return false;
            }
            else {
                node.weight += weight;
            }
            return collisionGrid.grid[col][row];
        },

        isWall: function(col, row) {
            return collisionGrid.grid[col] && collisionGrid.grid[col][row] && collisionGrid.grid[col][row].length;
        },

        isEmpty: function(col, row) {
            return !collisionGrid.isWall(col,row);
        },

        drawCell: function(col, row, color) {
            
            if( !window.visualDebugging )
                return;

            color = color || 'rgba(255,255,0,0.25)';
            var pos = collisionGrid.getCellByColRow(col, row);
            var canvasPos = canvas.mapToCanvas({
                x: pos.x-collisionGrid.halfCellSize,
                y: pos.y-collisionGrid.halfCellSize
            });
            
            canvas.drawRect(
                canvasPos.x, 
                canvasPos.y, 
                collisionGrid.cellSize * canvas.getScale(), 
                collisionGrid.cellSize * canvas.getScale(), 
                color);
        },

        addNeighbor: function(x, y, arr) {
            collisionGrid.grid[x] = collisionGrid.grid[x] || [];
        
            var node = collisionGrid.grid[x][y];
            if( !node || node.length ) {
                return;
            }
            //if( !collisionGrid.grid[x][y] )
            collisionGrid.markCellEmpty(x,y);

            arr.push(collisionGrid.grid[x][y]);
        },

        neighbors: function(x, y) {
            var ret = [];
            // West
            collisionGrid.addNeighbor(x-1, y, ret);
            //East
            collisionGrid.addNeighbor(x+1, y, ret);
            //South
            collisionGrid.addNeighbor(x, y-1, ret);
            //North
            collisionGrid.addNeighbor(x, y+1, ret);
    
            //if (this.diagonal) {
            // Southwest
            collisionGrid.addNeighbor(x-1, y-1, ret);
            // Southeast
            collisionGrid.addNeighbor(x+1, y-1, ret);
            // Northwest
            collisionGrid.addNeighbor(x-1, y+1, ret);
            // Northeast
            collisionGrid.addNeighbor(x+1, y+1, ret);
            //}

            return ret;
        },

        cleanDirty: function() {
           // for (var i = 0; i < collisionGrid.dirtyNodes.length; i++) {
           //     astar.cleanNode(collisionGrid.dirtyNodes[i]);
            //}
           // collisionGrid.dirtyNodes = [];
        },

        markDirty: function(x, y) {
            //collisionGrid.dirtyNodes.push([x,y]);
        },

        generatePath: function(startX, startY, endX, endY) {
            var startCell = collisionGrid.getCellByXY(startX,startY);
            var endCell = collisionGrid.getCellByXY(endX,endY);
            var start = collisionGrid.markCellEmpty(startCell.col, startCell.row);
            var end = collisionGrid.markCellEmpty(endCell.col, endCell.row);
            var path = astar.search(start, end);

            return path;
        },

        addFood: function() {

            var foodGroupsDict = {};
            collisionGrid.foodGroups = [];
            var center = collisionGrid.getCellByXY(window.getX(),window.getY());

            for(var i=0; i<window.foods.length; i++) {

                var food = window.foods[i];
                if( food === null || food === undefined ) 
                    continue;

                if( food.xx < collisionGrid.startX ||
                    food.xx > collisionGrid.endX || 
                    food.yy < collisionGrid.startY ||
                    food.yy > collisionGrid.endY )
                    continue;

                var cell = collisionGrid.getCellByXY(food.xx, food.yy);
                var node = collisionGrid.markCellFood(cell.col, cell.row, food.sz);
                if( node ) {
                    var distance = astar.heuristics.diagonal({x:center.col, y:center.row}, {x:cell.col, y:cell.row});
                    collisionGrid.foodGroups.push({x:food.xx, y:food.yy, distance:distance, node:node});
                }
                    
            }

            collisionGrid.foodGroups.sort(function(a,b) {
                //return b.node.weight - a.node.weight;
                return (a.node.weight == b.node.weight ? 0 : a.node.weight / a.distance  >  b.node.weight / b.distance  ? -1 : 1);
            });
           
        },

        // add all snake's collision parts to the grid
        addSnakes: function() {
            for (var snakeid in window.snakes) {
                var snk = window.snakes[snakeid];
                if (snk.id == window.snake.id)
                    continue;
                var cnt = 0;

                for (var pts in snk.pts) {
                    var part = snk.pts[pts];

                    if (part.dying) 
                        continue;

                    //only add parts that are within our grid bounds
                    if( part.xx < collisionGrid.startX ||
                        part.xx > collisionGrid.endX ||
                        part.yy < collisionGrid.startY ||
                        part.yy > collisionGrid.endY)
                        continue;
            
                    //calculate grid width/height of a snake part
                    var cell = collisionGrid.getCellByXY(part.xx, part.yy);
                    var radius = window.getSnakeWidth(snk.sc);
                    var radiusSqr = radius*radius;
                    var cellcount = collisionGrid.calculateMaxCellCount(radius);
                    var cellcount2 = cellcount*2;

                    //mark cell where part's center is located
                    collisionGrid.markCellWall(cell.col, cell.row, {snake:snk, part:part});
                    

                    //mark surrounding cells using part's radius
                    collisionGrid.sliceGrid(cell.col-cellcount, cell.row-cellcount, cellcount2, cellcount2, 
                        function(col, row, val) {
                            if( !val || val.length ) return;
                            
                            /*var pos = collisionGrid.getCellByColRow(col,row);
                            var centerX = pos[0] + collisionGrid.cellSize / 2;
                            var centerY = pos[1] + collisionGrid.cellSize / 2;
                            var xDist = centerX - part.xx;
                            var yDist = centerY - part.yy;
                            var dist = xDist*xDist + yDist*yDist;
                            if( dist < radiusSqr ) {*/

                            var marked = collisionGrid.markCellWall(col, row, {snake:snk, part:part});
                        }
                    );
                }
            }
        },


        cellTest: function(col, row) {
            cell = collisionGrid.getCell(col, row);  // first point 
            if( cell && cell.length > 0 )
                return cell;
            //else if( cell ) {
            //    return cell;
            //}
            return false;
        },

        
        lineTest: function(x1, y1, x2, y2) { 
            var posA = collisionGrid.getCellByXY(x1,y1);
            var posB = collisionGrid.getCellByXY(x2,y2);
            x1 = posA.col, x2 = posB.col;
            y1 = posA.row, y2 = posB.row;
            var i;               // loop counter 
            var cell;
            var ystep, xstep;    // the step on y and x axis 
            var error;           // the error accumulated during the increment 
            var errorprev;       // *vision the previous value of the error variable 
            var y = y1, x = x1;  // the line points 
            var ddy, ddx;        // compulsory variables: the double values of dy and dx 
            var dx = x2 - x1; 
            var dy = y2 - y1; 

            if( (cell = collisionGrid.cellTest(x1,y1)) !== false ) return {x:x1, y:y1, cell:cell};

            // NB the last point can't be here, because of its previous point (which has to be verified) 
            if (dy < 0) { 
                ystep = -1; 
                dy = -dy; 
            } 
            else 
                ystep = 1;

            if (dx < 0) { 
                xstep = -1; 
                dx = -dx; 
            }
            else 
                xstep = 1; 

            ddy = 2 * dy;  // work with double values for full precision 
            ddx = 2 * dx; 
            if (ddx >= ddy) {  // first octant (0 <= slope <= 1) 
                // compulsory initialization (even for errorprev, needed when dx==dy) 
                errorprev = error = dx;  // start in the middle of the square 
                for (i=0 ; i < dx ; i++) {  // do not use the first point (already done) 
                    x += xstep; 
                    error += ddy; 
                    if (error > ddx) {  // increment y if AFTER the middle ( > ) 
                        y += ystep; 
                        error -= ddx; 
                        // three cases (octant == right->right-top for directions below): 
                        if (error + errorprev < ddx) {  // bottom square also 
                            //POINT (y-ystep, x); 
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return {x:x, y:y-ystep, cell:cell};
                        }
                        else if (error + errorprev > ddx) { // left square also 
                            //POINT (y, x-xstep); 
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return {x:x-xstep, y:y, cell:cell};

                        }
                        else {  // corner: bottom and left squares also 
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return {x:x, y:y-ystep, cell:cell};
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return {x:x-xstep, y:y, cell:cell};
                            //POINT (y-ystep, x); 
                            //POINT (y, x-xstep); 
                        } 
                    } 
                    //POINT (y, x); 
                    if( (cell = collisionGrid.cellTest(x, y)) !== false ) return {x:x, y:y, cell:cell};
                    errorprev = error; 
                } 
            }
            else {  // the same as above 
                errorprev = error = dy; 
                for (i=0 ; i < dy ; i++) { 
                    y += ystep; 
                    error += ddx; 
                    if (error > ddy) { 
                        x += xstep; 
                        error -= ddy; 
                        if (error + errorprev < ddy) {
                            //POINT (y, x-xstep);
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return {x:x-xstep, y:y, cell:cell};
                        }
                        else if (error + errorprev > ddy) {
                            //POINT (y-ystep, x);
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return {x:x, y:y-ystep, cell:cell};
                        } 
                        else { 
                            //POINT (y, x-xstep); 
                            //POINT (y-ystep, x); 
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return {x:x-xstep, y:y, cell:cell};
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return {x:x, y:y-ystep, cell:cell};
                        } 
                    } 
                    //POINT (y, x); 
                    if( (cell = collisionGrid.cellTest(x, y)) !== false ) return {x:x, y:y, cell:cell};
                    errorprev = error; 
                } 
            } 
            return {x:x, y:y, cell:0};
            // assert ((y == y2) && (x == x2));  // the last point (y2,x2) has to be the same with the last point of the algorithm 
        }

        
    }
})();

