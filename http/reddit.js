
var HOST = "www.reddit.com";
var TARGET_SUB_REDDIT = "/r/Detroit";
var TOP_COUNT = 5;
var CLEAR_TERM = '\u001B[2J\u001B[0;0f';

var http = require("http");
var rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

function main() {
  getSubRedditData(TARGET_SUB_REDDIT, function(result){
    startSubRedditGopher (result);
  });
}

//***** Classes
//This class represents each item in the fist page of a subreddit
function RedditItem(source) {
  this.title = source.data.title;
  this.permalink = source.data.permalink;
  this.author = source.data.author;
  this.createdUtc = source.data.created_utc;
  this.name = source.data.name;
  this.commentsModel = null;

  this.setCommentsModel = function(commentsModel) {
    this.commentsModel = commentsModel;
  };
  this.getCommentsModel = function() {
    return this.commentsModel;
  };
}

//This class represents the list object and a list of comments about it.
function RedditCommentsModel(source) {
  this.source = source;
  this.title = source[0].data.children[0].data.title;
  this.author = source[0].data.children[0].data.author;
  this.comments = source[1].data.children;
}

//***** Methods
function getSubRedditData(path, callback) {
  return http.get({
    host: HOST,
    path: path+".json"
  }, function(response) {
    var body = "";

    response.on("data", function(d) {
      body += d;
    });

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

function getArrayOfRedditItems(jsonArray) {
  console.log(jsonArray);
  var arr = [];
  jsonArray.forEach(function(item) {
    arr.push(new RedditItem(item));
  });
  return arr;
}

function showRedditComments(item) {
  clearTerminal();
  writeHeader("comments");
  var commentModel = item.getCommentsModel();
  //before classes were implemented this is how we got the title
  //console.log (child.data[0].data.children[0].data.title);
  console.log(commentModel.title+"\n\n");

  if (commentModel.comments.length > 0) {
    var len = (commentModel.comments.length < TOP_COUNT) ?
                commentModel.comments.length : TOP_COUNT;

    for (var i=1; i<len; i++) {
        var comment = commentModel.comments[i].data;
        console.log (" %s. ["+comment.author+"] - "+comment.body, i);
    }

  } else {
    console.log("There are no comments.");
  }

  rl.question("\nEnter to continue", function(key) {
    main();
  });
}

function startSubRedditGopher(jsonResponse) {
  var items = getArrayOfRedditItems(jsonResponse.data.children);
  clearTerminal();
  writeHeader("topics");
  for(var i=1; i<=TOP_COUNT; i++) {
    console.log (i+". " + getItemRow(items[i]));
  }

  rl.question("Your Selection: ", function(selection) {
    if (selection > 0 && selection <= TOP_COUNT) {

      getSubRedditData(items[selection].permalink, function(result) {
        items[selection].setCommentsModel(new RedditCommentsModel(result));
        showRedditComments(items[selection]);
      });

    } else {
      main();
    }
  });

}

function writeHeader(arg) {
  console.log("Welcome to the "+TARGET_SUB_REDDIT+" Gopher system.\n");
  console.log("Here are top "+TOP_COUNT+" most recent %s:\n", arg);
}

function getItemRow(item) {
  return  item.title + "\n" +
          "   by: "+ item.author +" on " +
          new Date(item.createdUtc*1000).toString() + "\n";
}

function clearTerminal() {
  console.log (CLEAR_TERM);
}
//***** BEGIN
main();
