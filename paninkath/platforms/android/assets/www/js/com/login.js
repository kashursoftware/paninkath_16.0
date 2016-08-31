function loginUser(){
	
	destroyToken();

	$.ajax({
		url: "http://vps.hilfe.website:3800/loginUser",
		type: "get", //send it through get method
		data:{"uName":$("#uName").val(),"pwd":$("#uPwd").val()},
		success: function(response) {
			window.localStorage.setItem("token", response.token);
			//trial();
			
			onLoginSuccess(response);
		},
		error: function(xhr) {
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
		$("#welmsg").text("Welcome to Paninkath "+obj.uName);
		
	} );
		
	$( ":mobile-pagecontainer" ).pagecontainer( "change", "#home");
		
};

function autoLogin(){
	
	if(getToken() === null){
		
		return;
	}
	
	$.ajax({
		url : "http://vps.hilfe.website:3800/welcomeUser",
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