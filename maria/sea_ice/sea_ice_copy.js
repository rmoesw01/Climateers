am4core.ready (function() {
    // standard animated theme
    am4core.useTheme(am4themes_animated);
    
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
    chart2.panBehavior = "rotateLongLat";

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
    polygonTemplate.fillOpacity = 0.9;
    polygonTemplate.stroke = am4core.color("#212F3C");
    polygonTemplate.nonScalingStroke = true;
    
    // // change fill color on hover; may not need if we're animating
    // var hs = polygonTemplate.states.create("hover");
    // hs.properties.fill = am4core.color("rgba(69, 179, 157, 1.0)");
    
    // center on north pole
    chart.deltaLatitude = -90;
    chart.homeZoomLevel = 2.7;
    chart2.deltaLatitude = -90;
    chart2.homeZoomLevel = 2.7;
    
    // create map polygon series for northern polar sea ice
    var iceSeries = chart.series.push(new am4maps.MapPolygonSeries());
    var iceSeries2 = chart2.series.push(new am4maps.MapPolygonSeries());

    // add geojson url
    iceSeries.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_197908_geo.json';
    iceSeries2.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_201608_geo.json';

    // config fill, stroke, color
    var iceTemplate = iceSeries.mapPolygons.template;
    // iceTemplate.tooltipText = "{name}";
    iceTemplate.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate.fillOpacity = 0.9;
    iceTemplate.nonScalingStroke = true;
    iceTemplate.strokeWidth = 0.5;

    var iceTemplate2 = iceSeries2.mapPolygons.template;
    // iceTemplate2.tooltipText = "{name}";
    iceTemplate2.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate2.fillOpacity = 0.9;
    iceTemplate2.nonScalingStroke = true;
    iceTemplate2.strokeWidth = 0.5;

    iceSeries.useGeodata = true;
    iceSeries2.useGeodata = true;

    // add series for grid
    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.fitExtent = false;
    graticuleSeries.fill = am4core.color("rgba(255, 255, 255, 1.0)");

    chart.events.on ('ready', function() {
      setTimeout (function() {
        morphToPolygon();
      }, 3000)
    });

    function morphToPolygon() {
      var polygon1 = iceSeries.mapPolygons.getIndex(0);
      var polygon2 = iceSeries2.mapPolygons.getIndex(0);
      var animation = polygon1.polygon.morpher.morphToPolygon (polygon2.polygon.points);
      animation.events.on ('animationended', function() {
        setTimeout (morphBack, 2000);
      });
    }

    function morphBack() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      polygon.polygon.morpher.morphBack();

      setTimeout (function() {
        morphToPolygon();
      }, 3000)
    }

    // var slider = chart.createChild(am4core.Slider);
    // slider.padding(0, 15, 0, 60);
    // slider.background.padding(0, 15, 0, 60);
    // slider.marginBottom = 15;
    // slider.valign = "bottom";

    // var currentIndex = -1;
    // // var colorset = new am4core.ColorSet();

    // setInterval (function () {
    //     var next = slider.start + 1 / (2016 - 1979 + 1);
    //     if (next >= 1) {
    //         next = 0;
    //     }

    //     slider.animate ({ property: "start", to: next }, 300);
    //     }, 2000)

    // slider.events.on("rangechanged", function () {
    //     changeYear();
    // })
    
    // function changeYear() {
    //     var totalYears = 2016 - 1979;
    //     var yearIndex = Math.round(totalYears * slider.start);
      
    //     var morphToPolygon;
      
    //     if (currentIndex != yearIndex) {

    //     //   console.log (currentIndex, yearIndex);
    //       iceSeries2.data = [];
    //       iceSeries2.geodataSource.url = `https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_${1979+yearIndex}08_geo.json`
    //     //   console.log (iceSeries2.geodataSource.url);
          
    //       currentIndex = yearIndex;
      
    //       iceSeries2.events.once ("validated", function() {
    //         console.log ('validated!');
    //         morphToPolygon = iceSeries2.mapPolygons.getIndex(0);
    //         console.log (morphToPolygon);

    //         if (morphToPolygon) {
    //           console.log ('again');
    //           var icePolygon = iceSeries.mapPolygons.getIndex(0);
      
    //           var morpher = icePolygon.polygon.morpher;
    //           var morphAnimation = morpher.morphToPolygon(morphToPolygon.polygon.points);
      
    //         //   var colorAnimation = icePolygon.animate({ "property": "fill", "to": colorset.getIndex(Math.round(Math.random() * 20)) }, 1000);
      
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