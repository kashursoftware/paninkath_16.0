function loginUser(){
	
	destroyToken();

	$.ajax({
		url: "http://vps.hilfe.website:3800/loginUser",
		type: "get", //send it through get method
		data:{"uNumber":$("#uNumber").val(),"pwd":$("#uPwd").val()},
		success: function(response) {
			window.localStorage.setItem("token", response.token);
			//trial();
			
			onLoginSuccess(response);
		},
		error: function(xhr) {
				
			if(xhr.status === 401){
					
				$("#loginFailMessage").html("<p><b>The credentials entered by you are not correct</b></p>");
			}else if(xhr.status === 0){
				
				$("#loginFailMessage").html("<p><b>Paninkath is not able to login. Please check your internet connection and try again</b></p>");
			}else{
				
				$("#loginFailMessage").html("<p><b>Paninkath is not sure what's hapening here. Please report this at www.paninkath.com</b></p>");
			}
			
			$("#failedToLogin").popup("open");
			console.log(xhr);
		}
	});
	
};

function onFBLogin(){

	var fbLoginSuccess = function (userData) {
		onLoginSuccess();
	}

	facebookConnectPlugin.login(["public_profile"],
		fbLoginSuccess,
		function (error) { 
			
			alert("" + error) 
		}
	);

}

function onLoginSuccess(response){
		
	$( ":mobile-pagecontainer" ).on( "pagecontainerbeforechange", function( event, ui ) {
		
		var obj = jQuery.parseJSON(response.user);
		$("#welmsg").text("Welcome to Paninkath "+obj.fName);
		
	} );
		
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#home");
		
};

function autoLogin(){
	
	if(getToken() === null){
		
		return;
	}
	
	$.ajax({
		url : "http://vps.hilfe.website:3800/validateLoggedInUser",
		type: "get",
		headers: {
		'X-Auth-Token' : getToken()
		}, 
		success: function(response) {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#home");
		},
		error: function(xhr) {
			console.log(xhr);
		}
	});
	
};

function isUserLoggedIn(){
	
	if(getToken() !== null){
		
		return true;
	}
	
	return false;
};

function getToken(){
	
	return window.localStorage.getItem("token");
	
};

function destroyToken(){
	
	window.localStorage.removeItem("token");
};

function logoutUser(){
	
	destroyToken();
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#login");
};

function getTmpPwd(){
	
	var that = this, tempHtml;
	
	if($("#uNumber").val().length === 0){
		tempHtml = $("#forgotPassWordPopup").html();
		
		$("#forgotPassWordPopup").html("<p><b>Please type in your registered mobile number first</b></p>");
		
		$(this).bind({popupafterclose: function(event, ui) { 
			
				$("#forgotPassWordPopup").html(tempHtml);
			}
		});
		
	}else{
		
		$.ajax({
			url: "http://vps.hilfe.website:3800/checkUserNameAvailability",
			type: "get", //send it through get method,
			data:{"phone":$("#uNumber").val()},
			success: function(response) {
				
				tempHtml = $("#forgotPassWordPopup").html();			
				$("#forgotPassWordPopup").html("<p><b>No account found with this mobile number.</b></p>");				
			},
			error: function(xhr) {
				
				if(xhr.status == 401){
						
					getTemporaryPassword();
				}else if(xhr.status == 0){
					
					tempHtml = $("#forgotPassWordPopup").html();			
					$("#forgotPassWordPopup").html("<p><b>Paninkath is not able to connect. Please check your internet connection and try again</b></p>");				
					
				}else{
					
					tempHtml = $("#forgotPassWordPopup").html();			
					$("#forgotPassWordPopup").html("<p><b>Paninkath is not sure what's hapening here. Please report this at www.paninkath.com</b></p>");
				}
								
				console.log(xhr);
			}
		});
		
	}
	
	
};

function getTemporaryPassword(){
	
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/getTP",
		type: "get", //send it through get method,
		data:{"phone":$("#uNumber").val()},
		success: function(response) {
			console.log("TP Request Sent......");
			that._sId = response.sId;
		},
		error: function(xhr) {
			console.log(xhr);
		}
	}); 
	
	$(this).bind({popupafteropen: function(event, ui) { 
			
			initializeToolipsterOnForm($('#updatePwdForm input'));
			validateUpdatePwdForm();
			
		}
	});
	
	
};

function verifyTmpPwdAndUpdate(){
	
	var that = this;
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/validateTP",
		type: "get", //send it through get method
		data:{"tmpPwd":$("#tmpPwd").val(),"sId":that._sId},
		success: function(response) {
			console.log("OTP Verified");
			prepareUpdatePassWordAssets();
		},
		error: function(xhr) {
			console.log(xhr);
		}
	}); 
	
	
	
};

function prepareUpdatePassWordAssets(){
	
	
		//To do...
	
};