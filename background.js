chrome.runtime.onInstalled.addListener(async function (event) {
    if (event.reason === "install") {
        let urls = [];

        // Initialize data
        chrome.storage.sync.set(urls);
    } else if (event.reason === "update") {}
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.action === "addUrl") {
        console.log(sender)
        sendResponse({ message: "OK" });
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {

});