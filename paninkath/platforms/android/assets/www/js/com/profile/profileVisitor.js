function ProfileVisitor(){



};

ProfileVisitor.prototype.setUserData = function(data){
	
	this._data = data;
	
	this.showUserProfile();
	
};


ProfileVisitor.prototype.setProfileHolder = function(ref){
	
	this._profileHolder = ref;
	
};



ProfileVisitor.prototype.showUserProfile = function(){
	
	this._profileHolder.show();
	this._userFullName.html(this._data.fName + " " +this._data.lName);
	
	if(this._data.uPic === undefined){
		
		this._data.uPic = "./img/defaultProfilePic.png";
	}
	this._displayPic.attr("src",this._data.uPic);
	$("#visitedUserFName").html("<b>"+this._data.fName+" "+this._data.lName+"</b>");
};

ProfileVisitor.prototype.hideUserProfile = function(ref){
	
	this._profileHolder.hide();
	
};

ProfileVisitor.prototype.setUserFullName = function(ref){
	
	this._userFullName = ref;
	
};

ProfileVisitor.prototype.setdisplayPic = function(ref){
	
	this._displayPic = ref;
	
};
