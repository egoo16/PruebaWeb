var express = require("express");
var app = express();

var mdAuth = require('../middlewares/authenticate')

const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./storage");
localStorage.setItem("credentials", "[]");

// Method POST to Message
app.post("/", mdAuth.aunthenticate,(req, res) => {
  var body = req.body;
  var message = req.body.message;
  var tags = req.body.tags;

  var id = getId();
  var postMessage = { id, message, tags };
  var messages = JSON.parse(localStorage.getItem("messages"));

  messages.push(postMessage);
  localStorage.setItem("messages", JSON.stringify(messages));

  res.status(200).json({
    status: true,
    id: id,
    body: body,
  });
});

//Method To Get All Messages
app.get("/",mdAuth.aunthenticate, (req, res) => {

var messages = JSON.parse(localStorage.getItem("messages"));

if (messages.length > 0) {
  res.status(200).json({
    status: true,
    msgs: messages,
  });
} else {
  res.status(404).json({
    status: false,
    message: "No Encontrado",
  });
}
});


// Method Get to Messages FindByTAGS
app.get("/:tag", mdAuth.aunthenticate, (req, res) => {
    let {tag} = req.params;    

//   var tag = req.params.tag;
  var messages = JSON.parse(localStorage.getItem("messages"));
  var tagLow = tag.toLowerCase();

  let messagesFinded = [];

  messages.forEach((e) => {
    tagsLow = e.tags.toLowerCase();
    if (tagsLow.includes(tagLow)) {
      messagesFinded.push(e);
    }
  });

  if (messagesFinded.length > 0) {
    res.status(200).json({
      status: true,
      msgs: messagesFinded,
    });
  } else {
    res.status(404).json({
      status: false,
      msg: "No Encontrado",
    });
  }
});


// Method Get to Message FindByID
app.get("/findID/:id", mdAuth.aunthenticate, (req, res) => {
    let {id} = req.params;

  var messages = JSON.parse(localStorage.getItem("messages"));
  var findMsg = messages.find((e) => e.id == id);

  if (findMsg) {
    res.status(200).json({
      status: true,
      id: id,
      msg: findMsg,
    });
  } else {
    res.status(404).json({
      status: false,
      msg: "No Encontrado",
    });
  }
});



function getId() {
  const min = 100,
    max = 999;
  var rnd = Math.floor(Math.random() * (max - min + 1) + min);

  var messages = JSON.parse(localStorage.getItem("messages"));
  var findMessage = messages.find((e) => e.id == rnd);

  if (findMessage || !rnd) {
    getId();
  } else {
    return rnd;
  }
}

module.exports = app;
