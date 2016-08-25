function validateSignUp1(){
	
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Letters only please"); 

	$("#signUpForm1").validate({
		
		onfocusout: function (element) { $(element).valid();},
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
			fName: "Valid first name please...",
			lName: "Valid first name please...",
			uEmail: "Valid email please..."
		},errorPlacement: function (error, element) {
			
			
            var lastError = $(element).data('lastError'),
                newError = $(error).text();
				
			//$("#errorMsg1").text(newError);

            $(element).data('lastError', newError);
			

            if(newError !== '' && newError !== lastError){
                $(element).tooltipster('content', newError);
                $(element).tooltipster('show');
            }
			
			//$(element).attr("placeholder",newError);
			$(element).addClass("invalid-value");
			
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
        }
	});
	
	
};



//##############################################################################################
//##############################################################################################
// validate signup form on keyup and submit

function validateSignUp2(){
	
		
	$("#signUpForm2").validate({
		
		onfocusout: function (element) { $(element).valid();},
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
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			nUPwd: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			nUCPwd: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			}
		},errorPlacement: function (error, element) {
			
			
           // var lastError = $(element).data('lastError'),
           var newError = $(error).text();
		   
		   $("#errorMsg2").text(newError);
				

            $(element).data('lastError', newError);
			
			$(element).attr("placeholder",newError);
			$(element).addClass("invalid-value");
			
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
        }
	});
};
