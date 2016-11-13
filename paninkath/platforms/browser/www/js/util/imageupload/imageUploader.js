function ImageUploader(){


};

ImageUploader.prototype.browseImage = function(){

	navigator.camera.getPicture($.proxy(this.onCapturePhotoSuccess,this), $.proxy(this.onCapturePhotoError,this), {
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
		allowEdit: true,
		targetWidth: 300,
		targetHeight: 300
	});
	
};

ImageUploader.prototype.onCapturePhotoSuccess = function(imageData){
	
	window.resolveLocalFileSystemURL(imageData, $.proxy(this.gotFileEntry,this), this.failSystem);
	
};

ImageUploader.prototype.onCapturePhotoError = function(message){
	
	//_self._showAlert('Captured Failed because: ' + message);
};

ImageUploader.prototype.gotFileEntry = function(fileEntry){
	
	var that = this;
	//convert all file to base64 formats
	fileEntry.file(function (file) {
		//alert(file.size);
		var reader = new FileReader();
		reader.onloadend = function (evt) {
			$('#displayPic').attr('src', evt.target.result);
			that.uploadToMidtier(evt);
			//console.log(_self.dataURItoBlob(evt.target.result));
			//that.editPic = _self.dataURItoBlob(evt.target.result);
		};
		reader.readAsDataURL(file);
	}, function (message) {
		//_self._showAlert('Failed because: ' + message);
	});
	
};

ImageUploader.prototype.failSystem = function(fileEntry){
	
	//_self._showAlert('failed');
	
};

ImageUploader.prototype.uploadToMidtier = function(event){
	
	var currenetDateAndTime = new Date($.now());
	
	
	$.ajax({
			url: "http://vps.hilfe.website:3800/updateProfilePic",
			type: "get", //send it through get method,
			headers: {
				'X-Auth-Token' : window.localStorage.getItem("token")
			},
			data:{"displayPic":event.target.result,"picUploadDateAndTime":device.uuid},
			success: function(response) {
				
				console.log("pic uploaded");
				
			},
			error: function(xhr) {
				
				if(xhr.status == 401){
					
					console.log("failed to upload");
				}else if(xhr.status == 0){
					
					
					console.log("failed to upload");
					
					
				}else{
					
					console.log("failed to upload");
					
				}
								
				console.log(xhr);
			}
		});
};