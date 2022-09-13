window.onload = async function () {
    const $toggle = document.querySelector(".toggleSwitch");
    const addUrl = document.getElementById("urlInputButton");
    let targetUrls = []

    let checkedResult = (await findAll(["onOffType"])).onOffType
    if (checkedResult) {
        document.getElementsByClassName("toggleSwitch")[0].checked = true;
        document.getElementsByClassName("toggleSwitch")[0].classList.add("active")
    }
    else {
        document.getElementsByClassName("toggleSwitch")[0].checked = false;
        document.getElementsByClassName("toggleSwitch")[0].classList.remove("active")
    }


    $toggle.onclick = () => {
        $toggle.classList.toggle('active');
    }

    document.getElementById("onOffSwitch").addEventListener("click",async function (event) {
        if(event.currentTarget.checked) {
            await setStorageData({onOffType:true})
        }
        else {
            await setStorageData({onOffType:false})
        }
    })

    targetUrls = (await findAll(["urls"])).urls

    let urlListDiv = document.getElementsByClassName("url-list")[0]
    let tempHtml = ""
    for(let i=0;i<targetUrls.length;i++) {
        tempHtml += "<div><label>"+targetUrls[i]+"</label><label class='urlDeleteButton'>X</label></div>"
    }
    urlListDiv.innerHTML += tempHtml
    closeButtonEventBinder()


    addUrl.addEventListener('click', async function (e) {
        let urlListDiv = document.getElementsByClassName("url-list")[0]
        let addUrl = document.getElementById("urlInputTextbox").value

        urlListDiv.innerHTML += "<div><label>"+addUrl+"</label><label class='urlDeleteButton'>X</label></div>"
        closeButtonEventBinder()
        targetUrls.push(addUrl)
        await setStorageData({urls:targetUrls})
    });

    function closeButtonEventBinder() {
        let closedButtonList = document.getElementsByClassName("urlDeleteButton")
        for(let i=0;i<closedButtonList.length;i++) {
            closedButtonList[i].removeEventListener("click",closeButtonEvent)
            closedButtonList[i].addEventListener("click",closeButtonEvent)
        }
    }

    async function closeButtonEvent(event) {
        let target = event.currentTarget
        let targetParent = target.parentNode;
        let targetURL= targetParent.querySelector("label")

        for(let i=0;i<targetUrls.length;i++) {
            if(targetUrls[i] === targetURL.innerText) {
                if(targetUrls.length === 1) {
                    targetUrls=[]
                }
                else {
                    targetUrls = targetUrls.splice(i, 1)
                }
                targetParent.remove();
                break;
            }
        }

        await setStorageData({urls:targetUrls})
    }
}



async function setStorageData(value) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.set(value, function () { resolve(); })
    })
}

async function findAll(itemList) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(itemList, function (data) { resolve(data); })
    })
}
