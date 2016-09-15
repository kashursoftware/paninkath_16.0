function validateTempCodeForm(){
		
	jQuery.validator.addMethod("CodeMatch", function(value, element) {
		return window.isCodeMatch;
	}, "Incorrect Code");
	
	$("#tempCodeForm").validate({
		
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
			
			vCode: {
				required: true,
				CodeMatch: true
			}
			
		},
		messages: {
			
			vCode: {
				required: "Temporary code"
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
			
			updateValidationStatus({formType:"tempCodeForm",elementId:$(element).attr("id"),isValid:false,navigationLinkButton:$("#verifyCode")});
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
			updateValidationStatus({formType:"tempCodeForm",elementId:$(element).attr("id"),isValid:true,navigationLinkButton:$("#verifyCode"),eventName:$.proxy(validateCode,window)});
        }
	});
	
};
function validateUpdatePwdForm(){
	
	jQuery.validator.addMethod("SMSMatch", function(value, element) {
		return window.isSMSMatch;
	}, "Incorrect OTP");
	
	$("#updatePwdForm").validate({
		
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
			
			tmpPwd: {
				required: true,
				SMSMatch: true
			},
			newPwd: {
				required: true,
				minlength: 5,
			},
			cNewPwd: {
				required: true,
				equalTo: "#newPwd"
			}
			
		},
		messages: {
			
			tmpPwd: {
				required: "OTP"
			},
			newPwd: {
				required: "New Password",
				minlength: "Atleast 5 characters",
			},
			cNewPwd: {
				required: "Confirm Password",
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
			
			updateValidationStatus({formType:"updatePassword",elementId:$(element).attr("id"),isValid:false,navigationLinkButton:$("#updateNewPwd")});
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
			updateValidationStatus({formType:"updatePassword",elementId:$(element).attr("id"),isValid:true,navigationLinkButton:$("#updateNewPwd"),eventName:$.proxy(updateNewPassword,window)});
        }
	});
	
	
};

function validateSignUp1(){
		
	jQuery.validator.addMethod("userAvailability", function(value, element) {
		
		var isSuccess = false;
		
		$.ajax({
			url: "http://vps.hilfe.website:3800/checkUserNameAvailability",
			type: "get", //send it through get method
			data:{"phone":$(element).val()},
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
		

	}, "Number Already Taken");
	
	jQuery.validator.addMethod("verify", function(value, element) {
		
		if(that.verifiedNumber === undefined){
			
			that.verifiedNumber = {};
			that.verifiedNumber.numbers = [];
		}
		if(that.verifiedNumber.numbers.indexOf($(element).val()) !== -1){
			
				return that.verifiedNumber.isNumberVerified;
		}else{
			
				return false;
		}
		
	}, "Verify your number");

	$("#signUpForm1").validate({
		
		onfocusout: function (element) {
			$(element).valid();
			$(element).tooltipster('hide');
			
		},
		
		onfocusin: function (element) {
			//$(element).valid();
			if(($(element).data('lastError') !== "")){
				$(element).tooltipster('show');
			}
			
			
		},
		
		onkeyup: function(element) { $(element).valid(); },
		
		rules: {
			
			nUNumber: {
				required: true,
				number: true,
				minlength: 10,
				userAvailability: true,
				verify: true
			},
			nUPwd: {
				required: true,
				minlength: 5,
			},
			nUCPwd: {
				required: true,
				equalTo: "#nUPwd"
			}
		},
		messages: {
			
			nUNumber: {
				required: "Enter mobile number ",
				number: "Enter only numbers",
				minlength: "Enter 10 digit number"
			
			},
			nUPwd: {
				required: "Enter password",
				minlength: "Atleast 5 characters",
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
			
			updateValidationStatus({formType:"signUp1",elementId:$(element).attr("id"),isValid:false,navigationLinkButton:$("#next1")});
			
			if(newError === "Verify your number"){				
				$("#verifyMobile").show();
			}/*else{
				
				$("#verifyMobile").hide();
			}*/
			
			
        },
        success: function (label, element) {
			
			$("#signUpForm1").validate();
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
			updateValidationStatus({formType:"signUp1",elementId:$(element).attr("id"),isValid:true,navigationLinkButton:$("#next1")});
        }
	});
	
	
};



//##############################################################################################
//##############################################################################################
// validate signup form on keyup and submit

function validateSignUp2(){
	
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Letters only please");
		
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
			fName: {
				
				required: true,
				lettersonly: true,
				minlength: 2
			},
			lName: {
				
				required: true,
				lettersonly: true,
				minlength: 2
			}
		},
		messages: {
			
			fName: {
				required: "Enter first name",
				minlength: "First name is too short"
			},
			lName: {
				required: "Enter last name",
				minlength: "Last name is too short"
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
			updateValidationStatus({formType:"signUp2",elementId:$(element).attr("id"),isValid:false,navigationLinkButton:$("#doneBtn")});
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
			updateValidationStatus({formType:"signUp2",elementId:$(element).attr("id"),isValid:true,navigationLinkButton:$("#doneBtn"),eventName:registerUser});
        }
	});
};
//=====================================================
//Archive
/*
function validateLogin(){
		

	$("#loginForm").validate({
		
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
			
			uNumber: {
				required: true,
			},
			uPwd: {
				required: true,
			},
			tmpPwd: {
				required: true,
			},
			newPwd: {
				required: true,
			},
			cNewPwd: {
				required: true,
			}
			
		},
		messages: {
			
			uNumber: {
				required: "Your registered mobile number "
			},
			uPwd: {
				required: "Your password"
			},
			tmpPwd: {
				required: "Enter temporary password you received"
			},
			newPwd: {
				required: "Enter new password"
			},
			cNewPwd: {
				required: "Confirm new password"
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
			
			
			
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
			$(element).removeClass("invalid-value");
			//updateValidationStatus({signUp:"signUp1",elementId:$(element).attr("id"),isValid:true,navigationLinkButton:$("#next1")});
        }
	});
	
	
};*/