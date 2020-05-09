$( document ).ready(function() {

   
    cityName = "westport, ca"

    $("#submit-btn").click(function() {
        var cityName  = JSON.stringify("#user-input");
        console.log(cityName);
    });

      var APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $("#city").text(response.name + " (" + moment().format('MMMM Do YYYY') + ")" );
        $("#temp").text("Temp: " +  ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2) + "F");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed) + "MPH";

    });

       
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
   
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL2,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
   
        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

    //    // Transfer content to HTML
    //    $("#city").text(response.name);
    //    $("#temp").text("Temp: " +  ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2) + "F");
    //    $("#humid").text("Humidity: " + response.main.humidity + "%");
    //    $("#wind").text("Wind Speed: " + response.wind.speed) + "MPH";
          
    });
  
});