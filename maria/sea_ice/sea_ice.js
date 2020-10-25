// retrieve geoJSON data for sea ice extent
// for (var x = 1979; x < 2017; x++) {
//     var url = `https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_${x}08_geo.json`;
// }

var url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_197908_geo.json'

var coordinates = [];
var data = [];
d3.json(url).then((response) => {
    // console.log (response.features[0].geometry.coordinates);
    coordinates.push (response.features[0].geometry.coordinates);
    data.push (response);

});


am4core.ready(function() {
    // standard animated theme
    am4core.useTheme(am4themes_animated);
    
    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    
    // Set map definition
    chart.geodata = am4geodata_worldLow;
    
    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";

    // set bg color
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#566573");
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.6;
    
    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    
    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    
    polygonSeries.mapPolygons.template.fillOpacity = 0.6;
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.mapPolygons.template.strokeWidth = 0.5;
    
    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("rgba(162, 217, 206, 0.7)");
    
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("rgba(69, 179, 157, 1.0)");
    
    // center on north pole
    chart.deltaLatitude = -90;
    chart.homeZoomLevel = 2.7;
    
    var iceSeries = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries.geodataSource.url = url;
    iceSeries.mapPolygons.template.fillOpacity = 0.6;
    iceSeries.mapPolygons.template.nonScalingStroke = true;
    iceSeries.mapPolygons.template.strokeWidth = 0.5;

    var iceTemplate = iceSeries.mapPolygons.template;
    // iceTemplate.tooltipText = "{name}";
    iceTemplate.fill = am4core.color("rgba(255, 255, 255, 1.0)");

    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.fitExtent = false;
    graticuleSeries.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    
    }); // end am4core.ready()