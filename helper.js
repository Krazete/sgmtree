function polar(r, deg, p) {
    var x = 50 + r * Math.cos(deg * Math.PI / 180);
    var y = 50 - r * Math.sin(deg * Math.PI / 180);
    if (p) {
        var dp = Math.pow(10, p);
        return Math.round(dp * x) / dp + "," + Math.round(dp * y) / dp;
    }
    return x + " " + y;
}

/* Node Areas */

function polarect(r1, r2, deg1, deg2, p) {
    var points = [
        polar(r1, deg1, p),
        polar(r2, deg1, p),
        polar(r2, deg2, p),
        polar(r1, deg2, p)
    ];
    return "<polygon points=\"" + points.join(" ") + "\" />";
}

function polararc(r1, r2, deg1, deg2, p) {
    var points = [
        polar(r1, deg1, p),
        polar(r2, deg1, p),
        polar(r2, deg2, p),
        polar(r1, deg2, p)
    ];
    return [
        "<path d=\"M" + points[0],
        "L" + points[1],
        "A" + r2 + "," + r2 + ",0,0,0," + points[2],
        "L" + points[3],
        "A" + r1 + "," + r1 + ",0,0,1," + points[0] + "\" />"
    ].join(" ");
}

function polararcset(r1, r2, deg1, deg2, n, p) {
    for (var i = 0; i < n; i++) {
        var d1 = (deg2 - deg1) * i / n;
        var d2 = (deg2 - deg1) * (i + 1) / n;
        var polygon = polararc(r1, r2, deg1 + d1, deg1 + d2, p); /* or polarect */
        console.log(polygon);
        // document.documentElement.innerHTML += polygon;
    }
}

console.log("Ability");
polararcset(10, 20, 54, 126, 1, 6);
polararcset(20, 30, 54, 126, 3, 6);
polararcset(30, 40, 54, 126, 3, 6);
polararcset(40, 50, 54, 126, 3, 6);

console.log("Attack");
polararcset(10, 20, 126, 198, 1, 6);
polararcset(20, 30, 126, 198, 3, 6);
polararcset(30, 40, 126, 198, 5, 6);
polararcset(40, 50, 126, 198, 5, 6);

console.log("Move");
polararcset(10, 20, 198, 270, 1, 6);
polararcset(20, 30, 198, 270, 3, 6);
polararcset(30, 40, 198, 270, 4, 6);
polararcset(40, 50, 198, 270, 5, 6);

console.log("Health");
polararcset(10, 20, 270, 342, 1, 6);
polararcset(20, 30, 270, 342, 3, 6);
polararcset(30, 40, 270, 342, 5, 6);
polararcset(40, 50, 270, 342, 5, 6);

console.log("Energy");
polararcset(10, 20, 342, 414, 1, 6);
polararcset(20, 30, 342, 414, 3, 6);
polararcset(30, 40, 342, 414, 5, 6);
polararcset(40, 50, 342, 414, 5, 6);

console.log("Marquee");
polararcset(0, 10, 15, 375, 12, 6);

/* Node Images */

function polarimg(r, deg, p) {
    var point = polar(r, deg, p);
    var xy = point.split(",");
    var x = xy[0];
    var y = xy[1];
    return "<image href=\"unused/SkillTreeNode-Super.png\" x=\"" + x+ "\" y=\"" + y + "\" transform=\"translate(-5,-5)\" />";
}

function polarimgset(r, deg1, deg2, n, p) {
    for (var i = 0; i < n; i++) {
        var d = (deg2 - deg1) * (i + 0.5) / n;
        var img = polarimg(r, deg1 + d, p);
        console.log(img);
        // document.documentElement.innerHTML += img;
    }
}

console.log("Ability");
polarimgset(15, 54, 126, 1, 6);
polarimgset(25, 54, 126, 3, 6);
polarimgset(35, 54, 126, 3, 6);
polarimgset(45, 54, 126, 3, 6);

console.log("Attack");
polarimgset(15, 126, 198, 1, 6);
polarimgset(25, 126, 198, 3, 6);
polarimgset(35, 126, 198, 5, 6);
polarimgset(45, 126, 198, 5, 6);

console.log("Move");
polarimgset(15, 198, 270, 1, 6);
polarimgset(25, 198, 270, 3, 6);
polarimgset(35, 198, 270, 4, 6);
polarimgset(45, 198, 270, 5, 6);

console.log("Health");
polarimgset(15, 270, 342, 1, 6);
polarimgset(25, 270, 342, 3, 6);
polarimgset(35, 270, 342, 5, 6);
polarimgset(45, 270, 342, 5, 6);

console.log("Energy");
polarimgset(15, 342, 414, 1, 6);
polarimgset(25, 342, 414, 3, 6);
polarimgset(35, 342, 414, 5, 6);
polarimgset(45, 342, 414, 5, 6);
