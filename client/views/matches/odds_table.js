Template.oddsTable.helpers({
	betOdds: function(bets){

		return Meteor.helperFunctions.odds(bets);

	}
})