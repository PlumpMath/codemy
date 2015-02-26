Template.postEdit.created = function() {
  Session.set('postEditErrors', {});

}

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});

Template.postEdit.events({
    'keyup #content': function(e) {
     setTimeout(function(){
      e.preventDefault();
      var content =  $(e.target).val();
      Session.set('content', '');
      Session.set('content', content);
    },100)


    // MARKDOWN WORD COUNTER
    var value = $('#content').val();
    if (value.length == 0) {
      $('#wordCount').html(0);
    return;
    }
    var regex = /\s+/gi;
    var wordCount = value.trim().replace(regex, ' ').split(' ').length;
    $('#wordCount').html(wordCount);
  },


  'submit form': function(e) {
    e.preventDefault();
    
    var currentPostId = this._id;
    
    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postEditErrors', errors);
    
    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('home');
    }
  }
});


Template.postEdit.rendered = function(){
    setTimeout(function() {
    var content = $('#content').val();
    Session.set('content', content);
  }, 1000);

    var value = $('#content').val();
    if (value.length == 0) {
      $('#wordCount').html(0);
    return;
    }
    var regex = /\s+/gi;
    var wordCount = value.trim().replace(regex, ' ').split(' ').length;
    $('#wordCount').html(wordCount);
}