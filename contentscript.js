(async function () {
    let onOffFlag = (await findAll(["onOffType"])).onOffType
    let alertFlag = (await findAll(["alertType"])).alertType

    // on/off 설정 넣을것
    if(onOffFlag) {
        if(alertFlag === "alert") {
            chrome.runtime.sendMessage({ action: "popup check" },async function () {
                let target = location.host
                let filter = (await findAll(["urls"])).urls
                for(let i=0;i<filter.length ;i++) {
                    if(target === filter[i]) {

                        chrome.tabs.query({active: true}, function(tabs){
                            chrome.action.getPopup(tabs[0].id,function(){
                                
                            })
                        })

                        // 순수 리다이렉트
                        location.href = "https://google.com"
                        // 알림 이후 리다이렉트


                        break;
                    }
                }
            })
        }
    }

})()

async function findAll(itemList) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(itemList, function (data) { resolve(data); })
    })
}