console.log("hello");
chrome.runtime.onMessage.addListener((request) => {
    if (request.todo === "searchedText") {
        console.log(request.searchingText , " and ", request.positions);
    }
});
// function search(searchedText) {
//     let 
// }