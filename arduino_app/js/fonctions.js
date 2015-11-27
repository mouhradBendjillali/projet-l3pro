


$(function() {
	var tabs = $( "#tabs" ).tabs();
	tabs.find( ".ui-tabs-nav" ).sortable({
		axis: "x",
		stop: function() {
		tabs.tabs( "refresh" );
		}
	});
});

function updateNum(arduino,pinNumber){
			var num =  $("#pinMode" + pinNumber + " option:selected").val(); 
			var pin = arduino.getPinNum(pinNumber);
			pin.setPinMode($("#pinMode" + pinNumber + " option:selected").val());
			$('#D' + pinNumber).html(pin.toHtml(num));
		$(function() {
                $( "#slider-range-min"+ pinNumber ).slider({
                    range: "#slider-range-min",
                    min: 0,
                    max: 180,
                    slide: function( event, ui ) {
                        $( "#spinner"+ pinNumber ).val( ui.value );
                    }
                });
                $( "#spinner"+ pinNumber ).val( $( "#slider-range-min"+ pinNumber ).slider( "value" ) );
            });

        //Cette fonction initialise un spinner $( "#spinner" ) avec la valeur min à 0, et la valeur max à 255.
        //La valeur de ce spinner est directement liée à la valeur d'un slider $( "#slider-range-min" ).
        //La valeur du slider est modifiée à chaque incrémentation ou décrémentation du spinner.
		$(function() {
                $( "#spinner"+ pinNumber ).spinner( {
                    spin: function( event, ui ) {
                        $( "#slider-range-min"+ pinNumber ).slider( "option", "value", $( "#spinner"+ pinNumber ).spinner("value") );
                    }
                });
                $( "#slider-range-min" + pinNumber ).slider( {
                    value: $( "#spinner"	+ pinNumber ).spinner("value"),
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
                    }
                    else if ( $( "#digitalSwitchLabelP" + pinNumber ).html() == "LOW" )
                    {
                        $( "#digitalSwitchLabelP" + pinNumber ).html("HIGH");
                    } 
					else if ( $( "#digitalSwitchLabelP" + pinNumber ).html() == "Attacher" )
                    {
                        $( "#digitalSwitchLabelP" + pinNumber ).html("Détacher");
                    } 
					else
                    {
                        $( "#digitalSwitchLabelP" + pinNumber ).html("Attacher");
                    }

                });
            });


 			$(function() {
				var spinner = $( "#min" + pinNumber ).spinner();
            });

 			$(function() {
				var spinner = $( "#max" + pinNumber ).spinner();
            });
            
		} 
		


function updateAna(arduino, pinNumber){
	var ana =  $("#pinModeA" + pinNumber + " option:selected").val(); 
	var pinA = arduino.getPinAna(pinNumber);
	console.log(pinNumber);
	pinA.setPinMode($("#pinModeA" + pinNumber + " option:selected").val());
	$('#A' + pinNumber).html(pinA.toHtml(ana));

	$(function() {
        $( "#digitalSwitchA" + pinNumber ).button();
        $( "#digitalSwitchA" + pinNumber ).click(function( event ) 
        {
            if ( $( "#digitalSwitchLabelPA" + pinNumber ).html() == "HIGH" ) 
            {
                $( "#digitalSwitchLabelPA" + pinNumber ).html("LOW");
            }
            else if ( $( "#digitalSwitchLabelPA" + pinNumber ).html() == "LOW" )
            {
                $( "#digitalSwitchLabelPA" + pinNumber ).html("HIGH");
            } 
        });
     });
}
