"use strict";

addEventListener("load", (e) => {

    try { //------------------index.html------------------------------
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
        console.log("TEEEST (index.html)");
    }catch(e) {//-------------------------loggain.html--------------------
        console.log("teest (loggain.html)");
    }
        
    
  
});
