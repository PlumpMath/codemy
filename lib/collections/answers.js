Answers = new Mongo.Collection('answers');

Answers.allow({
  update: function(userId, answer) { return ownsDocument(userId, answer); },
  remove: function(userId, answer) { return ownsDocument(userId, answer); },
});

Answers.deny({
  update: function(userId, answer, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'title', 'body').length > 0);
  }
});

Meteor.methods({
  answerInsert: function(answerAttributes) {
    check(this.userId, String);
    check(answerAttributes, {
      postId: String,
      title: String,
      content: String
    });
    var user = Meteor.user();
    var post = Posts.findOne(answerAttributes.postId);
    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must answer on a post');
    answer = _.extend(answerAttributes, {
      userId: user._id,
      author: user.username || user.profile.name,
      submitted: new Date()
    });
    
    // update the post with the number of comments
    Posts.update(answer.postId, {$inc: {answersCount: 1}});

    answer._id = Answers.insert(answer);

    createAnswerNotification(answer);
    return answer._id;
  }

});
