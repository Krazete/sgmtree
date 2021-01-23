var m;
var radioZ = document.getElementById("z");
var radioB = document.getElementById("b");
var radioS = document.getElementById("s");
var radioG = document.getElementById("g");
var radioD = document.getElementById("d");

var dual = false;
var dualElements = document.getElementsByClassName("dual");
var dualButton = document.getElementById("dual-button");
var tree0 = {
    "msg": {},
    "sp": 0,
    "cc": 0,
    "th": 0,
    "spElement": document.getElementById("sp0"),
    "ccElement": document.getElementById("cc0"),
    "thElement": document.getElementById("th0")
};
var tree1 = {
    "msg": {},
    "sp": 0,
    "cc": 0,
    "th": 0,
    "spElement": document.getElementById("sp1"),
    "ccElement": document.getElementById("cc1"),
    "thElement": document.getElementById("th1")
};
var dtree = {
    "spElement": document.getElementById("dsp"),
    "ccElement": document.getElementById("dcc"),
    "thElement": document.getElementById("dth")
};
var theoniteElements = document.getElementsByClassName("theonite");

function toggleDual() {
    if (dual) {
        for (var i = 0; i < dualElements.length; i++) {
            dualElements[i].classList.add("hidden");
        }
        dualButton.innerHTML = "Show";
        dual = false;
    }
    else {
        for (var i = 0; i < dualElements.length; i++) {
            dualElements[i].classList.remove("hidden");
        }
        dualButton.innerHTML = "Hide";
        dual = true;
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
    return total + Math.ceil(m * n);
}

function updateElements(tree) {
    tree.spElement.innerHTML = tree.sp.toLocaleString();
    tree.ccElement.innerHTML = tree.cc.toLocaleString();
    tree.thElement.innerHTML = tree.cc.toLocaleString();
    if (isNaN(tree.th)) {
        tree.thElement.parentElement.classList.add("hidden");
    }
    else {
        tree.thElement.parentElement.classList.remove("hidden");
    }
}

function setCost(tree) {
    if (tree.msg.data) {
        tree.sp = tree.msg.data.sp.reduce(msum, 0);
        tree.cc = tree.msg.data.cc.reduce(msum, 0);
        tree.th = tree.msg.data.th.reduce(msum, 0);
        updateElements(tree);
    }
}

function setDifference() {
    dtree.sp = tree1.sp - tree0.sp;
    dtree.cc = tree1.cc - tree0.cc;
    dtree.th = tree1.th - tree0.th;
    updateElements(dtree);
}

function onMessage(msg) {
    /* if (msg.origin == "https://krazete.github.io") { */
    if (msg.origin == window.origin) {
        var id = msg.source.frameElement.id;
        if (id == "svg0") {
            tree0.msg = msg;
            setCost(tree0);
        }
        else if (id == "svg1") {
            tree1.msg = msg;
            setCost(tree1);
        }
        setDifference();
    }
}

radioZ.addEventListener("input", setMultiplier);
radioB.addEventListener("input", setMultiplier);
radioS.addEventListener("input", setMultiplier);
radioG.addEventListener("input", setMultiplier);
radioD.addEventListener("input", setMultiplier);

dualButton.addEventListener("click", toggleDual);

window.addEventListener("load", setMultiplier);
window.addEventListener("message", onMessage);
