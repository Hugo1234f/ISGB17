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

  if (cookie === undefined) {
    // No cookies have been set to user
    fs.readFile(__dirname + "/loggain.html", (err, data) => {
      res.sendFile(__dirname + "/loggain.html");
      vDom = new jsDOM.JSDOM(data);
      console.log("No cookies set");
      res.cookie("name", name);
    });
  } else {
    console.log("else statement");
    fs.readFile(__dirname + "/index.html", (err, data) => {
      res.sendFile(__dirname + "/index.html");
      console.log("User have cookies");
      console.log("cookie is: " + cookie);
    });
  }
});

let name = null;
app.post("/", (req, res) => {
  console.log("send it!");
  fs.readFile(__dirname + "/loggain.html", (err, data) => {
    let dom = new jsDOM.JSDOM(data);
    try {
      let dom = new jsDOM.JSDOM(data);
      if (req.body.nickname.length < 5) {
        throw new Error("Ditt användarnamn måste vara längre än 5 bokstäver");
      }
      name = req.body.nickname;
    } catch (error) {
      console.log(error.message);
      let errorMsg = dom.window.document.querySelector("#error-msg");
      console.log(errorMsg.textContent);
      errorMsg.innerHTML = error.message;
      // res.redirect("back");
    }
  });
});

/*
KODEN NEDANFÖR TAGET FRÅN WORKSHOP GITHUB
*/

// app.get("/favicon.ico", function (req, res) {
//   console.log("FAV!");
//   res.sendFile(__dirname + "/favicon.ico");
// });

// io.on("connection", (socket) => {
//   console.log("Ny användare anslöt via socket...");
// });
