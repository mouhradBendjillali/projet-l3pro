/*
 * Constructeur de l'objet Pin qui prend en paramêtre : un nom, un numéro et un mode par défault 
 * l'éditeur
 */

function pin(){

	this.pinName = "pin";
	this.pinNumber = 0;
	this.pinMode = 'INACTIVE';
	
	// getters
	
	this.getNumber = function(){
	    return this.pinNumber;
	}
	
	this.getName = function(){
	    return this.pinName;
	}
	
	this.getPinMode = function(){
	    return this.pinMode;
	}
	
	// setters
	this.setName = function(name){
	    this.pinName = name;
	}
	    
	this.setNumber = function(number){
	    this.pinNumber = number;
	}	    

	this.setPinMode = function(pinM){
	    this.pinMode = pinM;
	}
}
