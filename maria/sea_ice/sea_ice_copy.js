am4core.ready (function() {
    // standard animated theme
    am4core.useTheme(am4themes_animated);
    
    // create map instances
    var chart = am4core.create("chartdiv", am4maps.MapChart);

    // set map definition as low
    chart.geodata = am4geodata_continentsLow;

    // set projection as globe (orthographic)
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";

    // set bg color
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#2E4053");
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1.0;
    
    // create map polygon series for countries
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    
    // load polygon geodata from geoJSON
    polygonSeries.useGeodata = true;
    
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
    
    // create outline for 1979 ice extent
    var outlineSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // add geojson url
    outlineSeries.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_198009_geo.json';
    outlineSeries.useGeodata = true;

    // config fill, stroke, color
    var outlineTemplate = outlineSeries.mapPolygons.template;
    // outlineTemplate.nonScalingStroke = true;
    outlineTemplate.fillOpacity = 0.0;
    outlineTemplate.strokeWidth = 2.0;
    outlineTemplate.strokeDasharray = "5, 5";

    // create map polygon series for northern polar sea ice
    var iceSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // add geojson url
    iceSeries.geodataSource.url = '/extent_N_202009_geo.json';
    iceSeries.useGeodata = true;

    // config fill, stroke, color
    var iceTemplate = iceSeries.mapPolygons.template;
    // iceTemplate.tooltipText = "{name}";
    iceTemplate.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate.fillOpacity = 1.0;
    iceTemplate.nonScalingStroke = true;
    iceTemplate.strokeWidth = 0.5;
    iceTemplate.tooltipText = "millions of square kilometers";

    // create second chart as hidden chart for polygon morphing; mostly same properties
    var chart2 = am4core.create("hiddenchartdiv", am4maps.MapChart);

    chart2.geodata = am4geodata_continentsLow;
    chart2.projection = new am4maps.projections.Orthographic();
    chart2.panBehavior = "rotateLongLat";

    chart2.deltaLatitude = -90;
    chart2.homeZoomLevel = 2.7;

    // create map polygon series for countries
    var polygonSeries2 = chart2.series.push(new am4maps.MapPolygonSeries());
    polygonSeries2.useGeodata = true;

    // center on north pole
    chart2.deltaLatitude = -90;
    chart2.homeZoomLevel = 2.7;

    // create 1985 map polygon series
    var iceSeries2 = chart2.series.push(new am4maps.MapPolygonSeries());
    iceSeries2.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_198509_geo.json';
    iceSeries2.useGeodata = true;

    // create 1990 map polygon series
    var iceSeries3 = chart2.series.push(new am4maps.MapPolygonSeries());
    iceSeries3.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_199009_geo.json';
    iceSeries3.useGeodata = true;

    // create 1995 map polygon series
    var iceSeries4 = chart2.series.push(new am4maps.MapPolygonSeries());
    iceSeries4.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_199509_geo.json';
    iceSeries4.useGeodata = true;

    // create 2000 map polygon series
    var iceSeries5 = chart2.series.push(new am4maps.MapPolygonSeries());
    iceSeries5.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_200009_geo.json';
    iceSeries5.useGeodata = true;

    // create 2005 map polygon series
    var iceSeries6 = chart2.series.push(new am4maps.MapPolygonSeries());
    iceSeries6.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_200509_geo.json';
    iceSeries6.useGeodata = true;

    // create 2010 map polygon series
    var iceSeries7 = chart2.series.push(new am4maps.MapPolygonSeries());
    iceSeries7.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_201009_geo.json';
    iceSeries7.useGeodata = true;

    // create 2016 map polygon series
    var iceSeries8 = chart2.series.push(new am4maps.MapPolygonSeries());
    iceSeries8.geodataSource.url = 'https://raw.githubusercontent.com/vigorousnorth/arctic-ice/master/geojson_files/extent_N_201609_geo.json';
    iceSeries8.useGeodata = true;

    chart.events.on ('ready', function() {
      setTimeout (function() {
        morphIce1();
      }, 3000)
    });

    function morphIce1() {
      var polygon1 = iceSeries.mapPolygons.getIndex(0);
      var polygon2 = iceSeries2.mapPolygons.getIndex(0);
      var animation = polygon1.polygon.morpher.morphToPolygon (polygon2.polygon.points);
      animation.events.on ('animationended', function() {
        setTimeout (morphIce2, 3000);
      });
    }

    function morphIce2() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      var polygon3 = iceSeries3.mapPolygons.getIndex(0);
      var animation = polygon.polygon.morpher.morphToPolygon (polygon3.polygon.points);
      animation.events.on ('animationended', function() {
        setTimeout (morphIce3, 3000);
      });
    }

    function morphIce3() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      var polygon4 = iceSeries4.mapPolygons.getIndex(0);
      var animation = polygon.polygon.morpher.morphToPolygon (polygon4.polygon.points);
      animation.events.on ('animationended', function() {
        setTimeout (morphIce4, 3000);
      });
    }

    function morphIce4() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      var polygon5 = iceSeries5.mapPolygons.getIndex(0);
      var animation = polygon.polygon.morpher.morphToPolygon (polygon5.polygon.points);
      animation.events.on ('animationended', function() {
        setTimeout (morphIce5, 3000);
      });
    }

    function morphIce5() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      var polygon6 = iceSeries6.mapPolygons.getIndex(0);
      var animation = polygon.polygon.morpher.morphToPolygon (polygon6.polygon.points);
      animation.events.on ('animationended', function() {
        setTimeout (morphIce6, 3000);
      });
    }

    function morphIce6() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      var polygon7 = iceSeries7.mapPolygons.getIndex(0);
      var animation = polygon.polygon.morpher.morphToPolygon (polygon7.polygon.points);
      animation.events.on ('animationended', function() {
        setTimeout (morphIce7, 3000);
      });
    }

    function morphIce7() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      var polygon8 = iceSeries8.mapPolygons.getIndex(0);
      var animation = polygon.polygon.morpher.morphToPolygon (polygon8.polygon.points);
      animation.events.on ('animationended', function() {
        // setTimeout (morphIce7, 3000);
      });
    }

    function morphBack() {
      var polygon = iceSeries.mapPolygons.getIndex(0);
      polygon.polygon.morpher.morphBack();

      setTimeout (function() {
        morphIce1();
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