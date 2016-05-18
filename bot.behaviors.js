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

            behaviors.newTask('actionSuggestFood', behaviors.actionSuggestFood);
            behaviors.newTask('actionSprint', behaviors.actionSprint);
            behaviors.newTask('actionWalk', behaviors.actionWalk);
            behaviors.newTask('actionToCenterOfMap', behaviors.actionToCenterOfMap);
            behaviors.newTask('actionStopFollow', behaviors.actionStopFollow);
            behaviors.newTask('actionNone', behaviors.actionNone);
            behaviors.newTask('actionAvoidSurround', behaviors.actionAvoidSurround);
            behaviors.newTask('action180FromSnake', behaviors.action180FromSnake);
            behaviors.newTask('actionTrollSurrounderer', behaviors.actionTrollSurrounderer);
            behaviors.newTask('actionMoveToGoal', behaviors.actionMoveToGoal);
            behaviors.newTask('actionFollowPath', behaviors.actionFollowPath);

            behaviors.newTask('isPathAvailable', behaviors.isPathAvailable);
            behaviors.newTask('isNearEnemySnakeBody', behaviors.isNearEnemySnakeBody);
            behaviors.newTask('isAlmostSurrounded', behaviors.isAlmostSurrounded);
            behaviors.newTask('isSurrounded', behaviors.isSurrounded);
            behaviors.newTask('isTouchingSnake', behaviors.isTouchingSnake);
            behaviors.newTask('isTargetBlockedBySnake', behaviors.isTargetBlockedBySnake);
            behaviors.newTask('isFoodExists', behaviors.isFoodExists);
            behaviors.newTask('isGoodFood', behaviors.isGoodFood);
            behaviors.newTask('isFollowingFood', behaviors.isFollowingFood);
            behaviors.newTask('isReachedTarget', behaviors.isReachedTarget);
            behaviors.newTask('isHighQualityFoodAvailable', behaviors.isHighQualityFoodAvailable);


            behaviors.newCondition('checkFoodFollowing', 'isFollowingFood', 'checkPath', 'checkFoodExists');
            behaviors.newCondition('checkFoodExists', 'isFoodExists', 'actionSuggestFood', 'actionToCenterOfMap')
            behaviors.newCondition('checkFoodSprint', 'isGoodFood', 'actionSprint', 'actionWalk');
            behaviors.newCondition('checkHighQualityFood', 'isHighQualityFoodAvailable', 'sequenceResetFoodSuggestion', 'actionNone');
            behaviors.newCondition('checkFoodReached', 'isReachedTarget', 'actionStopFollow','checkHighQualityFood');
            behaviors.newCondition('checkNearSnake', 'isNearEnemySnakeBody', 'action180FromSnake', 'actionNone');
            behaviors.newCondition('checkAvoidSurround', 'isAlmostSurrounded', 'sequenceAvoidSurround', 'actionNone');
            behaviors.newCondition('checkPath', 'isPathAvailable', 'actionFollowPath', 'actionMoveToGoal');

            behaviors.newSequence('sequenceAvoidSurround', ['actionSprint','actionAvoidSurround']);
            behaviors.newSequence('sequenceAvoidance', ['checkNearSnake', 'checkAvoidSurround']);
            behaviors.newSequence('sequenceResetFoodSuggestion', ['actionStopFollow', 'actionSuggestFood']);
            behaviors.newSequence('sequenceFindFood', ['sequenceAvoidance', 'checkFoodFollowing', 'checkFoodSprint', 'checkFoodReached']);
            /*
            behaviors.newSequence('sequenceFoodTest',
                [
                    'checkFoodFollowing',
                    behaviors.condition(
                        'isFollowingFood',
                        behaviors.condition(
                            'isPathAvailable',
                            'actionFollowPath',
                            'actionMoveToGoal'
                        );
                        behaviors.condition(
                            'isFoodExists'
                        );
                    ),

                    'checkFoodSprint',
                    'checkFoodReached'
                ]
            );*/

            behaviors.newTree('snakebot', ['sequenceFindFood']);
        },

        actionSuggestFood: function(obj) {
            window.setAcceleration(0);
            var foodCnt = 0;
            var bestFood = 0;
            var foodPos;
            var destpos;
            var curpos = window.getPos();

            for(var i=0; i<collisionGrid.foodGroups.length; i++) {
                bestFood = collisionGrid.foodGroups[i];
                var foodcnt = bestFood.nodes.length;
                foodPos = {x: bestFood.sumx / foodcnt, y:bestFood.sumy / foodcnt};
                destpos = collisionGrid.getCellByXY(foodPos.x, foodPos.y);

                var line = collisionGrid.lineTest(curpos.x, curpos.y, foodPos.x, foodPos.y,TYPE_SNAKE);
                var linePos = collisionGrid.getCellByColRow(line.col,line.row);
                //var collisionDist = canvas.getDistance2(curpos.x, curpos.y, linePos.x, linePos.y);
                if( line.cell )
                    continue;

                //if( collisionDist < 2500 )
                //    continue;

                if( destpos.cell && destpos.cell.type==TYPE_FOOD)
                    break;
            }

            obj.foodTarget = bestFood;
            obj.followTime = (new Date()).getTime();
            obj.followCoordinates = {x: foodPos.x, y:foodPos.y};
            obj.goalCoordinates = {x: foodPos.x, y:foodPos.y};

            this.success();
        },

        isHighQualityFoodAvailable: function(obj) {
            if( collisionGrid.foodGroups.length ) {
                if( collisionGrid.foodGroups[0].score > 50 ) {
                    this.success();
                    return;
                }
            }
            this.fail();
        },

        actionMoveToGoal: function(obj) {
            canvas.setMouseCoordinates(canvas.mapToMouse(obj.goalCoordinates));
            this.success();
            //console.log("following goal");
        },

        actionFollowPath: function(obj) {
            canvas.setMouseCoordinates(canvas.mapToMouse(obj.followCoordinates));
            //console.log("following path" + obj.followCoordinates.x + "," + obj.followCoordinates.y);
            this.success();
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
            obj.followCoordinates = {x: newcoord.x, y:newcoord.x};
            obj.goalCoordinates = {x: newcoord.x, y:newcoord.y};
            this.success();
        },

        /**
         *  Avoid surround by choosing a random open path from our radar
         */
        actionAvoidSurround: function(obj) {

            if( !bot.radarResults.open.length ) {
                this.fail();
                return false;
            }

            var linePos;
            if( !obj.surroundExitPos ) {
                var randomLine = parseInt(Math.random() * bot.radarResults.open.length);
                var line = bot.radarResults.open[randomLine];
                obj.surroundExitPos = collisionGrid.getCellByColRow(line.x,line.y);
            }

            obj.followCoordinates = {x: obj.surroundExitPos.x, y:obj.surroundExitPos.y};
            obj.goalCoordinates = {x: obj.surroundExitPos.x, y:obj.surroundExitPos.y};
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
                obj.followCoordinates = {x: linePos.x, y:linePos.y};
                obj.goalCoordinates = {x: linePos.x, y:linePos.y};
                var dist = canvas.getDistance(curpos.x, curpos.y, cell[0].part.x, cell[0].part.y);
                if( dist > 100 ) {
                    bot.setNextState('findFood');
                }
            }
        },

        isPathAvailable: function(obj) {
            var curpos = window.getPos();
            var minpath = 2;
            var path = collisionGrid.generatePath(curpos.x, curpos.y, obj.goalCoordinates.x, obj.goalCoordinates.y);
            var cell = collisionGrid.getCellByXY(obj.goalCoordinates.x, obj.goalCoordinates.y);
            //console.log("isPathAvailable");
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
                obj.followCoordinates = {x: cell.x, y:cell.y};
                this.success();
            }
            else {
                obj.followCoordinates = {x: obj.goalCoordinates.x, y:obj.goalCoordinates.y};
                this.fail();
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
            obj.goalCoordinates = {x: 10000, y:10000};
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
            if( diff <= 5000 ) {
                //console.log("Following FOOD!");
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
            var dist = canvas.getDistance2(curpos.x, curpos.y, obj.goalCoordinates.x, obj.goalCoordinates.y);
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
            if( bot.radarResults && bot.radarResults.open.length > 0 && bot.radarResults.pct < 0.30 ) {
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
            var line = collisionGrid.lineTest(curpos.x, curpos.y, obj.goalCoordinates.x, obj.goalCoordinates.y,TYPE_SNAKE);
            var linePos = collisionGrid.getCellByColRow(line.col,line.row);
            var collisionDist = canvas.getDistance2(curpos.x, curpos.y, linePos.x, linePos.y);
            if( collisionDist < 2500 ) {

                var dir = {x:0,y:0};
                dir.x = curpos.x - linePos.x;
                dir.y = curpos.y - linePos.y;
                //window.goalCoordinates.x = curpos.x + dir.x;
                //window.goalCoordinates.y = curpos.y + dir.y;
                canvas.setMouseCoordinates(canvas.mapToMouse(obj.goalCoordinates));
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
                debug: true,
                tree: new BehaviorTree.Sequence({
                    nodes: nodes
                })
            });
        },

        condition: function(test, pass, fail) {
            return new BehaviorTree.Condition({
                nodes: [test, pass, fail]
            });
        },

        sequence: function(nodes) {
            return new BehaviorTree.Sequence({
                nodes: nodes
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

        run: function(treeName, obj) {
            behaviors.trees[treeName].setObject(obj);
            behaviors.trees[treeName].step();
        }
    };
})();

behaviors.init();