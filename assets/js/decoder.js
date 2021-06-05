import katex from "../../node_modules/katex/dist/katex.mjs";


let resultDiv = document.getElementById("result");
let texExpression = [];
let lastWasDollar = false;
let recentTexWrapOpener = null; // stores the index of the latest discovered "${"
let texLikelyToEnd = false;

export default function decoder(letter) {

    console.log(letter);
    resultDiv.innerHTML += letter;
    let text = resultDiv.innerHTML;
    if (recentTexWrapOpener === null && letter === "$") {
        lastWasDollar = true;
        console.log("lastWasDollar is ", lastWasDollar);
        return;
    }
    else if (lastWasDollar && letter === "{") {
        if (!recentTexWrapOpener) {
            recentTexWrapOpener = text.length - 2;
            console.log("recentTexWrapOpener is ", recentTexWrapOpener);
            
        }
        if (recentTexWrapOpener && recentTexWrapOpener !== text.length - 2) {
            while ( !texExpression.length) {
                texExpression.pop();
            }
            recentTexWrapOpener = text.length - 2;
        }
    }
    else if (recentTexWrapOpener !== null) {
        if (letter === "}") {
            texLikelyToEnd = true;
            texExpression.push(letter);
        }
        else if (texLikelyToEnd && letter === "$") {
            texExpression.pop();
            let texExpressionStr = texExpression.join("");
            console.log("texExpressionstr is ", texExpressionStr);
            let texResult = katex.renderToString(texExpressionStr, {
                throwOnError: false,
            });
            let arr = Array.from(text);
            arr = arr.slice(0, recentTexWrapOpener);
            arr.push(texResult);
            console.log("arr is ", arr);
            resultDiv.innerHTML = arr.join("");
            recentTexWrapOpener = null;
            while(texExpression.length) {
                texExpression.pop();
            }
        }
        else {
            texExpression.push(letter);
        }
    }
    lastWasDollar = false;

}