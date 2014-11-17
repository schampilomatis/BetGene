Template.commentSubmit.events({
	'click .submitbutton': function(event, template) {
		event.preventDefault();
		var comment = {
			body: $('#bodytext').val(),
			matchId: new Meteor.Collection.ObjectID(Session.get('currentMatchId'))
		};

		Meteor.call('comment', comment, function(error, commentId) {
			

		});
	}
});