(async function () {

    // on/off 설정 넣을것

    let target = location.host
    let filter = (await findAll(["urls"])).urls
    for(let i=0;i<filter.length ;i++) {
        if(target === filter[i]) {
            // 순수 리다이렉트
            // location.href = "https://google.com"

            // 알림 이후 리다이렉트


            break;
        }
    }

})()

async function findAll(itemList) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(itemList, function (data) { resolve(data); })
    })
}