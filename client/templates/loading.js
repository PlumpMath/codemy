// Template.loading.rendered = function () {
//   if ( ! Session.get('loadingSplash') ) {
//     this.loading = window.pleaseWait({
//       logo: '/img/codemy2.png',
//       backgroundColor: ' #373a47',
//       loadingHtml: message + spinner
//     });
//     Session.set('loadingSplash', false); // just show loading splash once
//   }
// };

// Template.loading.destroyed = function () {
//   if ( this.loading ) {
//     this.loading.finish();
//   }
// };

// var message = '<p class="loading-message">Initializing...</p>';
// var spinner = [
// '<div class="tetrominos">'
//  + '<div class="tetromino box1"></div>'
//  + '<div class="tetromino box2"></div>'
//  + '<div class="tetromino box3"></div>'
//  + '<div class="tetromino box4"></div>'
//  + '</div>'
// ];