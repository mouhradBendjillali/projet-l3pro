//Permets de générer et intervertir les onglets de l'Editeur et de l'Oscilloscope
$(function() {
	var tabs = $( "#tabs" ).tabs();
	tabs.find( ".ui-tabs-nav" ).sortable({
		axis: "x",
		stop: function() {
		tabs.tabs( "refresh" );
		}
	});
});
