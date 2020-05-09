//var to hold array of previous searches
var prevSearch = [];
// var to hold API key
var APIKey = "166a433c57516f51dfab1f7edaed8413"
 

function renderBtn(){

    $("#buttons-view").empty();
    $(".hum").empty();

    for (var i = 0; i < prevSearch.length; i++) {

        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button class='btn btn-secondary city-btn'>");
        // Providing the initial button text
        a.text(prevSearch[i]);
        a.attr("id",prevSearch[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").prepend(a);
    };
}

function getUVI(lat,lon) {


        // var to hold API URL
        var queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon=" + lon +"&appid=" + APIKey;
        
        //AJAX call 
        $.ajax({
        url: queryURL3,
        method: "GET"
        })
        // store "response"
        .then(function(response) {
            console.log(response)
            $("#uvi").text("UV Index: " + response.value);

            if (response.value < "3"){
                $("#uvi").attr("style", "background-color:blue");
            }
            else if ((response.value > "3") && (response.value < "6")) {
                $("#uvi").attr("style", "background-color:green");
            }
            else if ((response.value > "6") && (response.value < "8")) {
                $("#uvi").attr("style", "background-color:yellow; color:black;");
            }
            else if (response.value > "8") {
                $("#uvi").attr("style", "background-color:black; color:yellow;");
            }
          }) 
}



$(document).ready(function() {
    // hide weather icon
    $("#icon").addClass("hide");

    $("#submit-btn").on("click",function(event) {
        event.preventDefault();
        //var to hold user input
        $cityName = $("#user-input").val();
        //log user input
        console.log($cityName);
        //erase text box contents
        $("#user-input").val('');

        prevSearch.push($cityName)
        // $histBtn.addClass('btn btn-secondary city-btn')
        renderBtn();


        // var to hold API URL
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $cityName + "&appid=" + APIKey;
        
        //AJAX call 
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        // store "response"
        .then(function(response) {

            // Log queryURL
            console.log(queryURL);

            // Log response
            console.log(response);

            // link to html tags, add and show weather icon
            $("#city").text(response.name + " (" + moment().format('MMMM Do YYYY') + ")" );
            $("#icon")
            .attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#temp").text("Temp: " +  ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#humid").text("Humidity: " + response.main.humidity + "%");
            $("#wind").text("Wind Speed: " + response.wind.speed) + "MPH";
            console.log(response.coord.lat,response.coord.lon)
            getUVI(response.coord.lat,response.coord.lon);
        });
    
        // var to hold API URL for second api
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + $cityName + "&appid=" + APIKey;
   
        //AJAX call 
        $.ajax({
        url: queryURL2,
        method: "GET"
        })
        // store "response"
        .then(function(response) {
        
            // Log queryURL
            console.log(queryURL2);
    
            // Log response
            console.log(response);
    
            // link to html tags
            // add dates        
            $("#fDate1").text(response.list[0].dt_txt);
            $("#fDate2").text(response.list[1].dt_txt);
            $("#fDate3").text(response.list[2].dt_txt);
            $("#fDate4").text(response.list[3].dt_txt);
            $("#fDate5").text(response.list[6].dt_txt);
            //add weather icons
            $("#fIcon1")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon2")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon3")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon4")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon5")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png")
            .removeClass("hide");
            //add temp
            $("#fTemp1").text(((response.list[0].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp2").text(((response.list[1].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp3").text(((response.list[2].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp4").text(((response.list[3].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp5").text(((response.list[4].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            //add humidity
            $("#fHum1").append("Humidity:" + "<br>" + response.list[0].main.humidity + "%");
            $("#fHum2").append("Humidity:" + "<br>" + response.list[1].main.humidity + "%");
            $("#fHum3").append("Humidity:" + "<br>" + response.list[2].main.humidity + "%");
            $("#fHum4").append("Humidity:" + "<br>" + response.list[3].main.humidity + "%");
            $("#fHum5").append("Humidity:" + "<br>" + response.list[4].main.humidity + "%");
        });

    });
////////////create function for sidebar buttons
    // run AJAX again using city on button
    $("body").on("click",".city-btn", function(event) {
        
        event.preventDefault();
        //var to hold user input
        var $cityBtn = $(this);
        //log user input
        console.log($cityBtn);
        console.log($cityBtn.text());
        

        // var to hold API key
        var APIKey = "166a433c57516f51dfab1f7edaed8413"
        // var to hold API URL
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $cityBtn.text() + "&appid=" + APIKey;
        
        //AJAX call 
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        // store "response"
        .then(function(response) {

            // Log queryURL
            console.log(queryURL);

            // Log response
            console.log(response);

            // link to html tags, add and show weather icon
            $("#city").text(response.name + " (" + moment().format('MMMM Do YYYY') + ")" );
            $("#icon")
            .attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#temp").text("Temp: " +  ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#humid").text("Humidity: " + response.main.humidity + "%");
            $("#wind").text("Wind Speed: " + response.wind.speed) + "MPH";
            console.log(response.coord.lat,response.coord.lon)
            getUVI(response.coord.lat,response.coord.lon);
        });
    
        // var to hold API URL for second api
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + $cityBtn.text() + "&appid=" + APIKey;
   
        //AJAX call 
        $.ajax({
        url: queryURL2,
        method: "GET"
        })
        // store "response"
        .then(function(response) {
        
            // Log queryURL
            console.log(queryURL2);
    
            // Log response
            console.log(response);
    
            // link to html tags
            // add dates        
            $("#fDate1").text(response.list[0].dt_txt);
            $("#fDate2").text(response.list[1].dt_txt);
            $("#fDate3").text(response.list[2].dt_txt);
            $("#fDate4").text(response.list[3].dt_txt);
            $("#fDate5").text(response.list[6].dt_txt);
            //add weather icons
            $("#fIcon1")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon2")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon3")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon4")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png")
            .removeClass("hide");
            $("#fIcon5")
            .attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png")
            .removeClass("hide");
            //add temp
            $("#fTemp1").text(((response.list[0].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp2").text(((response.list[1].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp3").text(((response.list[2].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp4").text(((response.list[3].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            $("#fTemp5").text(((response.list[4].main.temp- 273.15) * 1.80 + 32).toFixed(2) + "ºF");
            //add humidity
            $("#fHum1").append("Humidity:" + "<br>" + response.list[0].main.humidity + "%");
            $("#fHum2").append("Humidity:" + "<br>" + response.list[1].main.humidity + "%");
            $("#fHum3").append("Humidity:" + "<br>" + response.list[2].main.humidity + "%");
            $("#fHum4").append("Humidity:" + "<br>" + response.list[3].main.humidity + "%");
            $("#fHum5").append("Humidity:" + "<br>" + response.list[4].main.humidity + "%");
        });
    });
  
});

//uv index
