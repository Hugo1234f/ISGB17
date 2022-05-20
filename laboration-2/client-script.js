"use strict";

//Variabel för Socket.io
let socket = io();

addEventListener("load", (e) => {
  try {
    const submitButton = document.getElementById("send-msg");

    submitButton.addEventListener("click", (e) => {
      console.log("test");
      try {
        let textForm = document.getElementById("msg");
        let text = textForm.value;

        if (text.length < 2) {
          throw new Error("Måste vara minst två tecken.");
        }

        let targetArea = document.querySelector("section");
        let h4 = document.createElement("h4");
        let textNode = document.createTextNode(text);
        h4.appendChild(textNode);
        targetArea.appendChild(h4);
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
});
