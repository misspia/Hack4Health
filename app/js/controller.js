app.controller('mainCrtl', function($scope, user, question, landing, nav){
	$scope.questionStatus = -1;
	$scope.count = 0;
	$scope.calendar = landing.calendar();
	$scope.nav = nav.main();
	$scope.navState = $scope.nav[2].value;
	$scope.header = $scope.nav[2].title;
	
	user.profile().then(function(response){
		$scope.profile = response.data[1];
		$scope.profile.dob = $scope.profile.dob.substring(0, $scope.profile.dob.indexOf('T'));
		$scope.message = landing.msg($scope.profile.firstName);
	});

	question.toAnswer().then(function(response){
		$scope.questionArr = response.data;
		$scope.qLeft = $scope.questionArr.length;
		$scope.unanswered = $scope.questionArr.length;
		$scope.question = $scope.questionArr[0];
	});
	var unanswered = 0;
	$scope.submitAnswer = function(ans){
		$scope.count ++;
		if($scope.count < $scope.questionArr.length){
			$scope.question = $scope.questionArr[$scope.count];
			$scope.questionStatus = question.status($scope.questionArr.length - $scope.count);
		} else {
			$scope.question = 'No more questions';	
			$scope.questionStatus = question.status(0);	
		}
	}

	$scope.navClick = function(item){
		$scope.navState = item.value;
		$scope.header = item.title;
	}

	$scope.genderSelect = function(gender){
		$scope.profile.gender = gender;
	};
	$scope.options = {
            chart: { 
                type: 'linePlusBarChart',
                height: 500,
                margin: {
                    top: 30,
                    right: 75,
                    bottom: 50,
                    left: 75
                },
                color: ['#fffef9', '#666d6d'],
                x: function(d,i) { return i },
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        if (dx > 0) {
                            return d3.time.format('%x')(new Date(dx))
                        }
                        return null;
                    }
                },
                y2Axis: {
                    axisLabel: 'Performance',
                    tickFormat: function(d) {
                        return d3.format(',.0f')(d)
                    }
                }
            }
        };
 	
		question.timeseries().then(function(response){
			$scope.data = response.data.map(function(series) {
		        series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
		        return series;
		    });
		});	
});
