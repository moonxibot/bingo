const bingonum = 5; //row and column
let ticket = 0;
let stage = 0;
const pattern = [
    [
        {len: 10, choice: 5},
        {len: 20, choice: 25},
        {len: 24, choice: 35},
    ]
]

// random:object has many functions about random
const random = {
    random: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    choice: (choice) => {
        return (random.random(1, choice) == 1) ? true : false
    }
};

// popup:object has many functions about popup.
const popup = {
    open: (title, content) => {
        document.getElementById("pop").hidden = false;
        document.getElementById("poptitle").innerText = title; 
        document.getElementById("popcontent").innerHTML = content;
    },
    close: () => {
        document.getElementById("pop").hidden = true;
    },
    done: () => {
        const num = ticket;
        popup.open("축하드립니다!", `당신은 ${num}번의 시도 끝에 완료하였습니다!<br>기록을 공유해보세요 :)`);
        document.getElementById("btnDiv").hidden = true;
    }
};

//select:object has many objects with selecting.
const select = {
    selected: [],
    select: {
        new: () => {
            if (select.selected.length > bingonum * bingonum - 1) {
                return undefined
            } else {
                let value = random.random(0, bingonum * bingonum - 1);
                while (select.selected.includes(value)) {
                    value = random.random(0, bingonum * bingonum - 1);
                }
                select.select.color(value);
                select.selected.push(value);
                return value;
            }
        },
        prev: () => {
            if (select.selected.length == 0) {
                select.select.new()
            } 
            else {
                const num = select.selected[random.random(0, select.selected.length-1)]
                select.select.color(num)
                return select.selected[num]
            }
        },
        color: (num) => {
            const el = document.getElementById(`bingo${num}`);
            el.style.fontWeight = 550;
            el.style.backgroundColor = "#fc6603";
            el.style.color = "white";
            
            setTimeout(() => {
                el.style.backgroundColor = "#ffbb45";
                el.style.color = "#70521d";
            }, 500)
        }
    },
    run: () => {
        const len = select.selected.length

        //천장 확인
        if (ticket >= 700) {
            popup.done()
            return true;
        }

        //빙고판 달성했는지 확인
        if (select.selected.length == bingonum * bingonum) {
            popup.done()
            return true;

        }

        for (let i in pattern[stage]) {
            if (len <= pattern[stage][i]["len"]) {
                if (random.choice(pattern[stage][i]["choice"])) {
                    select.select.new()
                } else {
                    select.select.prev()
                }
                return true;
            }
        }

        //마지막 1개
        if (ticket >= 500 && random.choice(50)) {
            select.select.new()
        } else {
            select.select.prev()
        }
        return true;
    }
};

//set #bingo
const bingo = document.getElementById("bingo");
for (let row = 0; row < bingonum; row++) {
    for (let col = 0; col < bingonum; col++) {
        const el = document.createElement("div");
        el.setAttribute("id", `bingo${row * 5 + col}`);
        el.setAttribute("class", "bingo");
        el.innerText = (row * 5) + (col + 1) + 10;
        bingo.appendChild(el);
    }
    bingo.appendChild(document.createElement("br"));
}

//<<runevent> function = event when btn clicked
function runevent(num) {
    const btnDiv = document.getElementById("btnDiv");
    const ms = 300
    ticket += num

    btnDiv.hidden = true;

    for (let i=0; i<num; i++) {
        setTimeout(() => {
            //30개 버튼 오픈?
            if (ticket == 100) {
                document.getElementById("go30").hidden = false;
                popup.open("서프라이즈!", "100개의 빙고 티켓을 사용하셨어요.<br>보상으로 30개 뽑기 버튼을 드릴게요!");
            }

            select.run()
        }, i * ms)
    }

    setTimeout(() => {
        if (select.selected.length !== bingonum * bingonum) {
            btnDiv.hidden = false;
        }
    }, num * ms)
}