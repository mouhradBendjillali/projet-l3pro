//Class représentant un objet de type PIN. On n'en initialise jamais directement, mais les PINNUM ( Pin Numeriques )et PINANA ( Pin Analogiques ) en héritent. 
function pin(){

	this.pinName = "pin";
	this.pinNumber = 0;
	
	this.getNumber = function(){
	    return this.pinNumber;
	}
	
	this.getName = function(){
	    return this.pinName;
	}
	
	this.setName = function(name){
	    this.pinName = name;
	}
	    
	this.setNumber = function(number){
	    this.pinNumber = number;
	}
}
