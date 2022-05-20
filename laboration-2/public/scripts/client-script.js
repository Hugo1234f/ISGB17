"use strict";

const socket = io();

function ban() {
  console.log("Knapp klickad");
  socket.emit("clickad");
}

addEventListener("load", (e) => {
  const submitButton = document.getElementById("send-msg");

  submitButton.addEventListener("click", (e) => {
    console.log("test");
    try {
      let textForm = document.getElementById("msg");
      let text = textForm.value;

      if (text.length < 2) {
        throw new Error("Måste vara minst två tecken.");
      }

      textForm.value = "";
    } catch (error) {
      console.log(error.message);
    }
  });
});
