$(window).load(function canvasOscill(){
	var dps0 = []; // dataPoints
	
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
	var yVal = 0;	
	var updateInterval = 100;
	var dataLength = 500; // number of dataPoints visible at any point 
 
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
});


function canvasOscillo(oscillo) {
	
	/*var data = [{
			type: "spline",
			legendText:"",
			showInLegend: true, //define legend text
			dataPoints: dps0 
		},
		{
			type: "spline",
			showInLegend: true, //define legend text
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
		}];*/
		
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

	var xVal = 0;

	var updateInterval = 100;
	var dataLength = 500; // number of dataPoints visible at any point

	var updateChart = function (count) {
		count = count || 1;
		// count is number of times loop runs to generate random dataPoints.
		
		for (var j = 1; j < count; j++) {
			var yVal = data[0].dataPoints[j].y;
			data[0].dataPoints[j].push({
				x: xVal,
				y: yVal
			});
			xVal++;
		};
		
		if (oscillo[0].dataPoints.length > dataLength || oscillo[1].dataPoints.length > dataLength || oscillo[2].dataPoints.length > dataLength || oscillo[3].dataPoints.length > dataLength || oscillo[4].dataPoints.length > dataLength)
		{
			oscillo[0].dataPoints.shift();
			oscillo[1].dataPoints.shift();
			oscillo[2].dataPoints.shift();
			oscillo[3].dataPoints.shift();
			oscillo[4].dataPoints.shift();	 				
		}
		
		chart.render();		

	};

	//C'est ca qu'il faut faire avec j a la place du second 0
	console.log(data[0].dataPoints[0].y);
	// generates first set of dataPoints
	updateChart(dataLength); 

	// update chart after specified time. 
	setInterval(function(){updateChart()}, updateInterval); 

}