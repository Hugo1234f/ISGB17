"use strict";

addEventListener("load", (e) => {
  console.log("TEEEST");
  const submitButton = document.getElementById("send-msg");
  submitButton.addEventListener("click", (e) => {
    console.log("test");
    try {
      let textForm = document.getElementById("msg");
      let text = textForm.value;

      if (text.length < 2) {
        throw new Error("Måste vara minst två tecken.");
      }

      // Send it!
    } catch (error) {
      console.log(error.message);
    }
  });
  console.log(submitButton);
});
