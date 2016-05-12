/*
Copyright (C) 2016 Ermiya Eskandary & Théophile Cailliau and other contributors
This program is free software: 
you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program.
If not, see <http://www.gnu.org/licenses/>./gpl-howto.html
*/
// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.8.2
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @updateURL    https://github.com/ErmiyaEskandary/Slither.io-bot/raw/master/bot.user.js
// @downloadURL  https://github.com/ErmiyaEskandary/Slither.io-bot/raw/master/bot.user.js
// @supportURL   https://github.com/ErmiyaEskandary/Slither.io-bot/issues
// @grant        none
// ==/UserScript==
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

window.getSnakeLength = function() {
    return (Math.floor(150 * (window.fpsls[window.snake.sct] + window.snake.fam / window.fmlts[window.snake.sct] - 1) - 50) / 10);
};
window.getSnakeWidth = function() {
    return window.snake.sc * 29 * canvas.getScale();
};

window.getSnakeWidthSqr = function() {
	var w = window.getSnakeWidth();
    return w*w;
};

window.getX = function() {
    return window.snake.xx;
};
window.getY = function() {
    return window.snake.yy;
};

var canvas = (function() {
    return {
        // Ratio of screen size divided by canvas size.
        canvasRatio: [window.mc.width / window.getWidth(), window.mc.height / window.getHeight()],

        // Spoofs moving the mouse to the provided coordinates.
        setMouseCoordinates: function(x, y) {
            window.xm = x;
            window.ym = y;
        },

        // Convert snake-relative coordinates to absolute screen coordinates.
        mouseToScreen: function(x, y) {
            var screenX = x + (window.getWidth() / 2);
            var screenY = y + (window.getHeight() / 2);
            return [screenX, screenY];
        },

        // Convert screen coordinates to canvas coordinates.
        screenToCanvas: function(x, y) {
            var canvasX = window.csc * (x * canvas.canvasRatio[0]) - parseInt(window.mc.style.left);
            var canvasY = window.csc * (y * canvas.canvasRatio[1]) - parseInt(window.mc.style.top);
            return [canvasX, canvasY];
        },

        // Convert map coordinates to mouse coordinates.
        mapToMouse: function(x, y) {
            var mouseX = (x - window.getX()) * window.gsc;
            var mouseY = (y - window.getY()) * window.gsc;
            return [mouseX, mouseY];
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

        // TODO what does window scale mean?
        getScale: function() {
            return window.gsc;
        },

        // Manual mobile rendering
        mobileRendering: function() {
            // Set render mode
            if (window.mobileRender) {
                canvas.setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
                window.render_mode = 1;
            } else {
                canvas.setBackground();
                window.render_mode = 2;
            }
        },

        // Draw a dot on the canvas.
        drawDot: function(x, y, radius, colour, fill) {
            var context = window.mc.getContext('2d');
            context.beginPath();
            context.strokeStyle = colour;
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.closePath();
            if (fill) {
                context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
                context.fill();
            }
            context.stroke();
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
        drawLine: function(x2, y2, colour) {
            var context = window.mc.getContext('2d');
            var center = [window.mc.height / 2, window.mc.width / 2];
            context.beginPath();
            context.lineWidth = 5 * canvas.getScale();
            context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
            context.moveTo(center[1], center[0]);
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

        // Given an object (of which properties xx and yy are not null),
        // return the object with an additional property 'distance'.
        getDistanceFromSnake: function(point) {
            if (point === null) return null;
            point.distance = canvas.getDistanceSqr(window.getX(), window.getY(),
                point.xx, point.yy);
            return point;
        },

        // Get a distance from point (x1; y1) to point (x2; y2).
        getDistanceSqr: function(x1, y1, x2, y2) {
            // Calculate the vector coordinates.
            var xDistance = (x1 - x2);
            var yDistance = (y1 - y2);
			
			return xDistance*xDistance + yDistance*yDistance;
        },

        // Screen to Canvas coordinate conversion - used for collision detection
        collisionScreenToCanvas: function(circle) {
            var newCircle = canvas.mapToMouse(circle.x, circle.y);
            newCircle = canvas.mouseToScreen(newCircle[0], newCircle[1]);
            newCircle = canvas.screenToCanvas(newCircle[0], newCircle[1]);
            return {
                x: newCircle[0],
                y: newCircle[1],
                radius: circle.radius
            };
        },

        // Check if circles intersect
        circleIntersect: function(circle1, circle2) {
            var bothRadii = circle1.radius + circle2.radius;
			var bothRadiiSqr = bothRadii*bothRadii;
			var xDist = circle1.x - circle2.x;
			var yDist = circle1.y - circle2.y;
			var distance = xDist*xDist + yDist*yDist;
			
			if (distance < bothRadiiSqr) {
			    if (window.visualDebugging) {
				    var collisionPointX = ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) / bothRadii;
				    var collisionPointY = ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) / bothRadii;
				    canvas.drawDot(collisionPointX, collisionPointY, circle2.radius, 'cyan', true);
				    canvas.drawDot(circle2.x, circle2.y, circle2.radius, 'red', true);
				}
				return true;
			}
            return false;
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

    return {
        width: window.getWidth(),
        height: window.getHeight(),

        //clone for fast slicing
        grid: [],

        cellSize: 20,
        startX: 0,
        startY: 0,
        gridWidth: 0,
        gridHeight: 0,
        endX: 0,
        endY: 0,

        initGrid: function(sx, sy, width, height, cellsz) {
            sx = sx - (sx % cellsz);
            sy = sy - (sy % cellsz);
            collisionGrid.startX = sx - width/2;
            collisionGrid.startY = sy - height/2;
            collisionGrid.gridWidth = width;
            collisionGrid.gridHeight = height;
            collisionGrid.cellSize = cellsz;
            /*for(var x=0; x<width; x++) {
                var column = [];
                for(var y=0; y<height; y++) {
                    column[y] = 0;
                }
                collisionGrid.grid[x] = column;
            }*/
            collisionGrid.grid = [[]];
            collisionGrid.endX = collisionGrid.startX + width;
            collisionGrid.endY = collisionGrid.startY + height;
            collisionGrid.addSnakes();
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

        // Find specific cell using world-space position
        getCellByXY: function(x, y) {
            var col = x - collisionGrid.startX;
            var row = y - collisionGrid.startY;
            col = parseInt(Math.floor(col / collisionGrid.cellSize));
            row = parseInt(Math.floor(row / collisionGrid.cellSize));
            col = Math.min(Math.max(col, 0), collisionGrid.gridWidth);
            row = Math.min(Math.max(row, 0), collisionGrid.gridHeight);
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || [];
            return [col, row, collisionGrid.grid[col][row]];
        },

        // Get cell world-space position at top left corner of cell
        getCellByColRow: function(col, row) {
            var x = collisionGrid.startX + col*collisionGrid.cellSize;
            var y = collisionGrid.startY + row*collisionGrid.cellSize;
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || [];
            return [x, y, collisionGrid.grid[col][row]];
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

        markCell: function(col, row, obj) {
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || [];
            collisionGrid.grid[col][row].push(obj);
            return collisionGrid.grid[col][row];
        },

        debugDraw: function() {
            if( !window.visualDebugging || !collisionGrid.grid.length ) 
                return;
            collisionGrid.sliceGrid(0, 0, collisionGrid.gridWidth, collisionGrid.gridHeight, 
                function(col, row, val) {
                    

                    var pos = collisionGrid.getCellByColRow(col,row);
                    var canvasPos = canvas.collisionScreenToCanvas({
                        x: pos[0],
                        y: pos[1],
                        radius: 1
                    });
                    
                    if( !val ) 
                        canvas.drawRect(canvasPos.x, canvasPos.y, collisionGrid.cellSize, collisionGrid.cellSize, 'yellow');
                    else
                        canvas.drawRect(canvasPos.x, canvasPos.y, collisionGrid.cellSize, collisionGrid.cellSize, 'yellow');
                }
            );
        },
        // add all snake's collision parts to the grid
        addSnakes: function() {
            for (var snakeid in window.snakes) {
                var snk = window.snakes[snakeid];
                if (snk.nk == window.snake.nk)
                    continue;
                var cnt = 0;

                for (var pts in snk.pts) {
                    var part = snk.pts[pts];

                    if (part.dying) 
                        continue;

                    if( part.xx < collisionGrid.startX ||
                        part.xx > collisionGrid.endX ||
                        part.yy < collisionGrid.startY ||
                        part.yy > collisionGrid.endY)
                        continue;
                    //if (cnt++ % 2 == 0) 
                    //    continue;

                    var cell = collisionGrid.getCellByXY(part.xx, part.yy);
                    var radius = 14.5 * snk.sc;
                    var radiusSqr = radius*radius;
                    var cellcount = collisionGrid.calculateMaxCellCount(radius);
                    cellcount = cellcount;
                    var cellcount2 = cellcount*2;
                    //mark cell where part's center is located
                    collisionGrid.markCell(cell[0], cell[1], part);
                    if( window.visualDebugging ) {
                        var pos = collisionGrid.getCellByColRow(cell[0], cell[1]);
                        var canvasPos = canvas.collisionScreenToCanvas({
                            x: pos[0],
                            y: pos[1],
                            radius: 1
                        });
                        
                        canvas.drawRect(canvasPos.x, canvasPos.y, collisionGrid.cellSize*canvas.getScale(), collisionGrid.cellSize*canvas.getScale(), 'yellow');
                    }
                    //mark surrounding cells using part's radius
                    collisionGrid.sliceGrid(cell[0]-cellcount, cell[1]-cellcount, cellcount2, cellcount2, 
                        function(col, row, val) {
                            if( !val || val.length ) return;
/*
                            var pos = collisionGrid.getCellByColRow(col,row);
                            var centerX = pos[0] + collisionGrid.cellSize / 2;
                            var centerY = pos[1] + collisionGrid.cellSize / 2;
                            var xDist = centerX - part.xx;
                            var yDist = centerY - part.yy;
                            var dist = xDist*xDist + yDist*yDist;

                            if( dist < radiusSqr ) {*/
                                var marked = collisionGrid.markCell(col, row, part);
                                if( window.visualDebugging ) {
                                    var pos = collisionGrid.getCellByColRow(col,row);
                                    var canvasPos = canvas.collisionScreenToCanvas({
                                        x: pos[0],
                                        y: pos[1],
                                        radius: 1
                                    });
                                    canvas.drawRect(canvasPos.x, canvasPos.y, collisionGrid.cellSize*canvas.getScale(), collisionGrid.cellSize*canvas.getScale(), 'yellow');
                                }
                            /*}*/
                        }
                    );
                }
            }
        },


        cellTest: function(col, row) {
            cell = collisionGrid.getCell(col, row);  // first point 
            if( cell && cell.length > 0 )
                return cell;
            return false;
        },

        
        lineTest: function(x1, y1, x2, y2) { 
            var posA = collisionGrid.getCellByXY(x1,y1);
            var posB = collisionGrid.getCellByXY(x2,y2);
            x1 = posA[0], x2 = posB[0];
            y1 = posA[1], y2 = posB[1];
            var i;               // loop counter 
            var cell;
            var ystep, xstep;    // the step on y and x axis 
            var error;           // the error accumulated during the increment 
            var errorprev;       // *vision the previous value of the error variable 
            var y = y1, x = x1;  // the line points 
            var ddy, ddx;        // compulsory variables: the double values of dy and dx 
            var dx = x2 - x1; 
            var dy = y2 - y1; 

            if( (cell = collisionGrid.cellTest(x1,y1)) !== false ) return cell;

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
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return cell;
                        }
                        else if (error + errorprev > ddx) { // left square also 
                            //POINT (y, x-xstep); 
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return cell;

                        }
                        else {  // corner: bottom and left squares also 
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return cell;
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return cell;
                            //POINT (y-ystep, x); 
                            //POINT (y, x-xstep); 
                        } 
                    } 
                    //POINT (y, x); 
                    if( (cell = collisionGrid.cellTest(x, y)) !== false ) return cell;
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
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return cell;
                        }
                        else if (error + errorprev > ddy) {
                            //POINT (y-ystep, x);
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return cell;
                        } 
                        else { 
                            //POINT (y, x-xstep); 
                            //POINT (y-ystep, x); 
                            if( (cell = collisionGrid.cellTest(x-xstep, y)) !== false ) return cell;
                            if( (cell = collisionGrid.cellTest(x, y-ystep)) !== false ) return cell;
                        } 
                    } 
                    //POINT (y, x); 
                    if( (cell = collisionGrid.cellTest(x, y)) !== false ) return cell;
                    errorprev = error; 
                } 
            } 
            return false;
            // assert ((y == y2) && (x == x2));  // the last point (y2,x2) has to be the same with the last point of the algorithm 
        }
        
        


    }

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

        startBot: function() {
            if (window.autoRespawn && !window.playing && bot.isBotEnabled && bot.ranOnce && !bot.isBotRunning) {
                bot.connectBot();
            }
        },

        launchBot: function() {
            window.log('Starting Bot.');
            bot.isBotRunning = true;
            // Removed the onmousemove listener so we can move the snake manually by setting coordinates
            window.onmousemove = function() {};
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
            window.currentIP = window.bso.ip + ":" + window.bso.po;
            var srv = window.currentIP.trim().split(":");
            window.bso.ip = srv[0];
            window.bso.po = srv[1];
            window.connect();
        },

        quickRespawn: function() {
            window.dead_mtm = 0;
            window.login_fr = 0;
            window.forceConnect();
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

        changeClusteringAlgorithm: function() {
            bot.foodClusteringMode = 1 - bot.foodClusteringMode;
        },

        rotateSkin: function() {
            if (!window.rotateskin) {
                return;
            }
            bot.changeSkin();
            setTimeout(bot.rotateSkin, 500);
        },

        // Adjust goal direction
        changeGoalCoords: function() {
            window.goalCoordinates = canvas.mapToMouse(window.snake.xx + (window.snake.xx - bot.collisionPoints[0].xx), window.snake.yy + (window.snake.yy - bot.collisionPoints[0].yy));
            window.setAcceleration(0);
            canvas.setMouseCoordinates(goalCoordinates[0], goalCoordinates[1]);
        },

        // Sorting function for food
        sortFoodDistance: function(a, b) {
            return a.distance - b.distance;
        },

        // Sorting function for food, from property 'clusterCount'
        sortFoodClusters: function(a, b) {
            return (a.clusterScore == b.clusterScore ? 0 : a.clusterScore / a.distance > b.clusterScore / b.distance ? -1 : 1);
        },

        // Sorting function for prey, from property 'distance'
        sortDistance: function(a, b) {
            return a.distance - b.distance;
        },

        // Checks to see if you are going to collide with anything in the collision detection radius
        checkCollision: function(circle) {
            if (!window.collisionDetection) return false;
            if (window.visualDebugging) {
                canvas.drawDot(circle.x, circle.y, circle.radius, 'blue', false);
            }

            if (bot.collisionPoints[0] != null) {
                var collisionCircle = canvas.collisionScreenToCanvas({
                    x: bot.collisionPoints[0].xx,
                    y: bot.collisionPoints[0].yy,
                    radius: 20 * bot.collisionPoints[0].sc * canvas.getScale()
                });

                if (canvas.circleIntersect(circle, collisionCircle)) {
                    bot.changeGoalCoords();
                    return true;
                }
            }
            return false;
        },

        getCollisionPoints: function() {
            var collisionPoints = [];
            for (var snake in window.snakes) {
                if (window.snakes[snake].nk != window.snake.nk) {
                    for (var pts in window.snakes[snake].pts) {
                        if (!window.snakes[snake].pts[pts].dying) {
                            var collisionPoint = {
                                xx: window.snakes[snake].pts[pts].xx,
                                yy: window.snakes[snake].pts[pts].yy,
                                sc: window.snakes[snake].sc,
                                sp: window.snakes[snake].sp
                            };

                            canvas.getDistanceFromSnake(collisionPoint);
                            collisionPoints.push(collisionPoint);
                        }
                    }
                }
            }

            //Sort collision points based on distance
            return collisionPoints.sort(bot.sortDistance);
        },

        // Sort food based on distance
        getFood: function() {
            // Filters the nearest food by getting the distance
            return window.foods.filter(function(val) {
                return val !== null && val !== undefined;
            }).map(canvas.getDistanceFromSnake).filter(function(val) {
                var isInsideDangerAngles = canvas.isInsideAngle(val, window.snake.ang - 3 * Math.PI / 4, window.snake.ang - Math.PI / 4);
                isInsideDangerAngles = isInsideDangerAngles || canvas.isInsideAngle(val, window.snake.ang + Math.PI / 4, window.snake.ang + 3 * Math.PI / 4);

                var collision = collisionGrid.lineTest(window.getX(), window.getY(), val.xx, val.yy);
                if( collision !== false ) {
                    return false;
                }

                return !(isInsideDangerAngles && (val.distance <= 22500));
            });
        },

        computeFoodGoal: function() {
            var sortedFood = bot.getFood().sort(bot.sortFoodDistance);

            var bestClusterIndx = 0;
            var bestClusterScore = 0;
            var bestClusterAbsScore = 0;
            var bestClusterX = 0;
            var bestClusterY = 0;

            // there is no need to view more points (for performance)
            var nIter = Math.min(sortedFood.length, 250);
            for (var i = 0; i < nIter; i += 3) {
                var clusterScore = 0;
                var clusterSize = 0;
                var clusterAbsScore = 0;
                var clusterSumX = 0;
                var clusterSumY = 0;

                var p1 = sortedFood[i];
                for (var j = 0; j < nIter; ++j) {
                    var p2 = sortedFood[j];
                    var dist = canvas.getDistanceSqr(p1.xx, p1.yy, p2.xx, p2.yy);
                    if (dist < 22500) {
                        clusterScore += p2.sz;
                        clusterSumX += p2.xx * p2.sz;
                        clusterSumY += p2.yy * p2.sz;
                        clusterSize += 1;
                    }
                }
                clusterAbsScore = clusterScore;
                clusterScore /= Math.pow(p1.distance, 1.5);
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
            window.currentFoodScore = bestClusterAbsScore;
        },


        foodClusters: function(food) {
            if (!food.clustered) {
                food.clusterScore = 0;
                food.clusterxx = food.xx;
                food.clusteryy = food.yy;

                var clusterSumX = 0;
                var clusterSumY = 0;
                var count = 0;

                for (var index in window.foods) {
                    nearFood = window.foods[index];
                    if (nearFood !== null && nearFood.id !== food.id) {
                        foodDistance = canvas.getDistanceSqr(food.xx, food.yy, nearFood.xx, nearFood.yy);

                        if (foodDistance <= window.getSnakeWidthSqr() * 5) {
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

                if (count > 0) {
                    food.clusterxx = clusterSumX / food.clusterScore;
                    food.clusteryy = clusterSumY / food.clusterScore;
                }
            }

            food.clustered = true;
            return food;
        },

        // Sort prey based on distance
        getSortedPrey: function() {
            // Filters the nearest food by getting the distance
            return window.preys.filter(function(val) {
                return val !== null;
            }).map(canvas.getDistanceFromSnake).sort(bot.sortDistance);
        },

        // Defense mode - bot turns around in a circle
        playDefence: function(dir) {
            window.kd_l = (dir === 'l');
            window.kd_r = (dir === 'r');
            canvas.setMouseCoordinates(window.getWidth() / 2, window.getHeight() / 2);
        },

        // Called by the window loop, this is the main logic of the bot.
        thinkAboutGoals: function() {
            // If no enemies or obstacles, go after what you are going after
            var speedingMultiplier = (window.snake.sp > 10) ? 1.5 : 1.0;
            var headCircle = canvas.collisionScreenToCanvas({
                x: window.getX(),
                y: window.getY(),
                radius: window.getSnakeWidth() * (window.collisionRadiusMultiplier * speedingMultiplier)
            });


            //if( bot.tickCounter == 0 ) {
                
            //}

            bot.collisionPoints = bot.getCollisionPoints();
            // If no enemies or obstacles, go after what you are going after
            if (!bot.checkCollision(headCircle)) {

                // Save CPU by only calculating every Nth frame
                bot.tickCounter++;
                if (bot.tickCounter > 15) {
                    bot.tickCounter = 0;

                    collisionGrid.initGrid(window.getX(), window.getY(), 2000, 2000, 40);

                    var accelerationClusterSize;
                    if (bot.foodClusteringMode == 1) {
                        bot.computeFoodGoal();
                        accelerationClusterSize = 120;
                    } else {
                        var foodClusters = bot.getFood().map(bot.foodClusters);
                        window.sortedFood = foodClusters.sort(bot.sortFoodClusters);
                        window.currentFood = window.sortedFood[0];
                        window.currentFoodX = window.currentFood.clusterxx;
                        window.currentFoodY = window.currentFood.clusteryy;
                        window.currentFoodScore = window.currentFood.clusterScore;
                        accelerationClusterSize = 70;
                    }


                    var coordinatesOfClosestFood = canvas.mapToMouse(window.currentFoodX, window.currentFoodY);
                    window.goalCoordinates = coordinatesOfClosestFood;
                    // Sprint
                    //use speed to go to larger clusters
					setAcceleration((window.currentFood.clusterScore >= accelerationClusterSize) 
					?
					(canvas.getDistanceSqr(window.getX(),window.getY(),window.currentFoodX,window.currentFoodY) <= Math.pow(window.getSnakeLength(), 2) / 2 && window.currentFood.distance > 375) 
					? 
					1 : 0 : 0);

                    // Check for preys, enough "length", dont go after prey if current cluster is large
                    if (window.preys.length > 0 && window.huntPrey && window.currentFoodScore < accelerationClusterSize) {
                        // Sort preys based on their distance relative to player's snake
                        window.sortedPrey = bot.getSortedPrey();
                        // Current prey
                        window.currentPrey = window.sortedPrey[0];
                        // Convert coordinates of the closest prey using mapToMouse
                        var coordinatesOfClosestPrey = canvas.mapToMouse(window.currentPrey.xx, window.currentPrey.yy);
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
                    canvas.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
                }
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
                    window.log('Visual debugging set to: ' + window.visualDebugging);
                    userInterface.savePreference('visualDebugging', window.visualDebugging);
                }
                // Letter 'I' to toggle autorespawn
                if (e.keyCode === 73) {
                    window.autoRespawn = !window.autoRespawn;
                    window.log('Automatic Respawning set to: ' + window.autoRespawn);
                    userInterface.savePreference('autoRespawn', window.autoRespawn);
                }
                // Letter 'W' to auto rotate skin
                if (e.keyCode == 87) {
                    window.rotateskin = !window.rotateskin;
                    window.log('Auto skin rotator set to: ' + window.rotateskin);
                    userInterface.savePreference('rotateskin', window.rotateskin);
                    bot.rotateSkin();
                }
                // Letter 'O' to change rendermode (visual)
                if (e.keyCode === 79) {
                    window.mobileRender = !window.mobileRender;
                    window.log('Mobile rendering set to: ' + window.mobileRender);
                    userInterface.savePreference('mobileRender', window.mobileRender);
                    canvas.mobileRendering();
                }
                // Letter 'P' to toggle hunting Prey
                if (e.keyCode === 80) {
                    window.huntPrey = !window.huntPrey;
                    window.log('Prey hunting set to: ' + window.huntPrey);
                    userInterface.savePreference('huntPrey', window.huntPrey);
                }
                // Letter 'C' to toggle Collision detection / enemy avoidance
                if (e.keyCode === 67) {
                    window.collisionDetection = !window.collisionDetection;
                    window.log('collisionDetection set to: ' + window.collisionDetection);
                    userInterface.savePreference('collisionDetection', window.collisionDetection);
                }
                // Letter 'A' to increase collision detection radius
                if (e.keyCode === 65) {
                    window.collisionRadiusMultiplier++;
                    window.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                    userInterface.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
                }
                // Letter 'S' to decrease collision detection radius
                if (e.keyCode === 83) {
                    if (window.collisionRadiusMultiplier > 1) {
                        window.collisionRadiusMultiplier--;
                        window.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                        userInterface.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
                    }
                }
                // Letter 'D' to toggle defence mode
                if (e.keyCode === 68) {
                    window.defence = !window.defence;
                    window.log('Defence set to: ' + window.defence);
                    userInterface.savePreference('defence', window.defence);
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

                if (e.keyCode == 70) {
                    bot.changeClusteringAlgorithm();
                }
                // Save nickname when you press "Enter"
                if (e.keyCode == 13) {
                    userInterface.saveNick();
                }
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

        onFrameUpdate: function() {
            // Botstatus overlay
            var generalStyle = '<span style = "opacity: 0.35";>';
            window.botstatus_overlay.innerHTML = generalStyle + '(T / Right Click) Bot: </span>' + userInterface.handleTextColor(bot.isBotRunning);
            window.visualdebugging_overlay.innerHTML = generalStyle + '(Y) Visual debugging: </span>' + userInterface.handleTextColor(window.visualDebugging);
            window.logdebugging_overlay.innerHTML = generalStyle + '(U) Log debugging: </span>' + userInterface.handleTextColor(window.logDebugging);
            window.autorespawn_overlay.innerHTML = generalStyle + '(I) Auto respawning: </span>' + userInterface.handleTextColor(window.autoRespawn);
            window.rotateskin_overlay.innerHTML = generalStyle + '(W) Auto skin rotator: </span>' + userInterface.handleTextColor(window.rotateskin);
            window.rendermode_overlay.innerHTML = generalStyle + '(O) Mobile rendering: </span>' + userInterface.handleTextColor(window.mobileRender);
            window.huntprey_overlay.innerHTML = generalStyle + '(P) Prey hunting: </span>' + userInterface.handleTextColor(window.huntPrey);
            window.collision_detection_overlay.innerHTML = generalStyle + '(C) Collision detection: </span>' + userInterface.handleTextColor(window.collisionDetection);
            window.collision_radius_multiplier_overlay.innerHTML = generalStyle + '(A/S) Collision radius multiplier: ' + window.collisionRadiusMultiplier + ' </span>';
            window.defence_overlay.innerHTML = generalStyle + '(D) Defence: </span>' + userInterface.handleTextColor(window.defence);
            window.resetzoom_overlay.innerHTML = generalStyle + '(Z) Reset zoom </span>';
            window.scroll_overlay.innerHTML = generalStyle + '(Mouse Wheel) Zoom in/out </span>';
            window.quittomenu_overlay.innerHTML = generalStyle + '(Q) Quit to menu </span>';
            window.changeskin_overlay.innerHTML = generalStyle + '(X) Change skin </span>';

            window.clusteringchange_overlay.innerHTML = generalStyle + '(F) Switch clustering algorithm: ' + (bot.foodClusteringMode == 0 ? 'chancity' : 'ksofiyuk') + '</span>';
            window.quickResp_overlay.innerHTML = generalStyle + '(ESC) Quick Respawn </span>';
            window.fps_overlay.innerHTML = generalStyle + 'FPS: ' + userInterface.framesPerSecond.getFPS() + '</span>';

            if (window.position_overlay && window.playing) {
                // Display the X and Y of the snake
                window.position_overlay.innerHTML = generalStyle + 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0) + '</span>';
            }
            if (window.playing && window.ip_overlay) {
                window.ip_overlay.innerHTML = generalStyle + 'Server: ' + window.bso.ip + ':' + window.bso.po;
            }
            if (window.playing && window.visualDebugging && bot.isBotRunning) {
                // Only draw the goal when a bot has a goal.
                if (window.goalCoordinates && window.goalCoordinates.length == 2) {
                    var drawGoalCoordinates = canvas.mouseToScreen(window.goalCoordinates[0], window.goalCoordinates[1]);
                    drawGoalCoordinates = canvas.screenToCanvas(drawGoalCoordinates[0], drawGoalCoordinates[1]);
                    canvas.drawLine(drawGoalCoordinates[0], drawGoalCoordinates[1], 'green');
                    canvas.drawDot(drawGoalCoordinates[0], drawGoalCoordinates[1], 5, 'red', true);
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
            canvas.canvasRatio = [window.mc.width / window.getWidth(),
                window.mc.height / window.getHeight()
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

        // TODO: Check some condition to see if we should play defence
        // Right now this just uses the manual toggle
        if (window.defence) {
            bot.playDefence('l');
            return;
        }
        bot.thinkAboutGoals();
    } else {
        if (bot.ranOnce) {
            //window.startInterval = setInterval(bot.startBot, 1000);
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
    userInterface.loadPreference('huntPrey', true);
    userInterface.loadPreference('collisionDetection', true);
    userInterface.loadPreference('collisionRadiusMultiplier', 8);
    userInterface.loadPreference('defence', false);
    userInterface.loadPreference('rotateskin', false);
    window.nick.value = userInterface.loadPreference('savedNick', 'Slither.io-bot');

    // Overlays

    // Top left
    window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; z-index: 7;';
    userInterface.appendDiv('botstatus_overlay', 'nsi', window.generalstyle + 'left: 30; top: 65px;');
    userInterface.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 80px;');
    userInterface.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 95px;');
    userInterface.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle + 'left: 30; top: 110px;');
    userInterface.appendDiv('rendermode_overlay', 'nsi', window.generalstyle + 'left: 30; top: 125px;');
    userInterface.appendDiv('rotateskin_overlay', 'nsi', window.generalstyle + 'left: 30; top: 140px;');
    userInterface.appendDiv('collision_detection_overlay', 'nsi', window.generalstyle + 'left: 30; top: 155px;');
    userInterface.appendDiv('collision_radius_multiplier_overlay', 'nsi', window.generalstyle + 'left: 30; top: 170px;');
    userInterface.appendDiv('huntprey_overlay', 'nsi', window.generalstyle + 'left: 30; top: 185px;');
    userInterface.appendDiv('defence_overlay', 'nsi', window.generalstyle + 'left: 30; top: 200px;');
    userInterface.appendDiv('resetzoom_overlay', 'nsi', window.generalstyle + 'left: 30; top: 215px;');
    userInterface.appendDiv('scroll_overlay', 'nsi', window.generalstyle + 'left: 30; top: 230px;');
    userInterface.appendDiv('quickResp_overlay', 'nsi', window.generalstyle + 'left: 30; top: 245px;');
    userInterface.appendDiv('changeskin_overlay', 'nsi', window.generalstyle + 'left: 30; top: 260px;');
    userInterface.appendDiv('clusteringchange_overlay', 'nsi', window.generalstyle + 'left: 30; top: 275px;');
    userInterface.appendDiv('quittomenu_overlay', 'nsi', window.generalstyle + 'left: 30; top: 290px;');

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

    bot.foodClusteringMode = 0;
    // Unblocks all skins without the need for FB sharing.
    window.localStorage.setItem('edttsg', '1');

    // Remove social
    window.social.remove();

    // Start!
    bot.launchBot();
    window.startInterval = setInterval(bot.startBot, 1000);
})();



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
    window.Graph = exports.Graph;
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
  search: function(graph, start, end, options) {
    graph.cleanDirty();
    options = options || {};
    var heuristic = options.heuristic || astar.heuristics.manhattan;
    var closest = options.closest || false;

    var openHeap = getHeap();
    var closestNode = start; // set the start node to be the closest if required

    start.h = heuristic(start, end);
    graph.markDirty(start);

    openHeap.push(start);

    while (openHeap.size() > 0) {

      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      var currentNode = openHeap.pop();

      // End case -- result has been found, return the traced path.
      if (currentNode === end) {
        return pathTo(currentNode);
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = graph.neighbors(currentNode);

      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];

        if (neighbor.closed || neighbor.isWall()) {
          // Not a valid node to process, skip to next neighbor.
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.getCost(currentNode);
        var beenVisited = neighbor.visited;

        if (!beenVisited || gScore < neighbor.g) {

          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristic(neighbor, end);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          graph.markDirty(neighbor);
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
      var D2 = Math.sqrt(2);
      var d1 = Math.abs(pos1.x - pos0.x);
      var d2 = Math.abs(pos1.y - pos0.y);
      return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
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

/**
 * A graph memory structure
 * @param {Array} gridIn 2D array of input weights
 * @param {Object} [options]
 * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
 */
function Graph(gridIn, options) {
  options = options || {};
  this.nodes = [];
  this.diagonal = !!options.diagonal;
  this.grid = [];
  for (var x = 0; x < gridIn.length; x++) {
    this.grid[x] = [];

    for (var y = 0, row = gridIn[x]; y < row.length; y++) {
      var node = new GridNode(x, y, row[y]);
      this.grid[x][y] = node;
      this.nodes.push(node);
    }
  }
  this.init();
}

Graph.prototype.init = function() {
  this.dirtyNodes = [];
  for (var i = 0; i < this.nodes.length; i++) {
    astar.cleanNode(this.nodes[i]);
  }
};

Graph.prototype.cleanDirty = function() {
  for (var i = 0; i < this.dirtyNodes.length; i++) {
    astar.cleanNode(this.dirtyNodes[i]);
  }
  this.dirtyNodes = [];
};

Graph.prototype.markDirty = function(node) {
  this.dirtyNodes.push(node);
};

Graph.prototype.neighbors = function(node) {
  var ret = [];
  var x = node.x;
  var y = node.y;
  var grid = this.grid;

  // West
  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
  }

  // East
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
  }

  // South
  if (grid[x] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
  }

  // North
  if (grid[x] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
  }

  if (this.diagonal) {
    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
      ret.push(grid[x - 1][y - 1]);
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
      ret.push(grid[x + 1][y - 1]);
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
      ret.push(grid[x - 1][y + 1]);
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
      ret.push(grid[x + 1][y + 1]);
    }
  }

  return ret;
};

Graph.prototype.toString = function() {
  var graphString = [];
  var nodes = this.grid;
  for (var x = 0; x < nodes.length; x++) {
    var rowDebug = [];
    var row = nodes[x];
    for (var y = 0; y < row.length; y++) {
      rowDebug.push(row[y].weight);
    }
    graphString.push(rowDebug.join(" "));
  }
  return graphString.join("\n");
};

function GridNode(x, y, weight) {
  this.x = x;
  this.y = y;
  this.weight = weight;
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
  astar: astar,
  Graph: Graph
};

});
