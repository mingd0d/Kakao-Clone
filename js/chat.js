const msgForm = document.getElementById("message-form");
const msgInput = document.querySelector("#message-form input");
const msgList = document.getElementById("main-msgs");

const MSGS_KEY = "msgs";

let msgs = [];

function saveMsgs() {
    localStorage.setItem(MSGS_KEY, JSON.stringify(msgs));
}

function paintMsg(newMsg) {
    var now = new Date();
    var hr = ('0' + now.getHours()).slice(-2); 
    var min = ('0' + now.getMinutes()).slice(-2);

    const span1 = document.createElement("span");
    span1.className = "message__bubble";
    span1.innerText = newMsg.text;

    const span2 = document.createElement("span");
    span2.className = "message__time";
    span2.innerText = hr+":"+min;

    const divOut = document.createElement("div");
    divOut.className = "message-row__content";

    const divIn = document.createElement("div");
    divIn.className = "message__info";
    divIn.appendChild(span1);
    divIn.appendChild(span2);
    divOut.appendChild(divIn);

    const div = document.createElement("div");
    div.id = "message-row--own";
    div.className = "message-row message-row--own";
    div.appendChild(divOut);

    msgList.appendChild(div);
}

function handleMsgSubmit(event) {
    event.preventDefault();

    const newMsg = msgInput.value;
    msgInput.value = "";

    const newMsgObj = {
        text: newMsg,
        id: Date.now(),
    };

    msgs.push(newMsgObj);
    paintMsg(newMsgObj);
    saveMsgs();
}

msgForm.addEventListener("submit", handleMsgSubmit);

const savedMsgs = localStorage.getItem(MSGS_KEY);

if (savedMsgs !== null) {
    const parsedMsgs = JSON.parse(savedMsgs);
    msgs = parsedMsgs;
    parsedMsgs.forEach(paintMsg);
}