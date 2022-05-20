'use strict';

const socket = io();

window.addEventListener("load", ()=> {
    document.querySelector("#a").addEventListener("click", ban);
});

function ban() {
    socket.emit("rndcol", "clicked....");
};

  