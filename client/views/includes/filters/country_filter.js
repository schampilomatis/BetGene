Template.countryFilter.helpers({
	countries: function(){
		return Meteor.helperFunctions.availableCountries;
	}
})


Template.countryFilter.events({
	'click .countriesCheckbox': function(event){
		currentTemplate = Session.get('currentTemplate');
		Preferences.toggle({
			templateName: currentTemplate,
			attribute: 'country',
			isgroup: true,
			groupname:'country',
			grouptype: '$nor',
			val: $(event.currentTarget).attr("country")
		}
		)

	}
})