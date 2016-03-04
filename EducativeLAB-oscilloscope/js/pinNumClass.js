/*
 * Constructeur de l'objet Pin numérique
 */

function pinNum(){

    pin.call(this); //Héritage Javascript
	
	// Permet de lancer la fonction correspondant au mode de la pin
    this.toHtml = function(pinMode) {

        if(pinMode == "IN")
        {
            return this.htmlIn();
        }
        else if(pinMode == "OUT")
        {
            return this.htmlOut();
        }
        else if(pinMode == "PWM")
        {
            return this.htmlPWM();
        }
        
        else if(pinMode == "SERVO")
        {
            return this.htmlServo();
        }
        else if(pinMode == "INACTIVE")
        {
            return this.htmlInactive();
        }


    }

	// Fonction permettant l'affichage des éléments graphiques de Base
    this.htmlBase = function() {
    
        var htmlString = "";
        htmlString += "<input type='text' class='pinName spaceDiv' placeholder='"+ this.getName() +"'>";
		var num = this.getNumber();
        htmlString += "<span class='spaceDiv pinNumber'>D" + num + "</span>";
        htmlString += "<div class='inlineDiv spaceDiv'><select id='pinMode" + this.getNumber() + "'>";
        htmlString += "<option selected='selected' value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option value='IN'>IN</option>";
        htmlString += "<option value='OUT'>OUT</option>";
        htmlString += "<option value='PWM'>PWM</option>";
        htmlString += "<option value='SERVO'>SERVO</option>";
        htmlString += "</select></div><div class='inlineDiv spaceDiv' id='action" + num + "'></div>";
        
		return htmlString;
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode INACTIVE
    this.htmlInactive = function() {
    
            var htmlString = "";
        
        return htmlString;
    
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode INPUT
    this.htmlIn = function() {
    
        var htmlString = "<input class='spaceDiv' type='checkbox' id='digitalSwitch" + this.getNumber() + "' size='8' >";
		htmlString += "<label class='spaceDiv' for='digitalSwitch" + this.getNumber() + "' id='digitalSwitchLabel" + this.getNumber() + "'><div id='digitalSwitchLabelP" + this.getNumber() + "'>LOW</div></label>";
        htmlString += "<div class='checkOscillo inlineDiv'><input id='oscilloNum" + this.getNumber() + "' type='checkbox'></div>";
        
        return htmlString;    
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode OUTPUT
    this.htmlOut = function() {
    
        var htmlString = "<input class='spaceDiv' type='checkbox' id='digitalSwitch" + this.getNumber() + "' size='8' >";
		htmlString += "<label class='spaceDiv' for='digitalSwitch" + this.getNumber() + "' id='digitalSwitchLabel" + this.getNumber() + "'><div id='digitalSwitchLabelP" + this.getNumber() + "'>LOW</div></label>";

        return htmlString;
    
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode servo
    this.htmlServo = function() {
    
        var htmlString = "<input class='spaceDiv' type='checkbox' id='digitalSwitch" + this.getNumber() + "' >";
		htmlString += "<label class='inlineDiv spaceDiv' for='digitalSwitch" + this.getNumber() + "' id='digitalSwitchLabel" + this.getNumber() + "'><div id='digitalSwitchLabelP" + this.getNumber() + "'>ON</div></label>";
        htmlString += "<div class='inlineDiv sliderRange spaceDiv' id='slider-range" + this.getNumber() + "'></div>";
        htmlString += "<input class='spaceDiv' type='text' id='spinner" + this.getNumber() + "' min='0' max='180' readonly size='3'>";
		htmlString += "<input class='spaceDiv' type='text' id='min" + this.getNumber() + "' min='0' max='180' value='0' readonly size='3'>";
		htmlString += "<input class='spaceDiv' type='text' id='max" + this.getNumber() + "' min='0' max='180' value='180' readonly size='3'>";
		htmlString +="<div class='checkOscillo inlineDiv'><input id='oscilloNum" + this.getNumber() + "' type='checkbox'></div>";
        
        
        return htmlString;
    
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode PWM
    this.htmlPWM = function() {
    

        var htmlString = "<div class='inlineDiv sliderRange spaceDiv' id='slider-range-v" + this.getNumber() + "'></div>";
        htmlString += "<input class='spaceDiv' type='text' id='spinnerV" + this.getNumber() + "' min='0' max='255' readonly size='3'>";
        htmlString += "<input class='voltRange spaceDiv' type='text' id='afficheVolt"+ this.getNumber() +"' readonly >";
        htmlString += "<div class='checkOscillo inlineDiv'><input id='oscilloNum" + this.getNumber() + "' type='checkbox'></div>";
        
        
        return htmlString;
    
    }
}


