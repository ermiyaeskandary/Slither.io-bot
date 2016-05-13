
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
        width: window.getWidth(),
        height: window.getHeight(),

        //clone for fast slicing
        grid: [],
        bgrid: [],
        cellSize: 20,
        startX: 0,
        startY: 0,
        gridWidth: 0,
        gridHeight: 0,
        endX: 0,
        endY: 0,
        astarGraph: 0,
        astarResult: 0,
        
        dirty: [],

        initGrid: function(sx, sy, w, h, cellsz) {
            sx = sx - (sx % cellsz);
            sy = sy - (sy % cellsz);
            collisionGrid.startX = sx - w/2;
            collisionGrid.startY = sy - h/2;
            collisionGrid.endX = collisionGrid.startX + w;
            collisionGrid.endY = collisionGrid.startY + h;

            collisionGrid.gridWidth = w;
            collisionGrid.gridHeight = h;
            collisionGrid.height = h * cellsz;
            collisionGrid.width = w * cellsz;
            collisionGrid.cellSize = cellsz;
            
            collisionGrid.booleanGrid = [];
            //collisionGrid.grid = [];

            if( !collisionGrid.grid.length ) {
                for(var x=0; x<w; x++) {
                    for(var y=0; y<h; y++) {
                        if( y == 0 ) {
                            collisionGrid.grid[x] = [];
                            collisionGrid.bgrid[x] = [];
                        }
                        collisionGrid.grid[x][y] = [];
                        collisionGrid.bgrid[x][y] = 1;
                    }
                }
            }
            else {
                for(var i=0; i<collisionGrid.dirty.length; i++) {
                    var pos = collisionGrid.dirty[i];
                    collisionGrid.grid[pos[0]][pos[1]] = [];
                    collisionGrid.bgrid[pos[0]][pos[1]] = 1;
                }
                delete dirty;
                dirty = [];
            }
            

            collisionGrid.addSnakes();

            //astarGraph = new Graph(collisionGrid.bgrid);
            //collisionGrid.setupGrid();
        },

        setupGrid: function() {
            
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
                    callback(x, y, collisionGrid.grid[x][y]);
                }
            }
        },

        // Find specific cell using world-space position
        getCellByXY: function(x, y) {
            var col = (x - (x % collisionGrid.cellSize)) - collisionGrid.startX;
            var row = (y - (y % collisionGrid.cellSize)) - collisionGrid.startY;
            col = parseInt(Math.floor(col / collisionGrid.cellSize));
            row = parseInt(Math.floor(row / collisionGrid.cellSize));
            col = Math.min(Math.max(col, 0), collisionGrid.gridWidth);
            row = Math.min(Math.max(row, 0), collisionGrid.gridHeight);
            return [col, row, collisionGrid.grid[col][row]];
        },

        // Get cell world-space position at top left corner of cell
        getCellByColRow: function(col, row) {
            var x = collisionGrid.startX + col*collisionGrid.cellSize;
            var y = collisionGrid.startY + row*collisionGrid.cellSize;
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
            return collisionGrid.grid[col][row];
        },

        markCell: function(col, row, obj) {
            collisionGrid.grid[col][row].push(obj);
            collisionGrid.dirty.push([col,row]);
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