// ==UserScript==
// @name         Slither.io-bot-launcher
// @namespace    http://slither.io/
// @version      0.0.9
// @description  Slither.io bot launcher
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
//UPDATE - removed the onemousemove listener
window.onmousemove = function(e) {
  /*if (e = e || window.event) {
    if ("undefined" != typeof e.clientX) {
      xm = e.clientX - ww / 2;
      ym = e.clientY - hh / 2;
    }
  }*/
};
//Set fake mouse coordinates
window.setMouseCoordinates = function (x, y) {
    window.xm = x;
    window.ym = y;
};
// return the coordinates relative to the center (snake position).
window.mouseRelativeToCenter = function (x, y) {
    mapX = x - getHeight() / 2;
    mapY = y - getWidth() / 2;
    return [mapX, mapY];
};
// Map to mouse coordinates
window.mapToMouse = function (x, y) {
    mouseX = (x - getX())*gsc;
    mouseY = (y - getY())*gsc;
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
window.getScale = function(){
    return window.gsc;
}

window.launchBot = function(d){
    return window.botInterval = setInterval(window.loop, d);
}
