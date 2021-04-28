const bingonum = 5; //row and column
let ticket = 0;
let stage = 0;
const pattern = [
    [
        {len: 10, choice: 5},
        {len: 17, choice: 27},
        {len: 24, choice: 40},
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
    }
};

//select:object has many objects with selecting.
const select = {
    selected: [],
    select: {
        new: () => {
            if (select.selected.length >= bingonum * bingonum - 1) {
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
                const num = random.random(0, select.selected.length-1);
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
        //천장 확인
        if (ticket > 500) {
            select.select.new()
            return true;
        }

        const len = select.selected.length

        for (let i in pattern[stage]) {
            if (len < pattern[stage][i]["len"]) {
                if (random.choice(pattern[stage][i]["choice"])) {
                    select.select.new()
                } else {
                    select.select.prev()
                }
                return true;
            }
        }

        //pattern에 해당되지 않을 경우 매우 희박한 확률:
        if (random.choice(50) && ticket >= 300) {
            select.select.new()
        } else {
            select.select.prev()
        };
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
    const btnDiv = document.getElementById("btnDiv")
    btnDiv.hidden = true;

    for (let i=0; i<num; i++) {
        setTimeout(() => {
            ticket++

            //30개 버튼 오픈?
            if (ticket == 100) {
                document.getElementById("go30").hidden = false;
                popup.open("서프라이즈!", "100개의 빙고 티켓을 사용하셨어요.<br>보상으로 30개 뽑기 버튼을 드릴게요!");
            }

            select.run()
        }, i * 300)
    }

    setTimeout(() => {
        btnDiv.hidden = false;
    }, num * 300)
}