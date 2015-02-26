
Meteor.startup(function() {

	setTimeout(function() {
		var content = $('#content').val();
		Session.set('content', 'Here you will see your Markdown Preview.');
	}, 1000);

});


Template.registerHelper('session', function(input) {
	return Session.get(input);
});


Template.postSubmit.helpers ({	
	
})


Template.postSubmit.events({

	'keyup #content': function(e) {
		// MARKDOWN PREVIEW on KEYUP
		setTimeout(function(){
			e.preventDefault();
			var content =  $(e.target).val();
			Session.set('content', '');
			Session.set('content', content);
		},100);

	},

	'submit form': function(event, template) {
		event.preventDefault();
		
		var post = {
			title: template.find('[name=title]').value,
			content: template.find('[name=content]').value
		};


		// NEEDS WORK DUE TO KOREAN / Word limit on title and content
			// var checkContent = template.find('[name=content]').value.match(/\b/g);;
			// var checkTitle = template.find('[name=title]').value.match(/\b/g);;
			
			//  if( checkContent.length/2  > 500){
			//  	throwError('Content cannot be longer than 500 words!');
			//  	return false;
			//  }

			//   if( checkTitle.length/2  > 30){
			//  	throwError('Title cannot be longer than 30 words!!');
			//  	return false;
			//  }
		
		Meteor.call('postInsert', post, function(error, result) {
			// display the error to the user and abort
			if (error){
				return throwError(error.reason);
			}
			// show this result but route anyway
			// if (result.postExists){
			// throwError('This link has already been posted');
			// }
			Session.set('content', 'Here you will see your Markdown Preview.');
			Router.go('postPage', {_id: result._id, title: result.title});  
		});
	}
});

Template.postSubmit.rendered= function(){
	
	setTimeout(function() {
		var content = $('#content').val();
		Session.set('content', 'Here you will see your Markdown Preview.');
	}, 1000);

//Autosize of Content Text Area
	$('#content').autosize();

//Tab = 4 space Indent Content Text Area
	$('#content').keydown(function(e) {
		var keyCode = e.keyCode || e.which;

		if (keyCode == 9) {
		e.preventDefault();
		var start = $(this).get(0).selectionStart;
		var end = $(this).get(0).selectionEnd;

		// set textarea value to: text before caret + tab + text after caret
		$(this).val($(this).val().substring(0, start)
							+ "\t"
							+ $(this).val().substring(end));

		// put caret at right position again
		$(this).get(0).selectionStart =
		$(this).get(0).selectionEnd = start + 1;
	} 
	});


//Word Count on Key Up. Needs work for Korean, return number when first run
	var max_count = 500;
	$(document).ready(function () {
		var wordCounts = {};
		$("#content").keyup(function () {
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

};//End Template.rendered

Template.postSubmit.destroyed = function(){

}

