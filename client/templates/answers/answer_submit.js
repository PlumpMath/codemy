Template.answerSubmit.events({
  'keyup #content': function(e) {
    setTimeout(function(){
      e.preventDefault();
      var content = $(e.target).val();
      Session.set('content', '');
      Session.set('content', content);
    },100)
  },
  
  'submit form': function(e, template) {
    e.preventDefault();

    var answer = {
      content: $(e.target).find('[name=content]').val(),
      postId: template.data._id,
      title: template.data.title
    };

//    var errors = {};
//    if (! answer.content) {
//      errors.content = "Please write some content";
//      return Session.set('answerSubmitErrors', errors);
//    }

    Meteor.call('answerInsert', answer, function(error, answerId) {
      if (error){
        throwError(error.reason);
      } else {
        // setTimeout(function(){
        // var content = $(e.target).val();
        // $('#content')[0].reset();	
        // Session.set('content', '');
        // }, 100);
       // Router.go('postPage', {_id: result._id});  

       $('#content').val("");
       Session.set('content', 'Here you will see your Markdown Preview.');
      }
    });
  }

});

Meteor.startup(function() {
    setTimeout(function() {
      var content = $('#content').val();
      Session.set('content', content);
    }, 1000);
  });

 
Template.answerSubmit.rendered= function(){
  //$('#content').autosize();
};

