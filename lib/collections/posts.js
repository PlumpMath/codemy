Posts = new Mongo.Collection('posts');


//search done

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Please fill in a headline";
  
  if (!post.content)
    errors.content =  "Please fill in Content";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      content: String
    });
    
    var errors = validatePost(postAttributes);
    if (errors.title || errors.content)
      throw new Meteor.Error('invalid-post', "You must set a title and Content for your post");
    
    // var postWithSameLink = Posts.findOne({url: postAttributes.url});
    // if (postWithSameLink) {
    //   return {
    //     postExists: true,
    //     _id: postWithSameLink._id
    //   }
    // }
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username || user.profile.name, 
      submitted: new Date(),
      commentsCount: 0,
      answersCount:0,
      upvoters: [], 
      votes: 0
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId,
      title: postAttributes.title
    };
  },
  
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
  },
  
  unvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var post = Posts.findOne(postId);
    
    if(! post)
      throw new Meteor.Error('invalid', "게시물이 존재하지 않습니다!");
    
    if(_.include(post.upvoters, this.userId))
      Posts.update(post._id, {
        $pull: {upvoters: this.userId},
        $inc: {votes:-1}
      });
  },
  
  downvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected1 = Posts.update({
      _id: postId, 
      downvoters: {$ne: this.userId}
    }, {
      $addToSet: {downvoters: this.userId},
      $inc: {votes: -1}
    });
  },
  
  undownvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var post1 = Posts.findOne(postId);
    
    if(! post1)
      throw new Meteor.Error('invalid', "게시물이 존재하지 않습니다!");
    
    if(_.include(post1.downvoters, this.userId))
      Posts.update(post1._id, {
        $pull: {downvoters: this.userId},
        $inc: {votes:1}
      });
  }

});