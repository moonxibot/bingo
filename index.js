//기본 함수
const openPopup = (title, content) => {
    document.getElementById("popupBlack").hidden = false;
    document.getElementById("popup").hidden = false;
    document.getElementById("popupTitle").innerText = title;
    document.getElementById("popupContent").innerText = content;
}
const closePopup = () => {
    document.getElementById("popupBlack").hidden = true;
    document.getElementById("popup").hidden = true;
}
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function select(num) {
    if (selected.includes(num) == false) {
        selected.push(num)
    }
    const element = document.getElementById(`bingo${num}`)
    element.style.backgroundColor = "#ff75d3";
    element.style.color = "white";
    setTimeout(() => {
        element.style.backgroundColor = "#7591ff";
    }, 1000)
}

//빙고카드 제작
let obj;
const bingo = document.getElementById("bingo")
for (let i=1; i<=25; i++) {
    obj = document.createElement("div")
    obj.setAttribute("id", `bingo${i}`)
    obj.setAttribute("class", "bingo")
    obj.innerText = i+10
    bingo.appendChild(obj)

    //<br>
    if (i % 5 == 0) {
        bingo.appendChild(document.createElement("br"))
    }
}

//빙고 알고리즘
let did = 0
let selected = []
function algo(num) {
    const addDiv = document.getElementById("addDiv")
    addDiv.hidden = true;

    for (let i=0; i<num; i++) {
        setTimeout(() => {
            if (selected.length == 0) {
                select(random(1, 25))
            } else if (selected.length < 10) {
                if (random(1, parseInt(selected.length/4)) == 1) {
                    select(random(1, 25))
                } else {
                    select(selected[random(0, selected.length-1)])
                }
            } else {
                if (random(1, parseInt(selected.length/5)) == 1) {
                    select(random(1, 25))
                } else {
                    select(selected[random(0, selected.length-1)])
                }
            }

            if (selected.length < 25) {
                did++
            }
            if (selected.length == 25) {
                openPopup("축하합니다!", `당신은 ${did}번에 걸쳐 빙고를 완료하였습니다.\n기록을 공유해보세요!`)
            }
            if (did == 100) {
                document.getElementById("go50").hidden = false;
                openPopup("빙고가 너무 어렵죠?", "50개 뽑기 옵션이 생성되었습니다.\n지금 바로 사용해보세요!")
            }
        }, i * 300)
    }
    setTimeout(() => {
        addDiv.hidden = false;
    }, num * 300)
}
