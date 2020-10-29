am4core.useTheme(am4themes_animated);

// Creates the map and tells where to put it in the html (nothing appears yet)
var map = am4core.create("globechart", am4maps.MapChart);
// Map definition (nothing appears yet)
map.geodata = am4geodata_worldLow;
// set the project to be a globe
map.projection = new am4maps.projections.Orthographic();
map.panBehavior = "rotateLongLat";
map.padding(20,20,20,20);
// limits vertical rotation - keeps you from turning the world upside down
map.adapter.add("deltaLatitude", function(delatLatitude){
    return am4core.math.fitToRange(delatLatitude, -90, 90);
})

// Globe Chart: Color of the water, without it the water is tranparent
map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#2E4053");
map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
map.deltaLongitude = 20;
map.deltaLatitude = -20;

// generating a world map (continents with countries outlined appear)
var worldSeries = map.series.push(new am4maps.MapPolygonSeries());
worldSeries.useGeodata = true;
// set country fill color to green and outline color to tan
var template = worldSeries.mapPolygons.template;
template.fill = am4core.color("#339966");
template.stroke = am4core.color("#e2c9b0");

// Add controls to zoom in and out
map.zoomControl = new am4maps.ZoomControl();
// make the zoom control a slider instead of two buttons
map.zoomControl.slider.height = 100;

// The North Pole ??????????
var graticuleSeries = map.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
graticuleSeries.fitExtent = false;
graticuleSeries.mapLines.template.strokeOpacity = 0.2;
graticuleSeries.mapLines.template.stroke = am4core.color("#fff");

// *************************************************************
// *         Image Series - plot points with lat & lng         *
// *************************************************************
var imageSeries = map.series.push(new am4maps.MapImageSeries());

var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#B27799");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{title}";

imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";

imageSeries.data = [
    {
        "latitude": 48.856614,
        "longitude": 2.352222,
        "title": "Paris"
    },
    {
        "latitude": 40.712775,
        "longitude": -74.005973,
        "title": "New York"
    },
    {
        "latitude": 49.282729,
        "longitude": -123.120738,
        "title": "Vancouver"
    }
];
imageSeries.hidden = true;
// *************************************************************
// * Line Series - draws lines between points with lat & lng   *
// *************************************************************
var lineSeries = map.series.push(new am4maps.MapLineSeries());
lineSeries.data = [{
  "multiGeoLine": [
    [
      { "latitude": 48.856614, "longitude": 2.352222 },
      { "latitude": 40.712775, "longitude": -74.005973 },
      { "latitude": 49.282729, "longitude": -123.120738 }
    ]
  ]
}];
// Configure how the lines will look
lineSeries.mapLines.template.line.stroke = am4core.color("#5C5CFF");
lineSeries.mapLines.template.line.strokeOpacity = 0.5;
lineSeries.mapLines.template.line.strokeWidth = 4;
lineSeries.mapLines.template.line.strokeDasharray = "3,3";
lineSeries.hidden = true;

// *************************************************************
// * Inset map with copy of full map that remains when zoomed  *
// *************************************************************
map.smallMap = new am4maps.SmallMap();
map.smallMap.series.push(worldSeries);
// Configure small map

map.smallMap.background.stroke = am4core.color("#7B3625")

// fills the entire box, not just the globe
// map.smallMap.background.fill = am4core.color("#969696")
map.smallMap.background.strokeOpacity = 1;
map.smallMap.background.fillOpacity = 0.9;
map.smallMap.align = "right";
map.smallMap.valign = "top";

// *************************************************************
// * Inset map with copy of full map that remains when zoomed  *
// *************************************************************
// series.heatRules.push({
//     "target": series.columns.template,
//     "property": "fill",
//     "min": am4core.color("#F5DBCB"),
//     "max": am4core.color("#ED7B84"),
//     "dataField": "valueY"
//   });

// *************************************************************
// *                load series from json                      *
// *************************************************************
var filtStationSeries = map.series.push(new am4maps.MapImageSeries());
filtStationSeries.hidden=false
var filtStationSeriesTemplate = filtStationSeries.mapImages.template;
var circle = filtStationSeriesTemplate.createChild(am4core.Circle);
circle.radius = 4;
circle.fill = am4core.color("#B27799");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{name}";

filtStationSeriesTemplate.propertyFields.latitude = "latitude";
filtStationSeriesTemplate.propertyFields.longitude = "longitude";

d3.json("static/data/NOAA_filtStations.json").then(function(filtstationData) {
  filtStationSeries.data = filtstationData;
  console.log(filtStationSeries.data);
});
