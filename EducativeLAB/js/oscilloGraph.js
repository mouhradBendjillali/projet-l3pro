$(window).load(oscilloVide());

function oscilloVide(){

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
	var updateInterval = 100;
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

	// update chart after specified time. 
	setInterval(function(){updateChart()}, updateInterval);
}


function canvasOscillo(oscillo) {
		
	var data = oscillo;

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

	var updateInterval = 750;
	var dataLength = 1000; // number of dataPoints visible at any point

	var updateChart = function (count) {
		
		chart.render();		

	};
	// generates first set of dataPoints
	updateChart(dataLength); 

	// update chart after specified time. 
	setInterval(function(){updateChart()}, updateInterval); 

}