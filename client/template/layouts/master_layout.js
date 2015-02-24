Template.layout.rendered = function() {


//Touch Friendly
	if (('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch))) {
			$(".touch")
					.bind("touchstart", function() {
							$(this)
									.addClass("active")
									.bind("touchend", function() {
											$(this).removeClass("active");
									});
					})
					.bind("touchenter", function() {
							$(this)
									.addClass("hover")
									.bind("touchleave", function() {
											$(this).removeClass("hover active");
									});
					});
	}

//Touch input focus zoom prevent
	var $viewportMeta = $('meta[name="viewport"]');
	$('input, select, textarea').bind('focus blur', function(event) {
	$viewportMeta.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
	});



//Function for input fields (open animationn)
	(function(){
		
		if(!String.prototype.trim) {
			(function() {
				//Regular Expressions for BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function(){
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll('input.input__field')).forEach (function(inputEl){
			//If input is already filled with text
			if(inputEl.value.trim() !== '') {
				$(inputEl.parentNode).addClass('input--filled');
			}
			
			///The addEventListener is like Template.foo.events({ 'eventtype target'}). It is very useful.
			inputEl.addEventListener('focus', onInputFocus);
			inputEl.addEventListener('blur', onInputBlur);

		});

		
		function onInputFocus(e) {
			$(e.target.parentNode).addClass('input--filled');
		}

		function onInputBlur(e) {
			if(e.target.value.trim() === '') {
			$(e.target.parentNode).removeClass('input--filled');
			}
		}


		})();


		
};