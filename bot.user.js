/*
Copyright (c) 2016 Ermiya Eskandary & Théophile Cailliau and other contributors

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
// ==UserScript==
// @name         Slither.io-bot A*
// @namespace    http://slither.io/
// @version      0.9.3
// @description  Slither.io bot A*
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

// var array = [{score: 1, date: Mar 12 2012 10:00:00 AM, version: x.y},...];
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

window.getPos = function() {
    return {x:window.getX(), y:window.getY()};
};

window.getSnakeLength = function() {
    return (Math.floor(150 * (window.fpsls[window.snake.sct] + window.snake
        .fam /
        window.fmlts[window.snake.sct] - 1) - 50) / 10);
};
window.getSnakeWidth = function(sc) {
    sc = sc || window.snake.sc;
    return sc * 14.5;
};
window.getSnakeWidthSqr = function(sc) {
    sc = sc || window.snake.sc;
    var width = window.getSnakeWidth();
    return width*width;
};

var canvas = (function() {
    return {
        // Ratio of screen size divided by canvas size.
        canvasRatio: [window.mc.width / window.ww, window.mc.height /
            window.hh
        ],

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
        mouseToScreen: function(point) {
            var screenX = point.x + (window.ww / 2);
            var screenY = point.y + (window.hh / 2);
            return {
                x: screenX,
                y: screenY
            };
        },

        // Convert screen coordinates to canvas coordinates.
        screenToCanvas: function(point) {
            var canvasX = window.csc * (point.x * canvas.canvasRatio[
                0]) - parseInt(window.mc.style.left);
            var canvasY = window.csc * (point.y * canvas.canvasRatio[
                1]) - parseInt(window.mc.style.top);
            return {
                x: canvasX,
                y: canvasY
            };
        },

        // Convert map coordinates to mouse coordinates.
        mapToMouse: function(point) {
            var mouseX = (point.x - window.snake.xx) * window.gsc;
            var mouseY = (point.y - window.snake.yy) * window.gsc;
            return {
                x: mouseX,
                y: mouseY
            };
        },

        // Map cordinates to Canvas cordinate shortcut
        mapToCanvas: function(point) {
            var c = canvas.mapToMouse(point);
            c = canvas.mouseToScreen(c);
            c = canvas.screenToCanvas(c);
            return c;
        },

        // Map to Canvas coordinate conversion for drawing circles.
        // Radius also needs to scale by .gsc
        circleMapToCanvas: function(circle) {
            var newCircle = canvas.mapToCanvas(circle);
            return canvas.circle(
                newCircle.x,
                newCircle.y,
                circle.radius * window.gsc
            );
        },

        // Constructor for circle type
        circle: function(x, y, r) {
            var c = {
                x: Math.round(x),
                y: Math.round(y),
                radius: Math.round(r)
            };
            return c;
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
        mobileRendering: function() {
            // Set render mode
            if (window.mobileRender) {
                canvas.setBackground(
                    'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs'
                );
                window.render_mode = 1;
            } else {
                canvas.setBackground();
                window.render_mode = 2;
            }
        },

        drawText: function(pos, color, txt) {
            var context = window.mc.getContext('2d');
            context.font = "10px Arial";
            context.fillStyle = color;
            context.fillText(txt,pos.x, pos.y);

            //context.fill();
        },
        // Draw a circle on the canvas.
        drawCircle: function(circle, colour, fill, alpha) {
            if (alpha === undefined) alpha = 1;
            if (circle.radius === undefined) circle.radius = 5;

            var context = window.mc.getContext('2d');
            var drawCircle = canvas.circleMapToCanvas(circle);

            context.save();
            context.globalAlpha = alpha;
            context.beginPath();
            context.strokeStyle = colour;
            context.arc(drawCircle.x, drawCircle.y, drawCircle.radius,
                0, Math.PI * 2);
            context.stroke();
            if (fill) {
                context.fillStyle = colour;
                context.fill();
            }
            context.restore();
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
            context.save();
            context.globalAlpha = 0.6;
            context.beginPath();
            context.moveTo(window.mc.width / 2, window.mc.height /
                2);
            context.arc(window.mc.width / 2, window.mc.height / 2,
                window.gsc * 100, start, angle);
            context.lineTo(window.mc.width / 2, window.mc.height /
                2);
            context.closePath();
            context.fillStyle = (danger) ? 'red' : 'green';
            context.fill();
            //context.stroke();
            context.restore();
        },

        // Draw a line on the canvas.
        drawLine: function(p1, p2, colour, width) {
            if (width === undefined) width = 5;
            var context = window.mc.getContext('2d');
            context.save();
            context.beginPath();
            context.lineWidth = width * window.gsc;
            context.strokeStyle = colour;
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
            context.restore();
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
            return canvas.isBetweenVectors(point, startAngleVector,
                endAngleVector);
        },

        /*
         * Given two vectors, return a truthy/falsy value depending
         * on their position relative to each other.
         */
        areClockwise: function(vector1, vector2) {
            // Calculate the dot product.
            return -vector1.x * vector2.y + vector1.y * vector2.x >
                0;
        },

        // Given an object (of which properties xx and yy are not null),
        // return the object with an additional property 'distance'.
        getDistanceFromSnake: function(point) {
            point.distance = canvas.getDistance(window.snake.xx,
                window.snake.yy,
                point.xx, point.yy);
            return point;
        },

        getDistance: function(x1, y1, x2, y2) {
            var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(
                y1 - y2, 2));
            return distance;
        },

        // Get distance squared
        getDistance2: function(x1, y1, x2, y2) {
            var distance2 = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2,
                2);
            return distance2;
        },

        // Get distance squared
        getDotProduct: function(x1, y1, x2, y2) {
            return x1*x2 + y1*y2;
        },

        getNormalVector: function(from, to) {
            var dir = {x: to.x-from.x, y: to.y-from.y};
            var len = dir.x*dir.x + dir.y*dir.y;
            len = Math.sqrt(len);
            dir.x /= len;
            dir.y /= len;
            dir.len = len;
            return dir;
        },

        getAtan2: function(y, x) {
            const QPI = Math.PI / 4;
            const TQPI = 3 * Math.PI / 4;
            var r = 0.0;
            var angle = 0.0;
            var abs_y = Math.abs(y) + 1e-10;

            if (x < 0) {
                r = (x + abs_y) / (abs_y - x);
                angle = TQPI;
            } else {
                r = (x - abs_y) / (x + abs_y);
                angle = QPI;
            }

            angle += (0.1963 * r * r - 0.9817) * r;

            if (y < 0) {
                return -angle;
            }

            return angle;
        },

        getRelativeAngle: function(from, to) {
            var norm = canvas.getNormalVector(from, to);
            norm.dot = norm.x*bot.heading.x + norm.y*bot.heading.y;
            return norm;
        },

        getDistance2FromSnake: function(point) {
            point.distance = canvas.getDistance2(window.snake.xx,
                window.snake.yy,
                point.xx, point.yy);
            return point;
        },
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
        currentPath: [],
        radarResults: [],
        followLine: 0,
        behaviorData: {foodTarget:0, followTime:0, followCoordinates:{x:0,y:0}, goalCoordinates:{x:0,y:0}, aggressor:0 },

        hideTop: function () {

            var nsidivs = document.querySelectorAll('div.nsi');
            for (var i = 0; i < nsidivs.length; i++) {
                if (nsidivs[i].style.top === '4px' && nsidivs[i].style
                    .width === '300px') {
                    nsidivs[i].style.visibility = 'hidden';
                    nsidivs[i].style.zIndex = -1;
                    bot.isTopHidden = true;
                }
            }
        },

        startBot: function() {
            if (window.autoRespawn && !window.playing && bot.isBotEnabled &&
                bot.ranOnce && !bot.isBotRunning) {
                bot.connectBot();
                /* The lastscore should be checked here in the future,
                but not only when bot, just when not playing.
                THIS SHOULD ONLY BE EXECUTED ONCE! */
                userInterface.saveScore(); // Checks highscore
            }
            if (window.bso !== undefined) {
                window.ip_overlay.innerHTML = window.spanstyle +
                    'Server: ' + window.bso.ip + ':' + window.bso.po + '</span>';
            }
        },

        launchBot: function() {
            window.log('Starting Bot.');
            bot.isBotRunning = true;

            //if( collisionGrid.grid.length == 0 ) {
                collisionGrid.init(100, 100, 30);
            //}
            /*
             * Removed the onmousemove listener so we can move the snake
             * manually by setting coordinates
             */
            userInterface.onPrefChange();
            window.onmousemove = function() {};
            bot.hideTop();
        },

        // Stops the bot
        stopBot: function() {
            window.log('Stopping Bot.');
            window.setAcceleration(0); // Stop boosting
            // Re-enable the original onmousemove function
            window.onmousemove = original_onmousemove;
            bot.isBotRunning = false;
        },

        // Connects the bot
        connectBot: function() {
            if (!window.autoRespawn) return;
            bot.stopBot(); // Just in case
            window.log('Connecting...');

            window.connect();


            // Wait until we're playing to start the bot
            window.botCanStart = setInterval(function() {
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
            window.currentIP = window.bso.ip + ':' + window.bso.po;
            var srv = window.currentIP.trim().split(':');
            window.bso.ip = srv[0];
            window.bso.po = srv[1];
            window.connect();
        },

        quickRespawn: function() {
            window.dead_mtm = 0;
            window.login_fr = 0;
            bot.forceConnect();
            if (!bot.isBotRunning) {
                bot.launchBot();
                bot.isBotEnabled = true;
            }
        },
        changeSkin: function() {
            if (window.playing && window.snake !== null) {
                var skin = window.snake.rcv;
                var max = window.max_skin_cv;
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

        heading: {x:1, y:0},
        prevAng: 0,

        precalculate: function() {
            var rang = window.snake.ang;// * collisionHelper.toRad;
            bot.heading.x = Math.cos(rang);
            bot.heading.y = Math.sin(rang);

            if( bot.prevAng != window.snake.ang ) {
                bot.prevAng = window.snake.ang;
                //console.log("Angle = " + window.snake.ang);
            }


        },

        // Called by the window loop, this is the main logic of the bot.
        thinkAboutGoals: function() {
            // If no enemies or obstacles, go after what you are going after

            bot.precalculate();
            //window.setAcceleration(0);

            // Save CPU by only calculating every Nth frame
            //if (++bot.tickCounter >= 15) {
            bot.tickCounter = 0;

            collisionGrid.setup();

            behaviors.run('snakebot', bot.behaviorData);

            if( window.visualDebugging ) {
                var curpos = window.getPos();

                canvasPosA = canvas.mapToCanvas({
                    x: curpos.x,
                    y: curpos.y,
                    radius: 1
                });
                canvasPosB = canvas.mapToCanvas({
                    x: curpos.x + bot.heading.x*100,
                    y: curpos.y + bot.heading.y*100,
                    radius: 1
                });

                canvas.drawLine2(canvasPosA.x, canvasPosA.y, canvasPosB.x, canvasPosB.y, 2, 'yellow');
            }
            //bot.astarFoodFinder();
        },

    };
})();

var userInterface = (function() {
    // Save the original slither.io functions so we can modify them, or reenable them later.
    var original_keydown = document.onkeydown;
    // eslint-disable-next-line no-unused-vars
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
                if (savedItem === 'true') {
                    window[preference] = true;
                } else if (savedItem === 'false') {
                    window[preference] = false;
                } else {
                    window[preference] = savedItem;
                }
                window.log('Setting found for ' + preference + ': ' +
                    window[preference]);
            } else {
                window[preference] = defaultVar;
                window.log('No setting found for ' + preference +
                    '. Used default: ' + window[preference]);
            }
            return window[preference];
        },

        // Execute functions when you click on "Play" button
        playButtonClickListener: function() {
            userInterface.saveNick(); // Saves username
            userInterface.saveScore(); // Checks highscore
            userInterface.loadPreference('autoRespawn', false);
        },

        // Preserve nickname
        saveNick: function() {
            var nick = document.getElementById('nick').value;
            userInterface.savePreference('savedNick', nick);
        },

        // Preserve highscore
        saveScore: function() {
            // Check if the lastscore was set
            if (document.querySelector('div#lastscore').childNodes.length > 1) {
                // Check for excisting highscore, if not, use 1 (because minimum length)
                var highScore = parseInt(userInterface.loadPreference('highscore', 1));
                window.log('HighScore: ' + highScore);
                // Retrieve the last, current score
                var lastScore = parseInt(
                    document.querySelector('div#lastscore').childNodes[1].innerHTML);
                window.log('LastScore: ' + lastScore);
                // Check if the current score is bigger than the highscore
                if (lastScore > highScore) {
                    // Set the currentscore as the highscore
                    userInterface.savePreference('highscore', lastScore);
                    window.log('New highscore! Score set to ' + lastScore);
                    // Display Personal HighScore
                    window.highscore_overlay.innerHTML = window.spanstyle +
                        'Your highscore: ' + lastScore + '</span>';
                }
                // Display LastScore
                window.lastscore_overlay.innerHTML = window.spanstyle +
                    'Your last score: ' + lastScore + '</span>';
                /* This can be used in the future for multiple score
                window.scores.push(parseInt(document.querySelector(
                    'div#lastscore').childNodes[1].innerHTML)); */
            }

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
                this.frameTime += (thisFrameTime - this.frameTime) /
                    this.filterStrength;
                this.lastLoop = thisLoop;
                return (1000 / this.frameTime).toFixed(0);
            }
        },

        onkeydown: function(e) {
            // Original slither.io onkeydown function + whatever is under it
            original_keydown(e);
            if (window.playing) {
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
                    userInterface.savePreference('logDebugging',
                        window.logDebugging);
                }
                // Letter 'Y' to toggle debugging (visual)
                if (e.keyCode === 89) {
                    window.visualDebugging = !window.visualDebugging;
                    console.log('Visual debugging set to: ' +
                        window.visualDebugging);
                    userInterface.savePreference('visualDebugging',
                        window.visualDebugging);
                }
                // Letter 'G' to toggle debugging (visual)
                if (e.keyCode === 71) {
                    window.gridDebugging = !window.gridDebugging;
                    console.log('Grid debugging set to: ' +
                        window.gridDebugging);
                    userInterface.savePreference('gridDebugging',
                        window.gridDebugging);
                }
                // Letter 'I' to toggle autorespawn
                if (e.keyCode === 73) {
                    window.autoRespawn = !window.autoRespawn;
                    console.log('Automatic Respawning set to: ' +
                        window.autoRespawn);
                    userInterface.savePreference('autoRespawn',
                        window.autoRespawn);
                }
                // Letter 'W' to auto rotate skin
                if (e.keyCode === 87) {
                    window.rotateskin = !window.rotateskin;
                    console.log('Auto skin rotator set to: ' +
                        window.rotateskin);
                    userInterface.savePreference('rotateskin',
                        window.rotateskin);
                    bot.rotateSkin();
                }
                // Letter 'O' to change rendermode (visual)
                if (e.keyCode === 79) {
                    window.mobileRender = !window.mobileRender;
                    window.log('Mobile rendering set to: ' + window.mobileRender);
                    userInterface.savePreference('mobileRender', window.mobileRender);
                    canvas.mobileRendering();
                }
                // Letter 'Z' to reset zoom
                if (e.keyCode === 90) {
                    canvas.resetZoom();
                }
                // Letter 'Q' to quit to main menu
                if (e.keyCode === 81) {
                    window.autoRespawn = false;
                    userInterface.quit();
                }
                // 'ESC' to quickly respawn
                if (e.keyCode === 27) {
                    bot.quickRespawn();
                }
                // Letter 'X' to change skin
                if (e.keyCode === 88) {
                    bot.changeSkin();
                }
                // Save nickname when you press "Enter"
                if (e.keyCode === 13) {
                    userInterface.saveNick();
                }
                userInterface.onPrefChange(); // Update the bot status
            }
        },

        onmousedown: function(e) {
            e = e || window.event;
            original_onmouseDown(e);
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
                userInterface.onPrefChange(); // Update the bot status
            }
        },

        onPrefChange: function() {
            window.botstatus_overlay.innerHTML = window.spanstyle +
                  '(T / Right Click) Bot: </span>' + userInterface.handleTextColor(
                      bot.isBotRunning);
            window.visualdebugging_overlay.innerHTML = window.spanstyle +
                '(Y) Visual debugging: </span>' + userInterface.handleTextColor(
                    window.visualDebugging);
            window.grid_debugging_overlay.innerHTML = window.spanstyle +
                '(G) Grid debugging: </span>' + userInterface.handleTextColor(
                    window.gridDebugging);
            window.logdebugging_overlay.innerHTML = window.spanstyle +
                '(U) Log debugging: </span>' + userInterface.handleTextColor(
                    window.logDebugging);
            window.autorespawn_overlay.innerHTML = window.spanstyle +
                '(I) Auto respawning: </span>' + userInterface.handleTextColor(
                    window.autoRespawn);
            window.rotateskin_overlay.innerHTML = window.spanstyle +
                '(W) Auto skin rotator: </span>' + userInterface.handleTextColor(
                    window.rotateskin);
            window.rendermode_overlay.innerHTML = window.spanstyle +
                '(O) Mobile rendering: </span>' + userInterface.handleTextColor(
                    window.mobileRender);
        },

        onFrameUpdate: function() {
            // Botstatus overlay
            window.fps_overlay.innerHTML = window.spanstyle + 'FPS: ' +
                userInterface.framesPerSecond.getFPS() + '</span>';

            if (window.position_overlay && window.playing) {
                // Display the X and Y of the snake
                window.position_overlay.innerHTML = window.spanstyle +
                    'X: ' + (Math.round(window.snake.xx) || 0) +
                    ' Y: ' + (Math.round(window.snake.yy) || 0) +
                    '</span>';
            }
/*
            if (window.playing && window.visualDebugging && bot.isBotRunning) {
                // Only draw the goal when a bot has a goal.
                if (bot.behaviorData.goalCoordinates) {
                    var headCoord = {
                        x: window.snake.xx,
                        y: window.snake.yy
                    };
                    canvas.drawLine(
                        canvas.mapToCanvas(headCoord),
                        canvas.mapToCanvas(bot.behaviorData.goalCoordinates),
                        'green');

                    canvas.drawCircle(bot.behaviorData.goalCoordinates, 'red', true);
                }
            }*/
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
            return '<span style=\"opacity: 0.8; color:' + (enabled ?
                    'green;\">enabled' : 'red;\">disabled') +
                '</span>';
        }
    };
})();

// Loop for running the bot
window.loop = function() {
    // If the game and the bot are running
    if (window.playing && bot.isBotEnabled) {
        bot.ranOnce = true;
        bot.thinkAboutGoals();
    } else {
        bot.stopBot();
    }
};

window.sosBackup = sos;

// Main
(function() {
    // Load preferences
    userInterface.loadPreference('logDebugging', false);
    userInterface.loadPreference('visualDebugging', false);
    userInterface.loadPreference('autoRespawn', false);
    userInterface.loadPreference('mobileRender', false);
    userInterface.loadPreference('rotateskin', false);
    window.nick.value = userInterface.loadPreference('savedNick',
        'Slither.io-bot');

    // Overlays
    window.generalstyle =
        'color: #FFF; font-family: Arial, \'Helvetica Neue\',' +
        ' Helvetica, sans-serif; font-size: 14px; position: fixed; z-index: 7;';
    window.spanstyle = '<span style = "opacity: 0.35";>';

    // Top left
    userInterface.appendDiv('version_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 50px;');
    userInterface.appendDiv('botstatus_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 65px;');
    userInterface.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 80px;');
    userInterface.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 95px;');
    userInterface.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 110px;');
    userInterface.appendDiv('rendermode_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 125px;');
    userInterface.appendDiv('rotateskin_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 140px;');
    userInterface.appendDiv('resetzoom_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 155px;');
    userInterface.appendDiv('scroll_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 170px;');
    userInterface.appendDiv('grid_debugging_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 185px;');

    userInterface.appendDiv('quickResp_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 285px;');
    userInterface.appendDiv('changeskin_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 200px;');
    userInterface.appendDiv('quittomenu_overlay', 'nsi', window.generalstyle +
        'left: 30; top: 215px;');

    // Bottom right
    userInterface.appendDiv('position_overlay', 'nsi', window.generalstyle +
        'right: 30; bottom: 120px;');
    userInterface.appendDiv('ip_overlay', 'nsi', window.generalstyle +
        'right: 30; bottom: 150px;');
    userInterface.appendDiv('fps_overlay', 'nsi', window.generalstyle +
        'right: 30; bottom: 170px;');
    userInterface.appendDiv('highscore_overlay', 'nsi', window.generalstyle +
        'right: 30; bottom: 200px;');
    userInterface.appendDiv('lastscore_overlay', 'nsi', window.generalstyle +
        'right: 30; bottom: 220px;');

    // Set static display options here.
    window.resetzoom_overlay.innerHTML = window.spanstyle +
        '(Z) Reset zoom </span>';
    window.scroll_overlay.innerHTML = window.spanstyle +
        '(Mouse Wheel) Zoom in/out </span>';
    window.quittomenu_overlay.innerHTML = window.spanstyle +
        '(Q) Quit to menu </span>';
    window.changeskin_overlay.innerHTML = window.spanstyle +
        '(X) Change skin </span>';
    window.quickResp_overlay.innerHTML = window.spanstyle +
        '(ESC) Quick Respawn </span>';
    window.version_overlay.innerHTML = window.spanstyle +
        // eslint-disable-next-line no-undef
        'Version: ' + GM_info.script.version + '</span>';

    // Check for excisting highscore, if not, do not display it
    var highScore = parseInt(userInterface.loadPreference('highscore', false));
    if(highScore) {
        window.highscore_overlay.innerHTML = window.spanstyle +
            'Your highscore: ' + highScore + '</span>';
    }
    // Since there is no last score the first time, do not show one

    // Pref display
    userInterface.onPrefChange();

    // Listener for mouse wheel scroll - used for setZoom function
    document.body.addEventListener('mousewheel', canvas.setZoom);
    document.body.addEventListener('DOMMouseScroll', canvas.setZoom);
    // Listener for the play button
    window.play_btn.btnf.addEventListener('click', userInterface.playButtonClickListener);
    // Hand over existing event listeners
    document.onkeydown = userInterface.onkeydown;
    window.onmousedown = userInterface.onmousedown;
    window.onresize = userInterface.onresize;
    // Hand over existing game function
    window.oef = userInterface.oef;

    // Apply previous mobile rendering status.
    canvas.mobileRendering();

    // Modify the redraw()-function to remove the zoom altering code.
    var original_redraw = window.redraw.toString();
    var new_redraw = original_redraw.replace(
        'gsc!=f&&(gsc<f?(gsc+=2E-4,gsc>=f&&(gsc=f)):(gsc-=2E-4,gsc<=f&&(gsc=f)))', '');
    window.redraw = new Function(new_redraw.substring(
        new_redraw.indexOf('{') + 1, new_redraw.lastIndexOf('}')));

    // Unblocks all skins without the need for FB sharing.
    window.localStorage.setItem('edttsg', '1');

    // Remove social
    window.social.remove();

    // Start!
    bot.launchBot();
    window.startInterval = setInterval(bot.startBot, 1000);
})();
