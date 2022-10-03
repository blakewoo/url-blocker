chrome.runtime.onInstalled.addListener(async function (event) {
    if (event.reason === "install") {
        // Initialize data
        chrome.storage.local.set({urls:[]});
        chrome.storage.local.set({onOffType:true});
        chrome.storage.local.set({alertType:"alert"});
    } else if (event.reason === "update") {}
});