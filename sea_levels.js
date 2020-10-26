
d3.csv("Data/Projected_Sea_lvl_reduced.csv").then(function(data) {

    console.log(data);

am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv3", am4charts.XYChart);

// Add data
chart.data = data;

// Set input format for the dates
// chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.title.text = "Year";
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Sea Level (in)";

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "Projected_Sea_Lvl";
series.dataFields.dateX = "Year";
series.tooltipText = "{valueY} in"
series.strokeWidth = 2;
series.minBulletDistance = 10;
series.name = "Projected Sea Level";

var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "LinRegress_Sea_Lvl";
series2.dataFields.dateX = "Year";
series2.tooltipText = "{valueY} in"
series2.strokeWidth = 2;
series2.minBulletDistance = 10;
series2.name = "Lin Regress Sea Level";

// var tempAxis = chart.yAxes.push(new am4charts.LineSeries());
// tempAxis.title.text = "Temperature Anomaly (F)";
// tempAxis.baseUnit = "minute";
//durationAxis.renderer.grid.template.disabled = true;
// tempAxis.renderer.opposite = true;
// tempAxis.syncWithAxis = valueAxis;


// Drop-shaped tooltips
series.tooltip.background.cornerRadius = 20;
series.tooltip.background.strokeOpacity = 0;
series.tooltip.pointerOrientation = "vertical";
series.tooltip.label.minWidth = 40;
series.tooltip.label.minHeight = 40;
series.tooltip.label.textAlign = "middle";
series.tooltip.label.textValign = "middle";


series2.tooltip.background.cornerRadius = 20;
series2.tooltip.background.strokeOpacity = 0;
series2.tooltip.pointerOrientation = "vertical";
series2.tooltip.label.minWidth = 40;
series2.tooltip.label.minHeight = 40;
series2.tooltip.label.textAlign = "middle";
series2.tooltip.label.textValign = "middle";

// Make bullets grow on hover
var bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.circle.strokeWidth = 2;
bullet.circle.radius = 4;
bullet.circle.fill = am4core.color("#fff");

var bullethover = bullet.states.create("hover");
bullethover.properties.scale = 1.3;

var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
bullet2.circle.strokeWidth = 2;
bullet2.circle.radius = 4;
bullet2.circle.fill = am4core.color("#fff");

var bullethover2 = bullet2.states.create("hover");
bullethover2.properties.scale = 1.3;

// Make a panning cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "panXY";
chart.cursor.xAxis = dateAxis;
// chart.cursor.snapToSeries = series;
// chart.cursor.snapToSeries = series2;
chart.cursor = new am4charts.XYCursor();

// Create vertical scrollbar and place it before the value axis
chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.parent = chart.leftAxesContainer;
chart.scrollbarY.toBack();

// Create a horizontal scrollbar with previe and place it underneath the date axis
chart.scrollbarX = new am4charts.XYChartScrollbar();
chart.scrollbarX.series.push(series);
chart.scrollbarX.series.push(series2);
chart.scrollbarX.parent = chart.bottomAxesContainer;

// dateAxis.start = 0.79;
dateAxis.keepSelection = true;
chart.legend = new am4charts.Legend();


}); // end am4core.ready()
})