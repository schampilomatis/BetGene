Meteor.helperFunctions = {

	odds: function(bets){
		var sum = bets.home + bets.draw + bets.away;
		var homeOdd, drawOdd, awayOdd;
		var numberofNA = 0;

		if(bets.home === 0){
			homeOdd = "N/A"
			numberofNA++;
		}else{
			homeOdd = sum / bets.home;
		}


		if(bets.draw === 0){
			drawOdd = "N/A"
			numberofNA++;
		}else{
			drawOdd = sum / bets.draw;
		}


		if(bets.away === 0){
			awayOdd = "N/A"
			numberofNA++;
		}else{
			awayOdd = sum  / bets.away;
		}

		return{
			home: homeOdd,
			draw: drawOdd,
			away: awayOdd,
			valid: numberofNA<2
		}
	},	


	availableCountries:[
		'GREECE', 'ENGLAND', 'SPAIN', 'EUROPE (UEFA)', 'ITALY', 'GERMANY'
	],

	preferenceToQuery: function(preferences){
		var query = { $and : []};
		var groups = {};
		for (var i = 0 ; i < preferences.length; i++){
			prefObj = {};
			prefObj[preferences[i].attribute] =  preferences[i].val;

			if (preferences[i].isgroup){

				if (!groups[preferences[i].groupname]){
					groups[preferences[i].groupname] = {};
					groups[preferences[i].groupname][preferences[i].grouptype] = [];
				}

				groups[preferences[i].groupname][preferences[i].grouptype].push(prefObj);
			}else{
				query.$and.push(prefObj);
			}
			
			
		}

		for (groupname in groups){
			query.$and.push(groups[groupname]);
		}


		if (query.$and.length > 0){
			return query;
		}else{
			return {};
		}
	}
}