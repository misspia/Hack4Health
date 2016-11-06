app.directive('answerOptions', function(){
	return {
		template:`<ul class = "answers row center">
					<li ng-click = "submitAnswer('Yes')"><i class = "icon ion-happy-outline"></i></li>
					<li ng-click = "submitAnswer('No')"><i class = "icon ion-sad-outline"></i></li>
				</ul>`
	};
});
app.directive('answerOptionsLanding', function(){
	return {
		template:`<ul class = "answers row center">
					<li><i class = "icon ion-happy-outline"></i></li>
					<li><i class = "icon ion-sad-outline"></i></li>
				</ul>`
	};
});