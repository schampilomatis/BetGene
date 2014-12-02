Preferences = new Meteor.Collection(null);


Preferences.toggle = function(preference){
	var pref = Preferences.findOne(preference);
	if (pref){
		return Preferences.remove(preference);
	}else{
		return Preferences.insert(preference);
	}
}


Preferences.get = function(templateName){
	return Preferences.find({templateName: templateName}).fetch();
}


Preferences.setForAttribute = function(preference){

	var pref = Preferences.findOne({attribute: preference.attribute});
	if (pref){
		Preferences.remove({attribute: preference.attribute});
	}

	Preferences.insert(preference);

}