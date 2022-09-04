window.onload = function () {
    const $toggle = document.querySelector(".toggleSwitch");
    const addUrl = document.getElementById("urlInputButton");

    $toggle.onclick = () => {
        $toggle.classList.toggle('active');
    }

    addUrl.addEventListener('click', function (e) {
        let urlListDiv = document.getElementsByClassName("url-list")[0]
        let targetUrl = document.getElementById("urlInputTextbox").value

        urlListDiv.innerHTML += "<label>"+targetUrl+"<label><br>"

    });
}

