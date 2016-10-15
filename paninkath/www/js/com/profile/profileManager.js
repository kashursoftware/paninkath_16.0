function ProfileManager(){



};

ProfileManager.prototype.setProfileHolder = function(ref){
	
	this._profileHolder = ref;
	
};


ProfileManager.prototype.fetchProfilePic = function(ref){
	
	var that = this;
	
	$.ajax({
			url: "http://vps.hilfe.website:3800/getProfilePic",
			type: "get", //send it through get method,
			headers: {
				'X-Auth-Token' : window.localStorage.getItem("token")
			},
			success: function(response) {
				
				console.log("pic received");
				//if()
				that._displayPic.attr("src",response.profilePic);
			},
			error: function(xhr) {
				
				if(xhr.status == 401){
					
					console.log("failed to get");
				}else if(xhr.status == 0){
					
					
					console.log("failed to get");
					
					
				}else{
					
					console.log("failed to get");
					
				}
								
				console.log(xhr);
			}
		});
};

ProfileManager.prototype.showMyProfile = function(ref){
	
	$("#profileContainer").addClass("ownProfile");
	var userObj = window.localStorage.getItem("userInfo");
	var userInfo = jQuery.parseJSON(userObj);
	
	this._profileHolder.show();
	
	
	this._userFullName.html(userInfo.fName + " " +userInfo.lName);
	
	this.fetchProfilePic();
	
	
	
};

ProfileManager.prototype.hideMyProfile = function(ref){
	
	this._profileHolder.hide();
	
};

ProfileManager.prototype.setUserFullName = function(ref){
	
	this._userFullName = ref;
	
};

ProfileManager.prototype.setdisplayPic = function(ref){
	
	this._displayPic = ref;
	
};

ProfileManager.prototype.setQuote = function(ref){
	
	this._quote = ref;
	
	$(this._quote).on("taphold",function(){
		$(this._quote).removeAttr("readonly");
	});
	
};

