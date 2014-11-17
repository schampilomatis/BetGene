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

		return Matches.find({time:{$gte: startdate, $lte:enddate}},{sort: {time: 1, hometeam: 1}});
	}


})