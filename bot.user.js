// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.2.2
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Custom logging function - disabled by default
window.logDebugging = false;
window.log = function (message) {
    if (window.logDebugging === true) {
        console.log.apply(console, arguments);
    }
};
// Set fake mouse coordinates
window.setMouseCoordinates = function (x, y) {
    window.xm = x;
    window.ym = y;
};
// Return the coordinates relative to the center (snake position).
window.mouseRelativeToCenter = function (x, y) {
    mapX = x - getHeight() / 2;
    mapY = y - getWidth() / 2;
    return [mapX, mapY];
};
// mouse coordinates to screen coordinates
window.mouseToScreen = function (x, y) {
    screenX = x + (getHeight() / 2);
    screenY = y + (getWidth() / 2);
    return [screenX, screenY];
};
window.onresize = function () {
    window.resize();
    window.canvasRatio = [mc.height / getHeight(), mc.width / getWidth()];
};
window.screenToCanvas = function (x, y) {
    window.onresize();
    canvasX = x * window.canvasRatio[0];
    canvasY = y * window.canvasRatio[1];
    return [canvasX, canvasY];
};
// Map to mouse coordinates
window.mapToMouse = function (x, y) {
    mouseX = (x - getX()) * gsc;
    mouseY = (y - getY()) * gsc;
    return [mouseX, mouseY];
};
// Canvas width
window.getWidth = function () {
    return window.ww;
};
// Canvas height
window.getHeight = function () {
    return window.hh;
};
// X coordinates on the screen
window.getX = function () {
    return window.px;
};
// Y coordinates on the screen
window.getY = function () {
    return window.py;
};
// Get scaling ratio
window.getScale = function () {
    return window.gsc;
};
window.isBotRunning = true;
// Save the original slither.io onmousemove function so we can re enable it back later
window.mousemovelistener = window.onmousemove;
// Starts the bot
window.launchBot = function (d) {
    window.log("Starting Bot.");
    window.isBotRunning = true;
    // Removed the onemousemove listener so we can move the snake manually by setting coordinates
    window.onmousemove = function () {};
    return window.botInterval = setInterval(window.loop, d);
};
// Stops the bot
window.stopBot = function () {
    window.log("Stopping Bot.");
    // Re enable the original onmousemove function
    window.onmousemove = window.mousemovelistener;
    window.isBotRunning = false;
    // Clear the interval which starts the bot
    return clearInterval(window.botInterval);
};

window.connectBot = function () {
    window.stopBot();
    window.log("Connecting...");
    window.connect();
    setTimeout(function() { window.launchBot(5); }, 2000);
};
// Save the original slither.io onkeydown function so we can add stuff to it
document.oldKeyDown = document.onkeydown;
// Re write the function with our function
document.onkeydown = function (e) {
    // Original slither.io onkeydown function + whatever is under it
    document.oldKeyDown(e);
    // If the letter "t" is pressed, check if the bot is running. If it is, stop the bot. If it isn't, start the bot.
    if (e.keyCode === 84) window.isBotRunning ? window.stopBot() : window.launchBot(5);
};

// Sorting function, from property 'distance'
window.sortFood = function (a, b) {
    return a.distance - b.distance;
};

// Given an object (of which properties xx and yy are not null), return the object with an additional property 'distance'
window.getDistanceFromMe = function (point) {
    if (point === null) return null;
    point.distance = getDistance(px, py, point.xx, point.yy);
    return point;
};

// Get a distance from point (x1; y1) to point (x2; y2).
window.getDistance = function (x1, y1, x2, y2) {
    // Calculate the vector coordinates.
    var xDistance = (x1 - x2);
    var yDistance = (y1 - y2);
    // Get the absolute value of each coordinate
    xDistance = xDistance < 0 ? xDistance * -1 : xDistance;
    yDistance = yDistance < 0 ? yDistance * -1 : yDistance;
    //Add the coordinates of the vector to get a distance. Not the real distance, but reliable for distance comparison.
    var distance = xDistance + yDistance;
    return distance;
};
// Sort food based on distance
window.getSortedFood = function () {
    // Filters the nearest food by getting the distance
    return window.foods.filter(function (val) {
        return val !== null;
    }).map(getDistanceFromMe).sort(sortFood);
};

window.drawDot = function (x, y, radius, colour) {
    var context = mc.getContext("2d");
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
    context.fill();
};

window.drawLine = function (x2, y2, colour) {
    var context = mc.getContext("2d");
    var center = [mc.height / 2, mc.width / 2];
    context.lineWidth = 5;
    context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
    context.moveTo(center[1], center[0]);
    context.lineTo(x2, y2);
    context.stroke();
};

window.oldOef = window.oef;

window.oef = function () {
    window.oldOef();
    window.onFrameUpdate();
};

window.onFrameUpdate = function () {
    if (playing) {
        var foodCoordinates = mapToMouse(window.currentFood.xx, window.currentFood.yy);
        foodCoordinates = mouseToScreen(foodCoordinates[0], foodCoordinates[1]);
        foodCoordinates = screenToCanvas(foodCoordinates[0], foodCoordinates[1]);
        drawLine(foodCoordinates[0], foodCoordinates[1], 'green');
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
window.loop = function () {
    // If the game is running
    if (playing) {
        window.sortedFood = getSortedFood();
        window.currentFood = window.sortedFood[0];
        // Sort the food based on distance
        var sortedFood = getSortedFood();
        // Convert coordinates of the closest food using mapToMouse
        var coordinatesOfClosestFood = window.mapToMouse(sortedFood[0].xx, sortedFood[0].yy);
        // Set the mouse coordinates to the coordinates of the closest food
        window.setMouseCoordinates(coordinatesOfClosestFood[0], coordinatesOfClosestFood[1]);

    }
};

window.startUpdate = function () {
    updateLoop = setInterval(function() { window.restartloop(); }, 10000);
};
window.restartloop = function () {
    if (playing === false && window.isBotRunning === true) {
        window.connectBot();
    }
};
window.startUpdate();
