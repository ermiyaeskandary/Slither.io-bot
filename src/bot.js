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

                //var collision = collisionGrid.lineTest(window.getX(), window.getY(), val.xx, val.yy);
                //if( collision !== false ) {
                //    return false;
                //}

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

        processSurround: function() {
            collisionGrid.initGrid(window.getX(), window.getY(), 2000, 2000, 40);

            var results = collisionHelper.surroundScan(0,1500);
            var rotateCount = 1;
            while( results.length == 4 && rotateCount < 4 ) {
                results = collisionHelper.surroundScan(rotateCount, 1500);
                rotateCount++;
            }
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

                    bot.processSurround();

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