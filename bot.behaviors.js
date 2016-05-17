// ==UserScript==
// @name         Slither.io-bot
// @namespace    http://slither.io/
// @version      0.9.3
// @description  Slither.io bot
// @author       Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

var behaviors = (function() {
    return {
        init: function() {
            behaviors.newTask('actionFoodFollow', behaviors.actionFoodFollow);
            behaviors.newTask('actionFoodFind', behaviors.actionFoodFind);
            behaviors.newTask('actionSprint', behaviors.actionSprint);
            behaviors.newTask('actionWalk', behaviors.actionWalk);
            behaviors.newTask('actionToCenterOfMap', behaviors.actionToCenterOfMap);
            behaviors.newTask('actionStopFollow', behaviors.actionStopFollow);
            behaviors.newTask('actionNone', behaviors.actionNone);
            behaviors.newTask('actionAvoidSurround', behaviors.actionAvoidSurround);
            behaviors.newTask('action180FromSnake', behaviors.action180FromSnake);
            behaviors.newTask('actionTrollSurrounderer', behaviors.actionTrollSurrounderer);

            behaviors.newTask('isNearEnemySnakeBody', behaviors.isNearEnemySnakeBody);
            behaviors.newTask('isAlmostSurrounded', behaviors.isAlmostSurrounded);
            behaviors.newTask('isSurrounded', behaviors.isSurrounded);
            behaviors.newTask('isTouchingSnake', behaviors.isTouchingSnake);
            behaviors.newTask('isTargetBlockedBySnake', behaviors.isTargetBlockedBySnake);
            behaviors.newTask('isFoodExists', behaviors.isFoodExists);
            behaviors.newTask('isGoodFood', behaviors.isGoodFood);
            behaviors.newTask('isFollowingFood', behaviors.isFollowingFood);
            behaviors.newTask('isReachedTarget', behaviors.isReachedTarget);

            behaviors.newCondition('checkFoodFollowing', 'isFollowingFood', 'actionFoodFollow', 'checkFoodExists');
            behaviors.newCondition('checkFoodExists', 'isFoodExists', 'actionFoodFind', 'actionToCenterOfMap')
            behaviors.newCondition('checkFoodSprint', 'isGoodFood', 'actionSprint', 'actionWalk');
            behaviors.newCondition('checkFoodReached', 'isReachedTarget', 'actionStopFollow','actionNone');
            behaviors.newCondition('checkNearSnake', 'isNearEnemySnakeBody', 'action180FromSnake', 'actionNone');
            behaviors.newCondition('checkAvoidSurround', 'isAlmostSurrounded', 'sequenceAvoidSurround', 'actionNone');

            behaviors.newSequence('sequenceAvoidance', ['checkNearSnake', 'checkAvoidSurround']);
            behaviors.newSequence('sequenceAvoidSurround', ['actionSprint','actionAvoidSurround']);
            behaviors.newSequence('sequenceFindFood', ['sequenceAvoidance', 'checkFoodFollowing', 'checkFoodSprint', 'checkFoodReached']);

            behaviors.newTree('snakebot', ['sequenceFindFood']);
        },

        actionFoodFind: function(obj) {
            window.setAcceleration(0);
            var foodCnt = 0;
            var bestFood = 0;
            var foodPos;
            var destpos;
            var curpos = window.getPos();
            window.goalCoordinates = window.goalCoordinates || {x:0,y:0};

            for(var i=0; i<collisionGrid.foodGroups.length; i++) {
                bestFood = collisionGrid.foodGroups[i];
                var foodcnt = bestFood.nodes.length;
                foodPos = {x: bestFood.sumx / foodcnt, y:bestFood.sumy / foodcnt};
                destpos = collisionGrid.getCellByXY(foodPos.x, foodPos.y);

                var line = collisionGrid.lineTest(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y,TYPE_SNAKE);
                var linePos = collisionGrid.getCellByColRow(line.col,line.row);
                var collisionDist = canvas.getDistance2(curpos.x, curpos.y, linePos.x, linePos.y);
                if( collisionDist < 2500 )
                    continue;

                if( destpos.cell && destpos.cell.type==TYPE_FOOD)
                    break;
            }

            obj.foodTarget = bestFood;
            obj.followTime = (new Date()).getTime();

            window.goalCoordinates = {x: foodPos.x, y:foodPos.y};
            canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));

            this.success();
        },

        isPathAvailable: function(obj) {
            var curpos = window.getPos();
            var minpath = 3;
            var path = collisionGrid.generatePath(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y);
            var cell = collisionGrid.getCellByXY(window.goalCoordinates.x, window.goalCoordinates.y);

            if( path.length > minpath && cell.cell.type != TYPE_SNAKE ) {
                bot.currentPath = path;
                if( window.visualDebugging )
                    for(i=0; i<path.length; i++) {
                        if( i == minpath )
                            collisionGrid.drawCell(path[i].x, path[i].y, 'rgba(0,0,255,0.4)');
                        else
                            collisionGrid.drawCell(path[i].x, path[i].y, 'rgba(255,0,0,0.4)');
                    }


                var cell = collisionGrid.getCellByColRow(path[minpath].x, path[minpath].y);
                canvas.setMouseCoordinates(canvas.mapToMouse(cell));
                this.success();
            }
            else {
                this.fail();
            }
        },

        actionFoodFollow: function(obj) {
            var curpos = window.getPos();
            var minpath = 3;
            var path = collisionGrid.generatePath(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y);
            var cell = collisionGrid.getCellByXY(window.goalCoordinates.x, window.goalCoordinates.y);

            if( path.length > minpath && cell.cell.type != TYPE_SNAKE ) {
                bot.currentPath = path;
                if( window.visualDebugging )
                    for(i=0; i<path.length; i++) {
                        if( i == minpath )
                            collisionGrid.drawCell(path[i].x, path[i].y, 'rgba(0,0,255,0.4)');
                        else
                            collisionGrid.drawCell(path[i].x, path[i].y, 'rgba(255,0,0,0.4)');
                    }

                var cell = collisionGrid.getCellByColRow(path[minpath].x, path[minpath].y);
                canvas.setMouseCoordinates(canvas.mapToMouse(cell));
                this.success();
            }
            else {
                this.fail();
            }
        },

        action180FromSnake: function(obj) {
            if( !obj.aggressor ) {
                this.fail();
                return;
            }

            var newcoord = {
                x: window.snake.xx + (window.snake.xx - obj.aggressor.snk.closest.xx),
                y: window.snake.yy + (window.snake.yy - obj.aggressor.snk.closest.yy)
            };
            canvas.setMouseCoordinates(canvas.mapToMouse(newcoord));
            this.success();
        },

        /**
         *  Avoid surround by choosing a random open path from our radar
         */
        actionAvoidSurround: function(obj) {
            var linePos;
            if( !obj.surroundExitPos ) {
                var randomLine = parseInt(Math.random() * bot.radarResults.open.length);
                var line = bot.radarResults.open[randomLine];
                obj.surroundExitPos = collisionGrid.getCellByColRow(line.x,line.y);
            }

            window.goalCoordinates.x = obj.surroundExitPos.x;
            window.goalCoordinates.y = obj.surroundExitPos.y;
            canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
            this.success();
        },

        /**
         *  Troll the snake surrounding us.
         *  Keep moving the snake to the furthest point
         */
        actionTrollSurrounderer: function(obj) {
            var closest = bot.radarResults.collisions[0];
            var cell = closest.cell;
            var curpos = window.getPos();
            var newpos = {x:curpos.x,y:curpos.y};

            if( cell && cell.length ) {
                //console.log("moving away from snake part");
                newpos.x += curpos.x - cell[0].part.x;
                newpos.y += curpos.y - cell[0].part.y;
                window.goalCoordinates.x = linePos.x;
                window.goalCoordinates.y = linePos.y;
                canvas.setMouseCoordinates(canvas.mapToMouse(linePos));
                var dist = canvas.getDistance(curpos.x, curpos.y, cell[0].part.x, cell[0].part.y);
                if( dist > 100 ) {
                    bot.setNextState('findFood');
                }
            }
        },

        actionWalk: function(obj) {
            window.setAcceleration(0);
            this.success();
        },

        actionSprint: function(obj) {
            window.setAcceleration(1);
            this.success();
        },

        actionToCenterOfMap: function(obj) {
            this.success();
        },

        actionNone: function(obj) {
            this.success();
        },

        actionStopFollow: function(obj) {
            obj.followTime = 0;
            this.success();
        },

        isFoodExists: function(obj) {
            if( !collisionGrid.foodGroups.length ) {
                this.fail();
                return;
            }
            this.success();
        },

        isFollowingFood: function(obj) {
            var curtime = (new Date()).getTime();
            var diff = curtime - obj.followTime;
            if( diff <= 8000 ) {
                this.success();
                return;
            }
            this.fail();
        },

        isGoodFood: function(obj) {
            if( obj.foodTarget && obj.foodTarget.score > 50 ) {
                this.success();
                return;
            }
            this.fail();
        },

        isReachedTarget: function(obj) {
            var curpos = window.getPos();
            var dist = canvas.getDistance2(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y);
            if( dist < 2500 ) {
                this.success();
                return;
            }
            this.fail();
        },

        isNearEnemySnakeBody: function(obj) {
            var aggressorCnt = collisionGrid.snakeAggressors.length;
            var mindist = 22500;

            for(var i=0; i<aggressorCnt; i++) {
                var aggressor = collisionGrid.snakeAggressors[i];
                if( aggressor.snk.sp > 7 )
                    mindist = 90000;
                else
                    mindist = 22500;

                if( aggressor.snk.closest.distance2 < mindist ) {
                    obj.aggressor = aggressor;
                    this.success();
                    return;
                }
            }
            this.fail();
        },

        isAlmostSurrounded: function(obj) {
            if( bot.radarResults && bot.radarResults.pct < 0.30 ) {
                this.success();
                return;
            }
            this.fail();
        },

        isSurrounded: function(obj) {
            if( bot.radarResults && bot.radarResults.open.length == 0 ) {
                this.success();
                return;
            }
            this.fail();
        },


        isTouchingSnake: function(obj) {
            var curpos = window.getPos();
            var currentCell = collisionGrid.getCellByXY(curpos.x, curpos.y);
            if( currentCell.cell && currentCell.cell.type == TYPE_SNAKE ) {
                bot.setNextState('avoidBody');
                this.success();
                return;
            }
            this.fail();
        },


        isTargetBlockedBySnake: function(obj) {
            var line = collisionGrid.lineTest(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y,TYPE_SNAKE);
            var linePos = collisionGrid.getCellByColRow(line.col,line.row);
            var collisionDist = canvas.getDistance2(curpos.x, curpos.y, linePos.x, linePos.y);
            if( collisionDist < 2500 ) {

                var dir = {x:0,y:0};
                dir.x = curpos.x - linePos.x;
                dir.y = curpos.y - linePos.y;
                window.goalCoordinates.x = curpos.x + dir.x;
                window.goalCoordinates.y = curpos.y + dir.y;
                canvas.setMouseCoordinates(canvas.mapToMouse(window.goalCoordinates));
                bot.stopFollowLine(0);
                this.success();
                return;
            }
            this.fail();
        },





        trees: {},
        newTask: function(name, run, start, end) {
            start = start || function(obj){}
            end = end || function(obj){}
            BehaviorTree.register(
                name,
                new BehaviorTree.Task({
                    title: name,
                    run: run
                })
            );
        },

        newCondition: function(name, test, pass, fail) {
            BehaviorTree.register(
                name,
                new BehaviorTree.Condition({
                    title: name,
                    nodes: [test, pass, fail]
                })
            );
        },

        newSequence: function(name, nodes) {
            BehaviorTree.register(
                name,
                new BehaviorTree.Sequence({
                    title: name,
                    nodes: nodes
                })
            );
        },

        newTree: function(name, nodes) {
            behaviors.trees[name] = new BehaviorTree({
                title: name,
                tree: new BehaviorTree.Sequence({
                    nodes: nodes
                })
            });
        },

        invertTask: function(name) {
            return new InvertDecorator({
                title: 'inverted_'+name,
                node:new BehaviorTree.Sequence({
                    title:'inverted_seq_'+name,
                    nodes: [ name ]
                })
            });
        },

        object: function(treeName, obj) {
            behaviors.trees[treeName].setObject(obj);
        },

        run: function(treeName) {
            behaviors.trees[treeName].step();
        }
    };
})();

behaviors.init();