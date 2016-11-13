var _validationStatus = {
	
	tempCodeForm:{
		
		vCode: false		
	},
	
	updatePassword: {
		
		tmpPwd: false,
		newPwd: false,
		cNewPwd: false
		
	},
	signUp1: {
		
		nUName: false,
		nUPwd:false,
		nUCPwd: false,
		nUNumber:false
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
	
	if(formType == "signUp1"){
		
		if(elementId === "nUNumber"){
			
			if(window.verifiedNumber !== undefined){
					
				if(window.verifiedNumber.numbers.indexOf($("#"+elementId).val()) === -1){					
					$("#verifyMobile").html("Verify Number");
					enableLinkButton($("#verifyMobile"), true, $.proxy(verifyNumber,window));
				}else{
					
					$("#verifyMobile").html("Number Verified");
					enableLinkButton($("#verifyMobile"));
					
				}
				
			}
			
			
			
		}
	}
	
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
