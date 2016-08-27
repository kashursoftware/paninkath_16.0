function validateSignUp1(){
	
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Letters only please"); 

	$("#signUpForm1").validate({
		
		onfocusout: function (element) {
			$(element).valid();
			$(element).tooltipster('hide');
			
		},
		
		onfocusin: function (element) {
			$(element).valid();
			if(($(element).data('lastError') !== "")){
				$(element).tooltipster('show');
			}
			
			
		},
		
		onkeyup: function(element) { $(element).valid(); },
		
		rules: {
			fName: {
				
				required: true,
				lettersonly: true
			},
			lName: {
				
				required: true,
				lettersonly: true
			},
			uEmail: {
				required: true,
				email: true
			}
		},
		messages: {
			fName: {
				required: "First name please..."
			},
			lName: {
				required: "Last name please..."
			},
			uEmail: {
				required: "email Id please..."
			
			}
		},errorPlacement: function (error, element) {
			
			
            var lastError = $(element).data('lastError'),
                newError = $(error).text();

            $(element).data('lastError', newError);
			

            if(newError !== '' && newError !== lastError){
                $(element).tooltipster('content', newError);
                $(element).tooltipster('show');
            }
			
			$(element).addClass("invalid-value");
			
			updateValidationStatus({signUp:"signUp1",elementId:$(element).attr("id"),isValid:false,linkButton:$("#next1")});
			
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
			updateValidationStatus({signUp:"signUp1",elementId:$(element).attr("id"),isValid:true,linkButton:$("#next1")});
        }
	});
	
	
};



//##############################################################################################
//##############################################################################################
// validate signup form on keyup and submit

function validateSignUp2(){
	
		
	$("#signUpForm2").validate({
		
		onfocusout: function (element) {
			$(element).valid();
			$(element).tooltipster('hide');
			
		},
		
		onfocusin: function (element) {
			$(element).valid();
			if(($(element).data('lastError') !== "")){
				$(element).tooltipster('show');
			}
			
		},
		onkeyup: function(element) { $(element).valid(); },
		rules: {
			nUName: {
				required: true,
				minlength: 2
			},
			nUPwd: {
				required: true,
				minlength: 5
			},
			nUCPwd: {
				required: true,
				minlength: 5,
				equalTo: "#nUPwd"
			}
		},
		messages: {
			nUName: {
				required: "User name please...",
				minlength: "Your username must consist of at least 2 characters"
			},
			nUPwd: {
				required: "Password please...",
				minlength: "Your password must be at least 5 characters long"
			},
			nUCPwd: {
				required: "Confirm your password please",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Password and confirm password must match"
			}
		},errorPlacement: function (error, element) {
			
			
            var lastError = $(element).data('lastError'),
                newError = $(error).text();
				
            $(element).data('lastError', newError);

            if(newError !== '' && newError !== lastError){
                $(element).tooltipster('content', newError);
                $(element).tooltipster('show');
            }
			
			$(element).addClass("invalid-value");
			updateValidationStatus({signUp:"signUp2",elementId:$(element).attr("id"),isValid:false,linkButton:$("#doneBtn")});
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
			updateValidationStatus({signUp:"signUp2",elementId:$(element).attr("id"),isValid:true,linkButton:$("#doneBtn")});
        }
	});
};
