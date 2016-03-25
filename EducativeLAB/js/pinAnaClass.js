/*
 * Constructeur de l'objet Pin analogique
 */

function pinAna(){
    pin.call(this); //Héritage Javascript
	
	// Permet de lancer la fonction correspondant au mode de la pin
    this.toHtml = function(pinMode, disabled) {

        if(pinMode == "IN")
        {
            return this.htmlIn(disabled);
        }
        else if(pinMode == "OUT")
        {
            return this.htmlOut();
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
        htmlString += "<span class='spaceDiv pinNumber'>A" + num + "</span>";
        htmlString += "<div class='inlineDiv spaceDiv'><select id='pinModeA" + this.getNumber() + "'>";
        htmlString += "<option selected='selected' value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option value='IN'>IN</option>";
        htmlString += "<option value='OUT'>OUT</option>";
        htmlString += "</select></div><div class='inlineDiv spaceDiv' id='actionAna"+num+"' ></div>";
        
		return htmlString;
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode INACTIVE
    this.htmlInactive = function() {
    
        var htmlString = "";
            
        
        return htmlString;
    
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode INPUT
    this.htmlIn = function(disabled) {
    
        var htmlString = "<input class='voltRange spaceDiv' type='text' id='afficheVal"+ this.getNumber() +"' readonly >";
		htmlString += "<input class='voltRange spaceDiv' type='text' id='afficheVoltAna"+ this.getNumber() +"' readonly >";
		if(disabled){
			htmlString += "<div class='checkOscillo inlineDiv'><input id='oscilloAna" + this.getNumber() + "' type='checkbox' disabled=true></div>";
		} else {
			 		htmlString += "<div class='checkOscillo inlineDiv'><input id='oscilloAna" + this.getNumber() + "' type='checkbox'></div>";
		}


        return htmlString;    
    }

	// Fonction permettant l'affichage des éléments graphiques correspondants au mode OUTPUT
    this.htmlOut = function() {
    

        var htmlString = "<input class='spaceDiv' type='checkbox' id='digitalSwitchA" + this.getNumber() + "' size='8' >";
		htmlString += "<label class='spaceDiv' for='digitalSwitchA" + this.getNumber() + "' id='digitalSwitchLabelA" + this.getNumber() + "'><div id='digitalSwitchLabelPA" + this.getNumber() + "'>LOW</div></label>";

        return htmlString;
    
    }



}
