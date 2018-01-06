var apiURL = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = "C";
var currentTempInCelcius;

$(function () {
    //console.log("ready!");
    //HTML 5 geolocation api gathering current coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = "lat=" + position.coords.latitude;
            var lon = "lon=" + position.coords.longitude;
            //console.log(lat, lon);
            getWeather(lat, lon);
        });
    } else {
        console.log(
          "Geolocation is not supported on this browser or has been denied"
        );
    }

    $("#changeTempUnit").click(function () {
        //Debug code: console.log("changed to F");
        //gathers the current temperature unit
        var currentTempUnit = $("#tempUnit").text();
        //Debug code: console.log(currentTempUnit);
        //if temp unit is Celsius, change to farenheight, else change back to Celsius
        var newTempUnit = currentTempUnit == "C" ? "F" : "C";
        //sets new tempuerature unit
        $("#tempUnit").text(newTempUnit);
        if (newTempUnit == "F") {
            //converts C temp to F temperature
            var fTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
            //displays converted temperature
            $("#temp").text(fTemp + " " + String.fromCharCode(176));
            //updates button text
            $("#changeTempUnit").html('Change to C' + String.fromCharCode(176));
        } else {
            $("#temp").text(currentTempInCelcius + " " + String.fromCharCode(176));
            $("#changeTempUnit").html('Change to F' + String.fromCharCode(176));
        }
    });
});

function getWeather(lat, lon) {
    var urlString = apiURL + lat + "&" + lon;
    //console.log(urlString);
    $.ajax({
        url: urlString,
        success: function (results) {
            //console.log(results);
            //displays city, country, temperature in Celsius, weather description, and icon from API
            $("#city").text(results.name + ", ");
            $("#country").text(results.sys.country);
            currentTempInCelcius = Math.round(results.main.temp * 10) / 10;
            $("#temp").text(currentTempInCelcius + " " + String.fromCharCode(176));
            $("#tempUnit").text(tempUnit);
            $("#weatherDesc").text(results.weather[0].main);
            $("#weatherIcon").prepend(
              $("<img>", {
                  id: "weatherIcon",
                  src: results.weather[0].icon
              })
            );
        }
    });
}
