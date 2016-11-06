app.factory('nav', function(){
	return{
		main: function(){
			nav = [
				{title:'home', value: 0, icon: 'ion-android-home'},
				{title:'questions', value: 1, icon: 'ion-help'},
				{title:'dashboard', value: 2, icon:'ion-arrow-graph-up-right'},
				{title:'profile', value: 3, icon: 'ion-android-person'}
			];
			return nav;
		}
	};
});
app.factory('user', function(){
	return{
		profile: function(){
			profile = {
				name: 'Karchie',
				dob: '01/01/2000',
				gender: 'female'
			}
			return profile;
		}
	};
});
app.factory('question', function(){
	return{
		status: function(unanswered){
			if(unanswered == 0){
				return 'How are you feeling today?';
			} else {
				return 'You have ' + unanswered + ' unanswered question(s)';
			}
		},
		toAnswer: function(){
			question = "Did you sleep well?";
			return question;
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
				date: 'November 5, 2016', 
				time: '1:30 PM'
			}
			return calendar;
		}

	};
});
