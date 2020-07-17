var http = require("http");
const { forEach } = require("p-iteration");
var fs = require("fs");
var Anime = require("anime-scraper").Anime;
// Console will print the message
let animeList = [];
async function main() {
  // await forEach(anime.episodes, async (ep) => {
  //   var qw = await getQualities(ep.url);
  //   animeList.push(qw);
  //   // console.log(qw);
  // });
  // Anime.fromName("Haikyuu!!").then(function (anime) {
  //   anime.episodes.forEach((ep) =>
  //     ep.fetch().then(function (episode) {
  //       // console.log(episode);

  //     })
  //   );
  // });

  Anime.fromName("Dr Stone").then(function (anime) {
    anime.fetchAllEpisodes().then(function (episodes) {
      animeList.push(episodes);
      var dictstring = JSON.stringify(episodes);
      fs.readFile("Dr Stone.json", "utf8", function (err, data) {
        fs.writeFile("Dr Stone.json", dictstring, function (err, result) {
          if (err) console.log("error", err);
        });
      });
      console.log(episodes.episodes);
    });
  });
  http
    .createServer(function (request, response) {
      response.writeHead(200, { "Content-Type": "text/json" });
      response.end(JSON.stringify(animeList));
    })
    .listen(8081);
}

// Searches for anime using a POST request & uses first result
// Anime.fromName("Sword Art Online").then(function (anime) {
//   console.log(anime);
// });

// // You can also search and then choose manually
// Anime.search("Sword Art Online").then(function (results) {
//   // Same as above but uses the second search result rather than the first.
//   results[1].toAnime().then(function (anime) {
//     console.log(anime);
//   });
// });

console.log("Server running at http://127.0.0.1:8081/");
main();
