/*global chrome*/
"use strict";

// var log = require('domlog');
var firmata = require('./firmata.js');
var domBuilder = require('dombuilder');


var modeNames = [
  "INPUT",
  "OUTPUT",
  "ANALOG",
  "PWM",
  "SERVO",
];

var ports;


var statut = "Détacher";
var board;

var xmlSave = [];

var numPinTab = [];
var anaPinTab = [];
var oscillo = "";
var editeur = "";

var arduino = new Arduino(numPinTab, anaPinTab, editeur);

//window.onload = function() {

  chrome.serial.getDevices(function (queriedPorts) {
    ports = queriedPorts;


    //Create and append the options
    for (var i = 0; i < ports.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = ports[i].path;
        $("#ports").append(option);
    }

	$("#connectBtn").click(function() {
	  connect($("#ports").val());
	});

  });
//}


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
	
})	
	
	
}

function updateNum(){
	
	board.pins.map(function (pin, pinNumber) {	
		if(pin.analogChannel == 127){
			
			$("#pinMode"+pinNumber).change(function(){
				
				var num =  $("#pinMode" + pinNumber + " option:selected").val(); 
				var pin = arduino.getPinNum(pinNumber);
				pin.setPinMode($("#pinMode" + pinNumber + " option:selected").val());
				$("#action"+(pinNumber)).html(pin.toHtml(num));


        //Cette fonction initialise un spinner $( "#spinnerV" ) avec la valeur min à 0, et la valeur max à 255.
        //La valeur de ce spinner est directement liée à la valeur d'un slider $( "#slider-range-v" ).
        //La valeur du slider est modifiée à chaque incrémentation ou décrémentation du spinner.

		//PWM
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
                    }
                });
            });

			$(function() {
                $( "#spinnerV"+ pinNumber ).spinner( {
                    spin: function( event, ui ) {
                        $( "#slider-range-v"+ pinNumber ).slider( "option", "value", $( "#spinnerV"+ pinNumber ).spinner("value") );
                        $( "#afficheVolt"+ pinNumber ).val(( (ui.value) / 51).toFixed(2) + " volts");
                        board.pinMode(pinNumber, board.MODES.PWM);
		                board.analogWrite(pinNumber, ui.value );
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
			$(function() {
                $( "#slider-range"+ pinNumber ).slider({
                    range: "#slider-range",
                    min: 0,
                    max: 180,
                    slide: function( event, ui ) {
                        $( "#spinner" + pinNumber ).val( ui.value );
                        if(statut == "ON"){
                        	board.pinMode(pinNumber, board.MODES.SERVO);
		                	board.servoWrite(pinNumber, ui.value );
		                }
                    }
                });
            });

			$(function() {
                $( "#spinner"+ pinNumber ).spinner( {
                    spin: function( event, ui ) {
                        $( "#slider-range"+ pinNumber ).slider( "option", "value", $( "#spinner"+ pinNumber ).spinner("value") );
                        if(statut == "ON"){
                        	board.pinMode(pinNumber, board.MODES.SERVO);
							board.servoWrite(pinNumber, ui.value );
						}

                    }
                });
                $( "#slider-range" + pinNumber ).slider( {
                    value: $( "#spinner" + pinNumber ).spinner("value"),
                    min: 0,
                    max: 180,
                });
                
            });

			//Cette fonction utilise un bouton radio stylisé $( "#digitalSwitch" ) sous la forme d'un intérrupteur
            // pour "Allumer" ou "Eteindre" un input $( "#ampoule" ).
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
			});
		}			
	});
}



function updateAna(){
	board.analogPins.map(function (pin, pinNumber) {
		$("#pinModeA"+pinNumber).change(function(){
			var ana =  $("#pinModeA" + pinNumber + " option:selected").val(); 
			var pin = arduino.getPinAna(pinNumber);
			pin.setPinMode($("#pinModeA" + pinNumber + " option:selected").val());
			$("#actionAna"+pinNumber).html(pin.toHtml(ana));
			
			if($("#pinModeA"+pinNumber).val() == "IN"){
			    board.pinMode(pinNumber, board.MODES.INPUT);
                board.analogRead(pinNumber, function(value){
	                $("#afficheVal"+pinNumber).val(value);
	                $( "#afficheVoltAna"+ pinNumber ).val(( value / 204.6).toFixed(2) + " volts");
	            }); 
            }
		    
           
			$(function() {
		        $( "#digitalSwitchA" + pinNumber ).button();
		        $( "#digitalSwitchA" + pinNumber ).click(function( event ) 
		        {
		            if ( $( "#digitalSwitchLabelPA" + pinNumber ).html() == "HIGH" ) 
		            {
		                $( "#digitalSwitchLabelPA" + pinNumber ).html("LOW");
					    board.pinMode(pinNumber, board.MODES.OUTPUT);
		                board.analogWrite(pinNumber, 255);
		            }
		            else if ( $( "#digitalSwitchLabelPA" + pinNumber ).html() == "LOW" )
		            {
		                $( "#digitalSwitchLabelPA" + pinNumber ).html("HIGH");
		                board.pinMode(pinNumber, board.MODES.OUTPUT);
		                board.analogWrite(pinNumber, 0);
		            } 
		        });
		    });
		});
		
	});
}


$("#jouerEditeur").click(function(){
	if($("#jouerEditeur").text() == "Jouer"){
		$("#jouerEditeur").text("Stop");
	}else{
		$("#jouerEditeur").text("Jouer");
	}
});

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

