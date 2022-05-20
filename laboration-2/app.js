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

let myServer = http.listen(port, function () {
  console.log("Server running on port number: " + myServer.address().port);
});

app.get("/", (req, res) => {
  let cookie = req.cookies.nickName;
  console.log("Hej");

  if (cookie === undefined) {
    res.sendFile(__dirname + "/loggain.html");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

app.post("/", (req, res) => {
  console.log("send it!");
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

app.get("/public/images/uil.svg", function (req, res) {
  res.sendFile(__dirname + "/public/images/uil.svg");
});

io.on("connection", function (socket) {
  socket.on("clickad", function (data) {
    console.log("klickade fan");
  });
});
