$(window).load(function canvasDefault(){
	var dps0 = []; // dataPoints
	var dps1 = [];
	var dps2 = [];
	var dps3 = [];
	var dps4 = [];
	
	var data = [{
				type: "line",
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
	var yVal = 100;	
	var updateInterval = 100;
	var dataLength = 500; // number of dataPoints visible at any point 
 
	var updateChart = function (count) {
		count = count || 1;
		// count is number of times loop runs to generate random dataPoints.
		
		for (var j = 0; j < count; j++) {	
			yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
			xVal++;
		};
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
});


function canvasOscillo(pinNumber) {
	
	var dps0 = []; // dataPoints
	var dps1 = [];
	var dps2 = [];
	var dps3 = [];
	var dps4 = [];
	
	var data = [{
			type: "spline",
			showInLegend: true, //define legend text
			dataPoints: dps0 
		},
		{
			type: "spline",
			showInLegend: 'trou', //define legend text
			dataPoints: dps1 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
			dataPoints: dps2 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
			dataPoints: dps3 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
			dataPoints: dps4 
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
	var yVal = 100;	
	var updateInterval = 100;
	var dataLength = 500; // number of dataPoints visible at any point

	var updateChart = function (count) {
		count = count || 1;
		// count is number of times loop runs to generate random dataPoints.
		
		for (var j = 0; j < count; j++) {	
			yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
			dps0.push({
				x: xVal+3,
				y: yVal+20
			});
			dps1.push({
				x: xVal+5,
				y: yVal+90
			});
			dps2.push({
				x: xVal+9,
				y: yVal+120
			});
			dps3.push({
				x: xVal+10,
				y: yVal+50
			});
			dps4.push({
				x: xVal+16,
				y: yVal+170
			});
			xVal++;
		};
		if (dps0.length > dataLength || dps1.length > dataLength || dps2.length > dataLength || dps3.length > dataLength || dps4.length > dataLength)
		{
			dps0.shift();
			dps1.shift();
			dps2.shift();
			dps3.shift();
			dps4.shift();	 				
		}
		
		chart.render();		

	};

	// generates first set of dataPoints
	updateChart(dataLength); 

	// update chart after specified time. 
	setInterval(function(){updateChart()}, updateInterval); 

}