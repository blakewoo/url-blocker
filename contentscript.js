window.onload = async function () {
    let onOffFlag = (await findAll(["onOffType"])).onOffType
    let alertFlag = (await findAll(["alertType"])).alertType
    let annoyingSet = new Set()
    let prevNumber = 0

    // on/off 설정 넣을것
    if(onOffFlag) {
        if(alertFlag === "alert") {
            let target = location.host
            let filter = (await findAll(["urls"])).urls
            for(let i=0;i<filter.length ;i++) {
                if(target === filter[i]) {
                    repaintPage()
                    break;
                }
            }
        }
        else if(alertFlag === "redirect") {
            redirectPage();
        }
        else {
            // 페이지 차단
            deletePage()
        }
    }

    async function findAll(itemList) {
        return new Promise(function (resolve, reject) {
            chrome.storage.local.get(itemList, function (data) { resolve(data); })
        })
    }
    function redirectPage() {
        window.history.back()
    }
    function deletePage() {
        let parent = document.getElementsByTagName("body")[0];
        parent.innerHTML = ""
    }
    function repaintPage() {
        let style = "<style>"+
            ".url-list{\n" +
            "    width: 90%;\n" +
            "    height: 20%;\n" +
            "    overflow-y: scroll;\n" +
            "    overflow-x: auto;\n" +
            "}\n" +
            "\n" +
            ".parent_div{" +
            "position:relative"+
            "}"+
            "#contents_div{\n" +
            "    position:absolute;\n"+
            "    top:0;\n"+
            "    left:0;\n"+
            "    z-index: 10000 !important;\n"+
            "    height : 100%;\n"+
            "    width: 100%;\n" +
            "    background-color: white;\n"+
            "    align-content: center;\n" +
            "    overflow: hidden;\n"+
            "    padding-top: 300px;\n"+
            "}\n" +
            "\n" +
            ".font-background{\n" +
            "    margin-top: 10px;\n" +
            "    padding-bottom: 10px;\n" +
            "    background: white;\n" +
            "    border: dashed black 4px;\n" +
            "    text-align: center;\n" +
            "}\n" +
            "\n" +
            ".shark-icon{\n" +
            "    height: 80px;\n" +
            "    width: 80px;\n" +
            "    display: block;\n" +
            "    margin: 0px auto;\n" +
            "}\n" +
            "\n" +
            ".public-button{\n" +
            "    border: 1px black solid;\n" +
            "    font-weight: bold;\n" +
            "    font-size: 12px;\n" +
            "    background-color: white;\n" +
            "}\n" +
            "\n" +
            ".public-button:hover{\n" +
            "    cursor:pointer;\n" +
            "    background-color: black;\n" +
            "    color:white\n" +
            "}\n" +
            "\n" +
            ".marginTop_8px{\n" +
            "    margin-top: 8px;\n" +
            "}\n" +
            "\n" +
            ".toggleSwitch {\n" +
            "    width: 2rem;\n" +
            "    height: 1rem;\n" +
            "    display: block;\n" +
            "    position: relative;\n" +
            "    border-radius: 2rem;\n" +
            "    background-color: #fff;\n" +
            "    box-shadow: 0 0 1rem 3px rgba(0 0 0 / 15%);\n" +
            "    cursor: pointer;\n" +
            "}\n" +
            "\n" +
            "/* 토글 버튼 */\n" +
            ".toggleSwitch .toggleButton {\n" +
            "    /* 버튼은 토글보다 작아야함  */\n" +
            "    width: 1rem;\n" +
            "    height: 1rem;\n" +
            "    position: absolute;\n" +
            "    top: 50%;\n" +
            "    left: .1rem;\n" +
            "    transform: translateY(-50%);\n" +
            "    border-radius: 50%;\n" +
            "    background: #000000;\n" +
            "}\n" +
            "\n" +
            "/* 체크박스가 체크될 시 변경되는 요소 */\n" +
            "#toggle:checked ~ .toggleSwitch {\n" +
            "    background: #000000;\n" +
            "}\n" +
            "\n" +
            "#toggle:checked ~ .toggleSwitch .toggleButton {\n" +
            "    /* 100% -> 끝위치, 2.8rem -> 버튼 크기 */\n" +
            "    left: calc(100% - 1rem);\n" +
            "    background: #fff;\n" +
            "}\n" +
            "\n" +
            ".toggleSwitch, .toggleButton {\n" +
            "    transition: all 0.2s ease-in;\n" +
            "}\n" +
            "\n" +
            "/* checked 부분을 active란 클래스가 포함되어있는지 여부로 바꾸기 */\n" +
            ".toggleSwitch.active {\n" +
            "    background: #000000;\n" +
            "}\n" +
            "\n" +
            ".toggleSwitch.active .toggleButton {\n" +
            "    left: calc(100% - 1rem);\n" +
            "    background: #fff;\n" +
            "}\n" +
            "\n" +
            ".urlDeleteButton{\n" +
            "    float: right;\n" +
            "}\n" +
            ".urlDeleteButton:hover{\n" +
            "    cursor:pointer;\n" +
            "    font-weight: bold;\n" +
            "}" +"</style>"

        let insertionHtml = "<div id=\"contents_div\">\n" +
            "     <div class=\"alarm-icon\">\n" +
            "         <img class=\"shark-icon\" src=\"https://cdn-icons-png.flaticon.com/512/1922/1922881.png\">\n" +
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
        let parent = document.getElementsByTagName("body")[0];
        parent.innerHTML += style;
        parent.innerHTML += insertionHtml;

        document.getElementById("yes_button").addEventListener("click",function (event) {
            annoyingSet = new Set()
            annoyingRoutine()
        })

        document.getElementById("no_button").addEventListener("click",function (event) {
            window.history.back()
        })
    }


    function annoyingRoutine () {
        // something annoying logic
        generateRandomMap();
        mapEventBinder();
    }


    function mapEventBinder(){
        // button event binding
        let annoyingButtons = document.getElementsByClassName("annoyingButtonClass")
        for(let i=0;i<annoyingButtons.length;i++) {
            annoyingButtons[i].addEventListener("click",function (event) {

                annoyingSet.add(event.currentTarget.innerText)
                if((Number(event.currentTarget.innerText)-Number(prevNumber)) !== 1) {
                    prevNumber=0
                    annoyingRoutine ()
                }
                else {
                    event.currentTarget.style.color = "white"
                    event.currentTarget.style.backgroundColor = "black"
                    prevNumber = event.currentTarget.innerText
                }
                if(annoyingSet.size === 9) {
                    document.getElementById("contents_div").remove()
                }
            })
        }
    }

    function generateRandomMap() {
        let baseArray = [1,2,3,4,5,6,7,8,9]
        baseArray.sort(()=> Math.random() - 0.5)
        annoyingSet = new Set()

        let str = "<style>" +
            ".annoyingTable{" +
            "margin: auto" +
            "}" +
            ".annoyingButtonClass{" +
            "border: black 1px solid;" +
            "width: 40px;" +
            "height: 40px;" +
            "text-align: center;" +
            "}" +
            ".annoyingButtonClass:hover{" +
            "cursor:pointer;" +
            "background-color: #000000;" +
            "color:white;" +
            "}" +
            "</style>" +
            "<div style='width:150px;margin-left:calc(50% - 65px)'>If you really want to access this url, prove it by solving the problem below</div>" +
            "<div style='width:150px;margin-left:calc(50% - 65px)'>Click in numerical order</div>" +
            "<table class='annoyingTable'>" +
            "<tr><td class='annoyingButtonClass'>"+baseArray[0]+"</td><td class='annoyingButtonClass'>"+baseArray[1]+"</td><td class='annoyingButtonClass'>"+baseArray[2]+"</td></tr>" +
            "<tr><td class='annoyingButtonClass'>"+baseArray[3]+"</td><td class='annoyingButtonClass'>"+baseArray[4]+"</td><td class='annoyingButtonClass'>"+baseArray[5]+"</td></tr>" +
            "<tr><td class='annoyingButtonClass'>"+baseArray[6]+"</td><td class='annoyingButtonClass'>"+baseArray[7]+"</td><td class='annoyingButtonClass'>"+baseArray[8]+"</td></tr>" +
            "</table>"

        document.getElementById("contents_div").innerHTML = str
    }
}
