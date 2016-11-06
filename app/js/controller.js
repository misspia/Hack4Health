app.controller('mainCrtl', function($scope, user, question, landing, nav){
	var unanswered = 0;
	// $scope.profile = user.profile();
	user.profile().then(function(response){
		$scope.profile = response.data[0];
		$scope.profile.dob = $scope.profile.dob.substring(0, $scope.profile.dob.indexOf('T'));
		$scope.message = landing.msg($scope.profile.firstName);
	});

	
	$scope.calendar = landing.calendar();
	$scope.questionStatus = question.status(unanswered);
	$scope.nav = nav.main();
	$scope.navState = $scope.nav[1].value;
	$scope.header = $scope.nav[1].title;

	question.toAnswer().then(function(response){
		$scope.questionArr = response.data;
		$scope.qLeft = $scope.questionArr.length;
		console.log($scope.qLeft);
		$scope.question = $scope.questionArr[0];
	});
	$scope.count = 0;
	$scope.submitAnswer = function(ans){
		console.log(ans);
		$scope.count ++;
		console.log($scope.count);
		// $scope.question = $scope.questionArr[$scope.count];
		if($scope.count < $scope.questionArr.length){
			$scope.question = $scope.questionArr[$scope.count];
		} else {
			$scope.question = 'No more questions';		
		}
		console.log($scope.question);

	}
	$scope.navClick = function(item){
		$scope.navState = item.value;
		$scope.header = item.title;
	}
	$scope.genderSelect = function(gender){
		$scope.profile.gender = gender;
	};
	
});


  // $scope.changeMenuMain = function(state){$scope.stateMain = state;};