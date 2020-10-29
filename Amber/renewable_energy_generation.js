
// read in csv data about renewable enery consumption
d3.csv("Output_Data/Combined_Energy_by_Region.csv").then(function (data) {

    // console.log(data);
    // initialize data lists
    // hydro data
    var NA_data_hydro = ["N. America ", 0];
    var china_data_hydro = ["China ", 0];
    var africa_data_hydro = ["Africa ", 0];
    var europe_data_hydro = ["Europe ", 0];
    var brazil_data_hydro = ["Brazil ", 0];
    var world_data_hydro = ["World ", 0];
    // solar data
    var china_data_solar = ["China", 0];
    var NA_data_solar = ["N. America", 0];
    var europe_data_solar = ["Europe", 0];
    var africa_data_solar = ["Africa", 0];
    var brazil_data_solar = ["Brazil", 0];
    var world_data_solar = ["World", 0];

    // wind data
    var china_data_wind = ["China  ", 0];
    var NA_data_wind = ["N. America  ", 0];
    var europe_data_wind = ["Europe  ", 0];
    var africa_data_wind = ["Africa  ", 0];
    var brazil_data_wind = ["Brazil  ", 0];
    var world_data_wind = ["World  ", 0];

    // other renewables data
    var china_data_other = [" China ", 0];
    var NA_data_other = [" N. America ", 0];
    var europe_data_other = [" Europe ", 0];
    var africa_data_other = [" Africa ", 0];
    var brazil_data_other = [" Brazil ", 0];
    var world_data_other = [" World ", 0];

    // push data for each country and energy type into individual list
    for (var i = 0; i < data.length; i++) {

        if (data[i]["Entity"] == "China") {
            china_data_hydro.push(parseFloat(data[i]["Electricity from hydro (TWh)"]))
            china_data_solar.push(parseFloat(data[i]["Electricity from solar (TWh)"]))
            china_data_wind.push(parseFloat(data[i]["Electricity from wind (TWh)"]))
            china_data_other.push(parseFloat(data[i]["Electricity from other renewables (TWh)"]))
        }
        else if (data[i]["Entity"] == "North America") {
            NA_data_hydro.push(parseFloat(data[i]["Electricity from hydro (TWh)"]))
            NA_data_solar.push(parseFloat(data[i]["Electricity from solar (TWh)"]))
            NA_data_wind.push(parseFloat(data[i]["Electricity from wind (TWh)"]))
            NA_data_other.push(parseFloat(data[i]["Electricity from other renewables (TWh)"]))
        }
        else if (data[i]["Entity"] == "Europe") {
            europe_data_hydro.push(parseFloat(data[i]["Electricity from hydro (TWh)"]))
            europe_data_solar.push(parseFloat(data[i]["Electricity from solar (TWh)"]))
            europe_data_wind.push(parseFloat(data[i]["Electricity from wind (TWh)"]))
            europe_data_other.push(parseFloat(data[i]["Electricity from other renewables (TWh)"]))
        }
        else if (data[i]["Entity"] == "Africa") {
            africa_data_hydro.push(parseFloat(data[i]["Electricity from hydro (TWh)"]))
            africa_data_solar.push(parseFloat(data[i]["Electricity from solar (TWh)"]))
            africa_data_wind.push(parseFloat(data[i]["Electricity from wind (TWh)"]))
            africa_data_other.push(parseFloat(data[i]["Electricity from other renewables (TWh)"]))
        }
        else if (data[i]["Entity"] == "Brazil") {
            brazil_data_hydro.push(parseFloat(data[i]["Electricity from hydro (TWh)"]))
            brazil_data_solar.push(parseFloat(data[i]["Electricity from solar (TWh)"]))
            brazil_data_wind.push(parseFloat(data[i]["Electricity from wind (TWh)"]))
            brazil_data_other.push(parseFloat(data[i]["Electricity from other renewables (TWh)"]))
        }
        else {
            world_data_hydro.push(parseFloat(data[i]["Electricity from hydro (TWh)"]))
            world_data_solar.push(parseFloat(data[i]["Electricity from solar (TWh)"]))
            world_data_wind.push(parseFloat(data[i]["Electricity from wind (TWh)"]))
            world_data_other.push(parseFloat(data[i]["Electricity from other renewables (TWh)"]))
        }

    }
    // console.log(china_data_solar);

    // Please note: chart code has been modified from demo available here: https://www.amcharts.com/demos/radar-timeline/
    am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        /**
         * This is a copy of a chart created by Antti Lipponen: https://twitter.com/anttilip?lang=en Thanks a lot!
         */

        var energies = {
            "Solar": [NA_data_solar, china_data_solar, europe_data_solar, africa_data_solar, brazil_data_solar, world_data_solar],
            "Hydropower": [NA_data_hydro, china_data_hydro, africa_data_hydro, europe_data_hydro, brazil_data_hydro, world_data_hydro],
            "Wind": [china_data_wind, NA_data_wind, europe_data_wind, africa_data_wind, brazil_data_wind, world_data_wind],
            "Other Renewables": [china_data_other, NA_data_other, europe_data_other, africa_data_other, brazil_data_other, world_data_other]
        }

        var startYear = 1965;
        var endYear = 2019;
        var currentYear = 1965;
        var colorSet = new am4core.ColorSet();

        var chart = am4core.create("chartdiv4", am4charts.RadarChart);
        chart.numberFormatter.numberFormat = "# TWh|# TWh|# TWh";
        chart.hiddenState.properties.opacity = 0;
        chart.colors.step = 3;

        chart.startAngle = 270 - 180;
        chart.endAngle = 270 + 180;

        chart.padding(5, 15, 5, 10)
        chart.radius = am4core.percent(65);
        chart.innerRadius = am4core.percent(40);

        // year label goes in the middle
        var yearLabel = chart.radarContainer.createChild(am4core.Label);
        yearLabel.horizontalCenter = "middle";
        yearLabel.verticalCenter = "middle";
        yearLabel.fill = am4core.color("#673AB7");
        yearLabel.fontSize = 30;
        yearLabel.text = String(currentYear);

        // zoomout button
        var zoomOutButton = chart.zoomOutButton;
        zoomOutButton.dx = 0;
        zoomOutButton.dy = 0;
        zoomOutButton.marginBottom = 15;
        zoomOutButton.parent = chart.rightAxesContainer;

        // scrollbar
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX.parent = chart.rightAxesContainer;
        chart.scrollbarX.orientation = "vertical";
        chart.scrollbarX.align = "center";
        chart.scrollbarX.exportable = false;

        // vertical orientation for zoom out button and scrollbar to be positioned properly
        chart.rightAxesContainer.layout = "vertical";
        chart.rightAxesContainer.padding(120, 20, 120, 20);

        // category axis
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "energytype";
        // categoryAxis.dataFields.category = "[font-size: 30px]energytype[/]";

        var categoryAxisRenderer = categoryAxis.renderer;
        var categoryAxisLabel = categoryAxisRenderer.labels.template;
        categoryAxisLabel.location = 0.5;
        categoryAxisLabel.radius = 28;
        categoryAxisLabel.relativeRotation = 90;

        categoryAxisRenderer.fontSize = 11;
        categoryAxisRenderer.minGridDistance = 10;
        categoryAxisRenderer.grid.template.radius = -25;
        // categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
        categoryAxisRenderer.grid.template.interactionsEnabled = false;

        categoryAxisRenderer.ticks.template.disabled = true;
        categoryAxisRenderer.axisFills.template.disabled = true;
        categoryAxisRenderer.line.disabled = true;

        categoryAxisRenderer.tooltipLocation = 0.5;
        categoryAxis.tooltip.defaultState.properties.opacity = 0;

        // value axis
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = -5;
        valueAxis.max = 4500;
        valueAxis.strictMinMax = true;
        valueAxis.tooltip.defaultState.properties.opacity = 0;
        valueAxis.tooltip.animationDuration = 0;
        valueAxis.cursorTooltipEnabled = true;
        valueAxis.zIndex = 10;

        var valueAxisRenderer = valueAxis.renderer;
        valueAxisRenderer.axisFills.template.disabled = true;
        valueAxisRenderer.ticks.template.disabled = true;
        valueAxisRenderer.minGridDistance = 20;
        // valueAxisRenderer.grid.template.strokeOpacity = 0.05;

        // axis break
        var axisBreak = valueAxis.axisBreaks.create();
        axisBreak.startValue = 1600;
        axisBreak.endValue = 4000;
        axisBreak.breakSize = 0.02;

        // make break expand on hover
        var hoverState = axisBreak.states.create("hover");
        hoverState.properties.breakSize = 1;
        hoverState.properties.opacity = 0.1;
        hoverState.transitionDuration = 1500;

        // series
        var series = chart.series.push(new am4charts.RadarColumnSeries());
        series.columns.template.width = am4core.percent(90);
        series.columns.template.strokeOpacity = 0;
        series.dataFields.valueY = "value" + currentYear;
        series.dataFields.categoryX = "energytype";
        series.tooltipText = "{categoryX}: {valueY.value}";

        // this makes columns to be of a different color, depending on value
        // series.heatRules.push({ target: series.columns.template, property: "fill", minValue: 0, maxValue: 4500, min: am4core.color("#673AB7"), max: am4core.color("#F44336"), dataField: "valueY" });


        // cursor
        var cursor = new am4charts.RadarCursor();
        chart.cursor = cursor;
        cursor.behavior = "zoomX";

        cursor.xAxis = categoryAxis;
        cursor.innerRadius = am4core.percent(40);
        cursor.lineY.disabled = true;

        cursor.lineX.fillOpacity = 0.2;
        cursor.lineX.fill = am4core.color("#000000");
        cursor.lineX.strokeOpacity = 0;
        cursor.fullWidthLineX = true;

        // year slider
        var yearSliderContainer = chart.createChild(am4core.Container);
        yearSliderContainer.layout = "vertical";
        yearSliderContainer.padding(0, 38, 0, 38);
        yearSliderContainer.width = am4core.percent(100);

        var yearSlider = yearSliderContainer.createChild(am4core.Slider);
        yearSlider.events.on("rangechanged", function () {
            updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
        })
        yearSlider.orientation = "horizontal";
        yearSlider.start = 0.5;
        yearSlider.exportable = false;

        chart.data = generateRadarData();

        function generateRadarData() {
            var data = [];
            var i = 0;
            for (var energy in energies) {
                var energyData = energies[energy];

                energyData.forEach(function (energytype) {
                    var rawDataItem = { "energytype": energytype[0] }

                    for (var y = 2; y < energytype.length; y++) {
                        rawDataItem["value" + (startYear + y - 2)] = energytype[y];
                    }

                    data.push(rawDataItem);
                });

                createRange(energy, energyData, i);
                i++;

            }
            return data;
        }


        function updateRadarData(year) {
            if (currentYear != year) {
                currentYear = year;
                yearLabel.text = String(currentYear);
                series.dataFields.valueY = "value" + currentYear;
                chart.invalidateRawData();
            }
        }

        function createRange(name, energyData, index) {

            var axisRange = categoryAxis.axisRanges.create();
            axisRange.axisFill.interactionsEnabled = true;
            axisRange.text = name;
            // first energytype
            axisRange.category = energyData[0][0];
            // last energytype
            axisRange.endCategory = energyData[energyData.length - 1][0];

            // every 3rd color for a bigger contrast
            axisRange.axisFill.fill = colorSet.getIndex(index * 3);
            axisRange.grid.disabled = true;
            axisRange.label.interactionsEnabled = false;
            axisRange.label.bent = true;

            var axisFill = axisRange.axisFill;
            axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
            axisFill.radius = -20; // negative radius means it is calculated from max radius
            axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
            axisFill.fillOpacity = 1;
            axisFill.togglable = true;

            axisFill.showSystemTooltip = true;
            axisFill.readerTitle = "click to zoom";
            axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

            axisFill.events.on("hit", function (event) {
                var dataItem = event.target.dataItem;
                if (!event.target.isActive) {
                    categoryAxis.zoom({ start: 0, end: 1 });
                }
                else {
                    categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
                }
            })

            // hover state
            var hoverState = axisFill.states.create("hover");
            hoverState.properties.innerRadius = -10;
            hoverState.properties.radius = -25;

            var axisLabel = axisRange.label;
            axisLabel.location = 0.5;
            axisLabel.fill = am4core.color("#ffffff");
            axisLabel.radius = 3;
            axisLabel.relativeRotation = 0;
        }

        var slider = yearSliderContainer.createChild(am4core.Slider);
        slider.start = 1;
        slider.exportable = false;
        slider.events.on("rangechanged", function () {
            var start = slider.start;

            chart.startAngle = 270 - start * 179 - 1;
            chart.endAngle = 270 + start * 179 + 1;

            valueAxis.renderer.axisAngle = chart.startAngle;
        })

    }); // end am4core.ready()

})