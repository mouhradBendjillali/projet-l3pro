//Fichier principale permettant la connexion de l'arduino, la géneration des pins graphiques

/*global chrome*/
"use strict";

var firmata = require('./firmata.js');

var modeNames = [
  "INPUT",
  "OUTPUT",
  "ANALOG",
  "PWM",
  "SERVO",
];

var ports;


var statut = "OFF";
var board;

var xmlSave = [];



var numPinTab = [];
var anaPinTab = [];

var oscillo = [{
			type: "spline",
			showInLegend: true, //define legend text
			legendText:"",
			dataPoints: [] 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
			legendText:"",
			dataPoints: [] 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
			legendText:"",
			dataPoints: [] 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
			legendText:"",
			dataPoints: [] 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
			legendText:"",
			dataPoints: [] 
		}];
var editeur = "";

var script = [];
var currentInstruction = 0;

//Création d'un objet arduino (graphique) vide
var arduino = new Arduino(numPinTab, anaPinTab, editeur);

//Fonction permettant d'afficher tout les ports comm utilisés dans la liste déroulante de connexion
  chrome.serial.getDevices(function (queriedPorts) {
    ports = queriedPorts;

    //Création puis ajout des options de la liste déroulante
    for (var i = 0; i < ports.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = ports[i].path;
        $("#ports").append(option);
    }

	//On lance la connexion au port séléctionné lors d'un changement dans la liste déroulante
	$("#ports").change(function() {
		connect($("#ports").val());
	});

  });

/*
 * Fonction permettant de connecter l'arduino à l'application
 * On génère chaque pin (graphique) qui est analogique ou numérique
 */	
function connect(port){
    board = window.board = new firmata.Board(ports[port].path, function (err) {
    if (err) throw err;
	
	var pinTemp;
	
	board.pins.map(function (pin, i) {
        
		if(pin.analogChannel == 127){
			pinTemp = new pinNum();
			arduino.getTabNum().push(pinTemp);
		}
		
    });
    
    
	board.analogPins.map(function (pin, i) {	
		pinTemp = new pinAna();
		arduino.getTabAna().push(pinTemp);
	});
    
    arduino.showNum();
	arduino.showAna();

	updateAna();
	updateNum();
    
	});
	
}

/*
 * Fonction permet d'intéragir avec sur les pins numériques de l'arduino avec la librairie Firmata
 */

function updateNum(){
	
	board.pins.map(function (pin, pinNumber) {	  
        
		//Si il s'agit d'une pin numérique
		if(pin.analogChannel == 127){
			
			//Pour chaque changement de mode de la pin
			$("#pinMode"+pinNumber).change(function(){	
						    	
				var num =  $("#pinMode" + pinNumber + " option:selected").val(); 
				var pin = arduino.getPinNum(pinNumber);
				pin.setPinMode($("#pinMode" + pinNumber + " option:selected").val());
				$("#action"+(pinNumber)).html(pin.toHtml(num));
				
				$(function(){
					$("#oscilloNum"+pinNumber).click(function () {
					    if ($(this).is(':checked')) {
							oscillo[0].dataPoints.push({
								x: 0,
								y: 12
							});
							canvasOscillo(oscillo);
							//console.log(oscillo[0].dataPoints);
					    } 
					    //dialog error else if ( > 5lignes du Graph) 
					});
				});
				
				
				//On initialise le mode et la valeur (nulle) envoyés
				board.pinMode(pinNumber, board.MODES.OUTPUT);
				board.digitalWrite(pinNumber, board.LOW);
				
				//PWM
				
		        /*
			     * Cette fonction initialise un slider avec la valeur min à 0, et la valeur max à 255.
		         * La valeur du spinner est directement liée à la valeur du slider 
		         * On affiche également la correspondance en volts
		         * On passe ensuite la pin en mode PWM et on lui écrit la valeur
		         */
		

				$(function() {
	                $( "#slider-range-v"+ pinNumber ).slider({
	                    range: "#slider-range-v",
	                    min: 0,
	                    max: 255,
	                    slide: function( event, ui ) {
		                    var intensity = 0;
	                        $( "#spinnerV"+ pinNumber ).val( ui.value );
	                        $( "#afficheVolt"+ pinNumber ).val(( (ui.value) / 51).toFixed(2) + " volts");
	                        board.pinMode(pinNumber, board.MODES.PWM);
			                board.analogWrite(pinNumber, ui.value);
	                    },
	                    stop: function(event, ui) {
                            $("#editor").val($("#editor").val() + 'board.analogWrite('+pinNumber+', '+ui.value+');\n');
                            var instruction = {pin : 0, pinNumber : pinNumber, pinMode : "PWM", value : ui.value};
                            script.push(instruction);
                        }
	                });
	            });


		        /*
			     * Cette fonction initialise un spinnet avec la valeur min à 0, et la valeur max à 255.
		         * La valeur du slider est directement liée à la valeur du spinner 
		         * On affiche également la correspondance en volts
		         * On passe ensuite la pin en mode PWM et on lui écrit la valeur
		         */
		        
				$(function() {
	                $( "#spinnerV"+ pinNumber ).spinner( {
	                    spin: function( event, ui ) {
	                        $( "#slider-range-v"+ pinNumber ).slider( "option", "value", $( "#spinnerV"+ pinNumber ).spinner("value") );
	                        $( "#afficheVolt"+ pinNumber ).val(( (ui.value) / 51).toFixed(2) + " volts");
	                        board.pinMode(pinNumber, board.MODES.PWM);
			                board.analogWrite(pinNumber, ui.value );
	                    },
                        stop: function(event, ui) {
                            $("#editor").val($("#editor").val() + 'board.analogWrite('+pinNumber+', '+$( "#spinnerV"+ pinNumber ).spinner("value")+');\n');
                            var instruction = {pin : 0, pinNumber : pinNumber, pinMode : "PWM", value : $( "#spinnerV"+ pinNumber ).spinner("value")};
                            script.push(instruction);
                        }
	                });
	                $( "#slider-range-v" + pinNumber ).slider( {
	                    value: $( "#spinnerV"	+ pinNumber ).spinner("value"),
	                    min: 0,
	                    max: 255,
	                });
	                
	            });



				///////////////////////////////////////

				//Servo
				
				
				/*
				 * On lit également les valeurs du slider et du spinner
				 * Si le servo est attaché (ON), on passe la pin en mode servo et on envoie la valeur définie
				 * Si le servo est détaché (OFF), on ne passe aucune valeur
				 */
				
				$(function() {
	                $( "#slider-range"+ pinNumber ).slider({
	                    range: "#slider-range",
	                    min: 0,
	                    max: 180,
	                    slide: function( event, ui ) {
	                        $( "#spinner" + pinNumber ).val(0);
	                        if(statut == "ON"){
		                        $( "#spinner" + pinNumber ).val(ui.value);
	                        	board.pinMode(pinNumber, board.MODES.SERVO);
			                	board.servoWrite(pinNumber, ui.value );
			                }else{
				                $( "#spinner" + pinNumber ).val(ui.value);
			                }
	                    },
                        stop: function(event, ui) {
                            if(statut == "ON")
                            {
                                $("#editor").val($("#editor").val() + 'board.servoWrite('+pinNumber+', '+ui.value+');\n');
                                var instruction = {pin : 0, pinNumber : pinNumber, pinMode : "SERVO", value : ui.value};
                                script.push(instruction);
                            }
                        }
	                });
	            });
	            
				/*
				 * On lit également les valeurs du spinner et du slider
				 * Si le servo est attaché (ON), on passe la pin en mode servo et on envoie la valeur définie
				 * Si le servo est détaché (OFF), on ne passe aucune valeur
				 */
				
				$(function() {
	                $( "#spinner"+ pinNumber ).spinner( {
	                    spin: function( event, ui ) {
	                        $( "#slider-range"+ pinNumber ).slider( "option", "value", $( "#spinner"+ pinNumber ).spinner("value") );
	                        if(statut == "ON"){
	                        	board.pinMode(pinNumber, board.MODES.SERVO);
								board.servoWrite(pinNumber, $( "#spinner"+ pinNumber ).spinner("value") );
							}
	
	                    },
	                    stop: function(event, ui) {
                            if(statut == "ON")
                            {
                                $("#editor").val($("#editor").val() + 'board.servoWrite('+pinNumber+', '+$( "#spinner"+ pinNumber ).spinner("value")+');\n');
                                var instruction = {pin : 0, pinNumber : pinNumber, pinMode : "SERVO", value : $( "#spinner"+ pinNumber ).spinner("value")};
                                console.log(instruction);
                                script.push(instruction);
                            }
                        }
	                });
	                $( "#slider-range" + pinNumber ).slider( {
	                    value: $( "#spinner" + pinNumber ).spinner("value"),
	                    min: 0,
	                    max: 180,
	                });
	                
	            });

				/*
				 * Cette fonction permet de définir un minimum (correspondant à l'angle minimal autorisé pour le servo)
				 * Elle restreint le passage d'une valeur inférieure au SERVO en limitant les valeurs du slider et du spinner
				 */
				
				$(function() {
					$( "#min"+ pinNumber ).spinner( {
	                    spin: function( event, ui ) {
							$("#slider-range" + pinNumber).slider("option", "min", ui.value);
							$("#spinner" + pinNumber).spinner("option", "min", ui.value);
							$("#max" + pinNumber).spinner("option", "min", ui.value);
	
							if($("#spinner" + pinNumber).spinner("value") < ui.value){
								$("#spinner" + pinNumber).val(ui.value);
								$("#slider-range" + pinNumber).val(ui.value);
							}
	
	                    }
	                });
	            });
	            
				/*
				 * Cette fonction permet de définir un maximum (correspondant à l'angle maximal autorisé pour le servo)
				 * Elle restreint le passage d'une valeur supérieur au SERVO en limitant les valeurs du slider et du spinner
				 */
				
	 			$(function() {
					$( "#max"+ pinNumber ).spinner( {
	                    spin: function( event, ui ) {
							$("#slider-range" + pinNumber).slider("option", "max", ui.value);
							$("#spinner" + pinNumber).spinner("option", "max", ui.value);
							$("#min" + pinNumber).spinner("option", "max", ui.value);
	
							if($("#spinner" + pinNumber).spinner("value") > ui.value){
								$("#spinner" + pinNumber).val(ui.value);
								$("#slider-range" + pinNumber).val(ui.value);
							}
	
	                    }
	                });
	            });
	            
				//////////////////////////////////
				
				//IN & OUT

				/*
				 * Cette fonction utilise un bouton radio stylisé $( "#digitalSwitch" ) sous la forme d'un interrupteur
	             * pour définir la valeur (HIGH ou LOW)
	             * On vérifie quel mode a été sélectionné (IN/OUT) puis on envoie la valeur sélectionnée (HIGH/LOW)
	             * après avoir passée la pin en mode INPUT ou OUTPUT
	             */
	            
	            $(function() {
	                $( "#digitalSwitch" + pinNumber ).button();
	                $( "#digitalSwitch" + pinNumber ).click(function( event ) 
	                {
	                    if ( $( "#digitalSwitchLabelP" + pinNumber ).html() == "HIGH" ) 
	                    {
						    $( "#digitalSwitchLabelP" + pinNumber ).html("LOW");
						    if($("#pinMode"+pinNumber).val() == "OUT"){
							    board.pinMode(pinNumber, board.MODES.OUTPUT);
			                    board.digitalWrite(pinNumber, board.LOW);
			                    var instruction = {pin : 0, pinNumber : pinNumber, pinMode : "OUT", value : board.LOW};
                                script.push(instruction);
			                    $("#editor").val($("#editor").val() + 'board.digitalWrite('+pinNumber+',board.LOW);\n');
			                      
			                }else if($("#pinMode"+pinNumber).val() == "IN"){
							    board.pinMode(pinNumber, board.MODES.INPUT);
			                    board.digitalRead(pinNumber, board.LOW);  
			                }
	                    }
	                    else if ( $( "#digitalSwitchLabelP" + pinNumber ).html() == "LOW" )
	                    {   
		                    //Permet d'allumer la led selectionnée (via pinNumber)
		                    if($("#pinMode"+pinNumber).val() == "OUT"){
							    board.pinMode(pinNumber, board.MODES.OUTPUT);
			                    board.digitalWrite(pinNumber, board.HIGH);
			                    var instruction = {pin : 0, pinNumber : pinNumber, pinMode : "OUT", value : board.HIGH};
								script.push(instruction);
			                    $("#editor").val($("#editor").val()+'board.digitalWrite('+pinNumber+',board.HIGH);\n');
			                  
			                  //Permet d'éteindre la led selectionnée (via pinNumber)  
			                }else if($("#pinMode"+pinNumber).val() == "IN"){
							    board.pinMode(pinNumber, board.MODES.INPUT);
			                    board.digitalRead(pinNumber, board.HIGH);
			                    
			                }
		                    
	                        $( "#digitalSwitchLabelP" + pinNumber ).html("HIGH");
	                    } 
						else if ( $( "#digitalSwitchLabelP" + pinNumber ).html() == "ON" )
	                    {
	                        $( "#digitalSwitchLabelP" + pinNumber ).html("OFF");
	                        statut = "ON";
	                        
	                    } 
						else
	                    {
	                        $( "#digitalSwitchLabelP" + pinNumber ).html("ON");
	                        statut = "OFF";
	                    }
	
	                });
	            });

			});
		}			
	});
}

/*
 * Fonction permet d'intéragir avec sur les pins analogiques de l'arduino avec la librairie Firmata
 */

function updateAna(){
	board.analogPins.map(function (pin, pinNumber) {
		// Pour chaque changement de mode
		$("#pinModeA"+pinNumber).change(function(){
			var ana =  $("#pinModeA" + pinNumber + " option:selected").val(); 
			var pin = arduino.getPinAna(pinNumber);
			pin.setPinMode($("#pinModeA" + pinNumber + " option:selected").val());
			$("#actionAna"+pinNumber).html(pin.toHtml(ana));
			
			//On initialise le mode et la valeur (nulle) envoyés
			board.pinMode(pinNumber, board.MODES.OUTPUT);
			board.analogWrite(pinNumber, 0);
			
			
			//IN
			
			//On passe la pin en mode INPUT, On affiche la valeur reçue
			if($("#pinModeA"+pinNumber).val() == "IN"){
			    board.pinMode(pinNumber, board.MODES.INPUT);
                board.analogRead(pinNumber, function(value){
	                $("#afficheVal"+pinNumber).val(value);
	                $( "#afficheVoltAna"+ pinNumber ).val(( value / 204.6).toFixed(2) + " volts");
	            }); 
            }
		    
       		/*
			 * Cette fonction utilise un bouton radio stylisé $( "#digitalSwitchA" ) sous la forme d'un interrupteur
             * pour définir la valeur (HIGH ou LOW)
             * On envoie la valeur sélectionnée (HIGH/LOW) après avoir passée la pin en mode OUTPUT
             */
            
			$(function() {
		        $( "#digitalSwitchA" + pinNumber ).button();
		        $( "#digitalSwitchA" + pinNumber ).click(function( event ) 
		        {
		            if ( $( "#digitalSwitchLabelPA" + pinNumber ).html() == "HIGH" ) 
		            {
		                $( "#digitalSwitchLabelPA" + pinNumber ).html("LOW");
					    board.pinMode(pinNumber, board.MODES.OUTPUT);
		                board.analogWrite(pinNumber, board.HIGH);
		            }
		            else if ( $( "#digitalSwitchLabelPA" + pinNumber ).html() == "LOW" )
		            {
			            			          
		                $( "#digitalSwitchLabelPA" + pinNumber ).html("HIGH");
		                board.pinMode(pinNumber, board.MODES.OUTPUT);
		                board.analogWrite(pinNumber, board.LOW);
		            } 
		        });
		    });
		});
		
	});
}

//Permet de modifier le contenu du bouton au click pour l'Editeur
$("#jouerEditeur").click(function(){
	if($("#jouerEditeur").text() == "Jouer"){
		$("#jouerEditeur").text("Stop");
		interprete();
	}else{
		$("#jouerEditeur").text("Jouer");
	}
});

//Permet d'effacer le contenu de l'editeur au click 
$("#effacerEditeur").click(function(){
	script = [];
	$("#editor").val("");
});

// Fonction permettant de masquer les pins numériques inutilisées (mode inactive)
$("#masquerBtnNum").click(function(){
	for(var i = 0; i < numPinTab.length;i++){
		if($("#pinMode" + i).val() == "INACTIVE" && $("#masquerBtnNum").text() == "Masquer"){
			$("#D" + i).css("display", "none");
		}else if($("#D" + i).css("display") == "none"){
			$("#D" + i).css("display", "block");
		}
	}

	if(arduino.getTabNum().length > 0 && arduino.getTabAna().length > 0){	
		if($("#masquerBtnNum").text() == "Masquer"){
			$("#masquerBtnNum").text("Afficher");
		}else{
			$("#masquerBtnNum").text("Masquer");
		}	
	}
});

// Fonction permettant de masquer les pins numériques inutilisées (mode inactive)

$("#masquerBtnAna").click(function(){	
	for(var i = 0; i < anaPinTab.length;i++){
		if($("#pinModeA" + i).val() == "INACTIVE" && $("#masquerBtnAna").text() == "Masquer"){
			$("#A" + i).css("display", "none");
		}else if($("#A" + i).css("display") == "none"){
			$("#A" + i).css("display", "block");
		}
	}
	
	if(arduino.getTabNum().length > 0 && arduino.getTabAna().length > 0){	
		if($("#masquerBtnAna").text() == "Masquer"){
			$("#masquerBtnAna").text("Afficher");
		}else{
			$("#masquerBtnAna").text("Masquer");
		}
	}
});
   

//Affiche une fenêtre permettant à l'utilisateur de définir le nom du fichier de config qu'il enregistre

$("#sauverBtn").click(function(){
	if(arduino.getTabNum().length > 0 && arduino.getTabAna().length > 0){	
		$("#fileName").val("");
		$( "#dialog-confirm" ).dialog({
		  resizable: false,
		  width: 445,
	      modal: true,
	      buttons: {
	        "Sauvegarder": function() {
		      saveFile($("#fileName").val());
	          $( this ).dialog( "close" );
	        },
	        "Annuler": function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
	}else{
		$( "#dialog-error" ).dialog({
		  resizable: false,
		  width: 445,
	      modal: true,
	      buttons: {
	        Ok: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
	}
	
});


// Fonction permettant l'enregistrement en local d'un fichier xml correspondant à la confi de l'utilisateur
function saveFile(fileName) {
	if(fileName != ""){
		xmlSave.name = fileName+'.xml';
	}else{
		xmlSave.name = 'arduino_config.xml';
	}
	
	xmlSave.content = "";
	var numPins = [];
	var anaPins = [];
	var pin = [];
	
	
	//on récupère toutes les pins Numériques dont la valeur du select est différente de "inactive".
	$("#num>.row").each(function(index) {
	
		if( $(this).find(":selected").val() !== "INACTIVE" )
		{
			//pour chaque pin numerique, on stock son nom, son id, et son mode
			pin = [];
			pin.name = $(this).find(".pinName").val();
			pin.id = $(this).find(".pinNumber").text();
			pin.mode = $(this).find(":selected").val();
			numPins.push(pin);
		}		
	});
	
		//on récupère toutes les pins Analogiques dont la valeur du select est différente de "inactive".
		$("#ana>.row").each(function(index) {
	
		if( $(this).find(":selected").val() !== "INACTIVE" )
		{
			
			//pour chaque pin analogique, on stock son nom, son id, et son mode
			pin = [];
			pin.name = $(this).find(".pinName").val();
			pin.id = $(this).find(".pinNumber").text();
			pin.mode = $(this).find(":selected").val();
			anaPins.push(pin);
		}		
	});
	
	xmlSave.content += '<arduino type=""> \
				\n\t<pinums>';
				
	$.each(numPins, function(index) {
		xmlSave.content += '\n\t\t<pinnum name="' + this.name + '" id="' + this.id + '" mode="' + this.mode + '" />';
	});
	
	xmlSave.content += '\n\t</pinums> \
			\n\t<pinanas>';
			
	$.each(anaPins, function(index) {
		xmlSave.content += '\n\t\t<pinana name="' + this.name + '" id="' + this.id + '" mode="' + this.mode + '" />';
	});
	
	xmlSave.content += '\n\t</pinanas>\n</arduino>';
	
	var blob = new Blob([xmlSave.content], {type:'text/plain;charset=utf-8'});
	saveAs(blob, xmlSave.name);
}


// Permet de lancer le chargement du fichier
$("#chargerBtn").click(function(){
	if(arduino.getTabNum().length > 0 && arduino.getTabAna().length > 0){	
		$("#loadFile").click();
	}else{
		$( "#dialog-error" ).dialog({
		  resizable: false,
		  width: 445,
	      modal: true,
	      buttons: {
	        Ok: function() {
	          $( this ).dialog( "close" );
	        }
	      }
	    });
	}
});

/*
 * Fonction permettant d'afficher un navigateur de fichier pour permettre à l'utilisateur de sélectionné son fichier de conf (limité au xml)
 * On parcours ensuite le fichier afin de modifier les pins (graphiques) pour rétablir la config
 */

$("#loadFile").change(function(event) {
    var input = event.target;

    var reader = new FileReader();

    reader.onload = function(){
      var text = $.parseXML(reader.result);
      
      $(text).find('pinnum').each(function(index){
	      var name = $(this).attr("name");
	      var id = $(this).attr("id");
	      var mode = $(this).attr("mode");
	      
	      $("#"+id).find('input').val(name);
		  $("#"+id).find('select').val(mode);
		  $("#"+id).find('select').change();
		  
	  });
	  
	  $(text).find('pinana').each(function(index){
	      var name = $(this).attr("name");
	      var id = $(this).attr("id");
	      var mode = $(this).attr("mode");
	      
	      $("#"+id).find('input').val(name);
		  $("#"+id).find('select').val(mode);
		  $("#"+id).find('select').change();
		  
	  });

    };
    
    reader.readAsText(input.files[0]);
});

function interprete(){
    
    if(currentInstruction >= 0 && currentInstruction < script.length)
    {
        setTimeout(function() {
            //Si l'instruction est de type "OUT"
            if(script[currentInstruction].pinMode === "OUT")
            {
                console.log("OUT");
                console.log(script[currentInstruction]);
                //Dans le cas d'une pin numérique
                if(script[currentInstruction].pin === 0)
                {
                    //on indique à la pin son mode de fonctionnement
                    board.pinMode(script[currentInstruction].pinNumber, board.MODES.OUT);
                    //on execute l'instruction
                    board.digitalWrite(script[currentInstruction].pinNumber, (script[currentInstruction].value === 0 ? board.LOW : board.HIGH));
                }
                //dans le cas d'une pin analogique
                else if(script[currentInstruction].pin === 1)
                {
                    //on indique à la pin son mode de fonctionnement
                    board.pinMode(script[currentInstruction].pinNumber, board.MODES.OUT);
                    //on execute l'instruction
                    board.analogWrite(script[currentInstruction].pinNumber, script[currentInstruction].value );
                }
            }
            //Si l'instruction est de type "SERVO"
            else if(script[currentInstruction].pinMode === "SERVO")
            {
                console.log("SERVO");
                console.log(script[currentInstruction]);
                //on indique à la pin son mode de fonctionnement
                board.pinMode(script[currentInstruction].pinNumber, board.MODES.SERVO);
                //on execute l'instruction
                board.servoWrite(script[currentInstruction].pinNumber, script[currentInstruction].value);
            }
            //Si l'instruction est de type "PWM"
            else if(script[currentInstruction].pinMode === "PWM")
            {
                console.log("PWM");
                console.log(script[currentInstruction]);
                //on indique à la pin son mode de fonctionnement
                board.pinMode(script[currentInstruction].pinNumber, board.MODES.PWM);
                //on execute l'instruction
                board.analogWrite(script[currentInstruction].pinNumber, script[currentInstruction].value);
            }
            currentInstruction++;
            interprete();            
        }, 1000);
    }
    else
    {
        currentInstruction = 0;
    }
}