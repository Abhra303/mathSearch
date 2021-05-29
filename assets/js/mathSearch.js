console.log("hello");
import decoder from "decoder.js";

window.onload = () => {
    let submitButton = document.getElementById("submit");

    submitButton.onclick = () => {
        let searchedText = document.getElementById("searchedText").innerText;
        console.log(searchedText);

        // todo: make a file that contains all the symbols
        // and then map the latex symbols
        if (searchedText) {
            decoder(searchedText);
        }
        else {
            window.alert("please enter the text in the input area");
        }

    };
};