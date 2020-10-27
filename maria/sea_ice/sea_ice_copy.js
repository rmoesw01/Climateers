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
    outlineSeries.geodataSource.url = 'geojsons/198009extent_geo.json';
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
    iceSeries.geodataSource.url = 'geojsons/198009extent_geo.json';
    iceSeries.useGeodata = true;

    // create 1985 map polygon series
    var iceSeries2 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries2.geodataSource.url = 'geojsons/198509extent_geo.json';
    iceSeries2.useGeodata = true;
    iceSeries2.hidden = true;

    // create 1990 map polygon series
    var iceSeries3 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries3.geodataSource.url = 'geojsons/199009extent_geo.json';
    iceSeries3.useGeodata = true;
    iceSeries3.hidden = true;

    // create 1995 map polygon series
    var iceSeries4 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries4.geodataSource.url = 'geojsons/199509extent_geo.json';
    iceSeries4.useGeodata = true;
    iceSeries4.hidden = true;

    // create 2000 map polygon series
    var iceSeries5 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries5.geodataSource.url = 'geojsons/200009extent_geo.json';
    iceSeries5.useGeodata = true;
    iceSeries5.hidden = true;

    // create 2005 map polygon series
    var iceSeries6 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries6.geodataSource.url = 'geojsons/200509extent_geo.json';
    iceSeries6.useGeodata = true;
    iceSeries6.hidden = true;

    // create 2010 map polygon series
    var iceSeries7 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries7.geodataSource.url = 'geojsons/201009extent_geo.json';
    iceSeries7.useGeodata = true;
    iceSeries7.hidden = true;

    // create 2015 map polygon series
    var iceSeries8 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries8.geodataSource.url = 'geojsons/201509extent_geo.json';
    iceSeries8.useGeodata = true;
    iceSeries8.hidden = true;

    // create 2020 map polygon series
    var iceSeries9 = chart.series.push(new am4maps.MapPolygonSeries());
    iceSeries9.geodataSource.url = 'geojsons/202009extent_geo.json';
    iceSeries9.useGeodata = true;
    iceSeries9.hidden = true;
    
    // config fill, stroke, color
    var iceTemplate = iceSeries.mapPolygons.template;
    iceTemplate.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate.fillOpacity = 1.0;
    iceTemplate.nonScalingStroke = true;
    iceTemplate.strokeWidth = 0.5;
    iceTemplate.tooltipText = "sea ice extent: 7.67M sq km";

    var iceTemplate2 = iceSeries2.mapPolygons.template;
    iceTemplate2.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate2.fillOpacity = 1.0;
    iceTemplate2.nonScalingStroke = true;
    iceTemplate2.strokeWidth = 0.5;
    iceTemplate2.tooltipText = "sea ice extent: 6.70M sq km";

    var iceTemplate3 = iceSeries3.mapPolygons.template;
    iceTemplate3.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate3.fillOpacity = 1.0;
    iceTemplate3.nonScalingStroke = true;
    iceTemplate3.strokeWidth = 0.5;
    iceTemplate3.tooltipText = "sea ice extent: 6.14M sq km";

    var iceTemplate4 = iceSeries4.mapPolygons.template;
    iceTemplate4.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate4.fillOpacity = 1.0;
    iceTemplate4.nonScalingStroke = true;
    iceTemplate4.strokeWidth = 0.5;
    iceTemplate4.tooltipText = "sea ice extent: 6.08M sq km";

    var iceTemplate5 = iceSeries5.mapPolygons.template;
    iceTemplate5.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate5.fillOpacity = 1.0;
    iceTemplate5.nonScalingStroke = true;
    iceTemplate5.strokeWidth = 0.5;
    iceTemplate5.tooltipText = "sea ice extent: 6.25M sq km";

    var iceTemplate6 = iceSeries6.mapPolygons.template;
    iceTemplate6.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate6.fillOpacity = 1.0;
    iceTemplate6.nonScalingStroke = true;
    iceTemplate6.strokeWidth = 0.5;
    iceTemplate6.tooltipText = "sea ice extent: 5.5M sq km";

    var iceTemplate7 = iceSeries7.mapPolygons.template;
    iceTemplate7.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate7.fillOpacity = 1.0;
    iceTemplate7.nonScalingStroke = true;
    iceTemplate7.strokeWidth = 0.5;
    iceTemplate7.tooltipText = "sea ice extent: 4.87M sq km";

    var iceTemplate8 = iceSeries8.mapPolygons.template;
    iceTemplate8.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate8.fillOpacity = 1.0;
    iceTemplate8.nonScalingStroke = true;
    iceTemplate8.strokeWidth = 0.5;
    iceTemplate8.tooltipText = "sea ice extent: 4.62M sq km";

    var iceTemplate9 = iceSeries9.mapPolygons.template;
    iceTemplate9.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    iceTemplate9.fillOpacity = 1.0;
    iceTemplate9.nonScalingStroke = true;
    iceTemplate9.strokeWidth = 0.5;
    iceTemplate9.tooltipText = "sea ice extent: 3.92M sq km";

    // unfortunately, looping through the templates didn't work. likely d/t the geojsons

    // var year_list = [1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020];
    // var series_list = [iceSeries, iceSeries2, iceSeries3, iceSeries4, iceSeries5, iceSeries6, iceSeries7, iceSeries8, iceSeries9];
    // var extent_areas = ['7.67', '6.7', '6.14', '6.08', '6.25', '5.5', '4.87', '4.62', '3.92'];

    // for (var x = 0; x < length.year_list; x++) {

    //   // config fill, stroke, color
    //   var thisSeries = series_list[x];
    //   thisSeries.geodataSource.url = `geojsons/${year_list[x]}09extent_geo.json`;
    //   thisSeries.useGeodata = true;

    //   var iceTemplate = thisSeries.mapPolygons.template;
    //   iceTemplate.tooltipText = `sea ice extent: ${extent_areas[x]}`;
    //   iceTemplate.fill = am4core.color("rgba(255, 255, 255, 1.0)");
    //   iceTemplate.fillOpacity = 1.0;
    //   iceTemplate.nonScalingStroke = true;
    //   iceTemplate.strokeWidth = 0.5;

    //   if (x != 0) {
    //     thisSeries.hidden = true;
    //   }
    //   chart.invalidateData();
    // }

    chart.events.on ('ready', function() {
      setTimeout (morphIce1, 3000)
    });

    function morphIce1() {
      iceSeries.hide();
      iceSeries2.show();
      setTimeout (morphIce2, 3000)
    }

    function morphIce2() {
      iceSeries2.hide();
      iceSeries3.show();
      setTimeout (morphIce3, 3000)
    }

    function morphIce3() {
      iceSeries3.hide();
      iceSeries4.show();
      setTimeout (morphIce4, 3000)
    }

    function morphIce4() {
      iceSeries4.hide();
      iceSeries5.show();
      setTimeout (morphIce5, 3000)
    }

    function morphIce5() {
      iceSeries5.hide();
      iceSeries6.show();
      setTimeout (morphIce6, 3000)
    }

    function morphIce6() {
      iceSeries6.hide();
      iceSeries7.show();
      setTimeout (morphIce7, 3000)
    }

    function morphIce7() {
      iceSeries7.hide();
      iceSeries8.show();
      setTimeout (morphIce8, 3000)
    }

    function morphIce8() {
      iceSeries8.hide();
      iceSeries9.show();
      // chart.events.on ('ready', function() {
      //   setTimeout (morphIce9, 3000)
      // });
    }

    function morphBack() {
      iceSeries9.hide();
      iceSeries.show();
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