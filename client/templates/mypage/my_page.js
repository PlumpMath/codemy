Session.setDefault('pagecursor', 0);

//SortBy Session: 0=New, 1=Best
Session.setDefault('SortBy', 0);


Template.myPage.helpers({

	user: function(){
		return Meteor.user().username || Meteor.user().profile.name;
	},
	avatar: function(){
		return Meteor.user().profile.image;
	},
	myposts: function() {
		var postCursor = Session.get('pagecursor');
		
		 if(
		 	Number(Session.get('SortBy')) < 1){
		 	return Posts.find(
		 	{userId: Meteor.userId()}, {limit:4, skip: postCursor, sort:{submitted: -1}}
		 		);	 	
		 } else {
		 	return Posts.find(
		 	{userId: Meteor.userId()}, {limit:4, skip: postCursor, sort:{votes: -1}}
		 		);	 	
		 }
	},
	userInfo: function(){
		return Meteor.user().profile.info;
	},
	nomore: function(){
		
		if( Number(Session.get('pagecursor')) >= Posts.find({userId:Meteor.userId()}).count() )
		{
			return 'No More Posts';
		}

	},
	wordcount: function(){
		var checkWordCount = Meteor.user().profile.info.match(/\b/g);
		return checkWordCount.length/2;
	},
	
	notificationCount: function(){
  		return Notifications.find({userId: Meteor.userId(), read: false}).count();
  	}
	
});

Template.myPage.events({

	'click #btnUploadInfo': function(){
		var userInfo = $('#user_info').val();
		Meteor.users.update({_id:Meteor.user()._id}, {$set:{"profile.info":userInfo}});
	},
	'click .previous': function(e, t){
		if(Number(Session.get('pagecursor')) > 1){
			Session.set('pagecursor', Number(Session.get('pagecursor')) -4);
		}
	},
	'click .next':function(e, t){
		var thisUser = Meteor.user().username || Meteor.user().profile.name;

		if( Number(Session.get('pagecursor')) < Posts.find({author:thisUser}).count()
			)
		{

			Session.set('pagecursor', Number(Session.get('pagecursor')) +4);
		}else {
		}

	},
	'click #newBtn': function(){
		Session.set('pagecursor', 0);
		Session.set('SortBy', 0);
		$('#newBtn').addClass('sort-selected');
		$('#bestBtn').removeClass('sort-selected');
	},
	'click #bestBtn': function(){
		Session.set('pagecursor', 0);
		Session.set('SortBy',1);
		$('#newBtn').removeClass('sort-selected');
		$('#bestBtn').addClass('sort-selected');
	}

	

})

Template.myPage.rendered = function() {
	Session.set('SortBy', 0);
	$('#newBtn').addClass('sort-selected');


	//Word Count on Key Up. Needs work for Korean, return number when first run
	var max_count = 30;
	$(document).ready(function () {
		var wordCounts = {};
		$("#user_info").keyup(function () {
				var matches = this.value.match(/\b/g);
				wordCounts[this.id] = matches ? matches.length / 2 : 0;
				var finalCount = 0;
				$.each(wordCounts, function (k, v) {
						finalCount += v;
				});
				var vl = this.value;
				if (finalCount > max_count) {
					//  vl = vl.substring(0, vl.length - 1);
					// this.value = vl;
				}
				var countleft = parseInt(max_count - finalCount);

				$('#wordCount').html(finalCount);
				//$('#wordCount1').html(countleft);
				//am_cal(finalCount);
		});
	}).keyup();
}