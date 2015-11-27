function Arduino(tabPinN,tabPinA,oscillo,editeur){
	this.tabPinN = tabPinN;
	this.tabPinA = tabPinA;
	this.oscillo = oscillo;
	this.editeur = editeur;

	this.showNum = function(){
		var htmlString = "";
		$.each(this.tabPinN, function(i,n){
		    //console.log( "" + i + n.toHtml() );
		    n.setNumber(i);
		    htmlString += "<div class='row' id='D"+n.getNumber()+"'>";
			console.log(n.getPinMode());
		    htmlString += n.toHtml(n.getPinMode());
		    htmlString += "</div>"; });
		$("div#num").html(htmlString);
	}
	
	this.showAna = function(){
		var htmlString = "";
		$.each(this.tabPinA, function(i,n){
		    //console.log( "" + i + n.toHtml() );
			n.setNumber(i);
		    htmlString += "<div class='row' id='A"+n.getNumber()+"'>";
			console.log(n.getPinMode());
		    htmlString += n.toHtml(n.getPinMode());
		    htmlString += "</div>"; });
		$("div#ana").html(htmlString);
	}

	this.showOscillo = function(){
		this.oscillo.afficher();
	}
	
	this.showEditeur = function(){
		this.editeur.afficher();
	}

	this.getTabNum = function(){
		return this.tabPinN;
	}
	
	this.getTabAna = function(){
		return this.tabPinA;
	}
	
	this.getPinNum = function(i){
		return this.tabPinN[i];
	} 
		
	this.getPinAna = function(i){
		return this.tabPinA[i];
	} 

}
