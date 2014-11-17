Meteor.helperFunctions = {

	odds: function(bets){
		var sum = bets.hometeam + bets.draw + bets.awayteam;
		var homeOdd, drawOdd, awayOdd;

		if(bets.hometeam === 0){
			homeOdd = "N/A"
		}else{
			homeOdd = sum / bets.hometeam;
		}


		if(bets.draw === 0){
			drawOdd = "N/A"
		}else{
			drawOdd = sum / bets.draw;
		}


		if(bets.awayteam === 0){
			awayOdd = "N/A"
		}else{
			awayOdd = sum  / bets.awayteam;
		}

		return{
			home: homeOdd,
			draw: drawOdd,
			away: awayOdd
		}
	}
}