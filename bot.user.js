/*The MIT License (MIT)
 Copyright (c) 2016 Ermiya Eskandary & Théophile Cailliau and other contributors
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.*/
// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.7.5
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @updateURL    https://github.com/ErmiyaEskandary/Slither.io-bot/raw/master/bot.user.js
// @downloadURL  https://github.com/ErmiyaEskandary/Slither.io-bot/raw/master/bot.user.js
// @supportURL   https://github.com/ErmiyaEskandary/Slither.io-bot/issues
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Custom logging function - disabled by default
window.log = function() {
    if (window.logDebugging) {
        console.log.apply(console, arguments);
    }
};
// Appends divs to the page - used to display things on the screen
window.appendDiv = function(id, className, style) {
    // Create a div
    var div = document.createElement('div');
    // Check for id
    if (id) {
        // Set the id
        div.id = id;
    }
    // Check for class name
    if (className) {
        // Set the class name
        div.className = className;
    }
    // Check for css styles
    if (style) {
        // Set the css styles
        div.style = style;
    }
    // Append the div to the page
    document.body.appendChild(div);
};

// Saves username when you click on "Play" button
window.play_btn.btnf.addEventListener('click', function() {
    window.saveNick();
    window.loadPreference('autoRespawn', false);
});
// Save nickname when you press "Enter"
window.nick_holder.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        window.saveNick();
    }
});
// Save nickname
window.saveNick = function() {
    var nick = document.getElementById('nick').value;
    window.savePreference('savedNick', nick);
};

// Set fake mouse coordinates
window.setMouseCoordinates = function(x, y) {
    window.xm = x;
    window.ym = y;
};
// Coordinates relative to the center (snake position).
window.mouseRelativeToCenter = function(x, y) {
    var mapX = x - window.getWidth() / 2;
    var mapY = y - window.getHeight() / 2;
    return [mapX, mapY];
};
// Mouse coordinates to screen coordinates
window.mouseToScreen = function(x, y) {
    var screenX = x + (window.getWidth() / 2);
    var screenY = y + (window.getHeight() / 2);
    return [screenX, screenY];
};
// Screen to canvas coordinates
window.screenToCanvas = function(x, y) {
    var canvasX = window.csc * (x * window.canvasRatio[0]) - parseInt(window.mc.style.left);
    var canvasY = window.csc * (y * window.canvasRatio[1]) - parseInt(window.mc.style.top);
    return [canvasX, canvasY];
};
// Map to mouse coordinates
window.mapToMouse = function(x, y) {
    var mouseX = (x - window.getX()) * window.gsc;
    var mouseY = (y - window.getY()) * window.gsc;
    return [mouseX, mouseY];
};
// Canvas width
window.getWidth = function() {
    return window.ww;
};
// Canvas height
window.getHeight = function() {
    return window.hh;
};
// X coordinates on the screen
window.getX = function() {
    return window.snake.xx;
};
// Y coordinates on the screen
window.getY = function() {
    return window.snake.yy;
};
// Updates the relation between the screen and the canvas
window.onresize = function() {
    window.resize();
    // Canvas different size from the screen (often bigger). Gives a ratio so we can convert
    window.canvasRatio = [window.mc.width / window.getWidth(), window.mc.height / window.getHeight()];
};
// Lets you zoom in and out using the mouse wheel
window.setZoom = function(e) {
    // Scaling ratio
    if (window.gsc) {
        window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    }
};
// FPS counter
window.framesPerSecond = {
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
};

// Set background - default is slither.io's own background
function setBackground(url) {
    url = typeof url !== 'undefined' ? url : '/s/bg45.jpg';
    window.ii.src = url;
}
// Reset zoom
window.resetZoom = function() {
    window.gsc = 0.9;
};
// Get scaling ratio
window.getScale = function() {
    return window.gsc;
};
// Snake length
window.getSnakeLength = function() {
    return (Math.floor(150 * (window.fpsls[window.snake.sct] + window.snake.fam / window.fmlts[window.snake.sct] - 1) - 50) / 10);
};
// Save the original slither.io onmousemove function so we can re enable it back later
window.mousemovelistener = window.onmousemove;

// Starts the bot
window.launchBot = function() {
    window.log('Starting Bot.');
    window.isBotRunning = true;
    // Removed the onmousemove listener so we can move the snake manually by setting coordinates
    window.onmousemove = function() {};
};
// Stops the bot
window.stopBot = function() {
    window.log('Stopping Bot.');
	// Disable the "sprint"
    window.setAcceleration(0);
    // Re enable the original onmousemove function
    window.onmousemove = window.mousemovelistener;
    window.isBotRunning = false;
    // Clear the interval which starts the bot
};

// Connects the bot
window.connectBot = function() {
    if (!window.autoRespawn) return;
    // Stop the bot
    window.stopBot();
    window.log('Connecting...');
    // Connect the bot
    window.connect();
    // Check if bot can start
    window.botCanStart = setInterval(function() {
        if (window.playing) {
            window.launchBot();
            clearInterval(window.botCanStart);
        }
    }, 100);
};
// Manual mobile rendering
window.toggleMobileRendering = function(mobileRendering) {
    window.mobileRender = mobileRendering;
    window.log('Mobile rendering set to: ' + window.mobileRender);
    window.savePreference('mobileRender', window.mobileRender);
    // Set render mode
    if (window.mobileRender) {
        setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
        window.render_mode = 1;
    } else {
        setBackground();
        window.render_mode = 2;
    }
};
// Auto mobile rendering
window.toggleAutomaticMobileRendering = function() {
    if (window.autoMobileRender) {
        // Set interval to check the fps and if it is below 20, turn on mobile rendering
        window.mobileRenderInterval = setInterval(function() {
            window.toggleMobileRendering(window.framesPerSecond.getFPS() <= 20);
        }, 5000);
        window.autoMobileRender = false;
        // When more than 20, turn it off
    } else {
        clearInterval(window.mobileRenderInterval);
        window.autoMobileRender = true;
    }
    window.log('Automatic mobile rendering set to: ' + window.autoMobileRender);
    window.savePreference('autoMobileRender', window.autoMobileRender);
};
// Save variable to local storage
window.savePreference = function(item, value) {
    window.localStorage.setItem(item, value);
};

// Load a variable from local storage
window.loadPreference = function(preference, defaultVar) {
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
};

// Save the original slither.io onkeydown function so we can add stuff to it
document.oldKeyDown = document.onkeydown;
// Re write the function with our function
document.onkeydown = function(e) {
    // Original slither.io onkeydown function + whatever is under it
    document.oldKeyDown(e);
    if (document.activeElement.parentElement !== window.nick_holder) {
        // Letter `T` to toggle bot
        if (e.keyCode === 84) {
            if (window.isBotRunning) {
                window.stopBot();
                window.isBotEnabled = false;
            } else {
                window.launchBot(5);
                window.isBotEnabled = true;
            }
        }
        // Letter 'U' to toggle debugging (console)
        if (e.keyCode === 85) {
            window.logDebugging = !window.logDebugging;
            console.log('Log debugging set to: ' + window.logDebugging);
            window.savePreference('logDebugging', window.logDebugging);
        }
        // Letter 'Y' to toggle debugging (visual)
        if (e.keyCode === 89) {
            window.visualDebugging = !window.visualDebugging;
            console.log('Visual debugging set to: ' + window.visualDebugging);
            window.savePreference('visualDebugging', window.visualDebugging);
        }
        // Letter 'I' to toggle autorespawn
        if (e.keyCode === 73) {
            window.autoRespawn = !window.autoRespawn;
            console.log('Automatic Respawning set to: ' + window.autoRespawn);
            window.savePreference('autoRespawn', window.autoRespawn);
        }
        // Letter 'O' to set automatic mobile rendering
        if (e.keyCode === 79) {
            window.toggleMobileRendering(!window.mobileRender);
        }
        // Letter 'M' to manually set mobile rendering
        if (e.keyCode === 77) {
            window.toggleAutomaticMobileRendering();
        }
        // Letter 'P' to toggle hunting Prey
        if (e.keyCode === 80) {
            window.huntPrey = !window.huntPrey;
            console.log('Prey hunting set to: ' + window.huntPrey);
            window.savePreference('huntPrey', window.huntPrey);
        }

        // Letter 'C' to toggle Collision detection / enemy avoidance
        if (e.keyCode === 67) {
            window.collisionDetection = !window.collisionDetection;
            console.log('collisionDetection set to: ' + window.collisionDetection);
            window.savePreference('collisionDetection', window.collisionDetection);
        }

        // Letter 'A' to increase collision detection radius
        if (e.keyCode === 65) {
            window.collisionRadiusMultiplier++;
            console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
            window.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
        }

        // Letter 'S' to decrease collision detection radius
        if (e.keyCode === 83) {
            if (window.collisionRadiusMultiplier > 1) {
                window.collisionRadiusMultiplier--;
                console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                window.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
            }
        }

        // Letter 'D' to toggle defence mode
        if (e.keyCode === 68) {
            window.defence = !window.defence;
            console.log('Defence set to: ' + window.defence);
            window.savePreference('defence', window.defence);
        }
        // Letter 'Z' to reset zoom
        if (e.keyCode === 90) {
            window.resetZoom();
        }
        // Letter 'Q' to quit to main menu
        if (e.keyCode == 81) {
            window.autoRespawn = false;
            window.quit();
        }
    }
};
// Save the original slither.io onmousedown function so we can re enable it back later
window.oldMouseDown = window.onmousedown;
window.onmousedown = function(e) {
        window.oldMouseDown(e);
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
                    if (window.isBotRunning) {
                        window.stopBot();
                        window.isBotEnabled = false;
                    } else {
                        window.launchBot(5);
                        window.isBotEnabled = true;
                    }
                    break;
            }
        };
    }
    // Snake width
window.getSnakeWidth = function() {
    return window.snake.sc * 15 * window.getScale();
};
// Sorting function for food, from property 'distance'
window.sortFood = function(a, b) {
    return a.distance - b.distance;
};
// Sorting function for prey, from property 'distance'
window.sortPrey = function(a, b) {
    return a.distance - b.distance;
};

// Quit to menu
window.quit = function() {
    if (window.playing && window.resetGame) {
        window.want_close_socket = true;
        window.dead_mtm = 0;
        if (window.play_btn) {
            window.play_btn.setEnabled(true);
        }
        window.resetGame();
    }
};

//Check if a point is between two vectors. The vectors have to we anticlockwise (sectorEnd on the left of sectorStart)
function isBetweenVectors(point, sectorStart, sectorEnd) {
    var center = [window.snake.xx, window.snake.yy];
    if (point.xx) {
        // Point coordinates relative to center
        var relPoint = {
            x: point.xx - center[0],
            y: point.yy - center[1]
        };

        return !window.areClockwise(sectorStart, relPoint) && window.areClockwise(sectorEnd, relPoint);
    }
    return false;
}

//Angles are given in radians. The overall angle (endAngle-startAngle) cannot be above Math.PI radians (180°).
function isInsideAngle(point, startAngle, endAngle) {
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
    return isBetweenVectors(point, startAngleVector, endAngleVector);
}

//Given two vectors, return a truthy/falsy value depending on their position relative to each other.
window.areClockwise = function(vector1, vector2) {
    //Calculate the dot product.
    return -vector1.x * vector2.y + vector1.y * vector2.x > 0;
};

// Given an object (of which properties xx and yy are not null), return the object with an additional property 'distance'
window.getDistanceFromMe = function(point) {
    if (point === null) return null;
    point.distance = window.getDistance(window.getX(), window.getY(), point.xx, point.yy);
    return point;
};
// Get a distance from point (x1; y1) to point (x2; y2).
window.getDistance = function(x1, y1, x2, y2) {
    // Calculate the vector coordinates.
    var xDistance = (x1 - x2);
    var yDistance = (y1 - y2);
    // Get the absolute value of each coordinate
    xDistance = xDistance < 0 ? xDistance * -1 : xDistance;
    yDistance = yDistance < 0 ? yDistance * -1 : yDistance;
    //Add the coordinates of the vector to get a distance. Not the real distance, but reliable for distance comparison.
    var distance = xDistance + yDistance;
    // Real distance but not needed. Here for reference -
    // var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return distance;
};
// Checks to see if you are going to collide with anything in the collision detection radius
window.checkCollision = function(circle) {
    if (!window.collisionDetection) return false;
	
	if (window.visualDebugging) {
        window.drawDot(circle.x, circle.y, circle.radius, 'blue', false);
    }

	if (window.collisionPoints[0] != null && snake.dead_amt === 0){
		collisionCircle = collisionScreenToCanvas({
						x: window.collisionPoints[0].xx,
						y: window.collisionPoints[0].yy,
						radius: 20 * window.collisionPoints[0].sc * window.getScale()});
						
		if (window.circleIntersect(circle, collisionCircle)) {
			window.changeGoalCoords();
			return true;
		}
	}
	return false;
};
// Change direction
window.changeGoalCoords = function() {
	window.goalCoordinates = window.mapToMouse(window.snake.xx + (window.snake.xx - window.collisionPoints[0].xx), window.snake.yy + (window.snake.yy - window.collisionPoints[0].yy));
	window.setAcceleration(0);
	window.setMouseCoordinates(goalCoordinates[0], goalCoordinates[1]);
};
// Check if circles intersect
window.circleIntersect = function(circle1, circle2) {
    // Only do the expensive check if we need to
    if (window.quickCollisionCheck(circle1, circle2)) {
        return window.slowCollisionCheck(circle1, circle2);
    } else {
        return false;
    }
};
// Very quick collision check that pretends the circles are squares. Subject to false-positives.
window.quickCollisionCheck = function(circle1, circle2) {
    var bothRadii = circle1.radius + circle2.radius;
    return (circle1.x + bothRadii > circle2.x &&
            circle1.y + bothRadii > circle2.y &&
            circle1.x < circle2.x + bothRadii &&
            circle1.y < circle2.y + bothRadii);
};

// Collision check
window.slowCollisionCheck = function(circle1, circle2) {
    var distance = Math.sqrt(Math.pow(circle1.x - circle2.x, 2) +
                             Math.pow(circle1.y - circle2.y, 2));
    var bothRadii = circle1.radius + circle2.radius;
    if (distance < bothRadii) {
        if (window.visualDebugging) {
            var collisionPointX = ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) / bothRadii;
            var collisionPointY = ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) / bothRadii;
            window.drawDot(collisionPointX, collisionPointY, circle2.radius, 'cyan', true);
            window.drawDot(circle2.x, circle2.y, circle2.radius, 'red', true);
        }
        return true;
    } else {
        return false;
    }
};
// Screen to Canvas coordinate conversion - used for collision detection
window.collisionScreenToCanvas = function(circle) {
    var newCircle = window.mapToMouse(circle.x, circle.y);
    newCircle = window.mouseToScreen(newCircle[0], newCircle[1]);
    newCircle = window.screenToCanvas(newCircle[0], newCircle[1]);

    return {
        x: newCircle[0],
        y: newCircle[1],
        radius: circle.radius
    };
};
//Sort collision points based on distance
window.getCollisionPoints = function() {
	var collisionPoints = [];
    for (var snake in window.snakes){
		if (window.snakes[snake].nk != window.snake.nk) {
			for (var pts in window.snakes[snake].pts) {
				if(!window.snakes[snake].pts[pts].dying){
					collisionPoint = {
					xx: window.snakes[snake].pts[pts].xx,
					yy: window.snakes[snake].pts[pts].yy,
					sc: window.snakes[snake].sc,
					sp: window.snakes[snake].sp
					};

					window.getDistanceFromMe(collisionPoint);
					collisionPoints.push(collisionPoint);
				}
			}
		}
	}
	//Sort collision points based on distance
	return collisionPoints.sort(window.sortDistance);
};
window.sortDistance = function(a, b) {
    return a.distance  >  b.distance  ? 1 : -1;
};
// Sort food based on distance
window.getSortedFood = function () {
    // Filters the nearest food by getting the distance
    return window.foods.filter(function (val) {
        return val !== null && val !== undefined;
    }).map(window.getDistanceFromMe).filter(function (val) {
        var isInsideDangerAngles = isInsideAngle(val, window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4);
        isInsideDangerAngles = isInsideDangerAngles || isInsideAngle(val, window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4);
        return !(isInsideDangerAngles && (val.distance <= 150));
    }).map(window.foodNearFood).sort(window.sortFood);
};
window.foodNearFood = function(food){
	if (!food.clustered){
		food.clusterScore = 0;
		food.clusterxx = food.xx;
		food.clusteryy = food.yy;
		
		var clusterSumX = 0;
		var clusterSumY = 0;
		var count = 0;
		
		for (var index in window.foods){
			nearFood = window.foods[index];
			if (nearFood !== null && nearFood.id !== food.id){
				foodDistance = window.getDistance(food.xx,food.yy, nearFood.xx, nearFood.yy);
				if(foodDistance <= window.snakeWidth*6){
					count++;
					food.clusterScore += nearFood.sz;
					clusterSumX += nearFood.xx * nearFood.sz;
					clusterSumY += nearFood.yy * nearFood.sz;
					nearFood.clusterxx = nearFood.xx;
					nearFood.clusteryy = nearFood.yy;
					nearFood.clusterScore = nearFood.sz;
					nearFood.clustered = true;
				}
			}
		}
		
		if(count > 0){
			food.clusterxx = clusterSumX / food.clusterScore;
			food.clusteryy = clusterSumY / food.clusterScore;
		}
	}
	
	food.clustered = true;
    return food;
};
// Sorting function for food, from property 'clusterCount'
window.sortFood = function(a, b) {
    return (a.clusterScore == b.clusterScore ? 0 : a.clusterScore / a.distance  >  b.clusterScore / b.distance  ? -1 : 1);
};
// Sort prey based on distance
window.getSortedPrey = function() {
    // Filters the nearest food by getting the distance
    return window.preys.filter(function(val) {
        return val !== null;
    }).map(window.getDistanceFromMe).sort(window.sortPrey);
};

// Draw dots on the canvas
window.drawDot = function(x, y, radius, colour, fill) {
    var context = window.mc.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#00FF00';
    context.arc(x, y, radius * window.getScale(), 0, Math.PI * 2);
    context.closePath();
    if (fill) {
        context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
        context.fill();
    }
    context.fillStyle = 'black';
    context.strokeStyle = '#000000';
};

// Draw an angle of value `angle` from starting angle `start`. Danger is a boolean.
window.drawAngle = function(start, angle, danger) {
    var context = window.mc.getContext('2d');
    context.globalAlpha = 0.6;
    context.beginPath();
    context.moveTo(window.mc.width / 2, window.mc.height / 2);
    context.arc(window.mc.width / 2, window.mc.height / 2, window.gsc * 100, start, angle);
    context.lineTo(window.mc.width / 2, window.mc.height / 2);
    context.closePath();
    context.fillStyle = (danger) ? 'red' : 'green';
    context.fill();
    context.globalAlpha = 1;
    context.fillStyle = 'black';
};

// Draw lines on the canvas
window.drawLine = function(x2, y2, colour) {
    var context = window.mc.getContext('2d');
    var center = [window.mc.height / 2, window.mc.width / 2];
    context.lineWidth = 5 * window.getScale();
    context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
    context.moveTo(center[1], center[0]);
    context.lineTo(x2, y2);
    context.stroke();
    context.strokeStyle = '#000000';
};
// Save the original slither.io oef function so we can add things to it later
window.oldOef = window.oef;
window.oef = function() {
    // Original slither.io oef function + whatever is under it
    window.oldOef();
    if (window.isBotRunning) window.loop();
    window.onFrameUpdate();
};
window.handleTextColor = function(enabled) {
    return '<span style=\"opacity: 0.8; color:' + (enabled ? 'green;\">enabled' : 'red;\">disabled') + '</span>';
};
window.onFrameUpdate = function() {
    // Botstatus overlay
    var generalStyle = '<span style = "opacity: 0.35";>';
    window.botstatus_overlay.innerHTML = generalStyle + '(T / Right Click) Bot: </span>' + window.handleTextColor(window.isBotRunning);
    window.visualdebugging_overlay.innerHTML = generalStyle + '(Y) Visual debugging: </span>' + window.handleTextColor(window.visualDebugging);
    window.logdebugging_overlay.innerHTML = generalStyle + '(U) Log debugging: </span>' + window.handleTextColor(window.logDebugging);
    window.autorespawn_overlay.innerHTML = generalStyle + '(I) Auto respawning: </span>' + window.handleTextColor(window.autoRespawn);
    window.automobilerender_overlay.innerHTML = generalStyle + '(M) Auto mobile rendering: </span>' + window.handleTextColor(window.autoMobileRender);
    window.rendermode_overlay.innerHTML = generalStyle + '(O) Mobile rendering: </span>' + window.handleTextColor(window.mobileRender);
    window.huntprey_overlay.innerHTML = generalStyle + '(P) Prey hunting: </span>' + window.handleTextColor(window.huntPrey);
    window.collision_detection_overlay.innerHTML = generalStyle + '(C) Collision detection: </span>' + window.handleTextColor(window.collisionDetection);
    window.collision_radius_multiplier_overlay.innerHTML = generalStyle + '(A/S) Collision radius multiplier: ' + window.collisionRadiusMultiplier + ' </span>';
    window.defence_overlay.innerHTML = generalStyle + '(D) Defence: </span>' + window.handleTextColor(window.defence);
    window.resetzoom_overlay.innerHTML = generalStyle + '(Z) Reset zoom </span>';
    window.scroll_overlay.innerHTML = generalStyle + '(Mouse Wheel) Zoom in/out </span>';
    window.quittomenu_overlay.innerHTML = generalStyle + '(Q) Quit to menu </span>';
    window.fps_overlay.innerHTML = generalStyle + 'FPS: ' + window.framesPerSecond.getFPS() + '</span>';

    if (window.position_overlay && window.playing) {
        // Display the X and Y of the snake
        window.position_overlay.innerHTML = generalStyle + 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0) + '</span>';
    }

    // If playing
    if (window.playing && window.visualDebugging) {
        if (window.isBotRunning) {
            var drawGoalCoordinates = window.mouseToScreen(window.goalCoordinates[0], window.goalCoordinates[1]);
            drawGoalCoordinates = window.screenToCanvas(drawGoalCoordinates[0], drawGoalCoordinates[1]);
            window.drawLine(drawGoalCoordinates[0], drawGoalCoordinates[1], 'green');
            window.drawDot(drawGoalCoordinates[0], drawGoalCoordinates[1], 5, 'red', true);
            window.drawAngle(window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4, true);
            window.drawAngle(window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4, true);
        }
    }
};
// Defense mode - bot turns around in a circle
window.playDefence = function(dir) {
    window.kd_l = (dir === 'l');
    window.kd_r = (dir === 'r');
    window.setMouseCoordinates(window.getWidth() / 2, window.getHeight() / 2);
};

function interceptOnCircle(p1, p2, c) {
    //p1 is the first line point
    //p2 is the second line point
    //c is the circle's center

    var p3 = {x:p1.x - c.x, y:p1.y - c.y}; //shifted line points
    var p4 = {x:p2.x - c.x, y:p2.y - c.y};

    var m = (p4.y - p3.y) / (p4.x - p3.x); //slope of the line
    var b = p3.y - m * p3.x; //y-intercept of line

    var underRadical = Math.pow(c.radius,2)*Math.pow(m,2) + Math.pow(c.radius,2) - Math.pow(b,2); //the value under the square root sign 

    if (underRadical < 0) {
        //line missed
        return false;
    } else {
		//line hit
        return true;
		
    }
};

window.goodPath = function(point){
	var lineStart = window.mapToMouse(window.snake.xx, window.snake.yy);
	lineStart = window.mouseToScreen(lineStart[0], lineStart[1]);
	lineStart = window.screenToCanvas(lineStart[0], lineStart[1]);
	
	var lineEnd = window.mapToMouse(point.xx, point.yy);
	lineEnd = window.mouseToScreen(lineEnd[0], lineEnd[1]);
	lineEnd = window.screenToCanvas(lineEnd[0], lineEnd[1]);
	
	if (window.collisionPoints[0] !== null){
		for (var points in window.collisionPoints){
			collisionCircle = collisionScreenToCanvas({
						x: window.collisionPoints[points].xx,
						y: window.collisionPoints[points].yy,
						radius: 20 * window.collisionPoints[points].sc * window.getScale()});
			if(interceptOnCircle({x: lineStart[0], y: lineStart[1]},{x: lineEnd[0], y: lineEnd[1]}, collisionCircle)){
				return false;
			}
		}
	}
	
	return true;
};

// Actual bot code
window.updateLoop = function(){
	if (window.playing && window.isBotEnabled) {
		if (window.updateLoopCounter > 15)
			window.updateLoopCounter = 0;
		
		if (window.updateLoopCounter == 0){
			// Sort preys based on their distance relative to player's snake
			window.sortedPrey = window.getSortedPrey();
			// Sort the food based on their distance relative to player's snake
			window.snakeWidth = window.snake.sc * 15 * window.getScale();
			window.headCircle = collisionScreenToCanvas({
					x: window.getX(),
					y: window.getY(),
					radius: window.snakeWidth*(window.collisionRadiusMultiplier * speedingMultiplier)});
		}
		
		window.sortedFood = window.getSortedFood();
		window.collisionPoints = window.getCollisionPoints();
		window.updateLoopCounter++;
	}
};

// Loop for running the bot
window.loop = function() {
    // If the game and the bot are running
    if (window.playing && window.isBotEnabled) {
        window.ranOnce = true;
        // TODO: Check some condition to see if we should play defence
        // Right now this just uses the manual toggle
        if (window.defence) {
            window.playDefence('l');
            return;
        }
        //increase dodge radius when using speed
		window.speedingMultiplier = (window.snake.sp > 10) ? 1.5 : 1.0;
		
		//update prey, currentfood, and collisionpoints
		window.updateLoop();
		//get collision points
        // If no enemies or obstacles, go after what you are going after
        if (!window.checkCollision(window.headCircle)) {
            window.setAcceleration(0);
            // Current food	
			for (index in window.sortedFood){
				if(window.goodPath({xx: window.sortedFood[index].clusterxx, yy: window.sortedFood[index].clusteryy})){
					window.currentFood = window.sortedFood[index]; 
					break;
				}
			}
			//console.log(window.currentFood.clusterSz);
            // Convert coordinates of the closest food using mapToMouse
            var coordinatesOfClosestFood = window.mapToMouse(window.currentFood.clusterxx, window.currentFood.clusteryy);
            window.goalCoordinates = coordinatesOfClosestFood;
			
			//use speed to go to larger clusters
			if (window.currentFood.clusterScore >= 100){
				if(window.currentFood.distance <= Math.pow(window.getSnakeLength(), 2) / 2){
					setAcceleration(1);
				}
			} 
			
            // Disable Sprint
            // Check for preys, enough "length"
            if (window.preys.length > 0 && window.huntPrey && window.currentFood.clusterScore < 100) {
                // Current prey
                window.currentPrey = window.sortedPrey[0];
                // Convert coordinates of the closest prey using mapToMouse
                var coordinatesOfClosestPrey = window.mapToMouse(window.currentPrey.xx, window.currentPrey.yy);
                // Check for the distance
                if (window.currentPrey.distance <= Math.pow(window.getSnakeLength(), 2) / 2) {
                    // Set the mouse coordinates to the coordinates of the closest prey
                    window.goalCoordinates = coordinatesOfClosestPrey;
                    // "Sprint" enabled
                    window.setAcceleration(1);
                }
            }
            window.kd_l = false;
            window.kd_r = false;
            window.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
        }
    } else {
        if (window.ranOnce) {
            //window.startInterval = setInterval(window.startBot, 1000);
            window.stopBot();
        }
    }
};

// Target the user's browser.
(function() {
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    window.requestAnimationFrame = requestAnimationFrame;
})();

// Starts bot
window.startBot = function() {
    if (window.autoRespawn && !window.playing && window.isBotEnabled && window.ranOnce && !window.isBotRunning) {
        window.connectBot();
        //clearInterval(window.startInterval);
    }
};
// Initialises the bot
window.initBot = function() {
    window.ranOnce = false;
    window.isBotRunning = false;
    window.isBotEnabled = true;
	window.updateLoopCounter = 0;
    window.collisionPoint = {
        x: 0,
        y: 0,
        radius: 0
    };
    // Load preferences
    window.loadPreference('logDebugging', false);
    window.loadPreference('visualDebugging', false);
    window.loadPreference('autoRespawn', false);
    window.loadPreference('mobileRender', false);
    window.loadPreference('huntPrey', true);
    window.loadPreference('collisionDetection', true);
    window.loadPreference('collisionRadiusMultiplier', 8);
    window.loadPreference('defence', false);
    window.loadPreference('autoMobileRender', true);
    window.nick.value = window.loadPreference('savedNick', 'Slither.io-bot');
    // Overlays
    // Top left
    window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; z-index: 7;';
    window.appendDiv('botstatus_overlay', 'nsi', window.generalstyle + 'left: 30; top: 65px;');
    window.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 80px;');
    window.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 95px;');
    window.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle + 'left: 30; top: 110px;');
    window.appendDiv('rendermode_overlay', 'nsi', window.generalstyle + 'left: 30; top: 125px;');
    window.appendDiv('automobilerender_overlay', 'nsi', window.generalstyle + 'left: 30; top: 140px;');
    window.appendDiv('collision_detection_overlay', 'nsi', window.generalstyle + 'left: 30; top: 155px;');
    window.appendDiv('collision_radius_multiplier_overlay', 'nsi', window.generalstyle + 'left: 30; top: 170px;');
    window.appendDiv('huntprey_overlay', 'nsi', window.generalstyle + 'left: 30; top: 185px;');
    window.appendDiv('defence_overlay', 'nsi', window.generalstyle + 'left: 30; top: 200px;');
    window.appendDiv('resetzoom_overlay', 'nsi', window.generalstyle + 'left: 30; top: 215px;');
    window.appendDiv('scroll_overlay', 'nsi', window.generalstyle + 'left: 30; top: 230px;');
    window.appendDiv('quittomenu_overlay', 'nsi', window.generalstyle + 'left: 30; top: 245px;');
    // Bottom right
    window.appendDiv('position_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 120px;');
    window.appendDiv('fps_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 170px;');
    // Listener for mouse wheel scroll - used for setZoom function
    document.body.addEventListener('mousewheel', window.setZoom);
    document.body.addEventListener('DOMMouseScroll', window.setZoom);
    // Set render mode
    if (window.mobileRender) {
        setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
        window.render_mode = 1;
    } else {
        setBackground();
        window.render_mode = 2;
    }
    // Canvas Ratio
    window.canvasRatio = [window.mc.width / window.getWidth(), window.mc.height / window.getHeight()];
    // Unblocks all skins without the need for FB sharing.
    window.localStorage.setItem('edttsg', '1');
    // Remove social
    window.social.remove();
    // Start!
    window.launchBot(50);
    window.startInterval = setInterval(window.startBot, 1000);
    window.foodIndx = 0;
};
window.initBot();

// Enemy code - not used for now
/*
 // Sort enemies based on distance
 window.getSortedEnemies = function() {
 Filters the nearest food by getting the distance
 return window.snakes.filter(function(val) {
 return val !== null && val.id !== window.snake.id;
 }).map(window.getDistanceFromMe).sort(window.sortEnemy);
 };
 // Sorting function for enemies, from property 'distance'
 window.sortEnemy = function(a, b) {
 return a.distance - b.distance;
 };
 window.sortedEnemies = window.getSortedEnemies();
 // Take the closest of each
 window.closestEnemy = window.sortedEnemies[0];
 if (window.closestEnemy.distance < 300) {
 window.log('close enemy! (distance = ' + window.closestEnemy.distance);
 // !handle close enemies!
 }
 */