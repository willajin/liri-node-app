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
if (liriCommand === "spotify-this-song") {
    spotifySong(liriInput);
}

else if (liriCommand === "movie-this") {
    movieThis(liriInput);
}

else if (liriCommand === "do-what-it-says") {
    doWhat();
}


// spotify-this-song
function spotifySong(song) {
    var search = "";
    // if no song is provided then default to "The Sign" by Ace of Base
    if (song === "") {
        search = "The Sign Ace of Base";
    }

    else {
        search = song;
    }

    spotify.search({ type: 'track', query: song, limit: 3 }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        // display song information - song, artist, album, preview link
        else {
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("//////////////////////////////////////////" +
                    "\nSong: " + data.tracks.items[i].name +
                    "\nArtist: " + data.tracks.items[i].artists[0].name +
                    "\nAlbum: " + data.tracks.items[i].album.name +
                    "\nPreview Link: " + data.tracks.items[i].preview_url +
                    "\n");
            }
        }
    });
}


// movie-this
function movieThis(movie) {
    var search = "";
    // if no movie is provided then default to "Mr. Nobody"
    if (movie === "") {
        search = "Mr. Nobody";
    }

    else {
        search = movie;
    }

    // combine search with "+"
    search = search.split(" ").join("+");

    request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function (err, response, body) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        // display movie information - title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, actors
        else {
            var data = JSON.parse(body);
            console.log("//////////////////////////////////////////" + 
            "\nMovie Title: " + data.Title + 
            "\nRelease Year: " + data.Released + 
            "\nIMDB Rating: " + data.imdbRating + 
            "\nRotten Tomatoes Rating: " + data.tomatoRating + 
            "\nCountry of Production: " + data.Country + 
            "\nLanguage: " + data.Language + 
            "\nPlot: " + data.Plot + 
            "\nActors: " + data.Actors + 
            "\n");
        }
    });
}


// do-what-it-says
function doWhat() {
    // read random.txt file with command
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        else {
            // split LIRI command and input
            var liriString = data.split(",");
            var command = liriString[0].trim();
            var input = liriString[1].trim();

            // pass command/input to functions
            if (command === "spotify-this-song") {
                spotifySong(input);
            }
            
            else if (command === "movie-this") {
                movieThis(input);
            }
            
            else if (command === "do-what-it-says") {
                doWhat();
            }
        }
    });
}