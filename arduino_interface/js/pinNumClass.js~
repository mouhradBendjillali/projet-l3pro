function pinNum(){

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


    this.htmlBase = function() {
    
        var htmlString = "";
        htmlString += "<div class='col-md-1'><input type='text' id='pinName' placeholder='"+ this.getName() +"'style='width:75px'></input></div>";
		var num = this.getNumber() + 2;
            htmlString += "<div class='col-md-1'><span id='pinNumber'" + this.getNumber() + "'>D" + num + "</span></div>";
        
		return htmlString;
    }

    this.htmlInactive = function() {
    
        var htmlString = this.htmlBase();
            htmlString += "<div class='col-md-2' id='selectPin'><select id='pinMode" + this.getNumber() + "' onchange='updateNum("+ this.getNumber() +")'>";
            htmlString += "<option selected='selected' value='INACTIVE'>INACTIVE</option>";
            htmlString += "<option value='IN'>IN</option>";
            htmlString += "<option value='OUT'>OUT</option>";
            htmlString += "<option value='PWM'>PWM</option>";
            htmlString += "<option value='SERVO'>SERVO</option>";
            htmlString += "</select></div>";
        
        return htmlString;
    
    }

    this.htmlIn = function() {
    
        var htmlString = this.htmlBase();
        htmlString += "<div class='col-md-2' id='selectPin'><select id='pinMode" + this.getNumber() + "' onchange='updateNum("+ this.getNumber() +")'>";
        htmlString += "<option value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option selected='selected' value='IN'>IN</option>";
        htmlString += "<option value='OUT'>OUT</option>";
        htmlString += "<option value='PWM'>PWM</option>";
        htmlString += "<option value='SERVO'>SERVO</option>";
        htmlString += "</select></div>";
        htmlString += "<div class='col-md-2'><input type='checkbox' id='digitalSwitch" + this.getNumber() + "' size='8' >";
		htmlString += "<label for='digitalSwitch" + this.getNumber() + "' id='digitalSwitchLabel" + this.getNumber() + "'><div id='digitalSwitchLabelP" + this.getNumber() + "'>LOW</div></label></div>";

        return htmlString;    
    }

    this.htmlOut = function() {
    
	var htmlString = this.htmlBase();
        htmlString += "<div class='col-md-2' id='selectPin'><select id='pinMode" + this.getNumber() + "' onchange='updateNum("+ this.getNumber() +")'>";
        htmlString += "<option value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option value='IN'>IN</option>";
        htmlString += "<option selected='selected' value='OUT'>OUT</option>";
        htmlString += "<option value='PWM'>PWM</option>";
        htmlString += "<option value='SERVO'>SERVO</option>";
        htmlString += "</select></div>";
        htmlString += "<div class='col-md-2'><input type='checkbox' id='digitalSwitch" + this.getNumber() + "' size='8' >";
		htmlString += "<label for='digitalSwitch" + this.getNumber() + "' id='digitalSwitchLabel" + this.getNumber() + "'><div id='digitalSwitchLabelP" + this.getNumber() + "'>LOW</div></label></div>";

        return htmlString;
    
    }

    this.htmlServo = function() {
    
        var htmlString = this.htmlBase();

        htmlString += "<div class='col-md-2' id='selectPin'><select id='pinMode" + this.getNumber() + "' onchange='updateNum("+ this.getNumber() + ")'>";
        htmlString += "<option value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option value='IN'>IN</option>";
        htmlString += "<option value='OUT'>OUT</option>";
        htmlString += "<option value='PWM'>PWM</option>";
        htmlString += "<option selected='selected' value='SERVO'>SERVO</option>";
        htmlString += "</select></div>";
        htmlString += "<div class='col-md-3'><input type='checkbox' id='digitalSwitch" + this.getNumber() + "' >";
		htmlString += "<label for='digitalSwitch" + this.getNumber() + "' id='digitalSwitchLabel" + this.getNumber() + "'><div id='digitalSwitchLabelP" + this.getNumber() + "'>Attacher</div></label></div>";
		htmlString +="<div class='col-md-1'><input type='checkbox'></div>";
        htmlString += "<div class='col-md-10'><div class='col-md-2'><div id='slider-range" + this.getNumber() + "'></div></div>";
        htmlString += "<div class='col-md-3'><input type='text' id='spinner" + this.getNumber() + "' min='0' max='180' readonly size='2'></div>";
		htmlString += "<div class='col-md-3'><input type='text' id='min" + this.getNumber() + "' min='0' max='180' value='0' readonly size='2'></div>";
		htmlString += "<div class='col-md-3'><input type='text' id='max" + this.getNumber() + "' min='0' max='180' value='180' readonly size='2'></div></div>";

        
        
        return htmlString;
    
    }

    this.htmlPWM = function() {
    
        var htmlString = this.htmlBase();

        htmlString += "<div class='col-md-2' id='selectPin'><select id='pinMode" + this.getNumber() + "' onchange='updateNum("+ this.getNumber() + ")'>";
        htmlString += "<option value='INACTIVE'>INACTIVE</option>";
        htmlString += "<option value='IN'>IN</option>";
        htmlString += "<option value='OUT'>OUT</option>";
        htmlString += "<option selected='selected' value='PWM'>PWM</option>";
        htmlString += "<option value='SERVO'>SERVO</option>";
        htmlString += "</select></div>";
        htmlString += "<div class='col-md-2'><div id='slider-range-min" + this.getNumber() + "' onchange='updateNum("+ this.getNumber() + ")'></div></div>";
        htmlString += "<div class='col-md-2'><input type='text' id='spinner" + this.getNumber() + "' min='0' max='180' readonly size='4'></div>";
        htmlString += "<div class='col-md-2'><input type='text' id='afficheVolt"+ this.getNumber() +"' readonly style='width:75px'></input></div>";
        htmlString += "<div class='col-md-1'><input type='checkbox'></div>";
        
        
        return htmlString;
    
    }


}
