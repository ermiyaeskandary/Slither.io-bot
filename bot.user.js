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
// @version      0.5.3
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @downloadURL  https://github.com/ErmiyaEskandary/Slither.io-bot/raw/master/bot.user.js
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
window.play_btn.btnf.addEventListener('click', function(){
    var nick = document.getElementById('nick').value;
    window.savePreference('savedNick', nick);
});

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
// Set background - default is slither.io's own background
function setBackground(url = '/s/bg45.jpg') {
    window.ii.src = url;
}
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
    }
    else {
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
        // Letter 'O' to change rendermode (visual)
        if (e.keyCode === 79) {
            window.mobileRender = !window.mobileRender;
            console.log('Mobile rendering set to: ' + window.mobileRender);
            window.savePreference('mobileRender', window.mobileRender);
            // Set render mode
            if (window.mobileRender) {
                setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
                window.render_mode = 1;
            } else {
                setBackground();
                window.render_mode = 2;
            }
        }
        // Letter 'P' to toggle hunting Prey
        if (e.keyCode === 80) {
            window.huntPrey = !window.huntPrey;
            console.log('Prey hunting set to: ' + window.huntPrey);
            window.savePreference('huntPrey', window.huntPrey);
        }
    }
};
// Snake's width
window.snakeWidth = function() {
    return window.snake.sc * 15 * window.gsc;
};
// Sorting function for food, from property 'distance'
window.sortFood = function(a, b) {
    // a.sz & b.sz - size
    // Divide distance by size so bigger food is prioritised over smaller food
    return a.distance / a.sz - b.distance / b.sz;
};
// Sorting function for prey, from property 'distance'
window.sortPrey = function(a, b) {
    return a.distance - b.distance;
};

// Convert object coordinates to radians
window.getAngleFromObject = function(object){
    var x = object.xx-window.getX();
    var y = object.yy-window.getY();
    return Math.atan2(x,y);
};

// Polar angle to Cartesian angles
window.getCoordsFromAngle = function(angle){
    var x = Math.cos(angle)*100;
    var y = Math.sin(angle)*100;
    return [x,y];
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

// Sort food based on distance
window.getSortedFood = function() {
    // Filters the nearest food by getting the distance
    return window.foods.filter(function(val) {
        return val !== null;
    }).map(window.getDistanceFromMe).sort(window.sortFood);
};
// Sort prey based on distance
window.getSortedPrey = function() {
    // Filters the nearest food by getting the distance
    return window.preys.filter(function(val) {
        return val !== null;
    }).map(window.getDistanceFromMe).sort(window.sortPrey);
};
// Draw dots on the canvas
window.drawDot = function(x, y, radius, colour) {
    var context = window.mc.getContext('2d');
    context.beginPath();
    context.arc(x, y, radius*window.getScale(), 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
    context.fill();
    context.fillStyle = 'black';
};

// Draw lines on the canvas
window.drawLine = function(x2, y2, colour) {
    var context = window.mc.getContext('2d');
    var center = [window.mc.height / 2, window.mc.width / 2];
    context.lineWidth = 5;
    context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
    context.moveTo(center[1], center[0]);
    context.lineTo(x2, y2);
    context.stroke();
    context.strokeStyle = '#000000';
};

// Radius  on the screen
window.getRadius = function() {
    return window.snake.sc*15;
};

window.checkCollision = function() {
	var circle1 = collisionScreenToCanvas({x: window.getX(), y: window.getY(), radius: window.getRadius()*4});
	if(window.visualDebugging){
		//window.drawDot(circle1.x, circle1.y, circle1.radius, 'blue');
	}
	var avoid = false;
	var circle2;
	
	for (var snake in window.snakes){
		if (window.snakes[snake].nk != window.snake.nk) {
			circle2 = {x: window.snakes[snake].xx +  window.snakes[snake].fx, y: window.snakes[snake].yy +  window.snakes[snake].fy, radius: 18*window.snakes[snake].sc};
			if (window.circleIntersect(circle1, collisionScreenToCanvas(circle2))){
				window.changeGoalCoords(circle2);
				avoid = true;
			}
			for (var y = window.snakes[snake].pts.length - 1; 0 <= y; y--){
				if(!window.snakes[snake].pts[y].dying) {
					circle2 = {x: window.snakes[snake].pts[y].xx +  window.snakes[snake].fx, y: window.snakes[snake].pts[y].yy +  window.snakes[snake].fy, radius: 18*window.snakes[snake].sc};
					if (window.circleIntersect(circle1, collisionScreenToCanvas(circle2))){
						window.changeGoalCoords(circle2);
						avoid = true;
					}
				}
			}
		}
	}
	
	return avoid;
};

window.changeGoalCoords = function(circle1){
	if ((circle1.x != window.collisionPoint.x && circle1.y != window.collisionPoint.y)) {
		window.collisionPoint = circle1;
		window.goalCoordinates = window.mapToMouse(window.snake.xx + window.snake.sp * (window.snake.xx - window.collisionPoint.x), window.snake.yy + window.snake.sp * (window.snake.yy - window.collisionPoint.y));
		window.setAcceleration(0);
		window.setMouseCoordinates(goalCoordinates[0], goalCoordinates[1]);
	} 
};
	
window.circleIntersect = function(circle1,circle2){
	if (quickCollisionCheck(circle1,circle2)){
		if (collisionCheck(circle1,circle2)){
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

window.collisionCheck = function(circle1, circle2){
	distance = Math.sqrt(((circle1.x - circle2.x) * (circle1.x - circle2.x)) + ((circle1.y - circle2.y) * (circle1.y - circle2.y)));
		   
	if (distance < circle1.radius + circle2.radius){
		collisionPointX = ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) / (circle1.radius + circle2.radius);
		collisionPointY = ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) / (circle1.radius + circle2.radius);
		
		if(window.visualDebugging){
			window.drawDot(collisionPointX, collisionPointY, circle2.radius, 'blue');
		}
		return true;
	} else {
		return false;
	}
};

window.quickCollisionCheck = function(circle1, circle2){
	return (circle1.x + circle1.radius + circle2.radius > circle2.x 
		&& circle1.x < circle2.x + circle1.radius + circle2.radius
		&& circle1.y + circle1.radius + circle2.radius > circle2.y 
		&& circle1.y < circle2.y + circle1.radius + circle2.radius);
};

window.collisionScreenToCanvas = function(circle) {
	var newCircle = window.mapToMouse(circle.x, circle.y);
	newCircle = window.mouseToScreen(newCircle[0], newCircle[1]);
	newCircle = window.screenToCanvas(newCircle[0], newCircle[1]);
	
	return {x: newCircle[0] , y: newCircle[1], radius: circle.radius};
};

// Save the original slither.io oef function so we can add things to it later
window.oldOef = window.oef;
window.oef = function() {
    // Original slither.io oef function + whatever is under it
	requestAnimationFrame(window.loop);
    window.oldOef();
    if (window.isBotRunning) window.loop();
    window.onFrameUpdate();
};
window.handleTextColor = function(enabled){
    return '<span style=\"color:' + (enabled?'green;\">enabled':'red;\">disabled') + '</span>';
};
window.onFrameUpdate = function() {
    // Botstatus overlay
    window.botstatus_overlay.innerHTML = '(T) Bot: ' + window.handleTextColor(window.isBotRunning);
    window.visualdebugging_overlay.innerHTML = '(Y) Visual debugging: ' + window.handleTextColor(window.visualDebugging);
    window.logdebugging_overlay.innerHTML = '(U) Log debugging: ' + window.handleTextColor(window.logDebugging);
    window.autorespawn_overlay.innerHTML = '(I) Auto respawning: ' + window.handleTextColor(window.autoRespawn);
    window.rendermode_overlay.innerHTML = '(O) Mobile rendering: ' + window.handleTextColor(window.mobileRender);
    window.huntprey_overlay.innerHTML = '(P) Prey hunting: ' + window.handleTextColor(window.huntPrey);
    // If playing
    if (window.playing && window.visualDebugging) {
        if (window.isBotRunning) {
            // Check to see if there is a position overlay
            if (window.position_overlay) {
                // Display the X and Y of the snake
                window.position_overlay.textContent = 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0);
            }
            var foodCoordinates = window.mapToMouse(window.currentFood.xx, window.currentFood.yy);
            foodCoordinates = window.mouseToScreen(foodCoordinates[0], foodCoordinates[1]);
            foodCoordinates = window.screenToCanvas(foodCoordinates[0], foodCoordinates[1]);
            window.drawLine(foodCoordinates[0], foodCoordinates[1], 'green');
            window.drawDot(foodCoordinates[0], foodCoordinates[1], 5, 'red');
        }
    }
};
// Actual bot code

// Loop for running the bot
window.loop = function() {
    // If the game and the bot are running
    if (window.playing && window.isBotEnabled) {
		if(!window.checkCollision()){
			window.ranOnce = true;
			// Sort the food based on their distance relative to player's snake
			window.sortedFood = window.getSortedFood();
			// Current food
			window.currentFood = window.sortedFood[0];
			// Convert coordinates of the closest food using mapToMouse
			var coordinatesOfClosestFood = window.mapToMouse(window.currentFood.xx, window.currentFood.yy);
			window.goalCoordinates = coordinatesOfClosestFood;
			// Disable Sprint
			window.setAcceleration(0);
			// Check for preys, enough "length"
			if (window.preys.length > 0 && window.huntPrey) {
				// Sort preys based on their distance relative to player's snake
				window.sortedPrey = window.getSortedPrey();
				// Current prey
				window.currentPrey = window.sortedPrey[0];
				// Convert coordinates of the closest prey using mapToMouse
				var coordinatesOfClosestPrey = window.mapToMouse(window.currentPrey.xx, window.currentPrey.yy);
				// Check for the distance
				if (window.currentPrey.distance <= Math.pow(window.getSnakeLength(), 2)/2) {
					// Set the mouse coordinates to the coordinates of the closest prey
					window.goalCoordinates = coordinatesOfClosestPrey;
					// "Sprint" enabled
					window.setAcceleration(1);
				}
			}
			window.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
		}
    } else {
        if (window.ranOnce) {
            //window.startInterval = setInterval(window.startBot, 1000);
            window.stopBot();
        }
    }
};
// Starts bot
window.startBot = function() {
    if (window.autoRespawn && !window.playing && window.isBotEnabled && window.ranOnce && !window.isBotRunning) {
        window.connectBot();
        //clearInterval(window.startInterval);
    }
};

// target the user's browser.
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || 
                              window.mozRequestAnimationFrame || 
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;
})();

// Initialises the bot
window.initBot = function() {
    window.ranOnce = false;
    window.isBotRunning = false;
    window.isBotEnabled = true;
	window.collisionPoint = {x: 0, y: 0, radius: 0};
    // Load preferences
    window.loadPreference('logDebugging', false);
    window.loadPreference('visualDebugging', false);
    window.loadPreference('autoRespawn', false);
    window.loadPreference('mobileRender', false);
    window.loadPreference('huntPrey', true);
    window.nick.value = window.loadPreference('savedNick', 'Slither.io-bot');
    // Overlays
    window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 7;';
    window.appendDiv('botstatus_overlay', 'nsi', window.generalstyle + 'left: 30; top: 30px;');
    window.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 45px;');
    window.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 60px;');
    window.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle + 'left: 30; top: 75px;');
    window.appendDiv('rendermode_overlay', 'nsi', window.generalstyle + 'left: 30; top: 90px;');
    window.appendDiv('huntprey_overlay', 'nsi', window.generalstyle + 'left: 30; top: 105px;');
    window.appendDiv('position_overlay', 'nsi', window.generalstyle + 'left: 35; top: 125px;');
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
// Better food hunting algorithm but not implemented yet
/*
        window.isInFoods = function (foodObject) {
            return (foodObject === null) ? false : (window.foods.indexOf(foodObject) >= 0);
        };
        window.currentFood = null;
        window.sortedFood = getSortedFood();
        window.loop = function () {
            if (!isInFoods(currentFood)) {
                window.sortedFood = getSortedFood();
                window.currentFood = sortedFood[0];
                var coordinatesOfClosestFood = window.mapToMouse(window.sortedFood[0].xx, window.sortedFood[0].yy);
                window.setMouseCoordinates(coordinatesOfClosestFood[0], coordinatesOfClosestFood[1]);
            }
        };
        */
