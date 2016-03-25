
var points;
var updateInterval = 100;
var dataLength = 25; // number of dataPoints visible at any point
var generateDataPoints;


function canvasOscillo(oscillo,pinNumber) {
	
	if($("#oscilloAna"+pinNumber).is(':checked')){
		
		points = oscillo;
		
		
		var chart = new CanvasJS.Chart("chartContainer",{
			title :{
				text: "Oscilloscope"
			},			
			data: points,
			legend: {
				cursor: "pointer",
				itemclick: function (e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else {
						e.dataSeries.visible = true;
				}
				chart.render();
				}
			}
		});
		
		// generates first set of dataPoints
		chart.render();
		
		// update chart after specified time.
		generateDataPoints = setInterval(function(){chart.render();}, updateInterval);
		 
	}
	else if(!$("#oscilloAna"+pinNumber).is(':checked')){
		
		
		var dps0 = []; // dataPoints
		var data = [{
						type: "spline",
						dataPoints: dps0 
					}];
					
		var chart = new CanvasJS.Chart("chartContainer",{
			title :{
				text: "Oscilloscope"
			},			
			data: data,
			legend: {
				cursor: "pointer",
				itemclick: function (e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else {
						e.dataSeries.visible = true;
				}
				chart.render();
				}
			}
		});

		var xVal = 0;
		var yVal = 0;	
		var dataLength = 2; // number of dataPoints visible at any point 
	 
		var updateChart = function () {
		
				dps0.push({
					x: xVal,
					y: yVal
				});
				
			if (dps0.length > dataLength)
			{
				dps0.shift(); 				
			}
			
			chart.render();		
	
		};
	
		// generates first set of dataPoints
		updateChart(dataLength); 
	}
}