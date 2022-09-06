(async function () {

    let target = location.host
    let filter = (await findAll(["urls"])).urls
    

})()

async function findAll(itemList) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(itemList, function (data) { resolve(data); })
    })
}