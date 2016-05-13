var collisionHelper = (function() {
    return {
        unitTable: [],
        toRad: Math.PI / 180,
        toDeg: 180 / Math.PI,

        init: function() {
            collisionHelper.generateUnitTable();
            
        },

        /**
         *  Build the unit table grouping opposite angles and in 22.5 degree increments
         *
         */
        generateUnitTable: function() {
            var offset = 0;
            for(var a=0;a<4;a++) {
                collisionHelper.unitTable[a] = [];
                for(var b=0; b<4; b++) {
                    var angle = collisionHelper.toRad * (b*90+offset);
                    collisionHelper.unitTable[a].push([Math.cos(angle), Math.sin(angle)]);
                }
                offset+=22.5;
            }
        },

        /** 
         * Performs line scans in the E,N,W,S directions and rotates by 22.5 degrees * rotateCount
         *
         */
        surroundScan: function(rotateCount, scanDist) {
            var x = window.getX();
            var y = window.getY();

            var results = [];

            for(var dir=0; dir<4; dir++) {
                var pos = collisionHelper.unitTable[rotateCount][dir];
                var x2 = x+pos[0]*scanDist;
                var y2 = y+pos[1]*scanDist;

                var cell = collisionGrid.lineTest(x,y,x2,y2);
                if( cell )
                    results.push(cell);

                if( window.visualDebugging ) {
                    
                    var canvasPosA = canvas.collisionScreenToCanvas({
                        x: x,
                        y: y,
                        radius: 1
                    });
                    var canvasPosB = canvas.collisionScreenToCanvas({
                        x: x2,
                        y: y2,
                        radius: 1
                    });
                    
                    canvas.drawLine2(canvasPosA.x, canvasPosA.y, canvasPosB.x, canvasPosB.y, cell ? 'red' : 'green');
                }
                
            }
            return results;
        }
    }
})();