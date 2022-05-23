"use strict";

const port = 3000;

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

let myServer;
try {
  myServer = http.listen(port, function () {
    console.log("Server running on port number: " + myServer.address().port);
  });
} catch (e) {
  console.log("ERROR: porten" + port + " används redan");
}

app.get("/", (req, res) => {
  let cookie = req.cookies.nickName;

  if (cookie === undefined) {
    res.sendFile(__dirname + "/loggain.html");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/", (req, res) => {
  let namn = req.body.nickname;

  try {
    if (req.body.nickname.length < 3) {
      throw new Error("Ditt användarnamn måste vara längre än 3 bokstäver");
    }

    res.cookie("nickName", req.body.nickname);
    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
});

var cookie = require("cookie"); //installed from npm;

io.on("connection", function (socket) {
  socket.on("clickad", function (data) {
    var cookief = socket.handshake.headers.cookie;
    var cookies = cookie.parse(socket.handshake.headers.cookie);

    console.log(cookief);
    console.log(cookies);
    // We check if the cookie key is equal to nickName
    if (cookies["nickName"]) {
      console.log("true");
      let sendIt = cookies["nickName"] + ": " + data;
      io.sockets.emit("pushaMsg", sendIt);
    }

    // let cookie = socket["handshake"]["headers"]["cookie"].split("=")[1];

    // console.log(cookie + ": " + data);
    // let sendIt = cookie + ": " + data;
    // io.sockets.emit("pushaMsg", sendIt);
  });
});
