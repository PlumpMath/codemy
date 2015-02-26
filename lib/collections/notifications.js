Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	update: function(userId, doc, fieldNames) {
		return ownsDocument(userId, doc) && 
			fieldNames.length === 1 && fieldNames[0] === 'read';
	}
});

createCommentNotification = function(comment) {
	var post = Posts.findOne(comment.postId);
	if (comment.userId !== post.userId) {
		Notifications.insert({
			userId: post.userId,
			postId: post._id,
			title: post.title,
			commentId: comment._id,
			commenterName: comment.author,
			notificationType: 'typeComment',
			read: false
		});
	}
};

createAnswerCommentNotification = function(comment) {
	var answer = Answers.findOne(comment.answerId);
	var post = Posts.findOne(answer.postId);
	if (comment.userId !== answer.userId) {
		Notifications.insert({
			userId: answer.userId,
			postId: post._id,
			title: post.title,
			answerId: answer._id,
			commentId: comment._id,
			commenterName: comment.author,
			notificationType: 'typeAnswerComment',
			read: false
		});
	}
};

  
createAnswerNotification = function(answer) {
  var post = Posts.findOne(answer.postId);
  
  if (answer.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      title: post.title,
      answerId: answer._id,
      answererName: answer.author,
      notificationType: 'typeAnswer',
      read: false
    });
  }  
};	