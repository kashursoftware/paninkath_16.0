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
	
	var htmlSnippet = "";
	
	if(this.resultSet.list.length === 0){
		
		htmlSnippet = "";
		
	}else{
		
		for(var i=0;i<this.resultSet.list.length;i++){
			
				htmlSnippet += "<li class='ui-li-static ui-body-inherit ui-first-child ui-last-child'>"+this.resultSet.list[i].fName + " "+ this.resultSet.list[i].lName+"</li>";
		}
		
	}
	this._resultHolder.html(htmlSnippet);

};
