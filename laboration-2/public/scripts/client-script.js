"use strict";

const socket = io();

function ban(text) {
  console.log("Knapp klickad");
  socket.emit("clickad", text);
}

addEventListener("load", (e) => {

    const submitButton = document.getElementById("send-msg");

    submitButton.addEventListener("click", (e) => {
      try {
        let textForm = document.getElementById("msg");
        let text = textForm.value;

        if (text.length < 2) {
          throw new Error("Måste vara minst två tecken.");
        }
        textForm.value = "";
        ban(text);
      } catch (error) {
        console.log(error.message);
      }
    });
});
