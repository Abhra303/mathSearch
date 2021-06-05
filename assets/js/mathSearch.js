console.log("hello");
import decoder from "./decoder.js";

window.onload = () => {
    let submitButton = document.getElementById("submit");
    let searchedTextField = document.getElementById("searchedText");
    
    searchedTextField.onkeypress = e => {
        decoder(e.key);
    };
    submitButton.onclick = () => {
        let searchedText = searchedTextField.value;
        console.log(searchedText);

        // todo: make a file that contains all the symbols
        // and then map the latex symbols
        if (searchedText) {
            console.log("hello text");
        }
        else {
            console.log("please enter the text in the input area");
        }

    };
};