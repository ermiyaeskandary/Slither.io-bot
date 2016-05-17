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

function binvert(name) {
    return behaviors.invertTask(name);
};

function btest(name, test, pass, fail) {
    return behaviors.newCondition(name, test, pass, fail);
}


behaviors.newTask('actionFollowFood', actionFollowFood);
behaviors.newTask('actionSprintToFood', actionSprintToFood);
behaviors.newTask('isFoodExists', isFoodExists);
behaviors.newTask('actionFindFood', actionFindFood);
behaviors.newTask('isGoodFood', isGoodFood);
behaviors.newTask('isFollowingFood', isFollowingFood);
behaviors.newTask('isReachedTarget', isReachedTarget);
behaviors.newTask('actionToCenterOfMap', actionToCenterOfMap);
behaviors.newTask('actionStopFollow', actionStopFollow);
behaviors.newTask('actionNone', actionNone);
behaviors.newTask('actionNone', actionWalkToFood);

behaviors.newCondition('checkFoodExists', 'isFoodExists', 'actionFindFood', 'actionToCenterOfMap')
behaviors.newCondition('checkReachedFood', 'isReachedTarget', 'actionStopFollow','actionNone');
behaviors.newCondition('checkFoodSprint', 'isGoodFood', 'actionSprintToFood', 'actionWalkToFood');

behaviors.newSequence('sequenceFindFood', ['checkFoodExists', 'checkFoodSprint', 'actionFollowFood', 'checkReachedFood']);
behaviors.newSequence('sequenceFindFoodSimple', ['actionFindFood', 'actionFollowFood']);

behaviors.newTree('snakebot', ['sequenceFindFoodSimple']);


function actionFindFood(obj) {
    console.log("FUNCTION >>>> actionFindFood begin");
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
    console.log("FUNCTION >>>> actionFindFood end");
};

function actionToCenterOfMap(obj) {
    console.log("FUNCTION >>>> actionToCenterOfMap begin");
    this.success();
};

function actionNone(obj) {
    this.success();
};

function actionStopFollow(obj) {
    obj.followTime = 0;
    this.success();
};

function isFoodExists(obj) {
    console.log("FUNCTION >>>> isFoodExists begin")
    if( !collisionGrid.foodGroups.length ) {
        this.fail();
        return;
    }
    this.success();
    console.log("FUNCTION >>>> isFoodExists end")
};

function isFollowingFood(obj) {
    var curtime = (new Date()).getTime();
    var diff = curtime - obj.followTime
    if( diff <= 8000 ) {
        this.success();
        return;
    }
    this.fail();
};

function isGoodFood(obj) {
    if( obj.foodTarget && obj.foodTarget.score > 50 ) {
        this.success();
        return;
    }
    this.fail();
};

function actionWalkToFood(obj) {
    window.setAcceleration(0);
    this.success();
}

function actionSprintToFood(obj) {
    window.setAcceleration(1);
    this.success();
};

function isReachedTarget(obj) {
	var curpos = window.getPos();
    var dist = canvas.getDistance2(curpos.x, curpos.y, window.goalCoordinates.x, window.goalCoordinates.y);
    if( dist < 2500 ) {
        this.success();
        return;
    }
    this.fail();
};

function actionFollowFood(obj) {

    //if( bot.state.trackCollisions() )
    //    return;
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
        //var cell = collisionGrid.getCellByXY(window.goalCoordinates.x, window.goalCoordinates.y);
        this.fail();
    }
};

function avoidBody(obj) {

    var aggressorCnt = collisionGrid.snakeAggressors.length;
    var mindist = 22500;

    for(var i=0; i<aggressorCnt; i++) {
        var aggressor = collisionGrid.snakeAggressors[i];
        if( aggressor.snk.sp > 7 )
            mindist = 90000;
        else
        	mindist = 22500;

        if( aggressor.snk.closest.distance2 < mindist ) {
            var newcoord = {
                x: window.snake.xx + (window.snake.xx - aggressor.snk.closest.xx),
                y: window.snake.yy + (window.snake.yy - aggressor.snk.closest.yy)
            };
            canvas.setMouseCoordinates(canvas.mapToMouse(newcoord));
            this.success();
            return;
        }
    }
};

function avoidAggressor(obj) {
    if( collisionGrid.snakeAggressors.length ) {
        var aggressor = collisionGrid.snakeAggressors[0];
        if( aggressor.distance < 22500 ) {
            var newcoord = {x:aggressor.relativePos.x + window.getX(),
                    y:aggressor.relativePos.y + window.getY()}
            //window.goalCoordinates.x = ;
            //window.goalCoordinates.y = aggressor.relativePos.y + window.getY();

            canvas.setMouseCoordinates(canvas.mapToMouse(newcoord));
            return;
        }
    }

    bot.setNextState('findFood');
    return;
};

function avoidSurround(obj) {


    if( !bot.radarResults ) return;
    var curpos = window.getPos();

    if( bot.radarResults.open.length == 0 ) {

        var closest = bot.radarResults.collisions[0];
        var cell = closest.cell;
        var newpos = {x:curpos.x,y:curpos.y};

        if( cell && cell.length ) {
            console.log("moving away from snake part");
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

        bot.surroundExitLine = -1;

    } else if( bot.radarResults.pct < 0.30 ) {
        //window.setAcceleration(1);

        var linePos;
        if( bot.surroundExitLine == -1 ) {
            var randomLine = parseInt(Math.random() * bot.radarResults.open.length);
            var line = bot.radarResults.open[randomLine];
            linePos = collisionGrid.getCellByColRow(line.x,line.y);
        }
        else {
            linePos = bot.surroundExitLine;
        }


        window.goalCoordinates.x = linePos.x;
        window.goalCoordinates.y = linePos.y;
        canvas.setMouseCoordinates(canvas.mapToMouse(linePos));
    }
    else {
        bot.surroundExitLine = -1;
        bot.setNextState('findFood');
    }


};


function isTouchingSnake(obj) {
	var curpos = window.getPos();
    var currentCell = collisionGrid.getCellByXY(curpos.x, curpos.y);
    if( currentCell.cell && currentCell.cell.type == TYPE_SNAKE ) {
        bot.setNextState('avoidBody');
        this.success();
    }
};

function isNearSnakeBody(obj) {
	var aggressorCnt = collisionGrid.snakeAggressors.length;
	var mindist = 22500
    for(var i=0; i<aggressorCnt; i++) {
        var aggressor = collisionGrid.snakeAggressors[i];

        if( aggressor.snk.sp > 7 )
        	mindist = 90000;
        else
        	mindist = 22500

        if( aggressor.snk.closest.distance2 < mindist ) {
            this.success();
            return;
        }
    }
};

function isSurrounded(obj) {
	if( bot.radarResults ) {
        if( bot.radarResults.pct <= 0.30 || (bot.radarResults.collisions.length && bot.radarResults.collisions[0].dist < 100) ) {
            bot.stopFollowLine(0);
            this.success();
        }
    }
};

function isTargetBlockedBySnake(obj) {
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

    }
};


