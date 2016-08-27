var _validationStatus = {
	
	signUp1: {
		
		fName:false,
		lName:false,
		uEmail: false
	},
	
	signUp2: {
		
		nUName: false,
		nUPwd: false,
		nUCPwd: false
		
	}
};


function updateValidationStatus(config){
	
	var signUp = config.signUp;
	var elementId = config.elementId;
	var isValid = config.isValid;
	var linkButton = config.linkButton;
	
	_validationStatus[signUp][elementId] = isValid;
	
	for(i in _validationStatus[signUp]){
		
		
		if(_validationStatus[signUp][i] === false){
			
			enableLinkButton(linkButton, false);
			return;
		}
	}
	
	enableLinkButton(linkButton, true);
	
}

function enableLinkButton(linkButton, isEnabled){
	
	if(isEnabled){
		
		linkButton.removeClass("disabledLinkBtn");
		linkButton.off("tap");
		$("#doneBtn").on("tap",registerUser);
		
	}else{
			
		linkButton.addClass("disabledLinkBtn");
		linkButton.on("tap",function(event){event.preventDefault();linkButton.removeClass("ui-btn-active")});
		
	}
	
};

