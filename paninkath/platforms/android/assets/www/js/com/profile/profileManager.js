function ProfileManager(){



};

ProfileManager.prototype.setProfileHolder = function(ref){
	
	this._profileHolder = ref;
	
};

ProfileManager.prototype.showMyProfile = function(ref){
	var userObj = window.localStorage.getItem("userInfo");
	var userInfo = jQuery.parseJSON(userObj);
	
	this._profileHolder.show();
	
	
	this._userFullName.html(userInfo.fName + " " +userInfo.lName);
	
};

ProfileManager.prototype.hideMyProfile = function(ref){
	
	this._profileHolder.hide();
	
};

ProfileManager.prototype.setUserFullName = function(ref){
	
	this._userFullName = ref;
	
};
