app.factory('nav', function(){
	return{
		main: function(){
			nav = [
				{title:'home', value: 0, icon: 'ion-android-home'},
				{title:'questions', value: 1, icon: 'ion-ios-bell'},
				{title:'dashboard', value: 2, icon:'ion-arrow-graph-up-right'},
				{title:'profile', value: 3, icon: 'ion-android-person'}
			];
			return nav;
		}
	};
});
app.factory('user', function($http){
	return{
		profile: function(){
			return $http.get('http://localhost:3000/users');
		}
	};
});

app.factory('landing', function(){
	return{
		msg: function(name){
			return 'Good morning ' + name ;
		}, 
		calendar: function(){
			calendar = {
				date: 'November 6, 2016', 
				time: '12:30 PM'
			}
			return calendar;
		}
	};
});
app.factory('question', function($http){
	return{
		status: function(unanswered){
			console.log(unanswered);
			if(unanswered == 0 || unaswered == undefined){
				return 'How are you feeling today?';
			} else {
				return 'You have ' + unanswered + ' unanswered question(s)';
			}
		},
		toAnswer: function(){
			return $http.get('http://localhost:3000/getQuestion/John/Doe');

		},
		timeseries: function(){
			return $http.get('../../timeseries.json');
		}
	};
});



















