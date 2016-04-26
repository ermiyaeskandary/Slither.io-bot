// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.2.0
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Set fake mouse coordinates
window.setMouseCoordinates = function(x, y) {
    window.xm = x;
    window.ym = y;
};
// Return the coordinates relative to the center (snake position).
window.mouseRelativeToCenter = function(x, y) {
    mapX = x - getHeight() / 2;
    mapY = y - getWidth() / 2;
    return [mapX, mapY];
};
// Map to mouse coordinates
window.mapToMouse = function(x, y) {
    mouseX = (x - getX()) * gsc;
    mouseY = (y - getY()) * gsc;
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
    return window.px;
};
// Y coordinates on the screen
window.getY = function() {
    return window.py;
};
// Get scaling ratio
window.getScale = function() {
    return window.gsc;
};
isBotRunning = false;
// Save the original slither.io onmousemove function so we can re enable it back later
window.mousemovelistener = window.onmousemove;
// Starts the bot
window.launchBot = function(d) {
    console.log("Starting Bot.");
    isBotRunning = true;
    // Removed the onemousemove listener so we can move the snake manually by setting coordinates
    window.onmousemove = undefined;
    return window.botInterval = setInterval(window.loop, d);
};
// Stops the bot
window.stopBot = function() {
    console.log("Stopping Bot.");
    // Re enable the original onmousemove function
    window.onmousemove = window.mousemovelistener;
    isBotRunning = false;
    // Clear the interval which starts the bot
    return clearInterval(window.botInterval);
};

window.connectBot = function() {
    console.log("Connecting");
    window.stopBot();
    window.connect();
    setTimeout(window.launchBot(5), 1000);
};
// Save the original slither.io onkeydown function so we can add stuff to it
document.oldKeyDown = document.onkeydown;
// Re write the function with our function
document.onkeydown = function(e) {
    // Original slither.io onkeydown function + whatever is under it
    document.oldKeyDown(e);
    // If the letter "t" is pressed, check if the bot is running. If it is, stop the bot. If it isn't, start the bot.
    if (e.keyCode === 84) isBotRunning ? window.stopBot() : window.launchBot(5);
};

// Sorting function, from property 'distance'
window.sortFood = function(a, b) {
    return a.distance - b.distance;
};

// Given an object (of which properties xx and yy are not null), return the object with an additional property 'distance'
window.getDistanceFromMe = function(point) {
    if (point === null) return null;
    point.distance = getDistance(px, py, point.xx, point.yy);
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
    return distance;
};
// Sort food based on distance
window.getSortedFood = function() {
    // Filters the nearest food by getting the distance
    return window.foods.filter(function(val) {
        return val !== null;
    }).map(getDistanceFromMe).sort(sortFood);
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
// Removed the onemousemove listener so we can move the snake manually by setting coordinates
window.onmousemove = function(e) {
    /*if (e = e || window.event) {
      if ("undefined" != typeof e.clientX) {
        xm = e.clientX - ww / 2;
        ym = e.clientY - hh / 2;
      }
    }*/
};
// Actual bot code

// Loop for running the bot
window.loop = function() {
    // If the game is running
    if (playing) {
        // Sort the food based on distance
        var sortedFood = getSortedFood();
        // Convert coordinates of the closest food using mapToMouse
        var coordinatesOfClosestFood = window.mapToMouse(sortedFood[0].xx, sortedFood[0].yy);
        // Set the mouse coordinates to the coordinates of the closest food
        window.setMouseCoordinates(coordinatesOfClosestFood[0], coordinatesOfClosestFood[1]);

    }
};

window.startUpdate = function() {
    updateLoop = setInterval(window.restartloop(), 10000);
};
window.restartloop = function () {
    if (playing === false && isBotRunning === true) {
        window.connectBot();
    }
};
window.startUpdate();
