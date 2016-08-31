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
				lettersonly: true,
				minlength: 2
			},
			lName: {
				
				required: true,
				lettersonly: true,
				minlength: 2
			},
			uEmail: {
				required: true,
				email: true
			}
		},
		messages: {
			fName: {
				required: "enter first name",
				minlength: "First name is too short"
			},
			lName: {
				required: "enter last name",
				minlength: "Last name is too short"
			},
			uEmail: {
				required: "enter emailid ",
				email: "Invalid email"
			
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
	
	jQuery.validator.addMethod("userAvailability", function(value, element) {
		
		var isSuccess = false;
		
		$.ajax({
			url: "http://vps.hilfe.website:3800/checkUserNameAvailability",
			type: "get", //send it through get method
			data:{"userName":$(element).val()},
			async: false,
			success: function(response) {
				console.log("User name available");
				isSuccess = true;
			},
			error: function(xhr) {
				isSuccess = false;
				console.log("User name not available");
				console.log(xhr);
			}
		});
		
		return isSuccess;
		

	}, "User name already taken"); 
		
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
				minlength: 2,
				userAvailability: true
			},
			nUPwd: {
				required: true,
				minlength: 5
			},
			nUCPwd: {
				required: true,
				equalTo: "#nUPwd"
			}
		},
		messages: {
			nUName: {
				required: "Enter user name",
				minlength: "User name is too short"
			},
			nUPwd: {
				required: "Enter Password",
				minlength: "Atleast 5 characters"
			},
			nUCPwd: {
				required: "Confirm password",
				equalTo: "Passwords don't match"
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
