Template.postHeader.helpers({

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

Template.postHeader.rendered = function() {
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

Template.postHeader.events({

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
