import parseToKatex from "./parser.js";

let resultDiv = document.getElementById("result");

const KEYS = [
    "Alt","Shift","Control","CapsLock","Tab","Meta","Enter","ArrowRight","ArrowLeft","ArrowUp","ArrowDown",
];

export default function decoder(letter) {

    if (KEYS.indexOf(letter) !== -1) {
        return;
    }
    let text = document.getElementById("searchedText").value;
    resultDiv.innerHTML = parseToKatex(text);
}