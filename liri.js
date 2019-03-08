// when thinking about the four commands you need to be able to have user inputs for these commands
// process.argv[?]
require("dotenv").config();
console.log("hello world");
//7. add code to read & set any environment variable with the dotenv package
// fs is a core Node package for reading and writing files
const fs = require("fs");
const request = require("request");
const moment = require("moment");

//8. Spotify API and location to key

const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
//console.log(keys);
//9. liri.js can take the commands- Set variable to capture two inputs action and value
const action = process.argv[2]; //command switch
const value = process.argv.slice(3).join(" ");  //search value
console.log(value);
// node liri.js concert-this<artist/band name here>
switch(action) { 
case "concert-this":
  concertThis(value);
  break;
// node liri.js spotify-this-song<song name here>
case "spotify-this-song":
  spotifyThisSong(value);
  break;
//node liri.js movie-this '<movie name here>'`
case "movie-this":
  movieThis(value);
  break;
// node liri.js do-what-it-says
case "do-what-it-says":
  doWhatItSays();
  break;
};
//save to local log file
function saveFile(content){
  fs.appendFile("./log.txt", content, function(err) {
    if (err) throw err;
    console.log(content);
  });
}
//search and return concert-this-node liri.js concert-this default is Beyonce
function concertThis(value) {
  console.log(value);
  if (value === undefined) {
    value = "Beyonce";
  }
  //https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp
  //"https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
  const url = `https://rest.bandsintown.com/artists/${value}/events?app_id=codingbootcamp`;
  console.log(url);
  request(url, function(error, response, body) {
  
// If there were no errors and the response code was 200 (i.e. the request was successful)...
// console.log("Date of the Event, Venue Name, Venue City, Venue region, Venue Country")  
  if (!error && response.statusCode === 200) {
    results = JSON.parse(body);
    console.log(results)
    console.log("*******Date************Venue*************** Location********");
      
// formatting
    const formattedDataArray = [];
     for(var i=0; i < results.length; i++) {  
       const date =results[i].datetime;
       const newDate = (moment(date).format("MM/DD/YYYY hh:mm a")); 
        formattedData = [newDate + " " + results[i].venue.name +", " + results[i].venue.city + " " + results[i].venue.region + " " + results[i].venue.country].join("\n\n");
        formattedDataArray.push(formattedData);  
    }
     saveFile(formattedDataArray.join("\n========================\n"));     
  };
});
}

//search and return spotify-this-song
//node liri.js spotify-this-song<song name here>
function spotifyThisSong(value) {
  if (value === undefined ) {
    value = "The Sign";
  } 
//https://www.npmjs.com/package/node-spotify-api  example API
  spotify.search({ type: 'track', query: value }, function(err, data) {
    //var divider = '///////////////'
    console.log("spotify");
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var results = data.tracks.items;
//showData ends up being the string containing the show data -we will print to the console
    formattedData = [
    "Artist(s): " + results[0].artists[0].name,
    "Song Name: " + results[0].name,
    "Preview Link: " + results[0].preview_url,
    "Album: " + results[0].album.name,
    ].join("\n\n");
    saveFile(formattedData + "\n========================\n");  
  });
}
//search/return movie-this:If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//node liri.js movie-this 
function movieThis(value) {
  if (value == null ) {
    value = "Mr. Nobody";
  }
  request("http://www.omdbapi.com/?t="+value+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

// If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {
    var x= 0;
//This one is innner loop to capture Rotten Tomatoes rating and capture this value and once capture break out
    for (x in JSON.parse(body).Ratings) {
      if(JSON.parse(body).Ratings[x].Source === "Rotten Tomatoes") {
        rottenRating = JSON.parse(body).Ratings[x].Value;
        break;
    } else  {
       rottenRating = "No Rotten Tomato rating";
    }
  }
     formattedData = [
    "Title of the movie                   :  " + JSON.parse(body).Title,
    "Year the movie came out              :  " + JSON.parse(body).Year,
    "IMDB Rating of the movie             :  " + JSON.parse(body).imdbRating,
    "Rotten Tomatoes Rating of the movie  :  " + rottenRating,
    "Country where the movie was produced :  " + JSON.parse(body).Country,
    "Language of the movie                :  " + JSON.parse(body).Language,
    "Plot of the movie                    :  " + JSON.parse(body).Plot,
    "Actors in the movie                  :  " + JSON.parse(body).Actors
    ].join("\n");  
    saveFile(formattedData + "\n========================\n");  
  }
});
}
//node liri.js do-what-it-says
//There are three random.txt random1.txt random2.txt that be used to test. 
function doWhatItSays() {

// read random#.txt files as utf8
fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  //console random.txt line
  console.log(data);
  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  var action =dataArr[0]; //value for action concert-this, spotify-this-song, movieThis
  var value = dataArr[1]; //value for search

  switch(action) { 
    case "concert-this":
      value = value.substr(1).slice(0, -1); 
      concertThis(value);
      break;
    case "spotify-this-song":
      spotifyThisSong(value);
      break;
    case "movie-this":
      movieThis(value);
      break;
      
  };

});

}

