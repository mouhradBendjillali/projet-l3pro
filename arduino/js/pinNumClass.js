function pinNum(){

    pin.call(this); //Héritage Javascript
    this.pinMode = "INACTIVE";
    
    // Lors de l'affichage de la PIN NUMERIQUE on selectionne l'affichage qui corespond au mode de la pin. 
    this.toHtml = function() {
    
        if(this.pinMode == "IN")
        {
            return this.htmlIn();
        }
        else if(this.pinMode == "OUT")
        {
            return this.htmlOut();
        }
        else if(this.pinMode == "PWM")
        {
            return this.htmlPWM();
        }
        
        else if(this.pinMode == "SERVO")
        {
            return this.htmlServo();
        }
        else
        {
            return this.htmlInactive();
        }
    }

    // Pour le moment seul le mode "Inactive" à été implémenté, afin de pouvoir tester l'affichage. Ici, on créé les éléments de la pin inactive.
    this.htmlInactive = function() {
    
        var htmlString = "";
            //Ajout du champ texte.
            htmlString += "<div class='col-md-2'><input type='text' id='pinName' placeholder='"+ this.getName() +"'></input></div>";
            //Ajout du numéro de la pin.
            htmlString += "<div class='col-md-1'><span id='pinNumber'" + this.getNumber() + "'>D" + this.getNumber() + "</span></div>";
            //Ajout du selecteur de Mode pour la pin.
            htmlString += "<div class='col-md-2' id='selectPin'><select id='pinMode'>";
            htmlString += "<option>INACTIVE</option>";
            htmlString += "<option>IN</option>";
            htmlString += "<option>OUT</option>";
            htmlString += "<option>PWM</option>";
            htmlString += "<option>SERVO</option>";
            htmlString += "</select></div>";
        
        return htmlString;
    
    }

    this.htmlIn = function() {
    
        var htmlString = "";
        
        
        
        return htmlString;
    
    }

    this.htmlOut = function() {
    
        var htmlString = "";
        
        
        
        return htmlString;
    
    }

    this.htmlServo = function() {
    
        var htmlString = "";
        
        
        
        return htmlString;
    
    }

    this.htmlPWM = function() {
    
        var htmlString = "";
        
        
        
        return htmlString;
    
    }


}
