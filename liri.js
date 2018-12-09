// required variables
require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
//const omdb = new Omdb(keys.omdb);
//const movieSource = `http://www.omdbapi.com/?t=${movieName}&apikey=trilogy`;
const request = require('request');
const action = process.argv[2];
let searchInfo = process.argv.slice(3).join(' ');
const artist = searchInfo;
const URL = `https://rest.bandsintown.com/artists/${artist}/events/?app_id=codingbootcamp`;
    request(URL, function (err, response, body) {
    if (err) {
//  return console.log('Error: ${err}');
}
else {
  const dataList = JSON.parse(body);
  console.log('==============================================');
  console.log(`Artist Name ${searchInfo}`);
  console.log('==============================================');
}
});

/*switch (action) {
  case 'concert-this':
    concertThis();
    break
}*/
 

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


