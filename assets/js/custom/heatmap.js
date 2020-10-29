am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    var chart = am4core.create("heatmap", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Series for World map
    var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldSeries.exclude = ["AQ"];
    worldSeries.useGeodata = true;

    var polygonTemplate = worldSeries.mapPolygons.template;
    // MT = metric megatons
    polygonTemplate.tooltipText = "{name}: {value} MT";
    polygonTemplate.fill = chart.colors.getIndex(10);
    polygonTemplate.nonScalingStroke = true;

    // Hover state
    var hs = polygonTemplate.states.create("hover");
    // hs.properties.fill = am4core.color("#367B25");



    d3.json("assets/data/json/country_co2.json").then(function (currData) {
        worldSeries.data = currData;
        console.log(worldSeries.data);
    });

    
    var heatLegend = chart.createChild(am4charts.HeatLegend);
    heatLegend.minColor = chart.colors.getIndex(10).brighten(0.6);
    heatLegend.maxColor = chart.colors.getIndex(10).brighten(-0.4);
    heatLegend.valign = "bottom";
    heatLegend.align = "left";
    // heatLegend.width = am4core.percent(100);
    heatLegend.padding(0, 0, 20, 20);
    heatLegend.minValue = 0;
    heatLegend.maxValue = 10065;

    worldSeries.heatRules.push({
        property: "fill",
        target: worldSeries.mapPolygons.template,
        min: chart.colors.getIndex(10).brighten(0.6),
        max: chart.colors.getIndex(10).brighten(-0.4)
    });

}); // end am4core.ready()