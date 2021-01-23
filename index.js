var m;
var radioZ = document.getElementById("z");
var radioB = document.getElementById("b");
var radioS = document.getElementById("s");
var radioG = document.getElementById("g");
var radioD = document.getElementById("d");
var t2f = false;
var t2s = document.getElementsByClassName("t2");
var t2b = document.getElementById("t2b");
var tree0 = {
    "msg": {},
    "sp": 0,
    "cc": 0,
    "spElement": document.getElementById("sp0"),
    "ccElement": document.getElementById("cc0")
};
var tree1 = {
    "msg": {},
    "sp": 0,
    "cc": 0,
    "spElement": document.getElementById("sp1"),
    "ccElement": document.getElementById("cc1")
};
var dsp = document.getElementById("dsp");
var dcc = document.getElementById("dcc");
function toggleT2() {
    for (var i = 0; i < t2s.length; i++) {
        if (t2f) {
            t2b.innerHTML = "Show";
            t2s[i].classList.add("hidden");
            t2f = false;
        }
        else {
            t2b.innerHTML = "Hide";
            t2s[i].classList.remove("hidden");
            t2f = true;
        }
    }
}
function setMultiplier() {
    if (radioB.checked) {
        m = 1;
    }
    else if (radioS.checked) {
        m = 2;
    }
    else if (radioG.checked) {
        m = 5;
    }
    else if (radioD.checked) {
        m = 10;
    }
    if (radioZ.checked) {
        m /= 2;
    }
    setCost(tree0);
    setCost(tree1);
    setDifference();
}
function msum(total, n) {
    return total + (isNaN(n) ? 0 : Math.ceil(m * n));
}
function setCost(tree) {
    if (tree.msg.data) {
        tree.sp = tree.msg.data.sp.reduce(msum, 0);
        tree.cc = tree.msg.data.cc.reduce(msum, 0);
        tree.spElement.innerHTML = tree.sp.toLocaleString();
        tree.ccElement.innerHTML = tree.cc.toLocaleString();
    }
}
function setDifference() {
    dsp.innerHTML = (tree1.sp - tree0.sp).toLocaleString();
    dcc.innerHTML = (tree1.cc - tree0.cc).toLocaleString();
}
function onMessage(msg) {
    console.log(msg.source.frameElement);
    /* if (msg.origin == "https://krazete.github.io") { */
    if (msg.origin == window.origin) {
        var id = msg.source.frameElement.id;
        if (id == "t0") {
            tree0.msg = msg;
            setCost(tree0);
        }
        else if (id == "t1") {
            tree1.msg = msg;
            setCost(tree1);
        }
        setDifference();
    }
}

t2b.addEventListener("click", toggleT2);
radioZ.addEventListener("input", setMultiplier);
radioB.addEventListener("input", setMultiplier);
radioS.addEventListener("input", setMultiplier);
radioG.addEventListener("input", setMultiplier);
radioD.addEventListener("input", setMultiplier);
window.addEventListener("load", setMultiplier);
window.addEventListener("message", onMessage);
