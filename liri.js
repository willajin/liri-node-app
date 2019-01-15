// load dotenv
require("dotenv").config();

// load keys.js file
var keys = require("./keys");

// load node modules
var Spotify = require("node-spotify-api");
// load spotify keys
var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment");
var fs = require("fs");

// command line input
var input = process.argv;
// liri command
var liriCommand = process.argv[2];
// combine liri command input with spaces
var liriInput = "";
for (var i = 3; i < input.length; i++) {
    liriInput += input[i] + " ";
}
console.log(liriInput);


// user command
if (liriCommand === "concert-this") {
    concertThis(liriInput);
}

else if (liriCommand === "spotify-this-song") {
    spotifySong(liriInput);
}

else if (liriCommand === "movie-this") {
    movieThis(liriInput);
}

else if (liriCommand === "do-what-it-says") {
    doWhat();
}


// concert-this //
// search Bands in Town Artist Events API for artist and display event information
function concertThis(artist) {

    // replace spaces with +
    artist = artist.split(" ").join("+");

    // request to Bands in Town API with artist input
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {
        var data = JSON.parse(body);
        
        // if request is successful
        if (!error && response.statusCode === 200) {
            // display event information
            console.log();
          }
    });
}

// spotify-this-song
function spotifySong(song) {

}

// movie-this
function movieThis(movie) {

}

// do-what-it-says
function doWhat() {

}