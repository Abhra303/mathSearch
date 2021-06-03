import katex from "../../node_modules/katex/dist/katex.mjs";

class Queue extends Array {
    enqueue(val) {
        this.push(val);
    }

    dequeue() {
        return this.shift();
    }

    peek() {
        return this[0];
    }

    isEmpty() {
        return this.length === 0;
    }
}


export default function decoder(text) {
    // let htmlExpression = katex.renderToString(text, {
    //     throwOnError: false,
    // });
    let queue = new Queue();
    let lastIsDollar = false;
    let finish = false;
    let isKatexIdentifier = false;
    let finalText = [];
    let katexExpression = [];
    console.log(text);

    Array.from(text).forEach((letter, index) => {
        // console.log(letter, index);
        if (letter === "$") {
            lastIsDollar = true;
            queue.enqueue(letter);
        }
        else if (!isKatexIdentifier && lastIsDollar) {
            lastIsDollar = false;
            if (letter === "{") {
                isKatexIdentifier = true;
                queue.enqueue(letter);
            }
            else {
                if (!finish) {
                    finalText.push("$");
                }
                finalText.push(letter);
            }
        }
        else if (isKatexIdentifier) {
            if (lastIsDollar && letter === "{") {
                while (!queue.isEmpty()) {
                    finalText.push(queue.dequeue());
                }
                while (!katexExpression.length) {
                    katexExpression.pop();
                }
                lastIsDollar = false;
            }
            else if (letter === "}" && text[index + 1] === "$") {
                isKatexIdentifier = false;
                katexExpression = katex.renderToString(katexExpression.join(""), {
                    throwOnError: false,
                });
                finalText.push(katexExpression);
                finish = true;
                // while(!queue.isEmpty()) {
                //     queue.dequeue();
                // }
            }
            else {
                katexExpression.push(letter);
                queue.enqueue(letter);
                lastIsDollar = false;
            }
        }
        else {
            finalText.push(letter);
        }
    }
    );
    console.log(finalText);
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = finalText.join("");
    console.log(resultDiv.innerHTML);
    // katex.render(text, resultDiv, {
    //     throwOnError: false,
    // })
    console.log(resultDiv.innerHTML);
    // let URL = `https://www.google.com/search?q=${finalText}`
    // window.open(URL,"_blank");

}