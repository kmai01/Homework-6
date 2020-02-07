
var cities = [];

$("#searchButton").click(function (event) {

    event.preventDefault();

    var city = $("#cityform");
    cityname = city.val();

    console.log(cityname);
    cities.push(cityname);
    getweather(cityname);

    // removed previous forecast div before call again to create div
    $(".forecast-title").empty();
    $(".forecast-container").empty();
   

    getforecast(cityname);
    makebutton();

});


    $(document).ready(function() {
    $("body").on("click", ".city-btn", function(event) {
    
          var cityname = $(this).attr("data-name");
    
    
    console.log(cityname);

    getweather(cityname);

    // removed previous forecast div call again to create div
    $(".forecast-title").empty();
    $(".forecast-container").empty();

    getforecast(cityname);
    makebutton();
});

});

function makebutton () {


    // prevent repeat button
    $("#cities-button").empty();

    for ( var i =0 ; i < cities.length; i++) {

        var a = $("<button>");
        a.addClass("city-btn");
        a.attr("data-name",cities[i]);
        a.text(cities[i]);
        $("#cities-button").append(a);

    }



}


function getweather (cityname) {

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=981be588e021507f49cbb2c9d6bdad93"

    console.log(cityname)

    $.ajax({
        url: weatherURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)

        // get date from response
        let unixTimestamp = response.dt
        console.log(unixTimestamp);

        // convert unix time
        var date = new Date(unixTimestamp * 1000)
        console.log(date);
        var ndate = moment(date).format('MM/DD/YYYY')
        console.log(ndate);

        var weathericon = response.weather[0].icon
        console.log(weathericon)



        var iconurl = "https://openweathermap.org/img/w/" + weathericon + ".png"

        // Get a city

        $(".city-date").html("<h4>" + response.name + " " + "(" + ndate + ")")
        $("#wicon").attr("src", iconurl);


        // Get temperature and convert to F°
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(tempF);
        var tempFd = tempF.toFixed(1);
        $(".temp").text("Temperature: " + tempFd + " " + "°F");
        // Get Humidity
        var humidity = (response.main.humidity)
        $(".humidity").text("Humidity: " + humidity + " " + "%");
        // Get Wind Speed
        var wind = (response.wind.speed) * 2.2369362912
        console.log(response.wind.speed)
        console.log(wind)
        var windSpeed = wind.toFixed(1);
        $(".wind").text("Wind Speed: " + windSpeed + " " + "MPH");

        var lon = response.coord.lon
        console.log(lon)
        var lat = response.coord.lat
        console.log(lat)

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?&appid=981be588e021507f49cbb2c9d6bdad93&lat=" + lat + "&lon=" + lon


        $.ajax({
            url: uvURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response)
            var uvindex = response.value
            var uvdiv= $(".uv-index")
            uvdiv.text("UV Index: " + uvindex)
            if( uvindex < 3) {
                uvdiv.css("background-color", "green")
            }else if ( uvindex < 6) {
                uvdiv.css("background-color", "yellow")
            }else if ( uvindex < 8) {
                uvdiv.css("background-color", "orange")

            }else if ( uvindex < 11) {
                uvdiv.css("background-color", "red")
            } else {
                uvdiv.css("background-color", "purple")
            }


        });

    });

}


function getforecast(cityname) {

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=981be588e021507f49cbb2c9d6bdad93"
    console.log(cityname)
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        
        var forecast = $("<h4>" + "5- Days Forecast " + response.city.name+"</h4>")
        $(".forecast-title").append(forecast)



        for (var j = 7; j < response.list.length; j = j + 8) {



            let unixTimestamp = response.list[j].dt
            console.log(unixTimestamp);

            var date = new Date(unixTimestamp * 1000)
            console.log(date);
            var ndate = moment(date).format('MM/DD/YYYY')
            console.log(ndate);

            // date 
            var day = $("<div>")
            day.addClass("day")
            $(".forecast-container").append(day)

            var nextDay = $("<div>")
            nextDay.addClass("date")
            day.append(nextDay)
            nextDay.text(ndate);

            // icon

            let icon = response.list[j].weather[0].icon
            console.log(icon);

            var iconurl = "https://openweathermap.org/img/w/" + icon + ".png"
            var img = $('<img id="ficon">')
            img.attr('src', iconurl);
            day.append(img)




            // Temperature

            var tempF = (response.list[j].main.temp - 273.15) * 1.80 + 32;
            console.log(tempF);
            var tempFd = tempF.toFixed(1);

            var nextDayTemp = $("<div>")
            nextDayTemp.addClass("Temp")
            day.append(nextDayTemp)
            nextDayTemp.text("Temp: " + tempFd + " " + "°F");

            // Humidity

            var humidity = (response.list[j].main.humidity)
            var nextDayHumid = $("<div>")
            nextDayHumid.addClass("Humid")
            day.append(nextDayHumid)

            nextDayHumid.text("Humidity: " + humidity + " " + "%");
            console.log(humidity);

        }

    });

}

makebutton();
