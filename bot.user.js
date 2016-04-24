// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.0.1
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

//sorting function, from property 'distance'.
window.sortFood = function (a, b) {
    return a.distance - b.distance;
}

//Given an object (of which properties xx and yy are not null), return the object with an additional property 'distance'.
window.getDistanceFromMe = function(point){
    if(point == null) return null;
    point.distance = getDistance(px, py, point.xx, point.yy);
    return point;
}

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
