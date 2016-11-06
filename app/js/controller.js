app.controller('mainCrtl', function($scope, user, question, landing, nav){
	var unanswered = 0;
	user.profile().then(function(response){
		$scope.profile = response.data[0];
		$scope.profile.dob = $scope.profile.dob.substring(0, $scope.profile.dob.indexOf('T'));
		$scope.message = landing.msg($scope.profile.firstName);
	});

	$scope.calendar = landing.calendar();
	$scope.questionStatus = question.status(unanswered);
	$scope.nav = nav.main();
	$scope.navState = $scope.nav[2].value;
	$scope.header = $scope.nav[2].title;

	question.toAnswer().then(function(response){
		$scope.questionArr = response.data;
		$scope.qLeft = $scope.questionArr.length;
		console.log($scope.qLeft);
		$scope.question = $scope.questionArr[0];
	});
	$scope.count = 0;
	$scope.submitAnswer = function(ans){
		$scope.count ++;
		if($scope.count < $scope.questionArr.length){
			$scope.question = $scope.questionArr[$scope.count];
		} else {
			$scope.question = 'No more questions';		
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
                color: ['#a0d468', '#fb6e52'],
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
                x2Axis: {
                    tickFormat: function(d) {
                        var dx = $scope.data[0].values[d] && $scope.data[0].values[d].x || 0;
                        return d3.time.format('%b-%Y')(new Date(dx))
                    },
                    showMaxMin: false
                },
                y1Axis: {
                    axisLabel: 'Y1 Axis',
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    },
                    axisLabelDistance: 12
                },
                y2Axis: {
                    axisLabel: 'Y2 Axis',
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
