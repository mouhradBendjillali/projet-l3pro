function Arduino(tabPinN,tabPinA,editeur){
	this.tabPinN = tabPinN;
	this.tabPinA = tabPinA;
	this.editeur = editeur;

	this.showNum = function(){
		var htmlString = "";
		$.each(this.tabPinN, function(i,n){
		    //console.log( "" + i + n.toHtml() );
		    n.setNumber(i);
		    htmlString += "<div class='row' id='D"+n.getNumber()+"'>";
			htmlString += n.htmlBase();
		    htmlString += n.toHtml(n.getPinMode());
		    htmlString += "</div>"; });
		$("div#num").html(htmlString);
		for(i = 0; i < this.tabPinN.length;i++){
			if(i % 2 != 0){
				$("#D"+i).css("background-color", "#f5f5f5");
			}
		}
	}

	this.showAna = function(){
		var htmlString = "";
		$.each(this.tabPinA, function(i,n){
		    //console.log( "" + i + n.toHtml() );
			n.setNumber(i);
		    htmlString += "<div class='row' id='A"+n.getNumber()+"'>";
			htmlString += n.htmlBase();
		    htmlString += n.toHtml(n.getPinMode());
		    htmlString += "</div>"; });
		$("div#ana").html(htmlString);
		for(i = 0; i < this.tabPinA.length;i++){
			if(i % 2 != 0){
				$("#A"+i).css("background-color", "#f5f5f5");
			}
		}
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
