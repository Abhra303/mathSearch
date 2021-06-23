import katex from "../../node_modules/katex/dist/katex.mjs";

function findWrappers(text, length=0) {
    let positions = [];
    let index = text.indexOf("${");
    if (index !== -1) {
        // we found a texWrapOpener
        // now find texWrapCloser
        // but also find if there is any other texWrapOpener before texWrapCloser
        let textPortion = text.slice(index + 2);
        let closerIndex = textPortion.indexOf("}$");
        if (closerIndex !== -1 ) {
            closerIndex = index + closerIndex + 2;
            textPortion = text.slice(index + 2, closerIndex);
            let searchBetween = textPortion.indexOf("${");
            while (searchBetween !== -1) {
                index = searchBetween + index + 2;
                textPortion = textPortion.slice(searchBetween + 2);
                searchBetween = textPortion.indexOf("${");
            }
            if (length > 0) {
                index += length;
                closerIndex += length;
            }
            let set = [index, closerIndex];
            positions.push(set);
            positions = positions.concat(findWrappers(text.slice((closerIndex - length) + 2), closerIndex + 2));
        }
    }
    return positions;
}


export default function parseToKatex(text) {
    let positions = findWrappers(text);
    let modifiedText = '';
    if (positions.length) {
        positions.forEach((position, index) => {
            let katexExpression = text.slice(position[0] + 2, position[1]);
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
        return [modifiedText, positions];
    }
    else {
        return [text,positions];
    }

}