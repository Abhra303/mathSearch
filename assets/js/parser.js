import katex from "../../node_modules/katex/dist/katex.mjs";

function findWrappers(text, length=0) {
    let positions = [];
    // console.log("length is ",length);
    let index = text.indexOf("${");
    // console.log("the sliced text is ", text);
    if (index !== -1) {
        // we found a texWrapOpener
        // now find texWrapCloser
        // but also find if there is any other texWrapOpener before texWrapCloser
        // console.log("index is ", index);
        let textPortion = text.slice(index + 2);
        // console.log("textPortion is ", textPortion);
        let closerIndex = textPortion.indexOf("}$");
        // console.log("closerIndex is ", closerIndex);
        if (closerIndex !== -1 ) {
            closerIndex = index + closerIndex + 2;
            textPortion = text.slice(index + 2, closerIndex);
            // console.log("now the textPortion is ", textPortion);
            let searchBetween = textPortion.indexOf("${");
            // console.log("searchBetween is ", searchBetween);
            while (searchBetween !== -1) {
                index = searchBetween + index + 2;
                // console.log("index is ", index);
                textPortion = textPortion.slice(searchBetween + 2);
                // console.log("textPortion in this loop is ", textPortion);
                searchBetween = textPortion.indexOf("${");
                // console.log("searchBetween in this loop is ", searchBetween);
            }
            if (length > 0) {
                index += length;
                closerIndex += length;
            }
            let set = [index, closerIndex];
            positions.push(set);
            // console.log(positions);
            // console.log("now closeIndex is ", closerIndex);
            positions = positions.concat(findWrappers(text.slice((closerIndex - length) + 2), closerIndex + 2));
            // console.log(positions);
        }
    }
    return positions;
}


export default function parseToKatex(text) {
    let positions = findWrappers(text);
    let modifiedText = '';
    if (positions.length) {
        console.log("we are in the position.Positions are ", positions);
        positions.forEach((position, index) => {
            let katexExpression = text.slice(position[0] + 2, position[1]);
            // console.log("position[0] + 2 is ",position[0] + 2);
            // console.log("and position[1] - 1 is ", position[1]);
            // console.log("katexExpression is ", katexExpression);
            let katexText = katex.renderToString(katexExpression, {
                throwOnError: false,
            });
            if (index === 0) {
                modifiedText +=text.slice(0, position[0]);
            }
            modifiedText += katexText;
            if (positions[index + 1]) {
                let textPortion = text.slice(position[1] + 2, positions[index + 1][0]);
                if (textPortion) {
                    modifiedText += textPortion;
                }
            }
            else {
                modifiedText += text.slice(position[1] + 2);
            }
        });
        // console.log("modifiedText is ", modifiedText);
        return modifiedText;
    }
    else {
        return text;
    }

}