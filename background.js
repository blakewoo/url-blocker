chrome.runtime.onInstalled.addListener(async function (event) {
    if (event.reason === "install") {
        // Initialize data
        chrome.storage.local.set({urls:[]});
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