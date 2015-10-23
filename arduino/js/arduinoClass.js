function Arduino(tabPinN,tabPinA,oscillo,editeur){
	this.tabPinN = tabPinN;
	this.tabPinA = tabPinA;
	this.oscillo = oscillo;
	this.editeur = editeur;

	this.showNum = function(){
		var htmlString = "";
		$.each(this.tabPinN, function(i,n){
		    //console.log( "" + i + n.toHtml() );
		    n.setNumber(i+2);
		    htmlString += "<div class='row' id='pin'>";
		    htmlString += n.toHtml();
		    htmlString += "</div>"; });
		console.log( htmlString );
		$("div#num").html(htmlString);
	}
	
	this.showAna = function(){
		var htmlString = "";
		$.each(this.tabPinA, function(i,n){
		    //console.log( "" + i + n.toHtml() );
		    htmlString += "<div class='row' id='pin'>";
		    htmlString += n.toHtml();
		    htmlString += "</div>"; });
		console.log( htmlString );
		$("div#ana").html(htmlString);
	}

	this.showOscillo = function(){
		this.oscillo.afficher();
	}
	
	this.showEditeur = function(){
		this.editeur.afficher();
	}
	
}
