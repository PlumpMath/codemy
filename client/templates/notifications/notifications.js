Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
  	return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId, title:this.title});
  },
  notificationType: function(notificationType){
    return this.notificationType === notificationType;
  }

})

Template.notificationItem.events({
  'click a': function() {
    $('#notificationsModal').hide();
    // $('body').removeClass('show-menu');
    Notifications.update(this._id, {$set: {read: true}});
  }
})