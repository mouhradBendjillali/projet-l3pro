function pinAna(){
    pin.call(this); //Héritage Javascript
	
    this.toHtml = function(pinMode) {

        if(pinMode == "IN")
        {
            return this.htmlIn();
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

    this.htmlInactive = function() {
    
        var htmlString = "";
            
        
        return htmlString;
    
    }

    this.htmlIn = function() {
    
        var htmlString = "<input class='voltRange spaceDiv' type='text' id='afficheVal"+ this.getNumber() +"' readonly >";
		htmlString += "<input class='voltRange spaceDiv' type='text' id='afficheVoltAna"+ this.getNumber() +"' readonly >";
		htmlString += "<div class='checkOscillo inlineDiv'><input type='checkbox'></div>";


        return htmlString;    
    }

    this.htmlOut = function() {
    

        var htmlString = "<input class='spaceDiv' type='checkbox' id='digitalSwitchA" + this.getNumber() + "' size='8' >";
		htmlString += "<label class='spaceDiv' for='digitalSwitchA" + this.getNumber() + "' id='digitalSwitchLabelA" + this.getNumber() + "'><div id='digitalSwitchLabelPA" + this.getNumber() + "'>LOW</div></label>";

        return htmlString;
    
    }



}
