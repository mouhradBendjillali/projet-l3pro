/*global chrome*/
"use strict";

// var log = require('domlog');
var firmata = require('./firmata.js');
var domBuilder = require('dombuilder');

// window.log = log;

//document.body.innerText = "QUAI-LAB ";

// log.setup({
//   top: "0",
//   height: "auto",
//   background: "#222"
// });

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


var numPinTab = [];
var anaPinTab = [];
var oscillo = "";
var editeur = "";

var arduino = new Arduino(numPinTab, anaPinTab, oscillo, editeur);

//window.onload = function() {

  chrome.serial.getDevices(function (queriedPorts) {
    //console.log(queriedPorts);
    ports = queriedPorts;


    //Create and append the options
    for (var i = 0; i < ports.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = ports[i].path;
        $("#ports").append(option);
        //console.log(option);
        //console.log($("#ports"));
    }

	$("#selectBtn").click(function() {
	  //console.log('clicked',$("#ports").val());
	  connect($("#ports").val());
	});

  });
//}


function connect(port){
    board = window.board = new firmata.Board(ports[port].path, function (err) {
    if (err) throw err;
    //console.log("board", board);
	
	var pinTemp;
	
	console.log(board.pins);
	board.pins.map(function (pin, i) {
        //console.log(board.analogPins[i]);
        
		if(pin.analogChannel == 127){
			pinTemp = new pinNum();
			arduino.getTabNum().push(pinTemp);
			console.log(pinTemp);
			//$("#pinMode"+i).on('change','', updateNum(arduino,i));
		}
		
    });
    
    
	board.analogPins.map(function (pin, i) {	
		pinTemp = new pinAna();
		arduino.getTabAna().push(pinTemp);
		console.log(pinTemp);
		//$("#pinMode"+i).on('change', '', updateAna(arduino,i));	
	});
	
	console.log(arduino.getTabNum() + "\n" + arduino.getTabAna());
    
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
				$('#D' + pinNumber).html(pin.toHtml(num));


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
                        if(statut == "Attacher"){
                        	board.pinMode(pinNumber, board.MODES.SERVO);
		                	board.servoWrite(pinNumber, ui.value );
		                }
		                //board.servoConfig(pinNumber, $("#min" + pinNumber).val(), $("#max" + pinNumber).val());
                    }
                });
            });

			$(function() {
                $( "#spinner"+ pinNumber ).spinner( {
                    spin: function( event, ui ) {
                        $( "#slider-range"+ pinNumber ).slider( "option", "value", $( "#spinner"+ pinNumber ).spinner("value") );
                        if(statut == "Attacher"){
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
					else if ( $( "#digitalSwitchLabelP" + pinNumber ).html() == "Attacher" )
                    {
                        $( "#digitalSwitchLabelP" + pinNumber ).html("Détacher");
                        statut = "Attacher";
                        
                    } 
					else
                    {
                        $( "#digitalSwitchLabelP" + pinNumber ).html("Attacher");
                        statut = "Détacher";
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
            $("#pinMode"+pinNumber).change(updateNum());
			});
		}			
	});
}



function updateAna(){
	board.analogPins.map(function (pin, pinNumber) {
		$("#pinModeA"+pinNumber).change(function(){
			var ana =  $("#pinModeA" + pinNumber + " option:selected").val(); 
			var pin = arduino.getPinAna(pinNumber);
			//console.log(pinNumber);
			pin.setPinMode($("#pinModeA" + pinNumber + " option:selected").val());
			$('#A' + pinNumber).html(pin.toHtml(ana));
			
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
			$("#pinModeA"+pinNumber).change(updateAna());
		});
		
	});
}
















/*


function onChange(evt) {
    var target = evt.target.name.split("-");
    var command = target[0];
    var pin = parseInt(target[1], 10);
    var value = evt.target.checked ? 1 : 0;

    console.log("onChange", command, pin, value);

    if (command === "mode") {
      var input = this["value-" + pin];
      console.log(input);
      board.pinMode(pin, value);
      if (value === board.MODES.INPUT) {
        input.disabled = true;
        board.digitalRead(pin, function (value) {
          input.checked = value;
          console.log('read',pin, value);
        });
      }else{
        input.disabled = true;
      }
    }
    else if (command === "value") {
      board.digitalWrite(pin, value);
    }

  }

function onSubmit(evt) {
evt.preventDefault();
}
  
*/


