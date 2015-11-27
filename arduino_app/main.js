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

var selectList;
var selectBtn;

//window.onload = function() {

  chrome.serial.getDevices(function (queriedPorts) {
    //console.log(queriedPorts);
    ports = queriedPorts;


    //selectList = document.createElement("select");

    //Create and append the options
    for (var i = 0; i < ports.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = ports[i].path;
        $("#ports").append(option);
        //console.log(option);
        //console.log($("#ports"));
    }

    //document.body.appendChild(selectList);

    /*selectBtn = document.createElement("button");
    selectBtn.innerHTML= "connect";*/
   $("#selectBtn").click(function() {
      //console.log('clicked',$("#ports").val());
      connect($("#ports").val());
    });
    //document.body.appendChild($("#selectBtn"));


  });

//}



function connect(port){
    var board = window.board = new firmata.Board(ports[port].path, function (err) {
    if (err) throw err;
    //console.log("board", board);
    
    /*var form = ["form",
      { onchange: updateNum, onsubmit: onSubmit },
      board.pins.map(function (pin, i) {
        console.log(i, pin);
        if (!pin.supportedModes.length) return [];
        return [".pin",
          "Pin " + i,
          renderSelect(pin, i),
          renderValue(pin, i)
        ];
      })
    ];*/
    
    var numPinTab = [];
	var anaPinTab = [];
	var oscillo = "";
    var editeur = "";
    
	var arduino = new Arduino(numPinTab, anaPinTab, oscillo, editeur);
	
	var pinTemp;
	
	console.log(board.pins);
	board.pins.map(function (pin, i) {
        //console.log(board.analogPins[i]);
        
		if(pin.analogChannel == 127){
			pinTemp = new pinNum();
			arduino.getTabNum().push(pinTemp);
			console.log(pinTemp);
			//$("#pinMode"+i).on('change', updateNum(arduino,i));
		}
		
    });
    
    
	board.analogPins.map(function (pin, i) {	
		pinTemp = new pinAna();
		arduino.getTabAna().push(pinTemp);
		console.log(pinTemp);
		//$("#pinMode"+i).on('change', updateAna(arduino,i));
	});
	
	console.log(arduino.getTabNum() + "\n" + arduino.getTabAna());
    
	arduino.showNum();
	arduino.showAna();
	
  });
}



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
      }/*else{
        input.disabled = true;
      }*/
    }
    else if (command === "value") {
      board.digitalWrite(pin, value);
    }

  }

  function onSubmit(evt) {
    evt.preventDefault();
  }
  
  


