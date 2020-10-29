am4core.ready(function () {

  // create array of urls
  var url_array = [];

  for (var x = 0; x < 9; x++) {
    var year = 1980 + (x * 5);
    var url = `assets/data/sea_ice/geojsons/${year}09extent_geo.json`;

    url_array.push (url);
  }

  // standard animated theme
  am4core.useTheme(am4themes_animated);

  // create map instances
  var iceChart = am4core.create("icechartdiv", am4maps.MapChart);

  // set map definition as low
  iceChart.geodata = am4geodata_continentsLow;

  // set projection as globe (orthographic)
  iceChart.projection = new am4maps.projections.Orthographic();
  iceChart.panBehavior = 'rotateLongLat';

  // disable panning/dragging of the map
  // iceChart.seriesContainer.draggable = false;
  // iceChart.seriesContainer.resizable = false;

  // set bg color
  iceChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#2E4053");
  iceChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1.0;

  // create map polygon series for countries
  var polygonSeries = iceChart.series.push(new am4maps.MapPolygonSeries());

  // load polygon geodata from geoJSON
  polygonSeries.useGeodata = true;

  // configure template (tooltip & fill/strokes)
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#212F3C");
  polygonTemplate.fillOpacity = 0.9;
  polygonTemplate.stroke = am4core.color("#212F3C");
  polygonTemplate.nonScalingStroke = true;

  // center on north pole
  iceChart.deltaLatitude = -90;
  iceChart.homeZoomLevel = 2.5;

  // set max zoom level
  iceChart.maxZoomLevel = 2.5;
  // iceChart.minZoomLevel = 2.5;

  // create outline for 1979 ice extent
  var outlineSeries = iceChart.series.push(new am4maps.MapPolygonSeries());

  // add geojson url
  outlineSeries.geodataSource.url = url_array[0];
  outlineSeries.useGeodata = true;

  // config fill, stroke, color
  var outlineTemplate = outlineSeries.mapPolygons.template;
  // outlineTemplate.nonScalingStroke = true;
  outlineTemplate.fillOpacity = 0.0;
  outlineTemplate.strokeWidth = 2.0;
  outlineTemplate.strokeDasharray = "5, 5";

  // create map polygon series for northern polar sea ice
  var iceSeries = iceChart.series.push(new am4maps.MapPolygonSeries());

  // add geojson url
  iceSeries.geodataSource.url = url_array[0];
  iceSeries.useGeodata = true;

  // add *another* 1980 map polygon series for debugging
  var iceSeries1 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries1.geodataSource.url = url_array[0];
  iceSeries1.useGeodata = true;
  iceSeries1.hidden = true;

  // create 1985 map polygon series
  var iceSeries2 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries2.geodataSource.url = url_array[1];
  iceSeries2.useGeodata = true;
  iceSeries2.hidden = true;

  // create 1990 map polygon series
  var iceSeries3 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries3.geodataSource.url = url_array[2];
  iceSeries3.useGeodata = true;
  iceSeries3.hidden = true;

  // create 1995 map polygon series
  var iceSeries4 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries4.geodataSource.url = url_array[3];
  iceSeries4.useGeodata = true;
  iceSeries4.hidden = true;

  // create 2000 map polygon series
  var iceSeries5 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries5.geodataSource.url = url_array[4];
  iceSeries5.useGeodata = true;
  iceSeries5.hidden = true;

  // create 2005 map polygon series
  var iceSeries6 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries6.geodataSource.url = url_array[5];
  iceSeries6.useGeodata = true;
  iceSeries6.hidden = true;

  // create 2010 map polygon series
  var iceSeries7 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries7.geodataSource.url = url_array[6];
  iceSeries7.useGeodata = true;
  iceSeries7.hidden = true;

  // create 2015 map polygon series
  var iceSeries8 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries8.geodataSource.url = url_array[7];
  iceSeries8.useGeodata = true;
  iceSeries8.hidden = true;

  // create 2020 map polygon series
  var iceSeries9 = iceChart.series.push(new am4maps.MapPolygonSeries());
  iceSeries9.geodataSource.url = url_array[8];
  iceSeries9.useGeodata = true;
  iceSeries9.hidden = true;

  // config fill, stroke, color
  var iceTemplate = iceSeries.mapPolygons.template;
  iceTemplate.fill = am4core.color("rgba(255, 255, 255, 1.0)");
  iceTemplate.fillOpacity = 1.0;
  iceTemplate.nonScalingStroke = true;
  iceTemplate.strokeWidth = 0.5;
  iceTemplate.tooltipText = "sea ice extent: 7.67M sq km";

  var iceTemplate1 = iceSeries1.mapPolygons.template;
  iceTemplate1.fill = am4core.color("rgba(255, 255, 255, 1.0)");
  iceTemplate1.fillOpacity = 1.0;
  iceTemplate1.nonScalingStroke = true;
  iceTemplate1.strokeWidth = 0.5;
  iceTemplate1.tooltipText = "sea ice extent: 7.67M sq km";

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
  //   iceChart.invalidateData();
  // }

  // create labels for years
  var iceLabel = iceChart.chartContainer.createChild(am4core.Label);
  iceLabel.isMeasured = false;
  iceLabel.x = 10;
  iceLabel.y = 10;
  iceLabel.fill = am4core.color("#808B96");
  iceLabel.fontSize = 30;
  iceLabel.fontWeight = "bold";
  iceLabel.text = "1980";
  iceLabel.fillOpacity = 0.8;
  iceLabel.zIndex = 3;

  // create triangle for play button
  var triangle2 = new am4core.Triangle();
  triangle2.width = 8;
  triangle2.height = 10;
  triangle2.fill = am4core.color("#212F3C");
  triangle2.direction = "right";
  triangle2.valign = "middle";
  triangle2.align = "center";
  triangle2.dx = 1;

  // create button for replaying
  replayButton = iceChart.createChild(am4core.Button);
  replayButton.horizontalCenter = "middle";
  replayButton.verticalCenter = "middle";
  replayButton.padding(0, 0, 0, 0);
  replayButton.background.cornerRadius(25, 25, 25, 25);
  replayButton.x = 30;
  replayButton.y = 470;
  replayButton.dy = 1;
  replayButton.height = 40;
  replayButton.width = 40;
  replayButton.zIndex = 5000;
  replayButton.icon = triangle2;
  replayButton.hide();

  // create label for button
  var buttonLabel = iceChart.chartContainer.createChild(am4core.Label);
  buttonLabel.isMeasured = false;
  buttonLabel.x = 60;
  buttonLabel.y = 452;
  buttonLabel.fill = am4core.color("#808B96");
  buttonLabel.fontSize = 30;
  buttonLabel.fontWeight = "bold";
  buttonLabel.text = "replay";
  buttonLabel.fillOpacity = 0.9;
  buttonLabel.zIndex = 3;
  buttonLabel.hide();

  // call restart fxn when button is clicked
  replayButton.events.on("hit", morphIce);

  // start animation sequence when ready
  iceChart.events.on('ready', function () {
    setTimeout(morphIce, 500)
  });

  // extra fxn that makes no visible difference; necessary for debugging
  function morphIce() {
    iceSeries9.hide();
    iceSeries.hide();
    iceSeries1.show();
    iceLabel.text = '1980';

    replayButton.hide();
    buttonLabel.hide();

    setTimeout(morphIce1, 3000)
  }

  function morphIce1() {
    iceSeries1.hide();
    iceSeries2.show();
    iceLabel.text = '1985';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    setTimeout(morphIce2, 3000)
  }

  function morphIce2() {
    iceSeries2.hide();
    iceSeries3.show();
    iceLabel.text = '1990';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    setTimeout(morphIce3, 3000)
  }

  function morphIce3() {
    iceSeries3.hide();
    iceSeries4.show();
    iceLabel.text = '1995';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    setTimeout(morphIce4, 3000)
  }

  function morphIce4() {
    iceSeries4.hide();
    iceSeries5.show();
    iceLabel.text = '2000';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    setTimeout(morphIce5, 3000)
  }

  function morphIce5() {
    iceSeries5.hide();
    iceSeries6.show();
    iceLabel.text = '2005';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    setTimeout(morphIce6, 3000)
  }

  function morphIce6() {
    iceSeries6.hide();
    iceSeries7.show();
    iceLabel.text = '2010';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    setTimeout(morphIce7, 3000)
  }

  function morphIce7() {
    iceSeries7.hide();
    iceSeries8.show();
    iceLabel.text = '2015';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    setTimeout(morphIce8, 3000)
  }

  function morphIce8() {
    iceSeries8.hide();
    iceSeries9.show();
    iceLabel.text = '2020';
    iceLabel.y = -30;
    iceLabel.animate({ property: "y", to: 10 }, 300, am4core.ease.quadOut);
    replayButton.show();
    buttonLabel.show();
  }

}); // end am4core.ready()