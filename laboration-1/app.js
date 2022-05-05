"use strict";

const express = require("express");
const fs = require("fs");
const jsdom = require("jsdom");
const bodyParser = require("body-parser");
const blogPosts = require("./blogPosts");
const { listenerCount } = require("process");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("server is running...");
});

app.get("/", (req, res) => {
  fs.readFile(__dirname + "/index.html", (err, data) => {
    if (err) throw err;

    let page = data;
    let vDom = new jsdom.JSDOM(page);

    let section = vDom.window.document.querySelector("section");

    for (let i = 0; i < blogPosts.blogPosts.length; i++) {
      let ele = vDom.window.document.createElement("h4");
      section.appendChild(ele);

      // Metoden hittad ifrån https://stackoverflow.com/questions/19438895/add-a-new-line-in-innerhtml
      ele.innerHTML = JSON.stringify(
        "<div style='box-sizing: content-box; border: 1px solid black; background-color: lightgray;'>" +
          "<span class='alert-primary' style='padding: 0%; margin: 0%;'>Användarnamn:</span> " +
          blogPosts.blogPosts[i]["nickName"] +
          " Datum: " +
          blogPosts.blogPosts[i]["timeStamp"] +
          "<br>" +
          "<br>" +
          "<span class='alert-success' style='padding: 0%; margin: 0%;'>Ämne:</span> " +
          blogPosts.blogPosts[i]["msgSubject"] +
          "<br>" +
          "<br>" +
          "<div style='background-color: lightgray; font-size: 80%;'>" +
          blogPosts.blogPosts[i]["msgBody"] +
          "</div>" +
          "</div>",
        null,
        4
      ).replaceAll('"', "");
    }

    res.send(vDom.serialize());
  });
});

app.get("/skriv", (req, res) => {
  fs.readFile(__dirname + "/skriv.html", (err, data) => {
    if (err) throw err;
    let page = data;
    res.send(page.toString());
  });
});

app.post("/skriv", (req, res) => {
  try {
    if (req.body.subject === "") {
      throw new Error("Subject empty");
    }
    if (req.body.subject.length < 3) {
      throw new Error("Subject lenght less than 3");
    }
    if (req.body.msgbody === "") {
      throw new Error("Msg empty");
    }
    if (req.body.msgbody.length < 10) {
      throw new Error("Msg length less than 10");
    }
    if (req.body.nickname === "") {
      throw new Error("Name empty");
    }
    if (req.body.nickname.length < 3) {
      throw new Error("Name length less than 3");
    }

    let date = new Date();

    // let sub
    blogPosts.blogPosts.push({
      nickName: req.body.nickname,
      msgSubject: req.body.subject,
      timeStamp: date.toISOString().split("T")[0],
      msgBody: req.body.msgbody,
    });

    blogPosts.blogPosts.forEach((e) => {
      console.log(e);
    });

    console.log("Datum är: " + new Date().toString());
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.redirect("/skriv");
  }
});
