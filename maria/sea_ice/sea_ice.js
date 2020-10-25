// retrieve geoJSON data for sea ice extent
// for (var x = 1979; x < 2017; x++) {
//     var url = `https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_${x}08_geo.json`;
// }

var url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_197908_geo.json'

am4core.ready(function() {
    // standard animated theme
    am4core.useTheme(am4themes_animated);
    
    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    
    // Set map definition
    chart.geodata = am4geodata_worldLow;
    // chart.geodataSource.url = url;
    
    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    
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
    polygonTemplate.fill = am4core.color("rgba(171, 178, 185, 0.4)");
    
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("rgba(128, 139, 150, 0.7)");
    
    // center on north pole
    chart.deltaLatitude = -90;
    chart.homeZoomLevel = 3;
    
    var iceSeries = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries.url = url;

    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.fitExtent = false;
    
    }); // end am4core.ready()