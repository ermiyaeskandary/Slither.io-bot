// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.9.3
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==


var collisionHelper = (function() {
    return {
        unitTable: [],
        toRad: 0,
        toDeg: 0,

        init: function() {
            collisionHelper.toRad = Math.PI / 180;
            collisionHelper.toDeg = 180 / Math.PI;
            collisionHelper.generateUnitTable();

        },


        /**
         *  Build the unit table for X,Y unit vectors for 0 to 360 degrees
         *
         */
        generateUnitTable: function() {
            var offset = 0;
            for(var a=0;a<360; a++) {
                var angle = collisionHelper.toRad * offset;
                collisionHelper.unitTable.push([Math.cos(angle), Math.sin(angle)]);
                offset++;
            }
        },


        /**
         * Performs line scans in angleIncrements to a specified distance
         *
         */
        radarScan: function(angleIncrement,scanDist) {

            var results = [];
            var collisions = [];
            var open = [];
            var curpos = window.getPos();
            for(var dir=0; dir<collisionHelper.unitTable.length; dir+=angleIncrement) {
                var pos = collisionHelper.unitTable[dir];
                var x2 = curpos.x+pos[0]*scanDist;
                var y2 = curpos.y+pos[1]*scanDist;

                var result = collisionGrid.lineTest(curpos.x,curpos.y,x2,y2,TYPE_SNAKE);
                if( result )
                    results.push(result);

                if( result.cell ) {
                    var linePos = collisionGrid.getCellByColRow(result.col, result.row);
                    var dist = canvas.getDistance2(curpos.x, curpos.y, linePos.x, linePos.y);
                    collisions.push({dist:dist, line:result});
                }
                else
                    open.push(result);

                if( window.visualDebugging ) {

                    var canvasPosA = canvas.mapToCanvas({
                        x: curpos.x,
                        y: curpos.y,
                        radius: 1
                    });
                    var canvasPosB = canvas.mapToCanvas({
                        x: x2,
                        y: y2,
                        radius: 1
                    });

                    var color = (!result.cell||result.cell.type==TYPE_EMPTY) ? 'green' : ((result.cell.type==TYPE_FOOD) ? 'blue' : 'red');
                    if( color != 'green')
                    canvas.drawLine2(canvasPosA.x, canvasPosA.y, canvasPosB.x, canvasPosB.y, 1, color);
                }
            }

            if( collisions.length )
                collisions.sort(function(a,b) {
                    return a.dist - b.dist;
                });

            var pct = 0.0;
            if( results.length )
                pct = open.length / results.length;

            return {pct:pct, open:open, collisions:collisions, results:results};
        },


        /**
         *  Check if two lines intersect.  Returns intersection point and if line segments are touching
         */
        checkLineIntersection: function(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
            // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
            var denominator;
            var a;
            var b;
            var numerator1;
            var numerator2;
            var result = {
                    x: null,
                    y: null,
                    onLine1: false,
                    onLine2: false
                };
            denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
            if (denominator == 0) {
                return result;
            }
            a = line1StartY - line2StartY;
            b = line1StartX - line2StartX;
            numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
            numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
            a = numerator1 / denominator;
            b = numerator2 / denominator;

            // if we cast these lines infinitely in both directions, they intersect here:
            result.x = line1StartX + (a * (line1EndX - line1StartX));
            result.y = line1StartY + (a * (line1EndY - line1StartY));
            /*
            // it is worth noting that this should be the same as:
            x = line2StartX + (b * (line2EndX - line2StartX));
            y = line2StartX + (b * (line2EndY - line2StartY));
            */
            // if line1 is a segment and line2 is infinite, they intersect if:
            if (a > 0 && a < 1) {
                result.onLine1 = true;
            }
            // if line2 is a segment and line1 is infinite, they intersect if:
            if (b > 0 && b < 1) {
                result.onLine2 = true;
            }
            // if line1 and line2 are segments, they intersect if both of the above are true
            return result;
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
        grid: [],
        cellSize: 20,
        halfCellSize: 10,
        startX: 0,
        startY: 0,
        gridWidth: 0,
        gridHeight: 0,
        endX: 0,
        endY: 0,
        foodGroups: [],
        foodHighQuality: [],
        snakeAggressors: [],

        init: function(w, h, cellsz) {
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
            collisionGrid.endX = collisionGrid.startX + collisionGrid.width;
            collisionGrid.endY = collisionGrid.startY + collisionGrid.height;

            collisionGrid.booleanGrid = [];
            collisionGrid.grid = [];
            collisionGrid.foodGroups = [];
            collisionGrid.foodHighQuality = [];
            collisionGrid.snakeAggressors = [];
            collisionGrid.addSnakes();
            collisionGrid.addFood();
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
                    collisionGrid.grid[x][y] = collisionGrid.grid[x][y] || 0;
                    callback(x, y, collisionGrid.grid[x][y]);
                }
            }
        },

        // Find specific cell's column and row using map-space position
        getCellByXY: function(x, y) {
            x = x - collisionGrid.startX;
            y = y - collisionGrid.startY;
            col = parseInt(Math.floor(x / collisionGrid.cellSize));
            row = parseInt(Math.floor(y / collisionGrid.cellSize));
            col = Math.min(Math.max(col, 0), collisionGrid.gridWidth);
            row = Math.min(Math.max(row, 0), collisionGrid.gridHeight);
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || 0;
            return {col:col, row:row, cell:collisionGrid.grid[col][row]};
        },

        // Get cell's map-space position at top left corner of cell
        getCellByColRow: function(col, row) {
            var x = collisionGrid.startX + (col*collisionGrid.cellSize) + collisionGrid.halfCellSize;
            var y = collisionGrid.startY + (row*collisionGrid.cellSize) + collisionGrid.halfCellSize;
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || 0;
            return {x:x, y:y, cell:collisionGrid.grid[col][row]};
        },

        // This is used to convert a width or height to the amount of cells it would occupy
        calculateMaxCellCount: function(sz) {
            return parseInt(Math.floor(sz / collisionGrid.cellSize));
        },

        // set cell size
        setCellSize: function(sz) {
            collisionGrid.cellSize = sz;
        },

        getCell: function(col,row) {
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            collisionGrid.grid[col][row] = collisionGrid.grid[col][row] || 0;
            return collisionGrid.grid[col][row];
        },

        cellTest: function(col, row, type) {
            cell = collisionGrid.getCell(col, row);  // first point
            if( cell && cell.type == type)
                return cell;
            if( !cell && type==TYPE_EMPTY)
                return collisionGrid.markCellEmpty(col,row);
            return false;
        },

        markCell: function(col, row, weight, type) {
            collisionGrid.grid[col] = collisionGrid.grid[col] || [];
            var node = collisionGrid.grid[col][row];
            if( !node || (type==TYPE_SNAKE && node.type!=TYPE_SNAKE)) {
                node = new GridNode(col, row, weight, type);
            }
            collisionGrid.grid[col][row] = node;
            return node;
        },

        markCellWall: function(col, row, obj) {
            var node = collisionGrid.markCell(col, row, 0, TYPE_SNAKE);
            node.items.push(obj);
            if( window.visualDebugging && node.items.length == 1 )
                collisionGrid.drawCell(col,row,'yellow');
            return node;
        },

        markCellEmpty: function(col, row, weight) {
            weight = weight || 1000;
            var node = collisionGrid.markCell(col, row, weight, TYPE_EMPTY);
            //node.items.push(obj);
            return node;
        },

        markCellFood: function(col, row, food) {
            var node = collisionGrid.markCell(col, row, food.sz, TYPE_FOOD);
            node.items.push(food);
            return node;
        },

        isWall: function(col, row) {
            return collisionGrid.grid[col]
            && collisionGrid.grid[col][row]
            && collisionGrid.grid[col][row].type == TYPE_SNAKE;
        },

        isEmpty: function(col, row) {
            return collisionGrid.grid[col] && !collisionGrid.grid[col][row];
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

            var node = collisionGrid.grid[x][y] || collisionGrid.markCellEmpty(x,y);;
            if( node.type == TYPE_SNAKE )
                return;

            arr.push(collisionGrid.grid[x][y]);
        },

        neighbors: function(x, y) {
            var ret = [];
            collisionGrid.addNeighbor(x-1, y, ret); //West
            collisionGrid.addNeighbor(x+1, y, ret); //East
            collisionGrid.addNeighbor(x, y-1, ret); //South
            collisionGrid.addNeighbor(x, y+1, ret); //North
            collisionGrid.addNeighbor(x-1, y-1, ret); // Southwest
            collisionGrid.addNeighbor(x+1, y-1, ret); // Southeast
            collisionGrid.addNeighbor(x-1, y+1, ret); // Northwest
            collisionGrid.addNeighbor(x+1, y+1, ret); // Northeast
            return ret;
        },

        generatePath: function(startX, startY, endX, endY) {
            var startCell = collisionGrid.getCellByXY(startX,startY);
            var endCell = collisionGrid.getCellByXY(endX,endY);

            var start = collisionGrid.getCell(startCell.col, startCell.row) ||
                collisionGrid.markCellEmpty(startCell.col, startCell.row);
            var end = collisionGrid.getCell(endCell.col, endCell.row) ||
                collisionGrid.markCellEmpty(endCell.col, endCell.row);

            var path = astar.search(start, end);
            return path;
        },

        addFood: function() {
            collisionGrid.foodGroups = [];
            var foodGroupIDs = {};
            var highQualityIDs = {};
            var foodGridSize = 10;
            var foodCellSize = 100;
            var foodCellSizeHalf = foodCellSize / 2;
            var curpos = window.getPos();
            var center = collisionGrid.getCellByXY(curpos.x,curpos.y);
            curpos.x = parseInt(Math.floor(curpos.x));
            curpos.y = parseInt(Math.floor(curpos.y));
            curpos.x = curpos.x - (curpos.x % foodCellSize);
            curpos.y = curpos.y - (curpos.y % foodCellSize);
            var startX = Math.floor(curpos.x - ((foodGridSize/2)*foodCellSize));
            var startY = Math.floor(curpos.y - ((foodGridSize/2)*foodCellSize));
            var endX = startX + foodGridSize * foodCellSize;
            var endY = startY + foodGridSize * foodCellSize;
            var x, y, col, row;
            var food, cell, node, distance2;
            var i, id, groupid, group;
            var dot;

            for(i=0; i<window.foods.length; i++) {
                food = window.foods[i];
                if( food === null || food === undefined || food.eaten )
                    continue;

                if( food.xx < startX ||
                    food.xx > endX ||
                    food.yy < startY ||
                    food.yy > endY )
                    continue;



                x = food.xx - startX;
                y = food.yy - startY;
                col = parseInt(Math.floor(x / foodCellSize));
                row = parseInt(Math.floor(y / foodCellSize));
                col = Math.min(Math.max(col, 0), foodGridSize);
                row = Math.min(Math.max(row, 0), foodGridSize);

                cell = collisionGrid.getCellByXY(food.xx, food.yy);
                node = collisionGrid.markCellFood(cell.col, cell.row, food);

                if( node ) {
                    distance2 = canvas.getDistance2(food.xx, food.yy, curpos.x, curpos.y);
                    food.distance2 = distance2;
                    id = col+','+row;
                    groupid = foodGroupIDs[id] || 0;
                    if( !groupid )
                        groupid = collisionGrid.foodGroups.length;

                    group = collisionGrid.foodGroups[groupid] || 0;
                    if( !group )
                        group = {sumx:0, sumy:0, nodes:[], col:0, row:0, score:0, maxfood:0, distance2:-1};

                    group.nodes.push({x:food.xx, y:food.yy, distance2:distance2, node:node})
                    group.sumx += food.xx;
                    group.sumy += food.yy;
                    group.score += parseInt(food.sz);
                    group.maxfood = food
                    group.col = col;
                    group.row = row;
                    if( !group.maxfood || food.sz > group.maxfood.sz ) {
                        group.maxfood = food.sz;
                    }
                    if( group.distance2 == -1 || distance2 > group.distance2 )
                        group.distance2 = distance2;
                    collisionGrid.foodGroups[groupid] = group;
                    foodGroupIDs[id] = groupid;
                }

            }

            var tempGroup = [];
            for( var i=0; i<collisionGrid.foodGroups.length; i++) {
                var foodgroup = collisionGrid.foodGroups[i];
                if( foodgroup.score > 50 ) {
                    collisionGrid.foodHighQuality.push(foodgroup);
                }
                else {
                    var food = foodgroup.nodes[0];
                    var dir = {x:0, y:0};
                    dir.x = food.xx - curpos.x;
                    dir.y = food.yy - curpos.y;

                    dot = canvas.getDotProduct(dir.x, dir.y,
                            bot.heading.x, bot.heading.y)
                    if( dot < 0 )
                        continue;

                    tempGroup.push(foodgroup);
                }
            }
            /*
            if( window.visualDebugging ) {
                for( var i=0; i<collisionGrid.foodGroups.length; i++) {
                    var foodgroup = collisionGrid.foodGroups[i];
                    var foodcnt = foodgroup.nodes.length;
                    foodPos = {x: foodgroup.sumx / foodcnt, y:foodgroup.sumy / foodcnt};

                    var mapPos = {x: startX + (foodgroup.col*foodCellSize), y: startY + (foodgroup.row*foodCellSize)};
                    var canvasPos = canvas.mapToCanvas(mapPos);
                    canvas.drawRect(
                        canvasPos.x,
                        canvasPos.y,
                        foodCellSize * canvas.getScale(),
                        foodCellSize * canvas.getScale(),
                        'rgba(0,255,0,0.25)');

                    canvas.drawText(canvasPos, 'white', "("+foodgroup.col+","+foodgroup.row+")"+foodgroup.score);
                    //console.log("FoodGroup("+foodgroup.col+","+foodgroup.row+") = " + collisionGrid.foodGroups[groupid].score);
                }
            }
            */
            collisionGrid.foodHighQuality.sort(function(a,b) {
                return b.score - a.score;//(a.score == b.score ? 0 : (a.score / a.distance) > (b.score / b.distance)  ? -1 : 1);
            });

            tempGroup.sort(function(a,b) {
                return b.score - a.score;//(a.score == b.score ? 0 : (a.score / a.distance) > (b.score / b.distance)  ? -1 : 1);
            });

            collisionGrid.foodGroups = collisionGrid.foodHighQuality.concat(tempGroup);
            //collisionGrid.foodGroups.concat(collisionGrid.foodHighQuality);
            //collisionGrid.foodGroups.concat(tempGroup);


        },

        // add all snake's collision parts to the grid
        addSnakes: function() {
            var myX = window.getX();
            var myY = window.getY();

            var lastAlive = 0;
            var deadCount = 0;
            var maxDeadCount = 2;
            var pts, part, threat;
            var snk, cnt, relPos, snakeDist, rang;
            for (snakeid in window.snakes) {
                snk = window.snakes[snakeid];
                if (snk.id == window.snake.id)
                    continue;
                cnt = 0;

                snk.closest = 0;

                relPos = {x:(myX-snk.xx), y:(myY-snk.yy)}
                snakeDist = canvas.getDistance2(myX, myY, snk.xx, snk.yy);
                rang = snk.ang * collisionHelper.toRad;
                collisionGrid.snakeAggressors.push({
                    snk:snk,
                    distance2:snakeDist,
                    relativePos:relPos,
                    heading:{x:Math.cos(rang),y:Math.sin(rang)}
                });

                if( snk.xx > collisionGrid.startX && snk.xx < collisionGrid.endX &&
                    snk.yy > collisionGrid.startY && snk.yy < collisionGrid.endY) {
                    threat = collisionGrid.setupSnakeThreatRadius(snk);
                    collisionGrid.snakePartBounds(snk,snk,threat);
                }


                for (pts=snk.pts.length-1; pts>=0; pts--) {// in snk.pts) {
                    part = snk.pts[pts];

                    if (part.dying) {
                        if( deadCount++ > maxDeadCount )
                            continue;
                    }


                    lastAlive = pts;
                    //only add parts that are within our grid bounds
                    if( part.xx < collisionGrid.startX || part.xx > collisionGrid.endX ||
                        part.yy < collisionGrid.startY || part.yy > collisionGrid.endY)
                        continue;


                    //canvas.drawText(canvas.mapToCanvas({x:part.xx, y:part.yy}), 'red', ''+pts);
                    threat = collisionGrid.setupSnakeThreatRadius(snk);
                    collisionGrid.snakePartBounds(snk, part, threat);
                }

                if( window.visualDebugging && snk.closest) {
                    canvas.drawCircle(canvas.circleMapToCanvas({x:snk.closest.xx, y:snk.closest.yy, radius:window.getSnakeWidth(snk.sc)}), 'orange', false);
                    canvas.drawCircle(canvas.circleMapToCanvas({x:snk.xx, y:snk.yy, radius:window.getSnakeWidth(snk.sc)}), 'red', false);
                }
            }

            collisionGrid.snakeAggressors.sort(function(a,b) {
                return a.distance2 - b.distance2;
            });
        },

        findClosestPart: function(snk, part) {
            var curpos = window.getPos();
            var dist2 = canvas.getDistance2(curpos.x, curpos.y, part.xx, part.yy);
            part.distance2 = dist2 - (window.getSnakeWidthSqr() + window.getSnakeWidthSqr(snk));
            if( snk.closest == 0 ) {
                snk.closest = part;
                return;
            }
            if( dist2 < snk.closest.distance2 ) {
                snk.closest = part;
            }
        },

        setupSnakeThreatRadius: function(snk, sizemultiplier) {
            sizemultiplier = sizemultiplier || 0.8;
            threatLevels = {};
            threatLevels.radius = window.getSnakeWidth(snk.sc);
            threatLevels.radius = Math.max(threatLevels.radius, 30) * sizemultiplier;
            threatLevels.t1 = collisionGrid.calculateMaxCellCount(threatLevels.radius);
            threatLevels.tt1 = threatLevels.t1*2;
            threatLevels.t2 = collisionGrid.calculateMaxCellCount(threatLevels.radius * 1.5);
            threatLevels.tt2 = threatLevels.t2*2;
            threatLevels.t3 = collisionGrid.calculateMaxCellCount(threatLevels.radius * 2);
            threatLevels.tt3 = threatLevels.t3*2;
            threatLevels.t4 = collisionGrid.calculateMaxCellCount(threatLevels.radius * 3);
            threatLevels.tt4 = threatLevels.t4*2;
            threatLevels.max = collisionGrid.calculateMaxCellCount(threatLevels.radius * 5);
            threatLevels.max2 = threatLevels.max*2;
            return threatLevels;
        },

        snakePartBounds: function(snk, part, threatLevels) {

            collisionGrid.findClosestPart(snk,part);

            //calculate grid width/height of a snake part
            var cell = collisionGrid.getCellByXY(part.xx, part.yy);

            //mark cell where part's center is located
            collisionGrid.markCellWall(cell.col, cell.row, {snake:snk, part:part});
            //canvas.drawCircle(canvas.mapToCanvas({x:part.xx, y:part.yy}), 'red', true);

            //mark surrounding cells using part's radius
            var maxthreat = threatLevels.t4;
            var maxthreat2 = threatLevels.tt4;
            collisionGrid.sliceGrid(cell.col-maxthreat, cell.row-maxthreat, maxthreat2, maxthreat2,
                function(col, row, val) {
                    if( val && val.type != TYPE_SNAKE && val.type != TYPE_EMPTY ) return;

                    if( col >= (cell.col-threatLevels.t1) &&
                        col <= (cell.col+threatLevels.tt1) &&
                        row >= (cell.row-threatLevels.t1) &&
                        row <= (cell.row+threatLevels.tt1) ) {
                        var cellData = {snake:snk, part:part};
                        collisionGrid.markCellWall(col, row, cellData);
                    }
                    else if( col >= (cell.col-threatLevels.t2) &&
                        col <= (cell.col+threatLevels.tt2) &&
                        row >= (cell.row-threatLevels.t2) &&
                        row <= (cell.row+threatLevels.tt2) ) {
                        collisionGrid.markCellEmpty(col, row, 10000)
                    }
                    else if( col >= (cell.col-threatLevels.t3) &&
                        col <= (cell.col+threatLevels.tt3) &&
                        row >= (cell.row-threatLevels.t3)&&
                        row <= (cell.row+threatLevels.tt3) ) {
                        collisionGrid.markCellEmpty(col, row, 10000)
                    }
                    else if( col >= (cell.col-threatLevels.t4) &&
                        col <= (cell.col+threatLevels.tt4) &&
                        row >= (cell.row-threatLevels.t4) &&
                        row <= (cell.row+threatLevels.tt4) ) {
                        collisionGrid.markCellEmpty(col, row, 10000)
                    }
                    else {
                        collisionGrid.markCellEmpty(col, row, 10000)
                    }
                }
            );
        },


        lineTestResult: 0,
        lineTypeCheck: function(col, row, type) {
            var cell = collisionGrid.cellTest(col, row, type);
            if( cell !== false )
                collisionGrid.lineTestResult = {col:col, row:row, cell:cell};
            return collisionGrid.lineTestResult;
        },

        lineTest: function(x1, y1, x2, y2, type) {
            collisionGrid.lineTestResult = 0;
            var posA = collisionGrid.getCellByXY(x1, y1);
            var posB = collisionGrid.getCellByXY(x2, y2);
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

            if( collisionGrid.lineTypeCheck(x1, y1, type) ) return collisionGrid.lineTestResult;

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
                for (i=0 ; i < dx ; i+=2) {  // do not use the first point (already done)
                    x += xstep*2;
                    error += ddy*2;
                    if (error > ddx) {  // increment y if AFTER the middle ( > )
                        y += ystep*2;
                        error -= ddx*2;
                        // three cases (octant == right->right-top for directions below):
                        if (error + errorprev < ddx) {  // bottom square also
                            if( collisionGrid.lineTypeCheck(x, y-ystep,type) ) return collisionGrid.lineTestResult;
                        }
                        else if (error + errorprev > ddx) { // left square also
                            if( collisionGrid.lineTypeCheck(x-xstep, y,type) ) return collisionGrid.lineTestResult;

                        }
                        else {  // corner: bottom and left squares also
                            if( collisionGrid.lineTypeCheck(x, y-ystep,type) ) return collisionGrid.lineTestResult;
                            if( collisionGrid.lineTypeCheck(x-xstep, y,type) ) return collisionGrid.lineTestResult;
                        }
                    }
                    if( (cell = collisionGrid.cellTest(x, y,type)) !== false ) return {x:x, y:y, cell:cell};
                    errorprev = error;
                }
            }
            else {  // the same as above
                errorprev = error = dy;
                for (i=0 ; i < dy ; i+=2) {
                    y += ystep*2;
                    error += ddx*2;
                    if (error > ddy) {
                        x += xstep*2;
                        error -= ddy*2;
                        if (error + errorprev < ddy) {
                            if( collisionGrid.lineTypeCheck(x-xstep, y,type) ) return collisionGrid.lineTestResult;
                        }
                        else if (error + errorprev > ddy) {
                            if( collisionGrid.lineTypeCheck(x, y-ystep,type) ) return collisionGrid.lineTestResult;
                        }
                        else {
                            if( collisionGrid.lineTypeCheck(x-xstep, y,type) ) return collisionGrid.lineTestResult;
                            if( collisionGrid.lineTypeCheck(x, y-ystep,type) ) return collisionGrid.lineTestResult;
                        }
                    }
                    if( collisionGrid.lineTypeCheck(x, y, type) ) return collisionGrid.lineTestResult;
                    errorprev = error;
                }
            }

            return {col:x, row:y, cell:0};
        }
    };
})();
