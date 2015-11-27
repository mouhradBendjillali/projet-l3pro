function updateNum(pinNum){
			var num =  $("#pinMode" + pinNum + " option:selected").val(); 
			var pin = numPinTab[pinNum];
			pin.setPinMode($("#pinMode" + pinNum + " option:selected").val());
			$('#D' + pinNum).html(pin.toHtml(num));
		$(function() {
                $( "#slider-range-min"+ pinNum ).slider({
                    range: "#slider-range-min",
                    min: 0,
                    max: 255,
                    slide: function( event, ui ) {
                        $( "#spinner"+ pinNum ).val( ui.value );
                        $( "#afficheVolt"+ pinNum ).val(( (ui.value) / 51).toFixed(2) + " volts");
                    }
                });
            });

		

        //Cette fonction initialise un spinner $( "#spinner" ) avec la valeur min à 0, et la valeur max à 255.
        //La valeur de ce spinner est directement liée à la valeur d'un slider $( "#slider-range-min" ).
        //La valeur du slider est modifiée à chaque incrémentation ou décrémentation du spinner.
		$(function() {
                $( "#spinner"+ pinNum ).spinner( {
                    spin: function( event, ui ) {
                        $( "#slider-range-min"+ pinNum ).slider( "option", "value", $( "#spinner"+ pinNum ).spinner("value") );
                    }
                });
                $( "#slider-range-min" + pinNum ).slider( {
                    value: $( "#spinner" + pinNum ).spinner("value"),
                    min: 0,
                    max: 255,
                });
                
            });

		$(function() {
                $( "#slider-range"+ pinNum ).slider({
                    range: "#slider-range",
                    min: 0,
                    max: 180,
                    slide: function( event, ui ) {
                        $( "#spinner"+ pinNum ).val( ui.value );
                    }
                });
            });

		$(function() {
                $( "#spinner"+ pinNum ).spinner( {
                    spin: function( event, ui ) {
                        $( "#slider-range"+ pinNum ).slider( "option", "value", $( "#spinner"+ pinNum ).spinner("value") );
                    }
                });
                $( "#slider-range" + pinNum ).slider( {
                    value: $( "#spinner"	+ pinNum ).spinner("value"),
                    min: 0,
                    max: 180,
                });
                
            });

			//Cette fonction utilise un bouton radio stylisé $( "#digitalSwitch" ) sous la forme d'un intérrupteur
            // pour "Allumer" ou "Eteindre" un input $( "#ampoule" ).
            $(function() {
                $( "#digitalSwitch" + pinNum ).button();
                $( "#digitalSwitch" + pinNum ).click(function( event ) 
                {
                    if ( $( "#digitalSwitchLabelP" + pinNum ).html() == "HIGH" ) 
                    {
                        $( "#digitalSwitchLabelP" + pinNum ).html("LOW");
                    }
                    else if ( $( "#digitalSwitchLabelP" + pinNum ).html() == "LOW" )
                    {
                        $( "#digitalSwitchLabelP" + pinNum ).html("HIGH");
                    } 
					else if ( $( "#digitalSwitchLabelP" + pinNum ).html() == "Attacher" )
                    {
                        $( "#digitalSwitchLabelP" + pinNum ).html("Détacher");
                    } 
					else
                    {
                        $( "#digitalSwitchLabelP" + pinNum ).html("Attacher");
                    }

                });
            });


 			$(function() {
				$( "#min"+ pinNum ).spinner( {
                    spin: function( event, ui ) {
						$("#slider-range" + pinNum).slider("option", "min", ui.value);
						$("#spinner" + pinNum).spinner("option", "min", ui.value);
						$("#max" + pinNum).spinner("option", "min", ui.value);

						if($("#spinner" + pinNum).spinner("value") < ui.value){
							$("#spinner" + pinNum).val(ui.value);
							$("#slider-range" + pinNum).val(ui.value);
						}

                    }
                });
            });

 			$(function() {
				$( "#max"+ pinNum ).spinner( {
                    spin: function( event, ui ) {
						$("#slider-range" + pinNum).slider("option", "max", ui.value);
						$("#spinner" + pinNum).spinner("option", "max", ui.value);
						$("#min" + pinNum).spinner("option", "max", ui.value);

						if($("#spinner" + pinNum).spinner("value") > ui.value){
							$("#spinner" + pinNum).val(ui.value);
							$("#slider-range" + pinNum).val(ui.value);
						}

                    }
                });
            });
		} 


function updateAna(pinNum){
	var ana =  $("#pinModeA" + pinNum + " option:selected").val(); 
	var pinA = anaPinTab[pinNum];
	pinA.setPinMode($("#pinModeA" + pinNum + " option:selected").val());
	$('#A' + pinNum).html(pinA.toHtml(ana));

	$(function() {
        $( "#digitalSwitchA" + pinNum ).button();
        $( "#digitalSwitchA" + pinNum ).click(function( event ) 
        {
            if ( $( "#digitalSwitchLabelPA" + pinNum ).html() == "HIGH" ) 
            {
                $( "#digitalSwitchLabelPA" + pinNum ).html("LOW");
            }
            else if ( $( "#digitalSwitchLabelPA" + pinNum ).html() == "LOW" )
            {
                $( "#digitalSwitchLabelPA" + pinNum ).html("HIGH");
            } 
        });
     });
}
