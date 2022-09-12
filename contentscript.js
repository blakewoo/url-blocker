(async function () {
    let onOffFlag = (await findAll(["onOffType"])).onOffType
    let alertFlag = (await findAll(["alertType"])).alertType

    // on/off 설정 넣을것
    if(onOffFlag) {
        if(alertFlag === "alert") {
            let target = location.host
            let filter = (await findAll(["urls"])).urls
            for(let i=0;i<filter.length ;i++) {
                if(target === filter[i]) {
                    chrome.scripting.executeScript(
                        {
                            target: {tabId: tabId},
                            func: deleteAllPage
                        },
                        () => {});
                    break;
                }
            }
        }
        else {
            // 순수 리다이렉트
            location.href = "https://google.com"
        }
    }

})()

async function findAll(itemList) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(itemList, function (data) { resolve(data); })
    })
}

function deleteAllPage() {
    let insertionHtml = "<div id=\"contents_div\" style=\"display: none\">\n" +
        "     <div class=\"alarm-icon\">\n" +
        "         <img class=\"shark-icon\" src=\"img/icon.png\">\n" +
        "     </div>\n" +
        "\n" +
        "     <div class=\"font-background\">\n" +
        "         <h1>\n" +
        "             Attention!\n" +
        "         </h1>\n" +
        "         <h2>\n" +
        "             You really want to enter this website?\n" +
        "         </h2>\n" +
        "         <span>\n" +
        "         <input class=\"public-button\" id=\"yes_button\" type=\"button\" value=\"Of course! I will trash my plan\">\n" +
        "         <input class=\"public-button marginTop_8px\" id=\"no_button\" type=\"button\" value=\"No, It just mistake\">\n" +
        "     </span>\n" +
        "     </div>\n" +
        "\n" +
        "     <br>\n" +
        "     <a style=\"font-size:4pt\" href=\"https://www.flaticon.com/kr/free-icons/\" title=\"상어 아이콘\">상어 아이콘  제작자: Freepik - Flaticon</a>\n" +
        " </div>"
        let parent = document.getElementsByTagName("body");
        parent.innerHtml += insertionHtml;
}