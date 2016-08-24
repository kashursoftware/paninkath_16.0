function validateSignUp1(){
	
	$("#signUpForm1").validate({
		rules: {
			fName: "required",
			lName: "required",
			uEmail: {
				required: true,
				email: true
			}
		},
		messages: {
			fName: "Please enter your firstname",
			lName: "Please enter your lastname",
			uEmail: "Please enter a valid email address"
		}
	
	});
	
};

//##############################################################################################
//##############################################################################################
// validate signup form on keyup and submit

function validateSignUp2(){
		
	$("#signUpForm2").validate({
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
		}
	});
};
