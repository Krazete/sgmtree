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
    "fs": 100,
    "at": 100,
    "hp": 100,
    "svg": document.getElementById("svg0"),
    "spElement": document.getElementById("sp0"),
    "ccElement": document.getElementById("cc0"),
    "thElement": document.getElementById("th0")
};
var tree1 = {
    "msg": {},
    "sp": 0,
    "cc": 0,
    "th": 0,
    "fs": 100,
    "at": 100,
    "hp": 100,
    "svg": document.getElementById("svg1"),
    "spElement": document.getElementById("sp1"),
    "ccElement": document.getElementById("cc1"),
    "thElement": document.getElementById("th1")
};
var dtree = {
    "spElement": document.getElementById("dsp"),
    "ccElement": document.getElementById("dcc"),
    "thElement": document.getElementById("dth")
};

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

function setCost(tree) {
    if (tree.msg.data) {
        tree.sp = tree.msg.data.sp.reduce(msum, 0);
        tree.cc = tree.msg.data.cc.reduce(msum, 0);
        tree.th = tree.msg.data.th.reduce(msum, 0);
        tree.fs = 100 + tree.msg.data.fs;
        tree.at = 100 + tree.msg.data.at;
        tree.hp = 100 + tree.msg.data.hp;
        tree.spElement.innerHTML = tree.sp.toLocaleString();
        tree.ccElement.innerHTML = tree.cc.toLocaleString();
        tree.thElement.innerHTML = tree.th.toLocaleString();
    }
}

function setDifference() {
    var dsp = tree1.sp - tree0.sp;
    var dcc = tree1.cc - tree0.cc;
    var dth = tree1.th - tree0.th;
    dtree.spElement.innerHTML = dsp.toLocaleString();
    dtree.ccElement.innerHTML = dcc.toLocaleString();
    dtree.thElement.innerHTML = dth.toLocaleString();
    if (isNaN(dth)) {
        tree0.thElement.parentElement.classList.add("hidden");
        tree1.thElement.parentElement.classList.add("hidden");
        dtree.thElement.parentElement.classList.add("hidden");
    }
    else {
        tree0.thElement.parentElement.classList.remove("hidden");
        tree1.thElement.parentElement.classList.remove("hidden");
        dtree.thElement.parentElement.classList.remove("hidden");
    }
}

function mandate(treeA, treeB, on) {
    if (!treeA.msg.data.mandated) {
        var docA = treeA.svg.getSVGDocument();
        var docB = treeB.svg.getSVGDocument();
        if (docA && docB) {
            var ids = [];
            var nodes = docA.getElementsByTagName("path");
            for (var node of nodes) {
                if (node.classList.contains("checked") == on) {
                    ids.push(node.id);
                }
            }
            var event = new CustomEvent("mandate", {"detail": {"ids": ids, "on": on}});
            docB.dispatchEvent(event);
        }
    }
}

function onMessage(msg) {
    /* if (msg.origin == "https://krazete.github.io") { */
    if (msg.origin == window.origin) {
        var id = msg.source.frameElement.id;
        if (id == "svg0") {
            tree0.msg = msg;
            setCost(tree0);
            mandate(tree0, tree1, true);
        }
        else if (id == "svg1") {
            tree1.msg = msg;
            setCost(tree1);
            mandate(tree1, tree0, false);
        }
        setDifference();
    }
}

function toggleDual() {
    if (dual) {
        for (var i = 0; i < dualElements.length; i++) {
            dualElements[i].classList.add("hidden");
        }
        dualButton.innerHTML = "Enable Initial Tree";
        dual = false;
    }
    else {
        for (var i = 0; i < dualElements.length; i++) {
            dualElements[i].classList.remove("hidden");
        }
        dualButton.innerHTML = "Disable Initial Tree";
        dual = true;
    }
}

tree0.svg.addEventListener("touchstart", function () {});
tree1.svg.addEventListener("touchstart", function () {});

radioZ.addEventListener("input", setMultiplier);
radioB.addEventListener("input", setMultiplier);
radioS.addEventListener("input", setMultiplier);
radioG.addEventListener("input", setMultiplier);
radioD.addEventListener("input", setMultiplier);

dualButton.addEventListener("click", toggleDual);

window.addEventListener("load", setMultiplier);
window.addEventListener("message", onMessage);
