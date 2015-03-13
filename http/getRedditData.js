var HOST = "www.reddit.com";
var TARGET_SUB_REDDIT = "/r/Detroit";

var http = require("http");

function getSubRedditData(path, callback) {
  var config = {host: HOST, path: path+".json"};
  return http.get(config, function(response) {

    var body = "";
    //because the data comes in chunks we have to add it all up
    //until we have it all.
    response.on("data", function(d) {
      body += d;
    });

    //once we have the whole response string from the server
    //we will try and parse it into a real JS object
    response.on("end", function() {
      try {
        var parsed = JSON.parse(body);
        callback(parsed);
      } catch(err) {
        console.log("There was an error parsing the json response:\n"+err);
      }
    });

    response.on("error", function(e){
      console.log ("there was an error " + e);
    });

  });
}

getSubRedditData(TARGET_SUB_REDDIT, function(json) {
  //console.log(json.data.children[0].data.author);
  //console.log(json.data.children[1].data.title);
  console.log(json); //.data.children[1].data.title);
});
