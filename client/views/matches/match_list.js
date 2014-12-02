Template.matchList.helpers({
	matches: function(){
		var today = new Date();
		var weekday = today.getDay();
		var date = today.getDate();
		var startdate = new Date();
		var enddate = new Date();
		startdate.setDate(date-(weekday+6)%7);
		startdate.setHours(0);
		startdate.setMinutes(0);

		enddate.setDate(date + ((7-weekday)%7));

		enddate.setHours(23);
		enddate.setMinutes(59);
		preferences = Preferences.find({templateName:'matchList'}).fetch();
		query = Meteor.helperFunctions.preferenceToQuery(preferences);

		query = $.extend(query, {time:{$gte: startdate, $lte:enddate}});
		return Matches.find(query,{sort: {time: 1, hometeam: 1}});
	}


})

Template.matchList.rendered = function(){
	Session.set('currentTemplate', 'matchList');
}