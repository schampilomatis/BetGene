Template.teamFilter.events({
	'keypress .regex': function(event){
		if (event.charCode == 13){

			currentTemplate = Session.get('currentTemplate')

			Preferences.setForAttribute({
				templateName: currentTemplate,
				attribute: 'hometeam',
				groupname: 'team',
				isgroup: true,
				grouptype:'$or',
				val: {
					$regex:  $(event.currentTarget).val() ,
					$options: 'i'
			    }
			});	

			Preferences.setForAttribute({
				templateName: currentTemplate,
				attribute: 'awayteam',
				groupname: 'team',
				isgroup: true,
				grouptype:'$or',
				val: {
					$regex:  $(event.currentTarget).val() ,
					$options: 'i'
			    }
			});

		}

	}
})