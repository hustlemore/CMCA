(function() {

    // Accordion
    var acc = document.getElementsByClassName('accordion');

    if (acc.length) {
        for (var i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                this.classList.toggle('active');
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            }
        }
    }

    if ($("#inner-wrapper")) {

      // Initialize chosen jQuery plugin for multi-select dropdown
      $(".chosen-select").chosen();

      // Form validation icons
      $('#large-form').on('click change focusout keyup', function(e){
          if ( $(e.target).is('[required]') ) {
              if( $(e.target).is(':invalid') ){
                  $(e.target).parent().removeClass('valid-icon');
                  $(e.target).parent().addClass('invalid-icon');
              } else {
                  $(e.target).parent().removeClass('invalid-icon');
                  $(e.target).parent().addClass('valid-icon');
              }
          }

          var checkboxes = $("#primaryconditions input:checkbox:checked").length;
          var selectdropdown = $('#Condition').val();

          if( checkboxes || selectdropdown ) {
              $('#Condition_chosen').removeClass('invalid-icon');
              $('#Condition_chosen').addClass('valid-icon');
          } else {
              $('#Condition_chosen').removeClass('valid-icon');
              $('#Condition_chosen').addClass('invalid-icon');
          }

      });

      // Conditions hover
      if($(window).width() >= 1024) {
        $('.rollover-container').hover(
          function() {
            $(this).children('.rollover').removeClass('display-toggle');
          }, function() {
            $(this).children('.rollover').addClass('display-toggle');
          }
        );
      }

    }


// AJAX
// Variable to hold request
var request;

// Bind to the submit event of our form
$("#large-form").submit(function(event){

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://formspree.io/mmj@innovativeexpresscare.com",
        method: "POST",
        dataType: "json",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Success!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
        $("#large-form").addClass("display-toggle");
        $("#success").removeClass("display-toggle");
        $("html, body").animate({ scrollTop: $('#success').offset().top - 100 }, 'slow');
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
});

}());