Template.navbar2.events({

	'click .js-overlay-open': function(){
		Overlay.show('search');
		$("body").css("overflow", "hidden");
	}

})


Template.navbar2.rendered = function(){

}