Template.search.events({
    'click #linkToPost':function () {
      Overlay.hide();
    } 
});

Template.search.rendered = function(){
	
	$('.overlay').keydown(function(e) {
    	// ESCAPE key pressed
    	if (e.keyCode == 27) {
		   Overlay.hide();		
    	}
	});

    $("input:text:visible:first").focus();
	
};
