Template.postPage.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	comments: function() {
		return Comments.find({postId: this._id});
	},
	answers: function() {
		return Answers.find({postId: this._id});
	},
	avatar: function(){
		return Meteor.user().profile.image;
	}
});



Template.postPage.events({

	'click #answerBtn': function(){
		$('.answer').show();
		$('#answerBtn').hide();
	},

	'click .delete': function(e) {
		e.preventDefault();	
		 if (confirm("Delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('/');
		}
	}
});

