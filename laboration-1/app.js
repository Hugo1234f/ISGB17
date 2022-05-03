"use strict";

const express = require("express");
const fs = require("fs");
const jsdom = require("jsdom");
const bodyParser = require('body-parser');
const blogPosts = require("./blogPosts");

let app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

app.listen(3000, () => {
    console.log("server is running...");
});

app.get('/', (req, res) => {
    fs.readFile(__dirname + "/index.html", (err, data) => {
        if(err) throw err;
        
        let page = data;
        let vDom = new jsdom.JSDOM(page);

        let sectionRef = vDom.window.document.querySelector("section");
        for(let i = 0; i < blogPosts["blogPosts"].length; i++) {
            let h4Ref = vDom.window.document.createElement("h4");
            h4Ref.innerText = blogPosts["blogPosts"][i];
            sectionRef.appendChild(h4Ref);
        }

        res.send(vDom.serialize());
        
    });
});

app.get("/skriv", (req, res) => {
    fs.readFile(__dirname + "/skriv.html", (err, data) => {
        if(err) throw err;
        let page = data;
        res.send(page.toString());
    });
});

app.post("/skriv", (req, res) => {
    try {
        if(req.body.subject === "") {throw new Error("Subject empty");}
        if(req.body.subject.length < 3) {throw new Error("Subject lenght less than 3");}

        if(req.body.msgbody === "") {throw new Error("Msg empty");}
        if(req.body.msgbody.length < 10) {throw new Error("Msg length less than 10");}

        if(req.body.nickname === "") {throw new Error("Name empty");}
        if(req.body.nickname.length < 3) {throw new Error("Name length less than 3");}


    } catch(e) {
        console.log(e);
        res.redirect("/skriv");
    }
});