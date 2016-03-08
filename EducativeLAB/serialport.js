/*global chrome*/
var EventEmitter = require('./events.js').EventEmitter;
var util = require('./util.js');

function SerialPort(port, options) {


  var self = this;
  var id;
  var bytesToRead = options.buffersize || 1;
  var reading = false;

  function onOpen (info) {

  	/*
	 * À la connection on affiche un gif et on charge les données 
	 * sinon on affiche une fenetre d'erreur qui permet de relancer l'application
	 */
    if (info) {  
	  $("#num").html("<div class='text-center' ><img class='loading-image' src='images/waiting-cercle.gif' alt='' /></div>");
	  $("#ana").html("<div class='text-center' ><img class='loading-image' src='images/waiting-cercle.gif' alt='' /></div>");
	
      id = self.id = info.connectionId;

      if (id < 0) {
        self.emit("error", new Error("Cannot connect to " + port));
        return;
      }
      self.emit("open");
      
      chrome.serial.onReceive.addListener(function(obj){
        if(id == obj.connectionId){
          var data = new Uint8Array(obj.data);
          self.emit("data", data);
        }
      });
    } else {
	    
	    $( "#dialog-connect-error" ).dialog({
		  resizable: false,
		  width: 445,
	      modal: true,
	      buttons: {
	        "Relancer": function() {
	          $(this).dialog( "close" );
	          chrome.runtime.reload();
	        }
	      }
	    }).position().top;
    }

  }

  //Methode de Chrome qui permet la connection au port
  chrome.serial.connect(port, {
    bitrate: options.baudrate || 9600
  }, onOpen);

}

SerialPort.prototype.write = function (data) {
  function onWrite() {
  }

  data = new Uint8Array(data);
  if(this.id){
    chrome.serial.send(this.id, data.buffer, onWrite);
  }

};

util.inherits(SerialPort, EventEmitter);

exports.SerialPort = SerialPort;
