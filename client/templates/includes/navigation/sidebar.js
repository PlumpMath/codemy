Template.sidebar.events({

	'click .gotoNew': function(e){
		e.preventDefault();
		Router.go('/new')
		
	},

	'click .gotoBest': function(e){
		e.preventDefault();
		Router.go('/best')
	},

	'click #goto-myPage': function(e){
		hideSidebar(e);
	}

})

Template.sidebar.helpers({

	user: function(){
		return Meteor.user().username || Meteor.user().profile.name;
	},
	avatar: function(){
		return Meteor.user().profile.image;
	}

});