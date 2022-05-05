"use strict";

const express = require("express");
const fs = require("fs");
const jsdom = require("jsdom");
const bodyParser = require("body-parser");
const blogPosts = require("./blogPosts");

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
    let text = null;

    for (let i = 0; i < blogPosts.blogPosts.length; i++) {
      let para = vDom.window.document.createElement("p");

      let nickNameText = vDom.window.document.createTextNode(
        blogPosts.blogPosts[i]["nickName"]
      );
      let msgSubjectText = vDom.window.document.createTextNode(
        blogPosts.blogPosts[i]["msgSubject"]
      );
      let timeStampText = vDom.window.document.createTextNode(
        blogPosts.blogPosts[i]["timeStamp"]
      );
      let msgBodyText = vDom.window.document.createTextNode(
        blogPosts.blogPosts[i]["msgBody"]
      );

      let ele = vDom.window.document.createElement("h4");
      section.appendChild(ele);

      /*
        TODO: 
        FORMATTERA MED RADBRYTNING
      */

      ele.appendChild(nickNameText);
      ele.appendChild(msgSubjectText);
      ele.appendChild(timeStampText);
      ele.appendChild(msgBodyText);
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

    let date = new Date().toString();

    // let sub
    blogPosts.blogPosts.push({
      nickName: req.body.nickname,
      msgSubject: req.body.subject,
      timeStamp: date,
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
