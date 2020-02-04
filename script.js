



$("#searchButton").click(function (event) {
    event.preventDefault();

    var city = $("#cityform");
    cityname=city.val();

    console.log(cityname);

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=981be588e021507f49cbb2c9d6bdad93"
   
   
  
    $.ajax({
    url: weatherURL,
    method: 'GET'
    }).then(function (response) {
    console.log(response)

    // get date from response
    let unixTimestamp=response.dt
    console.log(unixTimestamp); 

     // convert unix time
    var date = new Date(unixTimestamp * 1000)
    console.log(date);
    var ndate=moment(date).format('MM/DD/YYYY')
    console.log(ndate);
   
    // Get a city

    $(".city-date").text(response.name+" "+"("+ndate+")"+" "+response.weather[0].icon)
    
    // Get temperature and convert to F°
    var tempF = (response.main.temp-273.15)*1.80 +32;
        console.log(tempF);
    var tempFd= tempF.toFixed(1);
    $(".temp").text("Temperature: "+tempFd+" "+"°F");
    // Get Humidity
    var humidity=(response.main.humidity)
    $(".humidity").text("Humidity: "+humidity+" "+"%");
    // Get Wind Speed
    var wind= (response.wind.speed)*2.2369362912
    console.log(response.wind.speed)
    console.log(wind)
     var windd=wind.toFixed(1);
    $(".wind").text("Wind Speed: "+windd+" "+"MPH");
        
    });


    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid=981be588e021507f49cbb2c9d6bdad93"

    $.ajax({
        url: forecastURL,
        method: 'GET'
        }).then(function (response) {
        console.log(response)

        let unixTimestamp=response.list[7].dt
        console.log(unixTimestamp);

        var date = new Date(unixTimestamp * 1000)
        console.log(date);
        var ndate=moment(date).format('MM/DD/YYYY')
        console.log(ndate);
        $(".date1").text(ndate);

        let icon=response.list[7].weather[0].icon
        console.log(icon);
        $(".icon").text(icon);

        var tempF = (response.list[7].main.temp-273.15)*1.80 +32;
        console.log(tempF);
        var tempFd= tempF.toFixed(1);
        $(".temp1").text("Temp: "+tempFd+" "+"°F");

        var humidity=(response.list[7].main.humidity)
        $(".humidity1").text("Humidity: "+humidity+" "+"%");

            
        });

      //  var uvURL = "https://api.openweathermap.org/data/2.5/uvi?q="+cityname+"&appid=981be588e021507f49cbb2c9d6bdad93"

    // $.ajax({
        // url: uvURL,
       // method: 'GET'
        // }).then(function (response) {
       //  console.log(response)
            
       // });
});

