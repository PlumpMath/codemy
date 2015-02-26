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
	},
	upvotedClass: function() {
	var userId = Meteor.userId();
	if (userId && !_.include(this.upvoters, userId)) {
		return 'btn-default upvotable';
	}  else {
		return 'btn-success unvote';
	}    
	 },
	downvotedClass: function() {
	var userId = Meteor.userId();
	if (userId && !_.include(this.downvoters, userId)) {
		return 'btn-default downvotable';
	} else {
		return 'btn-warning undownvote';
	}
	}
});

Template.postPage.rendered = function() {
	
		if(
			$('#upBtn').hasClass('unvote')
			)
		{
			$('#downBtn').attr('disabled', 'disabled');
		}

		if(
			$('#downBtn').hasClass('undownvote')
			)
		{
			$('#upBtn').attr('disabled', 'disabled');
		}
	

}


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
	},
	
	'click .upvotable': function(e) {
	e.preventDefault();
	$('.downvotable').prop('disabled', true);
	Meteor.call('upvote', this._id);
	},
	
	'click .unvote': function(e) {
	e.preventDefault();
	$('.downvotable').prop('disabled', false);
	Meteor.call('unvote', this._id);
	},

	'click .downvotable': function(e) {
	e.preventDefault();
	$('.upvotable').prop('disabled', true);
	Meteor.call('downvote', this._id);
	},
	
	'click .undownvote': function(e) {
	e.preventDefault();
	$('.upvotable').prop('disabled', false);
	Meteor.call('undownvote', this._id);
	}

});

