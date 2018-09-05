export default {
  init() {
    // JavaScript to be fired on the about us page\
    jQuery(document).ready(function ($) {
      // Show the login dialog box on click
      $('a#show_login').on('click', function (e) {
        $('body').prepend('<div class="login_overlay"></div>');
        $('form#login').fadeIn(500);
        $('div.login_overlay, form#login a.close').on('click', function () {
          $('div.login_overlay').remove();
          $('form#login').hide();
        });
        e.preventDefault();
      });

      // Perform AJAX login on form submit
      $('form#login').on('submit', function (e) {
        $('form#login p.status')
          .show()
          .text(ajax_login_object.loadingmessage);
        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: ajax_login_object.ajaxurl,
          data: {
            action: 'ajaxlogin', //calls wp_ajax_nopriv_ajaxlogin
            username: $('form#login #username').val(),
            password: $('form#login #password').val(),
            security: $('form#login #security').val()
          },
          success: function (data) {
            $('form#login p.status').text(data.message);
            if (data.loggedin == true) {
              document.location.href = ajax_login_object.redirecturl;
            }
          }
        });
        e.preventDefault();
      });

      $('#btnEndStep1').click(function () {
        $('#step1').addClass('hideMe');
        $('#step2').removeClass('hideMe');
      });
      $('#btnEndStep2').click(function () {
        $('#step2').addClass('hideMe');
        $('#step3').removeClass('hideMe');
      });
      $('#btnEndStep3').click(function () {
        // Whatever your final validation and form submission requires
        $('#sampleModal').modal('hide');
      });
    });
  },
};
