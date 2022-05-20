"use strict";

const port = 3000;

const express = require("express");
const app = express();
const fs = require("fs");
const jsDOM = require("jsdom");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cookieParser = require("cookie-parser");
// const e = require("express");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Server is running");
  }
});

app.get("/", (req, res) => {
  let vDom = null;
  let page = null;
  let cookie = req.cookies.cookieName;
  console.log("Hej");

  if (req.cookies["nickName"] === undefined) {
    // No cookies have been set to user
    fs.readFile(__dirname + "/loggain.html", (err, data) => {
      res.sendFile(__dirname + "/loggain.html");
      vDom = new jsDOM.JSDOM(data);
      console.log("No cookies set");
      // res.cookie("nickName", "Kasper");
      res.cookie("nickName", name);
    });
  } else {
    console.log("else statement");
    fs.readFile(__dirname + "/index.html", (err, data) => {
      res.sendFile(__dirname + "/index.html");
    });
  }
});

let name = null;
app.post("/", (req, res) => {
  let cookie = req.cookies.cookieName;
  console.log("send it!");
  fs.readFile(__dirname + "/loggain.html", (err, data) => {
    let dom = new jsDOM.JSDOM(data);
    try {
      let dom = new jsDOM.JSDOM(data);
      if (req.body.nickname.length < 3) {
        throw new Error("Ditt användarnamn måste vara längre än 3 bokstäver");
      }
      name = req.body.nickname;
    } catch (error) {
      console.log(error.message);
      let errorMsg = dom.window.document.querySelector("#error-msg");
      console.log(errorMsg.textContent);
      errorMsg.innerHTML = error.message;
    }
  });
});

/*
KODEN NEDANFÖR TAGET FRÅN WORKSHOP GITHUB
*/

app.get("/public/images/uil.svg", function (req, res) {
  res.sendFile(__dirname + "/public/images/uil.svg");
});

app.get("/client-script.js", function (req, res) {
  res.sendFile(__dirname + "/client-script.js");
});

// io.on("connection", (socket) => {
//   console.log("Ny användare anslöt via socket...");
// });
