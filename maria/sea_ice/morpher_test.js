am4core.useTheme(am4themes_amchartsdark);
am4core.useTheme(am4themes_animated);

// main container
var mainContainer = am4core.create("chartdiv2", am4core.Container);
mainContainer.width = am4core.percent(100);
mainContainer.height = am4core.percent(100);

var mapChart = mainContainer.createChild(am4maps.MapChart);
mapChart.geodata = am4geodata_continentsLow;
mapChart.projection = new am4maps.projections.Mercator();

var continentSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
continentSeries.useGeodata = true;
continentSeries.exclude = ["antarctica"];
continentSeries.mapPolygons.template.fill = am4core.color("#222a3f");
continentSeries.mapPolygons.template.stroke = am4core.color("#313950");

var countrySeries = mapChart.series.push(new am4maps.MapPolygonSeries());
countrySeries.geodata = am4geodata_worldLow;

countrySeries.useGeodata = true;
countrySeries.include = ["DE"];
countrySeries.mapPolygons.template.fill = am4core.color("#0975da");
countrySeries.mapPolygons.template.strokeOpacity = 0;

mapChart.events.on("ready", function() {
    setTimeout(function() {
        zoomToCountry();
    }, 2000)
});

function zoomToCountry() {
    var animation = mapChart.zoomToMapObject(countrySeries.getPolygonById("DE"), 8);
    animation.events.on("animationended", morphToCircle)
}

function morphToCircle() {
    var polygon = countrySeries.getPolygonById("DE");
    var animation = polygon.polygon.morpher.morphToCircle();
    animation.events.on("animationended", function() {
        setTimeout(morphBack, 1000);
    });
}

function morphBack() {
    var polygon = countrySeries.getPolygonById("DE");
    polygon.polygon.morpher.morphBack();

    setTimeout(function() {
        morphToCircle();
    }, 1000)    
}