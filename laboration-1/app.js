"Use strict"

//Laboration 1
const express = require("express");
const fs = require("fs");
const jsdom = require("jsdom");

let app = express();




app.get('/', (req, res) => {
    let indexFile = fs.readFileSync("./index.html", (err, data) => {
        if (err){ throw err;}
        console.log(data);
    });

    let dom = new jsdom.JSDOM(indexFile.toString);

    let sectionTag = dom.window.document.querySelector("section");
});

app.listen(3000);



