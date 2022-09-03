window.onload = function () {
    const $toggle = document.querySelector(".toggleSwitch");

    $toggle.onclick = () => {
        $toggle.classList.toggle('active');
    }
}

