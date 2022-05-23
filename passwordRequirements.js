(function($){
    $.fn.extend({
        passwordRequirements: function(options) {

            // options for the plugin
            var defaults = {
				numCharacters: 8,
				useLowercase: true,
				useUppercase: true,
				useNumbers: true,
				useSpecial: true,
				infoMessage: '',
				style: "light", // Style Options light or dark
				fadeTime:300 // FadeIn / FadeOut in milliseconds
            };

            options =  $.extend(defaults, options);

            return this.each(function() {
				
				var o = options;
								
				// Set completion vatiables
				var numCharactersDone = true,
					useLowercaseDone = true,
					useUppercaseDone = true,
					useNumbersDone   = true,
					useSpecialDone   = true;
				
				// Set variables
				var lowerCase   		= new RegExp('[a-z]'),
					upperCase   		= new RegExp('[A-Z]'),
					numbers     		= new RegExp('[0-9]'),
					specialCharacter     = new RegExp('[!,%,&,@,#,$,^,*,?,_,~]');
				
				// Show or Hide password hint based on keyup
				$('.pr-password').on("keyup focus", function (){
					var thisVal = $(this).val();  
					
					// Check # of characters
					if ( thisVal.length >= o.numCharacters ) {
						// console.log("good numCharacters");
						$("#numCharacters").addClass("pr-ok");
						numCharactersDone = true;
					} else {
						// console.log("bad numCharacters");
						$("#numCharacters").removeClass("pr-ok");
						numCharactersDone = false;
					}
					// lowerCase meet requirements
					if (o.useLowercase === true) {
						if ( thisVal.match(lowerCase) ) {
							// console.log("good lowerCase");
							$("#useLowercase").addClass("pr-ok");
							useLowercaseDone = true;
						} else {
							// console.log("bad lowerCase");
							$("#useLowercase").removeClass("pr-ok");
							useLowercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useUppercase === true) {
						if ( thisVal.match(upperCase) ) {
							// console.log("good upperCase");
							$("#useUppercase").addClass("pr-ok");
							useUppercaseDone = true;
						} else {
							// console.log("bad upperCase");
							$("#useUppercase").removeClass("pr-ok");
							useUppercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useNumbers === true) {
						if ( thisVal.match(numbers) ) {
							// console.log("good numbers");
							$("#useNumbers").addClass("pr-ok");
							useNumbersDone = true;
						} else {
							// console.log("bad numbers");
							$("#useNumbers").removeClass("pr-ok");
							useNumbersDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useSpecial === true) {
						if ( thisVal.match(specialCharacter) ) {
							// console.log("good specialCharacter");
							$(".pr-useSpecial span").addClass("pr-ok");
							useSpecialDone = true;
						} else {
							// console.log("bad specialCharacter");
							$(".pr-useSpecial span").removeClass("pr-ok");
							useSpecialDone = false;
						}
					}
				});
            });
        }
    });
});