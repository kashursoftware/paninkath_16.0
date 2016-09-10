var _validationStatus = {
	
	updatePassword: {
		
		tmpPwd: false,
		newPwd: false,
		cNewPwd: false
		
	},
	signUp1: {
		
		nUNumber:false,
		nUPwd:false,
		nUCPwd: false
	},
	
	signUp2: {
		
		fName: false,
		lName: false
		
	}
};


function updateValidationStatus(config){
	
	var formType = config.formType;
	var elementId = config.elementId;
	var isValid = config.isValid;
	var navigationLinkButton = config.navigationLinkButton;
	var verifyLinkButton = config.verifyLinkButton;
	var eventName = config.eventName;
	
	_validationStatus[formType][elementId] = isValid;
	
	for(i in _validationStatus[formType]){
		
		if(_validationStatus[formType][i] === false){
			
			enableLinkButton(navigationLinkButton, false);
			return;
		}
	}
	
	enableLinkButton(navigationLinkButton, true, eventName);
	
}

function enableLinkButton(linkButton, isEnabled, eventName){
	
	if(isEnabled){
		
		linkButton.removeClass("disabledLinkBtn");
		linkButton.off("tap");
		
		if(eventName !== undefined){
			
			linkButton.on("tap",eventName);
		}
		
		
	}else{
			
		linkButton.addClass("disabledLinkBtn");
		linkButton.off("tap");
		linkButton.on("tap",function(event){event.preventDefault();linkButton.removeClass("ui-btn-active")});
		
	}
	
};
