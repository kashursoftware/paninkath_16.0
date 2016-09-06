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