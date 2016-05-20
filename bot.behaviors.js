// ==UserScript==
// @name         Slither.io-bot A*
// @namespace    http://slither.io/
// @version      0.9.3
// @description  Slither.io bot A*
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
            behaviors.newTask('actionExitSequence', behaviors.actionExitSequence);

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
            behaviors.newTask('isFacingTarget', behaviors.isFacingTarget);
            behaviors.newTask('isNearEnemySnakeHead', behaviors.isNearEnemySnakeHead);
            behaviors.newTask('isSprintAllowed', behaviors.isSprintAllowed);
            behaviors.newTask('isHighQualityFoodAvailable', behaviors.isHighQualityFoodAvailable);


            //MAIN Sequence, all sequences/tasks/conditions go in here
            behaviors.newSequence('sequenceFoodTest',
            [
                //Avoid Collisions Sequence, this is highest priority
                behaviors.sequence([
                    behaviors.condition({
                        test: 'isNearEnemySnakeBody',
                            pass:
                                behaviors.sequence([
                                    'action180FromSnake',
                                    'actionMoveToGoal'//,
                                    //'actionExitSequence'
                                ]),
                            fail: 'actionNone'
                    }),
                    /*behaviors.condition({
                        test: 'isNearEnemySnakeHead',
                            pass: '',
                            fail: ''
                    }),*/
                    behaviors.condition({
                        test: 'isAlmostSurrounded',
                            pass:
                                behaviors.sequence([
                                    'actionAvoidSurround',
                                    //'actionExitSequence'
                                ]),
                            fail: 'actionNone'
                    })
                ]),

                //Follow food, always when possible
                behaviors.condition({
                    test: 'isFollowingFood',
                    pass:
                        behaviors.condition({
                            test: 'isPathAvailable',
                                pass: 'actionFollowPath',
                                fail:
                                    behaviors.sequence([
                                        'actionStopFollow',
                                        'actionExitSequence'
                                    ])
                        }),
                    fail:
                        behaviors.condition({
                            test: 'isFoodExists',
                                pass: 'actionSuggestFood',
                                fail: 'actionToCenterOfMap'
                        })
                }),

                //Can we sprint to the food?
                behaviors.condition({
                    test: 'isSprintAllowed',
                        pass: 'actionSprint',
                        fail: 'actionWalk'
                }),

                //Did we reach target?
                behaviors.condition({
                    test: 'isReachedTarget',
                        pass: 'actionStopFollow',
                        fail:
                            //Look for High quality food
                            behaviors.condition({
                                test: 'isHighQualityFoodAvailable',
                                    pass:
                                        behaviors.sequence([
                                            'actionStopFollow',
                                            'actionSuggestFood'
                                        ]),
                                    fail: 'actionNone'
                            })
                })
            ]);

            //This is the tree that is called from the "bot" module
            behaviors.newTree('snakebot', ['sequenceFoodTest']);

        },

        isSprintAllowed: function(obj) {

            var isAlmostSurrouneded = (bot.radarResults && bot.radarResults.open.length > 0 && bot.radarResults.pct < 0.30);


            if( obj.insidesnake ) {
                this.fail();
                return;
            }

            if( obj.nearsnake && !isAlmostSurrouneded ) {
                this.fail();
                return;
            }

            if( isAlmostSurrouneded ) {
                this.success();
                return;
            }

            if( obj.foodTarget && obj.foodTarget.score > 50 ) {
                if( bot.radarResults && bot.radarResults.open.length > 0 && bot.radarResults.pct < 0.30 ) {
                    console.log("almost surrounded");
                    this.success();
                    return;
                }
                var v = canvas.getRelativeAngle(window.getPos(), obj.goalCoordinates);
                if( v.dot >= 0.5 ) {
                    this.success();
                    return;
                }

            }
            this.fail();
        },

        //Exit a sequence immediately, the fail will propopage to the root node
        actionExitSequence: function(obj) {
            this.fail();
        },

        actionSuggestFood: function(obj) {
            //window.setAcceleration(0);
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
                if( line.node )
                    continue;

                if( destpos.node.type==TYPE_FOOD)
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

        isSprinting: function(obj) {
            if( window.snake.sp > 7 ) {
                this.success();
                return;
            }
            this.fail();
        },

        isWalking: function(obj) {
            if( window.snake.sp <= 7 ) {
                this.success();
                return;
            }
            this.fail();
        },

        actionMoveToGoal: function(obj) {
            if (window.visualDebugging && bot.behaviorData.goalCoordinates) {
                var headCoord = {
                    x: window.snake.xx,
                    y: window.snake.yy
                };
                canvas.drawLine(
                    canvas.mapToCanvas(headCoord),
                    canvas.mapToCanvas(bot.behaviorData.goalCoordinates),
                    'green');

                canvas.drawCircle(bot.behaviorData.goalCoordinates, 'red', true);
            }

            canvas.setMouseCoordinates(canvas.mapToMouse(obj.goalCoordinates));
            this.success();
        },

        actionFollowPath: function(obj) {
            canvas.setMouseCoordinates(canvas.mapToMouse(obj.followCoordinates));
            this.success();
        },


        action180FromSnake: function(obj) {
            //console.log("action180 begin");
            if( !obj.aggressor ) {
                this.fail();
                console.log("no aggressor");
                return;
            }
            //console.log("action180 success");
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

            var curpos = window.getPos();
            var openList = bot.radarResults.open[0];
            var lineid = 0;
            if( openList.length > 2 ) {
                lineid = Math.floor(openList.length/2);
            }
            var line = openList[lineid];
            obj.surroundExitPos = collisionGrid.getCellByColRow(line.col,line.row);

            if( window.visualDebugging ) {

                var canvasPosA = canvas.mapToCanvas({
                    x: curpos.x,
                    y: curpos.y,
                    radius: 1
                });
                var canvasPosB = canvas.mapToCanvas({
                    x: obj.surroundExitPos.x,
                    y: obj.surroundExitPos.y,
                    radius: 1
                });


                canvas.drawLine2(canvasPosA.x, canvasPosA.y, canvasPosB.x, canvasPosB.y, 1, 'blue');
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
            var collisions = bot.radarResults.collisions;
            var furthest = collisions[collisions.length-1];
            var cell = furthest.node;
            var curpos = window.getPos();
            var newpos = {x:curpos.x,y:curpos.y};

            if( cell && cell.length ) {
                //console.log("moving away from snake part");
                newpos.x += curpos.x - cell[0].part.x;
                newpos.y += curpos.y - cell[0].part.y;
                obj.followCoordinates = {x: newpos.x, y:newpos.y};
                obj.goalCoordinates = {x: newpos.x, y:newpos.y};
                //var dist = canvas.getDistance(curpos.x, curpos.y, cell[0].part.x, cell[0].part.y);
                //if( dist > 100 ) {
                //    bot.setNextState('findFood');
                //}
            }
        },

        isPathAvailable: function(obj) {
            var curpos = window.getPos();
            var minpath = 2;

            var cell = collisionGrid.getCellByXY(obj.goalCoordinates.x, obj.goalCoordinates.y);
            if( cell.node.type == TYPE_SNAKE || (cell.node.type == TYPE_EMPTY && cell.node.items.length) ) {
                this.fail();
                return;
            }

            var path = collisionGrid.generatePath(curpos.x, curpos.y, obj.goalCoordinates.x, obj.goalCoordinates.y);
            //console.log("isPathAvailable");
            if( path.length > minpath ) {
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
            obj.goalCoordinates = {x: 20000, y:20000};
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

        isFacingTarget: function(obj) {
            //var relv = {x: curpos.x - obj.followCoordinates.x, y: curpos.y-obj.followCoordinates.y};

            var v = canvas.getRelativeAngle(window.getPos(), obj.goalCoordinates);
            if( v.dot >= 0.5 ) {
                this.success();
                return;
            }
            this.fail();
        },

        isNearTarget: function(obj) {
            var curpos = window.getPos();
            var dist = canvas.getDistance2(curpos.x, curpos.y, obj.goalCoordinates.x, obj.goalCoordinates.y);
            if( dist < 40000 ) { //200 units
                this.success();
                return;
            }
            this.fail();
        },

        isReachedTarget: function(obj) {
            var curpos = window.getPos();
            var dist = canvas.getDistance2(curpos.x, curpos.y, obj.goalCoordinates.x, obj.goalCoordinates.y);
            if( dist < 10000 ) { //50 units
                this.success();
                return;
            }
            this.fail();
        },

        isNearEnemySnakeHead: function(obj) {
            var aggressorCnt = collisionGrid.snakeAggressors.length;

            for(var i=0; i<aggressorCnt; i++) {
                var aggressor = collisionGrid.snakeAggressors[i];

                collisionHelper.checkLineIntersection()
            }

        },

        isNearEnemySnakeBody: function(obj) {
            obj.nearsnake = false;
            obj.insidesnake = false;

            var aggressorCnt = collisionGrid.snakeAggressors.length;
            var mindist = 22500;

            var curpos = window.getPos();
            var cell = collisionGrid.getCellByXY(curpos.x,curpos.y);
            if( cell.node.type == TYPE_SNAKE ) {
                var snake = cell.node.items[0].snake;

                for(var i=0; i<aggressorCnt; i++) {
                    var aggressor = collisionGrid.snakeAggressors[i];
                    if( snake.id == aggressor.snk.id ) {
                        obj.aggressor = aggressor;
                        break;
                    }
                }
                obj.insidesnake = true;
                //console.log("inside snake");
                this.success();
                return;
            }

            for(var i=0; i<aggressorCnt; i++) {
                var aggressor = collisionGrid.snakeAggressors[i];
                if( aggressor.snk.sp > 7 )
                    mindist = 90000;
                else
                    mindist = 22500;

                if( aggressor.snk.closest.distance2 < mindist ) {
                    obj.aggressor = aggressor;
                    //console.log("near snake");
                    obj.nearsnake = true;
                    this.success();
                    return;
                }
            }
            this.fail();
        },

        isAlmostSurrounded: function(obj) {
            if( bot.radarResults && bot.radarResults.open.length > 0 && bot.radarResults.pct < 0.30 ) {
                console.log("almost surrounded");
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
            if( currentCell.node && currentCell.node.type == TYPE_SNAKE ) {
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

        //Set a condition to test against
        //data.test = sequence/task/condition that tests with success/fail
        //data.pass = seq/task/cond when test passes
        //data.fail = seq/task/cond when test fails
        //@param data - {test:'', pass:'', fail''}
        condition: function(data) {//test, pass, fail) {
            return new BehaviorTree.Condition({
                nodes: [data.test, data.pass, data.fail]
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