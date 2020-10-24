console.log("Hello World")
$.ajax({ 
    url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/data", 
    data:{
        datasetid: "GSOY",
        datatypeid:"TMAX",
        // datatypeid:"TMIN",
        // datatypeid: "EMXP" + "&" + "PRCP",
        // datatypeid: "TMAX"&"TMIN"&TAVG&EMXT&EMNT&DX90&DX70&DX32&DT32&DT00&PRCP&EMXP&SNOW&EMSN&EVAP&AWND&WSFM&WSFG",
        // sortfield: 'mindate',
        limit: 250,
        startdate: "1880-01-01",
        enddate: "1881-01-01"
        // startdate: "2000-01-01",
        // enddate: "2001-01-01"
    }, 
    headers:{ 
        token:NOAA_token
    } }).then(data => {
        table1 = d3.json(data.results)

    })

// $.ajax({ 
//     url:"https://www.ncdc.noaa.gov/cdo-web/api/v2/stations", 
//     data:{
//         limit: 1000,
//         offset: 0,
//         // datatypeid: "TMAX&TMIN&TAVG&EMXT&EMNT&DX90&DX70&DX32&DT32&DT00&PRCP&EMXP&SNOW&EMSN&EVAP&AWND&WSFM&WSFG",
//         startdate: "1880-01-01"
//     }, 
//     headers:{ 
//         token:NOAA_token 
//     } }).then(data => {
//         console.log(data.results)

//     })

// FRTH = Thickness of frozen ground layer
// TMAX - Annual Mean Maximum Temperature
// PRCP - Total Annual precipitation
// SNOW - Total Annual Snowfall in millimeters
// MXyy - Annual mean of daily maximum soil temperature.



// ANN-PRCP-NORMAL = Long term averages of annual precipitation totals
// ANN-SNOW-NORMAL = Long term averages of annual snowfall totals
// ANN-TAVG-NORMAL = Long term averages of annual average temperature
// ANN-TMAX-NORMAL = Long term averages of annual maximum temperature 
// FRGB = Base of frozen ground layer
// FRGT = Top of frozen ground layer
// HPCP = Precipitation (1781-01-04 to 2020-10-18)
// HSNW = Highest snowfall (1840-10-24 to 2020-10-18)

// GSOY Values
// TMIN - Annual Mean Minimum Temperature
// TAVG - Average Annual Temperature
// EMXT - Extreme maximum temperature for the year
// EMNT - Extreme minimum temperature for the year
// DX90 - Number of days with maximum temperature >= 32.2°C/90°F.
// DX70 - Number of days with maximum temperature >= 21.1°C/70°F.
// DX32 - Number of days with maximum temperature <= 0°C/32°F.
// DT32 - Number of days with minimum temperature <= 0°C/32°F.
// DT00 - Number of days with minimum temperature <= -17.8°C/0°F.
// EMXP - Highest daily total of precipitation in the year
// EMSN - Highest daily snowfall in the year in millimeters
// EVAP - Total Annual Evaporation to tenths of millimeters
// AWND - Annual average wind speed
// WSFM - Maximum Wind Speed - Fastest mile
// WSFG - Peak Wind Gust Speed – FG. Maximum wind gust speed for the year

// Soil Temp:

// Soil cover
//  1 Grass
//  2 Fallow
//  3 Bare ground
//  4 Brome grass
//  5 Sod
//  6 Straw mulch
//  7 Grass muck
//  8 Bare muck
//  0 Unknown

// Soil Depth Inches (cm)
// 2 (5)
// 4 (10)
// 8 (20)
// 20 (50)
// 40 (100)
// 60 (150)
// 72 (180)
// unknown

// MXyy - Annual mean of daily maximum soil temperature.
// MNyy - Annual mean of daily minimum soil temperature.
// HXyy - Highest maximum soil temperature for the year.
// HNyy - Highest minimum soil temperature for the year.
// LXyy - Lowest maximum soil temperature for the year.
// LNyy - Lowest minimum soil temperature for the year