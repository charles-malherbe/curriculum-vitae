(function ($) {
    "use strict";
    
    /*--------------------------------------
    :: appointments form submit
    --------------------------------------*/
    
    $('form.appointments-form').on('submit', function (e) {
        
        var ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        $(this).find('.input-rule').each(function () { // run all inputs
            var rule = $(this).attr('data-rule');
            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if ($(this).val() === '') {
                            ferror = ierror = true;
                        }
                        break;

                    case 'minlen':
                        if ($(this).val().length < parseInt(exp)) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'email':
                        if (!emailExp.test($(this).val())) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'checked':
                        if (!$(this).is(':checked')) {
                            ferror = ierror = true;
                        }
                        break;

                    case 'regexp':
                        exp = new RegExp(exp);
                        if (!exp.test($(this).val())) {
                            ferror = ierror = true;
                        }
                        break;
                }
                $(this).parents('.form-group').find('.validation').html((ierror ? ($(this).attr('data-msg') !== undefined ? $(this).attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        
        if (ferror) {
            return false;
        }
        
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {							
                if (response.status == 'success') {
                    $(".appointments-form-inner .send-message").addClass("show");
                    $(".appointments-form-inner .error-message").removeClass("show");
                    $('.appointments-form-inner .appointments-form').find("input, textarea").val("");
                } else {
                    $(".appointments-form-inner .send-message").removeClass("show");
                    $(".appointments-form-inner .error-message").addClass("show");
                    $('.appointments-form-inner .error-message').html(response.message);
                }
            }
        });
        e.preventDefault();
    });

})(jQuery);