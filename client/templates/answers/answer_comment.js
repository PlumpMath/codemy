Template.answerComment.created = function() {
  Session.set('commentSubmitErrors', {});
}

Template.answerComment.helpers({
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.answerComment.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
   
    
    var comment = {
      body: $body.val(),
      answerId: this._id,
      title: template.data.title,
     };

    var errors = {};
    if (! comment.body) {
      // errors.body = "Input comment to submit!";
      // return Session.set('commentSubmitErrors', errors);
      throwError(error.reason);
    }

    Meteor.call('commentAnswerInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});