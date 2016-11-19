function loginUser(event){
	
	
	destroyToken();
	
	$("#loginMsg").html("");

	$.ajax({
		url: "http://vps.hilfe.website:3800/loginUser",
		type: "get", //send it through get method
		data:{"uName":$("#uName").val(),"pwd":$("#uPwd").val()},
		success: function(response) {
			window.localStorage.setItem("token", response.token);
			window.localStorage.setItem("userInfo", response.user);
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
			event.preventDefault();
			
			console.log(xhr);
		}
	});
	
};

function onFBLogin(){

	var fbLoginSuccess = function (userData) {
		onLoginSuccess();
	}

	/*facebookConnectPlugin.login(["public_profile"],
		fbLoginSuccess,
		function (error) { 
			
			alert("" + error) 
		}
	);*/

}

function onLoginSuccess(response){
		
	
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#home");
	updateUserKey();
		
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
			console.log("called.................................................................................");
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
	
	if(window.push){
			
		window.push.unregister(function() {
			console.log('success');
			
			
			$.ajax({
				url: "http://vps.hilfe.website:3800/removeUserRegisteredKey",
				type: "get", //send it through get method
				headers: {
					'X-Auth-Token' : window.localStorage.getItem("token")
				},
				data:{"regKey":window.localStorage.getItem("PK_regId")},
				success: function(response) {
					console.log("Key updated");
					window.location.reload(true);
					destroyToken();
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "#login");
				},
				error: function(xhr) {
					console.log(xhr);
					window.location.reload(true);
					destroyToken();
					$( ":mobile-pagecontainer" ).pagecontainer( "change", "#login");
				}
			});
			
			
		
		
		}, function() {
			console.log('error');
			window.location.reload(true);
			destroyToken();
			$( ":mobile-pagecontainer" ).pagecontainer( "change", "#login");
		});
	}else{
		
		window.location.reload(true);
		destroyToken();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#login");  // CREATE A HELPER FUNCTION FOR THIS

	}
	

	
};

function openLogoutDialog(event){
		
	$( "#myPanel" ).panel( "close" );
	

};

function getTmpPwd(event){
	
	var that = this;
	
	if($("#uName").val().length === 0){
		
		$("#emptyUserName").popup("open");
		
		event.preventDefault();
		
		
	}else{
		
		
		$.ajax({
			url: "http://vps.hilfe.website:3800/checkUserNameAvailability",
			type: "get", //send it through get method,
			data:{"uName":$("#uName").val()},
			success: function(response) {
				
				$("#noSuchUserName").popup("open");
				event.preventDefault();
					
			},
			error: function(xhr) {
				
				if(xhr.status == 401){
					
					window.isSMSMatch = true;
					$("#forgotPasswordPopup").popup("open");
					event.preventDefault();
					initializeToolipsterOnForm($('#updatePwdForm input'));
					validateUpdatePwdForm();
					getTemporaryPassword();
					return false;
					
				}else if(xhr.status == 0){
					
					
					$("#noConnection").popup("open");
					event.preventDefault();
					
					
				}else{
					
					$("#unknownError").popup("open");
					event.preventDefault();
					
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
		data:{"uName":$("#uName").val()},
		success: function(response) {
			console.log("TP Request Sent......");
			that._sId = response.sId;
		},
		error: function(xhr) {
			console.log(xhr);
		}
	}); 
	
};

function updateNewPassword(event){
	
	var that = this;
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/validateTP",
		type: "get", //send it through get method
		data:{"tmpPwd":$("#tmpPwd").val(),"sId":that._sId},
		success: function(response) {
			console.log("OTP Verified");
			performPasswordUpdate(event);
		},
		error: function(xhr) {
			console.log(xhr);
			that._incorrectTPWW = true;
			window.isSMSMatch = false;
			$("#tmpPwd").focus();
			window.isSMSMatch = true;
			
			$("#forgotPasswordPopup").bind({popupafterclose: function(event, ui) { 
					$("#forgotPasswordPopup input").val("");
				}
			});
			
		}
	}); 
	
	
	
};

function performPasswordUpdate(){
	
	$.ajax({
		url: "http://vps.hilfe.website:3800/updatePassword",
		type: "get", //send it through get method
		data:{"newPwd":$("#newPwd").val(), "uName":$("#uName").val()},
		success: function(response) {
			console.log("Password updated");
			$("#forgotPasswordPopup").popup("close");
			
			$("#forgotPasswordPopup").bind({popupafterclose: function(event, ui) { 
			
					$("#pwdUpdateSuccessful").popup("open");
					event.preventDefault();
					
					$("#forgotPasswordPopup").unbind("popupafterclose");
					
					$("#forgotPasswordPopup input").val("");
					return false;
			
				}
			});

			
			//$("#forgotPassWordPopup").popup("close");
		},
		error: function(xhr) {
			console.log(xhr);
		}
	});
	
};

function updateUserKey(){
	
	
	window.push = PushNotification.init({
				android: {
					senderID: "899585413812"
				}
		});
			
	window.push.on('registration', function(data) {
		// data.registrationId
		
		window.localStorage.setItem("PK_regId", data.registrationId);
		console.log("Registered.....!!!!");
		$.ajax({
			url: "http://vps.hilfe.website:3800/setUserRegisteredKey",
			type: "get", //send it through get method
			headers: {
				'X-Auth-Token' : window.localStorage.getItem("token")
			},
			data:{"regKey":data.registrationId},
			success: function(response) {
				console.log("Key updated");
			},
			error: function(xhr) {
				console.log(xhr);
			}
		});
		
		
	});
	
	window.push.on('notification', function(data) {
	console.log("notification received...");
		// data.message,
		// data.title,
		// data.count,
		// data.sound,
		// data.image,
		// data.additionalData
		
		window.push.setApplicationIconBadgeNumber(function() {
			console.log('success');
			}, function() {
			console.log('error');
		}, data.count);
	});
	
	window.push.on('error', function(e) {
		// e.message
		console.log("Error........");
	});
};