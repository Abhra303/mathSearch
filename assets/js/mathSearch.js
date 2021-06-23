import parseToKatex from "./parser.js";

let resultDiv = document.getElementById("result");

const KEYS = [
    "Alt","Shift","Control","CapsLock","Tab","Meta","Enter","ArrowRight","ArrowLeft","ArrowUp","ArrowDown",
];


window.onload = () => {
    let submitButton = document.getElementById("submit");
    let searchedTextField = document.getElementById("searchedText");
    let parsedList;
    
    searchedTextField.onkeyup = e => {
        console.log(e);
        if (KEYS.indexOf(e.key) !== -1) {
            return;
        }
        let text = document.getElementById("searchedText").value;
        parsedList = parseToKatex(text);
        resultDiv.innerHTML = parsedList[0];
    };
    submitButton.onclick = () => {
        let searchedText = searchedTextField.value;
        console.log(searchedText);
        let modifiedText;
        // todo: make a file that contains all the symbols
        // and then map the latex symbols
        if (searchedText) {
            let positions = parsedList[1];
            if (positions.length) {
                positions.forEach((position, index) => {
                    if (index == 0) {
                        modifiedText = searchedText.slice(0, position[0]);
                    }
                    modifiedText += searchedText.slice(position[0] + 2, position[1]);
                    if (positions[index + 1]) {
                        modifiedText += searchedText.slice(position[1] + 2, positions[index+1][0]);
                    }
                    else {
                        modifiedText += searchedText.slice(position[1]+2);
                    }
                });
            }
            if (modifiedText) {
                console.log(modifiedText);
                modifiedText = window.encodeURIComponent(modifiedText);
                let URL = `https://www.google.com/search?q=${modifiedText}`;
                // console.log(URL);
                window.open(URL,"_blank");
                chrome.runtime.sendMessage({todo: "searchedText", searchingText: searchedText, positions: positions});
            }
        }
        else {
            console.log("please enter the text in the input area");
        }

    };
};