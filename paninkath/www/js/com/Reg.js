function registerUser(){
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/addUser",
		type: "get", //send it through get method
		data:{"fName":$("#fName").val(),"lName": $("#lName").val() , "email":$("#uEmail").val(),"uMobile":$("#uMobile").val(),"userName":$("#nUName").val(),"passWord":$("#nUPwd").val(),"cPassWord":$("#nUCPwd").val()},
		success: function(response) {
			console.log("sent......");
		},
		error: function(xhr) {
			console.log(xhr);
		}
	});
		
};


function verifyNumber(){
	
	var that = this;
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/getOTP",
		type: "get", //send it through get method
		success: function(response) {
			console.log("OTP Request Sent......");
			that._sId = response.sId;
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
			console.log("OTP Request Sent......");
		},
		error: function(xhr) {
			console.log(xhr);
		}
	}); 
	
	
};