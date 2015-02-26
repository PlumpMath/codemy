

Template.answerItem.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	comments: function() {
		return Comments.find({answerId: this._id});
	}
})

Template.answerItem.events({
	// 'click': function(e) {
	// 	e.preventDefault();

	// 	console.log(this._id);
	// },

	'click .delete': function(e) {
		e.preventDefault();
		 if (confirm("Delete this post?")) {
			var currentPostId = this._id;
			Answers.remove(currentPostId);
		}
	}
})


