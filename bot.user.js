// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.3.2
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Custom logging function - disabled by default
window.logDebugging = false;

window.log = function() {
    if (window.logDebugging === true) {
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
// Set fake mouse coordinates
window.setMouseCoordinates = function(x, y) {
    window.xm = x;
    window.ym = y;
};
// Coordinates relative to the center (snake position).
window.mouseRelativeToCenter = function(x, y) {
    var mapX = x - window.getHeight() / 2;
    var mapY = y - window.getWidth() / 2;
    return [mapX, mapY];
};
// Mouse coordinates to screen coordinates
window.mouseToScreen = function(x, y) {
    var screenX = x + (window.getHeight() / 2);
    var screenY = y + (window.getWidth() / 2);
    return [screenX, screenY];
};
window.screenToCanvas = function(x, y) {
    var canvasX = window.csc * x * window.canvasRatio[0] - window.csc * parseInt(window.mc.style.left);
    var canvasY = window.csc * y * window.canvasRatio[1] - window.csc * parseInt(window.mc.style.top);
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
    window.canvasRatio = [window.mc.height / window.getHeight(), window.mc.width / window.getWidth()];
};
// Lets you zoom in and out using the mosue wheel
window.setZoom = function(e) {
    // Scaling ratio
    if (window.gsc) {
        window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    }
};

// Overlays
window.position_overlay;
window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 7;';
window.appendDiv('position_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 120px;');
window.position_overlay = document.getElementById('position_overlay');
// Listener for mouse wheel scroll - used for setZoom function
document.body.addEventListener('mousewheel', window.setZoom);
document.body.addEventListener('DOMMouseScroll', window.setZoom);

// Get scaling ratio
window.getScale = function() {
    return window.gsc;
};

window.isBotRunning = false;
window.isBotEnabled = true;

// Save the original slither.io onmousemove function so we can re enable it back later
window.mousemovelistener = window.onmousemove;

// Starts the bot
window.launchBot = function(d) {
    window.log('Starting Bot.');
    window.isBotRunning = true;
    // Removed the onemousemove listener so we can move the snake manually by setting coordinates
    window.onmousemove = function() {};
    window.botInterval = setInterval(window.loop, d);
    return window.botInterval;
};


// Stops the bot
window.stopBot = function() {
    window.log('Stopping Bot.');
    // Re enable the original onmousemove function
    window.onmousemove = window.mousemovelistener;
    window.isBotRunning = false;
    // Clear the interval which starts the bot
    return clearInterval(window.botInterval);
};

// Connects the bot
window.connectBot = function() {
    // Stop the bot
    window.stopBot();
    window.log('Connecting...');
    // Connect the bot
    window.connect();
    // Check if bot can start
    window.botCanStart = setInterval(function() {
        if (window.playing) {
            window.launchBot(5);
            clearInterval(window.botCanStart);
        }
    }, 100);
};

// Save the original slither.io onkeydown function so we can add stuff to it
document.oldKeyDown = document.onkeydown;

// Re write the function with our function
document.onkeydown = function(e) {
    // Original slither.io onkeydown function + whatever is under it
    document.oldKeyDown(e);
    // If the letter 't' is pressed, check if the bot is running. If it is, stop the bot. If it isn't, start the bot.
    if (e.keyCode === 84) {
        if (window.isBotRunning) {
            window.stopBot();
            window.isBotEnabled = false;
        } else {
            window.launchBot(5);
            window.isBotEnabled = true;
        }
    }
};

// Sorting function, from property 'distance'
window.sortObjects = function(a, b) {
    return a.distance - b.distance;
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
    // Real distance but not needed. Here for reference
    // var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return distance;
};

// Sort food based on distance
window.getSortedFood = function() {
    // Filters the nearest food by getting the distance
    return window.foods.filter(function(val) {
        return val !== null;
    }).map(window.getDistanceFromMe).sort(window.sortObjects);
};

// Sort enemies based on distance
window.getSortedEnemies = function() {
    // Filters the nearest food by getting the distance
    return window.snakes.filter(function(val) {
        return val !== null && val.id !== window.snake.id;
    }).map(window.getDistanceFromMe).sort(window.sortObjects);
};

// Draw dots on the canvas
window.drawDot = function(x, y, radius, colour) {
    var context = window.mc.getContext('2d');
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
    context.fill();
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
};
// Save the original slither.io oef function so we can add things to it later
window.oldOef = window.oef;

window.oef = function() {
    // Original slithe.io oef function + whatever is under it
    window.oldOef();
    window.onFrameUpdate();
};

window.canvasRatio = [window.mc.height / window.getHeight(), window.mc.width / window.getWidth()];
window.onFrameUpdate = function() {
    if (window.playing && window.isBotRunning) {
        var foodCoordinates = window.mapToMouse(window.currentFood.xx, window.currentFood.yy);
        foodCoordinates = window.mouseToScreen(foodCoordinates[0], foodCoordinates[1]);
        foodCoordinates = window.screenToCanvas(foodCoordinates[0], foodCoordinates[1]);
        window.drawLine(foodCoordinates[0], foodCoordinates[1], 'green');
        for (var i = 0; i < window.sortedFood.length; i++) {
            var item = window.sortedFood[i];
            foodCoordinates = window.mapToMouse(item.xx, item.yy);
            foodCoordinates = window.mouseToScreen(foodCoordinates[0], foodCoordinates[1]);
            foodCoordinates = window.screenToCanvas(foodCoordinates[0], foodCoordinates[1]);
            window.drawDot(foodCoordinates[0], foodCoordinates[1], 5, 'red');
        }
    }
};

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
// Actual bot code

// Loop for running the bot
window.loop = function() {
    // If the game and the bot are running
    if (window.playing && window.isBotEnabled) {
        // Check to see if there is a position overlay
        if (window.position_overlay) {
            // Display the X and Y of the snake
            window.position_overlay.textContent = 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0);
        }
        // Sort the food and enemies based on their distance relative to player's snake
        window.sortedFood = window.getSortedFood();
        window.sortedEnemies = window.getSortedEnemies();
        // Take the closest of each
        window.closestEnemy = window.sortedEnemies[0];
        window.currentFood = window.sortedFood[0];
        // Convert coordinates of the closest food using mapToMouse
        var coordinatesOfClosestFood = window.mapToMouse(window.currentFood.xx, window.currentFood.yy);
        if (window.closestEnemy.distance < 300) {
            //window.log('close enemy! (distance = ' + window.closestEnemy.distance);
            // !handle close enemies!
        }
        // Set the mouse coordinates to the coordinates of the closest food
        window.setMouseCoordinates(coordinatesOfClosestFood[0], coordinatesOfClosestFood[1]);

    } else {
        window.startInterval = setInterval(window.startInterval, 1000);
        window.stopBot();
    }
};
// First function called
window.startInterval = function() {
    if (window.playing === false && window.isBotEnabled === true) {
        window.connectBot();
        clearInterval(window.startInterval);
    }
};
window.startInterval();
