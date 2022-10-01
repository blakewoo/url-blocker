window.onload = async function () {
    const $toggle = document.querySelector(".toggleSwitch");
    const selected = document.getElementById("settingSelect");
    let targetUrls = []

    let checkedResult = (await findAll(["onOffType"])).onOffType
    if (checkedResult === true) {
        document.getElementsByClassName("toggleSwitch")[0].checked = true;
        document.getElementsByClassName("toggleSwitch")[0].classList.add("active")
    }
    else {
        document.getElementsByClassName("toggleSwitch")[0].checked = false;
    }

    let blockedType =  (await findAll(["alertType"])).alertType
    let seletedBox = document.getElementById("settingSelect")

    if(blockedType==="alert") {
        seletedBox.value= "block"
    }
    else if(blockedType==="redirect") {
        seletedBox.value= "redirect"
    }
    else {
        seletedBox.value= "remove"
    }

    $toggle.onclick = () => {
        $toggle.classList.toggle('active');
    }

    selected.addEventListener("change",async function (event) {
        if(event.currentTarget.value === "block") {
            await setStorageData({alertType:"alert"})
        }
        else if(event.currentTarget.value === "redirect") {
            await setStorageData({alertType:"redirect"})
        }
        else {
            await setStorageData({alertType:"block"})
        }
    })

    document.getElementsByClassName("toggleSwitch")[0].addEventListener("click",async function (event) {
        if(event.currentTarget.checked) {
            await setStorageData({onOffType:false})
        }
        else {
            await setStorageData({onOffType:true})
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


    document.getElementById("urlInputTextbox").addEventListener("keyup",function (event) {
        if (event.key === "Enter") {
            document.getElementById("urlInputButton").click()
        }
    })

    document.getElementById("urlInputButton").addEventListener('click', async function (e) {
        let urlListDiv = document.getElementsByClassName("url-list")[0]
        let addUrl = document.getElementById("urlInputTextbox").value

        urlListDiv.innerHTML += "<div><label>"+addUrl+"</label><label class='urlDeleteButton'>X</label></div>"
        closeButtonEventBinder()
        targetUrls.push(addUrl)
        await setStorageData({urls:targetUrls})
        document.getElementById("urlInputTextbox").value = ""
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
                    targetUrls.splice(i,1)
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
