window.onload = async function () {
    const $toggle = document.querySelector(".toggleSwitch");
    const addUrl = document.getElementById("urlInputButton");
    let targetUrls = []

    $toggle.onclick = () => {
        $toggle.classList.toggle('active');
    }

    targetUrls = (await findAll(["urls"])).urls

    let urlListDiv = document.getElementsByClassName("url-list")[0]
    let tempHtml = ""
    for(let i=0;i<targetUrls.length;i++) {
        tempHtml += "<div><label>"+targetUrls[i]+"</label><label class='urlDeleteButton'>X</label></div>"
    }
    urlListDiv.innerHTML += tempHtml

    addUrl.addEventListener('click', async function (e) {
        let urlListDiv = document.getElementsByClassName("url-list")[0]
        let addUrl = document.getElementById("urlInputTextbox").value

        urlListDiv.innerHTML += "<div><label>"+addUrl+"</label><label class='urlDeleteButton'>X</label></div>"

        targetUrls.push(addUrl)
        await setStorageData({urls:targetUrls})
    });
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