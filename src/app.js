/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
}),
  cityName = 'Chicago';
var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;

ajax(
  {
  url: url,
  type: 'json'
  },
  function(data) {
    console.log('Data retrieved');
    
    // Extract data
    var location = data.name;
//     var temperature = Math.round(data.main.temp - 273.15) + 'C';
    var temp = Math.round( (data.main.temp * 9/5) - 459.67) + 'F';
//     [K] × 9⁄5 − 459.67

    // Always upper-case first letter of description
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);
    
    // Show to user
    card.subtitle(location + ', ' + temp);
    card.body(description);
  },
  function(error) {
    console.log('Something bad happened... ', error);
  }
);

// Display the Card
card.show();
