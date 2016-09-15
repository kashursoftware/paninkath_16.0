function registerUser(){
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/addUser",
		type: "get", //send it through get method
		data:{"fName":$("#fName").val(),"lName": $("#lName").val(),"nUName":$("#nUName").val(),"nUNumber":$("#nUNumber").val(),"passWord":$("#nUPwd").val(),"cPassWord":$("#nUCPwd").val()},
		success: function(response) {
			console.log("sent......");
			$("#loginMsg").html("Hey! Your account is created, Login now to get rolling!");
		},
		error: function(xhr) {
			console.log(xhr);
		}
	});
		
};


function verifyNumber(event){
	
	window.isCodeMatch = true;
	
	
	var that = this;
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/getOTP",
		type: "get", //send it through get method,
		data:{"phone":$("#nUNumber").val()},
		success: function(response) {
			console.log("OTP Request Sent......");
			that._sId = response.sId;
			
			$("#verifyNumberPopup").popup("open");
			$("#vCode").focus();			
			$("#vCode").val("");
			event.preventDefault();
			
		},
		error: function(xhr) {
			console.log(xhr);
		}
	}); 
	
	
};

function validateCode(){
	
	var that = this;
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/validateOTP",
		type: "get", //send it through get method
		data:{"vCode":$("#vCode").val(),"sId":that._sId},
		success: function(response) {
			console.log("OTP Verified");
			that.verifiedNumber.numbers.push($("#nUNumber").val());
			that.verifiedNumber.isNumberVerified = true;
			$("#signUpForm1").validate().element("#nUNumber");
			$("#nUNumber").focus();
			window.isCodeMatch = true;
			$("#verifyNumberPopup").popup( "close" );
			$("#verifyMobile").html("Number Verified");
			enableLinkButton($("#verifyMobile"));
		},
		error: function(xhr) {
			console.log(xhr);
			that.verifiedNumber.isNumberVerified = false;
			//$("#nUNumber").focus();
			window.isCodeMatch = false;
			$("#vCode").focus();
			window.isCodeMatch = true;
		}
	}); 
	
	
	
	$(this).bind({popupafterclose: function(event, ui) { 
			
			$("#nUNumber").focus();			
			$("#signUpForm1").validate().element("#nUNumber");
		}
	});
	
	
	
};
