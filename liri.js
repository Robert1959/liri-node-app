// required variables
require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const request = require('request');
const fs = require("fs");
const action = process.argv[2];
let searchInfo = process.argv.slice(3).join(' ');
const artist = searchInfo;
const song = searchInfo;
const movieName = searchInfo;

const findArtist = function(artist) {

const URL = `https://rest.bandsintown.com/artists/${artist}/events/?app_id=codingbootcamp`;
    request(URL, function (err, response, body) {
    if (err) {
  return console.log('Error: ${err}');
}
else {

const dataList = JSON.parse(body);
 for (i=0; i < dataList.length; i++) {
  fs.appendFile('./log.txt');
  //console.log('==============================================');
  //console.log(`Artist: ${searchInfo}`);
  //console.log(dataList[i].venue.name);
  //console.log(dataList[i].venue.city);
  //console.log('==============================================');
  } 
}
  
});

const movieThis = function(movie){


const movieSource = `http://www.omdbapi.com/?t=${movieName}&y=&plot=full&tomatoes=true
&apikey=trilogy`;
request(movieSource, function (err, response, body) {
  if (err) {
  return console.log('Error: ${err}');
}
else {
  const movieList = JSON.parse(body);
  console.log(movieList.Title);
  console.log(movieList.Year);
  console.log(movieList.imdbRating);
  if (movieList.Ratings[1] == null){
    console.log('no tomatoes!');
  } 
  else{
    console.log(movieList.Ratings[1].Value);
  }
  
  console.log(movieList.Country);
  console.log(movieList.Language);
  console.log(movieList.Plot);
  console.log(movieList.Actors);
}
});
}
const spotifyThis = function(song){
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
}


switch (action) {
  case 'concert-this':
    findArtist();
    break

    case 'spotify-this-song':
    spotifyThis(song);
    break

    case 'movie-this':
    movieThis();
    break
}
 

/*omdb.search({ type: 'type', query: 'What Matters' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(JSON.stringify(data.movies.items[0], null, 2));

})
});*/



// four commands
// spotify-this-song
// concert-this
// movie-this
// do-what-it-says

// when thinking about the four commands you need to be able to have user inputs for these commands
// process.argv[?]


}