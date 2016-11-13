function FriendRequestManager(){



};

FriendRequestManager.prototype.setData = function(data){
	
	this._data = data;
	
	this.sendFriendRequest();
};

FriendRequestManager.prototype.setData = function(data){
	
	var fName = jQuery.parseJSON(window.localStorage.getItem("userInfo")).fName;
	var lName = jQuery.parseJSON(window.localStorage.getItem("userInfo")).lName;
	
	$.ajax({
		
		url: "http://vps.hilfe.website:3800/sendFriendRequest",
		type: "get", //send it through get method
		headers: {
			'X-Auth-Token' : window.localStorage.getItem("token")
		},
		data:{"toUName":data.uName,"regKey":data.uRegKey,"fName":fName,"lName":lName},
		success: function(response) {
			console.log("Friend Request Sent");
		},
		error: function(xhr) {
			console.log(xhr);
		}
	});
};

