// retrieve geoJSON data for sea ice extent
// for (var x = 1979; x < 2017; x++) {
//     var url = `https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_${x}08_geo.json`;
// }

am4core.ready (function() {
    // standard animated theme
    am4core.useTheme(am4themes_animated);
    // am4core.useTheme(am4themes_amchartsdark);
    
    // create map instances
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    var chart2 = am4core.create("hiddenchartdiv", am4maps.MapChart);

    // set map definition as low
    chart.geodata = am4geodata_continentsLow;
    chart2.geodata = am4geodata_continentsLow;

    // set projection as globe (orthographic)
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    chart2.projection = new am4maps.projections.Orthographic();

    // set bg color
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#2E4053");
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1.0;
    chart2.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#2E4053");
    chart2.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1.0;
    
    // create map polygon series for countries
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    var polygonSeries2 = chart2.series.push(new am4maps.MapPolygonSeries());
    
    // load polygon geodata from geoJSON
    polygonSeries.useGeodata = true;
    polygonSeries2.useGeodata = true;
    
    // configure template (tooltip & fill/strokes)
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#212F3C");
    // polygonTemplate.fillOpacity = 0.6;
    polygonTemplate.stroke = am4core.color("#212F3C");
    polygonTemplate.nonScalingStroke = true;
    
    // // change fill color on hover; may not need if we're animating
    // var hs = polygonTemplate.states.create("hover");
    // hs.properties.fill = am4core.color("rgba(69, 179, 157, 1.0)");
    
    // center on north pole
    chart.deltaLatitude = -90;
    chart.homeZoomLevel = 2.7;
    
    // create map polygon series for northern polar sea ice
    var iceSeries = chart.series.push(new am4maps.MapPolygonSeries());

    var url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_197908_geo.json';
    iceSeries.geodataSource.url = url;

    // config fill, stroke, color
    var iceTemplate = iceSeries.mapPolygons.template;
    // iceTemplate.tooltipText = "{name}";
    iceTemplate.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate.fillOpacity = 0.9;
    iceTemplate.nonScalingStroke = true;
    iceTemplate.strokeWidth = 0.5;

    // add series for grid
    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.fitExtent = false;
    graticuleSeries.fill = am4core.color("rgba(255, 255, 255, 1.0)");

    var slider = chart.createChild(am4core.Slider);
    slider.padding(0, 15, 0, 60);
    slider.background.padding(0, 15, 0, 60);
    slider.marginBottom = 15;
    slider.valign = "bottom";

    var currentIndex = -1;
    // var colorset = new am4core.ColorSet();

    // setInterval(function () {
    // var next = slider.start + 1 / (2016 - 1979 + 1);
    // if (next >= 1) {
    //     next = 0;
    // }
    // slider.animate({ property: "start", to: next }, 300);
    // }, 2000)

    // slider.events.on("rangechanged", function () {
    // changeYear();
    // })
    
    // function changeYear() {
    //     var totalYears = 2016 - 1979;
    //     var yearIndex = Math.round(totalYears * slider.start);
      
    //     var morphToPolygon;
      
    //     if (currentIndex != yearIndex) {
    //     //   polygonSeries1.data = [];
    //     //   polygonSeries1.include = [countryCodes[yearIndex]];
    //       polygonSeries2.geodataSource.url = `https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_${1979+yearIndex}08_geo.json`
      
    //       currentIndex = yearIndex;
      
    //       polygonSeries2.events.once("validated", function () {
      
    //         morphToPolygon = polygonSeries2.mapPolygons.getIndex(0);
    //         if(morphToPolygon){
    //           var icePolygon = iceSeries.mapPolygons.getIndex(0);
      
    //           var morpher = icePolygon.polygon.morpher;
    //           var morphAnimation = morpher.morphToPolygon(morphToPolygon.polygon.points);
      
    //           var colorAnimation = icePolygon.animate({ "property": "fill", "to": colorset.getIndex(Math.round(Math.random() * 20)) }, 1000);
      
    //         //   var animation = label.animate({ property: "y", to: 1000 }, 300);
      
    //         //   animation.events.once("animationended", function () {
    //         //     label.text = morphToPolygon.dataItem.dataContext["name"];
    //         //     label.y = -50;
    //         //     label.animate({ property: "y", to: 200 }, 300, am4core.ease.quadOut);
    //         //   })
    //         }
    //       })
    //     }
    // }

}); // end am4core.ready()