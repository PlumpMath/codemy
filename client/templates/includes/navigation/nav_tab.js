Template.navTab.helpers({
  activeRouteClass: function(/* route names */) {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current() && Router.current().route.getName() === name
    });
    
    return active && 'active';
  }
});


Template.navTab.events({  
  
  'click #go-to-home': function(e){
        
    $('.modal').modal('hide');

    Router.go('/new');    
  },
  
  'click #return-to-top': function(e){
    $('#site-wrapper').animate({
      // Scroll to top of body  
      scrollTop : 0                       
    }, 500);
  },
  
  'click #go-to-submit': function(e){

    
    Router.go('/submit');
    
  }
  
});

Template.navTab.rendered = function() {

    $('#site-canvas').scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(100);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(100);   // Else fade out the arrow
    }
	});  
};