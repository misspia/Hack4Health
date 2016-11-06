app.controller('mainCrtl', function($scope, nav, user, question, landing){
	var unanswered = 0;
	$scope.profile = user.profile();
	$scope.message = landing.msg($scope.profile.name);
	$scope.calendar = landing.calendar();
	$scope.questionStatus = question.status(unanswered);
	$scope.question = question.toAnswer();
	$scope.nav = nav.main();
	$scope.navState = $scope.nav[3].value;
	$scope.header = $scope.nav[3].title;
	$scope.navClick = function(item){
		$scope.navState = item.value;
		$scope.header = item.title;
	}
	$scope.genderSelect = function(gender){
		$scope.profile.gender = gender;
		console.log($scope.profile.gender);
	};
});


  // $scope.changeMenuMain = function(state){$scope.stateMain = state;};