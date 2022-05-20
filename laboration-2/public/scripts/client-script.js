'use strict';

const socket = io();

window.addEventListener("load", ()=> {
    document.querySelector("#a").addEventListener("click", ban);
});

function ban() {
    console.log("Knapp klickad");
    socket.emit("clickad", );
};