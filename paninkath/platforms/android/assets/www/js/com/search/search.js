function Search(){
	
	
	
	
};

Search.prototype.setResultHolder = function(ref){
	
	var that = this;
	this._resultHolder = ref;
	
	/*this._resultHolder.on("change",function(){
		
		if(that.resultSet !== undefined){
			
			that.resultSet.list = [];
			that.createSearchList();		
		}
		
	});*/
		
};


Search.prototype.searchCleared = function(){
	
	this.resultSet.list = [];
	this.createSearchList();
	
};

Search.prototype.showSearchPage = function(){
	
	this._resultHolder.show();
	
};

Search.prototype.hideSearchPage = function(){
	
	this._resultHolder.hide();
	
};

Search.prototype.searchPeople = function(event){
	
	var that = this;
	
	if($("#searchField").val().length === 0){
		
		if(that.resultSet !== undefined){
			
			that.searchCleared();		
		}
		
		return;
		
	}

	
		$.ajax({
			url: "http://vps.hilfe.website:3800/searchUsers",
			data:{"searchText":$("#searchField").val()},
			type: "get", //send it through get method,
			success: function(response) {
				
				that.resultSet = jQuery.parseJSON(response.user);
				that.createSearchList();
			},
			error: function(xhr) {
				
				if(xhr.status == 401){
					
					
				}else if(xhr.status == 0){
					
				}
			}
		});
};

Search.prototype.createSearchList = function(){
	
	var htmlSnippet = "", that=this;
	$("#searchResult li").off("tap");
	
	if(this.resultSet.list.length === 0){
		
		htmlSnippet = "";
		
	}else{
		
		for(var i=0;i<this.resultSet.list.length;i++){
			
				//(this.resultSet.list[i]).data_usr="usr-"+i;			
				
				if(this.resultSet.list[i].uPic === undefined){
					
					this.resultSet.list[i].uPic = "./img/defaultProfilePic.png";
				}
				
				if(this.resultSet.list[i].uName !== jQuery.parseJSON(window.localStorage.getItem("userInfo")).uName){
					
					htmlSnippet += "<li class='ui-li-has-thumb ui-li-has-alt ui-first-child' data-usr="+i+"><a name='user' href='#' class='ui-btn'><img src="+
					this.resultSet.list[i].uPic+">"+this.resultSet.list[i].fName + " "+ this.resultSet.list[i].lName+
					"</img></a><a name='friendR' class='ui-btn ui-btn-icon-right ui-icon-plus'></li>";
				}
					
		}
		
		
	}
	this._resultHolder.html(htmlSnippet);
	this._resultHolder.listview().listview('refresh');
	
	$("#searchResult li").on("tap",function(event){
		
		if(event.target.name === "friendR"){
			
			that.triggerFriendRequest(event);
			return;
		}
		
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#visitedProfilePage");
		$(that).trigger("SHOW_USERPROFILE",[that.resultSet.list[$(event.currentTarget).attr("data-usr")]]);
	});

};

Search.prototype.triggerFriendRequest = function(event){
	
	$(this).trigger("FRIEND_REQUEST",[this.resultSet.list[$(event.currentTarget).attr("data-usr")]]);
	
};
