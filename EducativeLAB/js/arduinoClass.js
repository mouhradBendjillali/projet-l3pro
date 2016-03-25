/*
 * Constructeur de l'objet Arduino qui prend en paramêtre : un tableau de pin numériques, un tableau de pin analogique et un string pour 
 * l'éditeur
 */
function Arduino(tabPinN, tabPinA, editeur) {
	this.tabPinN = tabPinN;
	this.tabPinA = tabPinA;
	this.editeur = editeur;

	// Permet l'affichage des pins numériques
	this.showNum = function () {
		var htmlString = "";
		$.each(this.tabPinN, function (i, n) {
		    n.setNumber(i);
		    htmlString += "<div class='row' id='D" + n.getNumber() + "'>";
			htmlString += n.htmlBase();
		    htmlString += n.toHtml(n.getPinMode());
		    htmlString += "</div>";
        });
		$("div#num").html(htmlString);
		for (i = 0; i < this.tabPinN.length; i++) {
			if (i % 2 != 0) {
				$("#D" + i).css("background-color", "#f5f5f5");
			}
		}
	}

	// Permet l'affichage des pins analogiques
	this.showAna = function (disabled) {
		var htmlString = "";
		$.each(this.tabPinA, function (i, n) {
			n.setNumber(i);
		    htmlString += "<div class='row' id='A" + n.getNumber() + "'>";
			htmlString += n.htmlBase();
		    htmlString += n.toHtml(n.getPinMode(),disabled);
		    htmlString += "</div>";
        });
		$("div#ana").html(htmlString);
		for (i = 0; i < this.tabPinA.length;i++) {
			if (i % 2 != 0) {
				$("#A" + i).css("background-color", "#f5f5f5");
			}
		}
	}

	// Permet l'affichage de l'éditeur
	this.showEditeur = function () {
		this.editeur.afficher();
	}
    
    //getters
    
	this.getTabNum = function () {
		return this.tabPinN;
	}
	
	this.getTabAna = function () {
		return this.tabPinA;
	}
	
	this.getPinNum = function (i) {
		return this.tabPinN[i];
	}
		
	this.getPinAna = function (i) {
		return this.tabPinA[i];
	}

}