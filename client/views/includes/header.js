Template.header.events({
    'click .log-out' : function(e, t) {
    	Meteor.logout(function(err){
    		if (err){
    			console.log(err);
    			Router.go('/');
    		}
    	});
    }
});
