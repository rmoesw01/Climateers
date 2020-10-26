am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
var chart = am4core.create("chartdiv", am4maps.MapChart);
var interfaceColors = new am4core.InterfaceColorSet();

try {
    chart.geodata = am4geodata_worldLow;
}
catch (e) {
    chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}

// // Label describing the data displayed on the chart
// var label = chart.createChild(am4core.Label)
// label.text = "12 months (3/7/2019 data) rolling measles\nincidence per 1'000'000 total population. \n Bullet size uses logarithmic scale.";
// label.fontSize = 12;
// label.align = "left";
// label.valign = "bottom"
// // text color of the label
// label.fill = am4core.color("#927459");
// label.background = new am4core.RoundedRectangle()
// label.background.cornerRadius(10,10,10,10);
// label.padding(10,10,10,10);
// label.marginLeft = 30;
// label.marginBottom = 30;
// label.background.strokeOpacity = 0.3;
// // Border color around label
// label.background.stroke = am4core.color("#927459");
// // label.background.fill = am4core.color("#f9e3ce");
// // Background color of label
// label.background.fill = am4core.color("#FF8080");
// label.background.fillOpacity = 0.6;

// // Label/Link to the source of the data displayed on the chart
// var dataSource = chart.createChild(am4core.TextLink)
// dataSource.text = "Data source: WHO";
// dataSource.fontSize = 12;
// dataSource.align = "left";
// dataSource.valign = "top"
// dataSource.url = "https://www.who.int/immunization/monitoring_surveillance/burden/vpd/surveillance_type/active/measles_monthlydata/en/"
// dataSource.urlTarget = "_blank";
// dataSource.fill = am4core.color("#927459");
// dataSource.padding(10,10,10,10);
// dataSource.marginLeft = 30;
// dataSource.marginTop = 30;

// Set projection - makes it a globe instead of a flat map
chart.projection = new am4maps.projections.Orthographic();
chart.panBehavior = "rotateLongLat";
chart.padding(20,20,20,20);

// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();

// Goes to homepage
var homeButton = new am4core.Button();
homeButton.events.on("hit", function(){
  chart.goHome();
});

// Places home button icon in bottom right corner with zoom control
homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);

// Globe Chart: Color of the water, without it the water is tranparent
chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#969696");
chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
chart.deltaLongitude = 20;
chart.deltaLatitude = -20;

// limits vertical rotation - keeps you from turning the world upside down
chart.adapter.add("deltaLatitude", function(delatLatitude){
    return am4core.math.fitToRange(delatLatitude, -90, 90);
})

// Create map polygon series
// Displays the Polygons bounding the continents (the land on the globe) this is a layer below the countries
var shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
shadowPolygonSeries.geodata = am4geodata_continentsLow;

try {
    shadowPolygonSeries.geodata = am4geodata_continentsLow;
}
catch (e) {
    shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}

shadowPolygonSeries.useGeodata = true;
shadowPolygonSeries.dx = 2;
shadowPolygonSeries.dy = 2;
shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#fff");
shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
shadowPolygonSeries.fillOpacity = 0.1;
shadowPolygonSeries.fill = am4core.color("#fff");


// Create map polygon series
// Draws and colors polygons bounding the countries on the globe
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.useGeodata = true;

polygonSeries.calculateVisualCenter = true;
polygonSeries.tooltip.background.fillOpacity = 0.5;
polygonSeries.tooltip.background.cornerRadius = 20;

var template = polygonSeries.mapPolygons.template;
template.nonScalingStroke = true;
// Country Fill
template.fill = am4core.color("#339966");
template.stroke = am4core.color("#e2c9b0");

polygonSeries.calculateVisualCenter = true;
template.propertyFields.id = "id";
template.tooltipPosition = "fixed";
template.fillOpacity = 1;

// Changes Country color when hovering
template.events.on("over", function (event) {
  if (event.target.dummyData) {
    event.target.dummyData.isHover = true;
  }
})
template.events.on("out", function (event) {
  if (event.target.dummyData) {
    event.target.dummyData.isHover = false;
  }
})

var hs = polygonSeries.mapPolygons.template.states.create("hover");
hs.properties.fillOpacity = 1;
// Country fill color when hover
hs.properties.fill = am4core.color("#deb7ad");

// The North Pole ??????????
var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
graticuleSeries.fitExtent = false;
graticuleSeries.mapLines.template.strokeOpacity = 0.2;
graticuleSeries.mapLines.template.stroke = am4core.color("#fff");

// CO2 Emmission by country
// var co2ByCountrySeries = chart.series.push(new am4maps.MapPolygonSeries());
// co2ByCountrySeries.useGeodata = true;


var imageSeries = chart.series.push(new am4maps.MapPolygonSeries());
var imageSeriesTemplate = imageSeries.mapImages.template;
// Add data for the three cities
imageSeries.data = [{
  "latitude": 48.856614,
  "longitude": 2.352222,
  "title": "Paris"
}, {
  "latitude": 40.712775,
  "longitude": -74.005973,
  "title": "New York"
}, {
  "latitude": 49.282729,
  "longitude": -123.120738,
  "title": "Vancouver"
}];
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 10;
circle.fill = am4core.color("#B27799");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 2;
circle.nonScaling = true;
circle.tooltipText = "{title}";

// Binding the latitude and longitude to the data
imageSeriesTemplate.propertyFields.latitude = "latitude";
imageSeriesTemplate.propertyFields.longitude = "longitude";










// // Their data series
// var top10companies = chart.series.push(new am4maps.MapPolygonSeries())
// top10companies.tooltip.background.fillOpacity = 0.5;
// top10companies.tooltip.background.cornerRadius = 20;
// top10companies.tooltip.autoTextColor = false;
// top10companies.tooltip.label.fill = am4core.color("#fff");
// top10companies.tooltip.dy = -5;

// var measelTemplate = top10companies.mapPolygons.template;
// // Dot color
// measelTemplate.fill = am4core.color("#bf7569");
// measelTemplate.strokeOpacity = 0;
// measelTemplate.fillOpacity = 0.75;
// measelTemplate.tooltipPosition = "fixed";


// var hs2 = top10companies.mapPolygons.template.states.create("hover");
// hs2.properties.fillOpacity = 1;
// // Dot color when hovered over
// hs2.properties.fill = am4core.color("#86240c");

// polygonSeries.events.on("inited", function () {
//   polygonSeries.mapPolygons.each(function (mapPolygon) {
//     var count = data[mapPolygon.id];

//     if (count > 0) {
//       var polygon = top10companies.mapPolygons.create();
//       // polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
//       polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, count/2);
//       polygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": " + count + "% CO2";
//       mapPolygon.dummyData = polygon;
//       polygon.events.on("over", function () {
//         mapPolygon.isHover = true;
//       })
//       polygon.events.on("out", function () {
//         mapPolygon.isHover = false;
//       })
//     }
//     else {
//       mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
//       mapPolygon.fillOpacity = 0.9;
//     }

//   })
// })

// var data = [{

// }]



// var data = {
//   "AL": 504.38,
//   "AM": 6.5,
//   "AO": 2.98,
//   "AR": 0.32,
//   "AT": 10.9,
//   "AU": 5.02,
//   "AZ": 17.38,
//   "BA": 24.45,
//   "BD": 13.4,
//   "BE": 12.06,
//   "BF": 93.37,
//   "BG": 1.68,
//   "BI": 0.95,
//   "BJ": 93.36,
//   "BR": 49.42,
//   "BT": 10.03,
//   "BY": 26.16,
//   "CA": 0.96,
//   "CD": 69.71,
//   "CF": 4.57,
//   "CG": 19.7,
//   "CH": 6.19,
//   "CI": 14.1,
//   "CL": 1.4,
//   "CM": 41.26,
//   "CN": 2.6,
//   "CO": 4.48,
//   "CY": 7.69,
//   "CZ": 23.09,
//   "DK": 1.58,
//   "EE": 9.91,
//   "EG": 0.63,
//   "ES": 4.96,
//   "FI": 3.27,
//   "FR": 43.26,
//   "GA": 3.03,
//   "GB": 14.3,
//   "GE": 809.09,
//   "GH": 39.78,
//   "GM": 2.45,
//   "GN": 45.98,
//   "GQ": 23.74,
//   "GR": 154.42,
//   "HR": 5.46,
//   "HU": 1.44,
//   "ID": 16.87,
//   "IE": 17.56,
//   "IL": 412.24,
//   "IN": 47.85,
//   "IQ": 12.96,
//   "IR": 1.13,
//   "IT": 44.29,
//   "JP": 3.27,
//   "KE": 16.8,
//   "KG": 253.37,
//   "KH": 0.44,
//   "KM": 1.26,
//   "KZ": 116.3,
//   "LA": 1.33,
//   "LK": 0.53,
//   "LR": 692.27,
//   "LS": 5.9,
//   "LT": 14.44,
//   "LU": 6.95,
//   "LV": 6.09,
//   "MA": 0.2,
//   "MD": 83.75,
//   "ME": 319.75,
//   "MG": 2386.35,
//   "MK": 28.83,
//   "ML": 48.68,
//   "MM": 40.31,
//   "MN": 0.66,
//   "MR": 14.65,
//   "MT": 11.65,
//   "MV": 9.35,
//   "MX": 0.04,
//   "MY": 86.41,
//   "MZ": 13.49,
//   "NA": 12.9,
//   "NE": 80.88,
//   "NG": 31.44,
//   "NL": 1.47,
//   "NO": 2.47,
//   "NP": 10.8,
//   "NZ": 9.23,
//   "PE": 1.29,
//   "PK": 159.14,
//   "PL": 8.24,
//   "PT": 16.68,
//   "RO": 63.05,
//   "RS": 473.46,
//   "RU": 14.24,
//   "RW": 5.45,
//   "SE": 2.64,
//   "SG": 8.18,
//   "SI": 3.37,
//   "SK": 112.78,
//   "SN": 3.37,
//   "SO": 8.03,
//   "SS": 19.3,
//   "TD": 75.63,
//   "TG": 34.84,
//   "TH": 81.02,
//   "TL": 9.46,
//   "TN": 7.8,
//   "TR": 7.08,
//   "UA": 1439.02,
//   "UG": 62.55,
//   "US": 1.32,
//   "UZ": 0.99,
//   "VE": 179.55,
//   "ZA": 3.09,
//   "ZM": 9.82,
//   "ZW": 0.06
// }

// var data = {
//     "CN": 15.88,
//     // "CN": 14.32,
//     // {
//     //   "Company Name": "China (Coal),China",
//     //   "Percent CO2": "14.32%",
//     //   "Rank": 1
//     // },
//     "SA": 4.5,
//     // {
//     //   "Company Name": "Saudi Arabian Oil Company (Aramco)",
//     //   "Percent CO2": "4.50%",
//     //   "Rank": 2,
//     //   "Latitude": 26.3049,
//     //   "Longitude": 50.1286
//     // },
//     "RU": 3.91,
//     // {
//     //   "Company Name": "Gazprom OAO",
//     //   "Percent CO2": "3.91%",
//     //   "Rank": 3
//     // },
//     "IR": 2.28,
//     // {
//     //   "Company Name": "National Iranian Oil Co",
//     //   "Percent CO2": "2.28%",
//     //   "Rank": 4
//     // },
//     "US": 4.44,
//     // "US": 1.98,
//     // {
//     //   "Company Name": "ExxonMobil Corp",
//     //   "Percent CO2": "1.98%",
//     //   "Rank": 5,
//     //   "Longitude": 29.7536,
//     //   "Latitude: -95.3694
//     // },
//     "IN": 1.87,
//     // {
//     //   "Company Name": "Coal India",
//     //   "Percent CO2": "1.87%",
//     //   "Rank": 6,
//     //   "Latitude": 23.154677,
//     //   "Longitude": 81.482805
//     // },
//     "MX": 1.87,
//     // {
//     //   "Company Name": "Petroleos Mexicanos (Pemex)",
//     //   "Percent CO2": "1.87%",
//     //   "Rank": 7,
//     //   "Longitude": 20.3658,
//     //   "Latitude": -101.1208
//     // },
//     "RU": 1.86,
//     // {
//     //   "Company Name": "Russia (Coal)",
//     //   "Percent CO2": "1.86%",
//     //   "Rank": 8
//     // },
//     "NL": 1.67,
//     // {
//     //   "Company Name": "Royal Dutch Shell PLC",
//     //   "Percent CO2": "1.67%",
//     //   "Rank": 9
//     // },
//     // "CN": 1.56,
//     // {
//     //   "Company Name": "China National Petroleum Corp (CNPC)",
//     //   "Percent CO2": "1.56%",
//     //   "Rank": 10
//     // },
//     "UK": 1.53, 
//     // {
//     //   "Company Name": "BP",
//     //   "Percent CO2": "1.53%",
//     //   "Rank": 11
//     // },
//     // "US": 1.31,
//     // {
//     //   "Company Name": "Chevron Corp",
//     //   "Percent CO2": "1.31%",
//     //   "Rank": 12,
//     //   "Latitude": 37.9313,
//     //   "Longitude": -122.3907
//     // },
//     "VE": 1.23,
//     // {
//     //   "Company Name": "Petroleos de Venezuela SA (PDVSA)",
//     //   "Percent CO2": "1.23%",
//     //   "Rank": 13
//     // },
//     "AE": 1.2,
//     // {
//     //   "Company Name": "Abu Dhabi National Oil Co",
//     //   "Percent CO2": "1.20%",
//     //   "Rank": 14,
//     //   "Latitude": 24.4297,
//     //   "Longitude": 54.5058
//     // },
//     "PL": 1.16,
//     // {
//     //   "Company Name": "Poland (Coal)",
//     //   "Percent CO2": "1.16%",
//     //   "Rank": 15,
//     //   "Latitude": 54.175919,
//     //   "Longitude": 15.583267
//     // },
//     // "US": 1.15,
//     // {
//     //   "Company Name": "Peabody Energy Corp",
//     //   "Percent CO2": "1.15%",
//     //   "Rank": 16,
//     //   "Latitude": 38.6266409,
//     //   "Longitude": -90.1926536
//     // },
//     "AG": 1,
//     // {
//     //   "Company Name": "Sonatrach SPA",
//     //   "Percent CO2": "1.00%",
//     //   "Rank": 17
//     // },
//     "KU": 1,
//     // {
//     //   "Company Name": "Kuwait Petroleum Corp",
//     //   "Percent CO2": "1.00%",
//     //   "Rank": 18
//     // },
//     "FR": 0.95,
//     // {
//     //   "Company Name": "Total SA",
//     //   "Percent CO2": "0.95%",
//     //   "Rank": 19
//     // },
//     "AS": 0.91
//     // {
//     //   "Company Name": "BHP Billiton Ltd",
//     //   "Percent CO2": "0.91%",
//     //   "Rank": 20
//     // }
//   }
}); // end am4core.ready()

    