"use strict";

const socket = io();

window.addEventListener("load", () => {
  document.querySelector("#send-msg").addEventListener("click", ban);
});

function ban() {
  console.log("Knapp klickad");
  socket.emit("clickad");
}

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
        textForm.value = "";
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (e) {
    console.log(e.message);
  }
});
