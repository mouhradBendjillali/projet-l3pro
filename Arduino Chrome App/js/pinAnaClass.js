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
        htmlString += "<div class='col-md-1'><input type='text' id='pinName' placeholder='"+ this.getName() +"'style='width:75px'></input></div>";
		var num = this.getNumber();
        htmlString += "<div class='col-md-1'><span id='pinNumber'>A" + num + "</span></div>";
        
		return htmlString;
    }

    this.htmlInactive = function() {
    
        var htmlString = this.htmlBase();
            htmlString += "<div class='col-md-2' id='selectPinA'><select id='pinModeA" + this.getNumber() + "'>";
            htmlString += "<option selected='selected' value='INACTIVE'>INACTIVE</option>";
            htmlString += "<option value='IN'>IN</option>";
            htmlString += "<option value='OUT'>OUT</option>";
            htmlString += "</select></div>";
        
        return htmlString;
    
    }

    this.htmlIn = function() {
    
        var htmlString = this.htmlBase();
        htmlString += "<div class='col-md-2' id='selectPinA'><select id='pinModeA" + this.getNumber() + "'>";
        htmlString += "<option value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option selected='selected' value='IN'>IN</option>";
        htmlString += "<option value='OUT'>OUT</option>";
        htmlString += "</select></div>";
        htmlString += "<div class='col-md-2'><input type='text' id='afficheVal"+ this.getNumber() +"' readonly style='width:75px'></input></div>";
		htmlString += "<div class='col-md-2'><input type='text' id='afficheVoltAna"+ this.getNumber() +"' readonly style='width:75px'></input></div>";
		htmlString += "<div class='col-md-1'><input type='checkbox'></div>";


        return htmlString;    
    }

    this.htmlOut = function() {
    
	var htmlString = this.htmlBase();
        htmlString += "<div class='col-md-2' id='selectPinA'><select id='pinModeA" + this.getNumber() + "'>";
        htmlString += "<option value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option value='IN'>IN</option>";
        htmlString += "<option selected='selected' value='OUT'>OUT</option>";
        htmlString += "</select></div>";
        htmlString += "<div class='col-md-2'><input type='checkbox' id='digitalSwitchA" + this.getNumber() + "' size='8' >";
		htmlString += "<label for='digitalSwitchA" + this.getNumber() + "' id='digitalSwitchLabelA" + this.getNumber() + "'><div id='digitalSwitchLabelPA" + this.getNumber() + "'>LOW</div></label></div>";

        return htmlString;
    
    }



}
