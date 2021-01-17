function polar(r, deg, p) {
    var x = 50 + r * Math.cos(deg * Math.PI / 180);
    var y = 50 - r * Math.sin(deg * Math.PI / 180);
    if (p) {
        var dp = Math.pow(10, p);
        return Math.round(dp * x) / dp + "," + Math.round(dp * y) / dp;
    }
    return x + " " + y;
}

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

function polarectset(r1, r2, deg1, deg2, n, p) {
    for (var i = 0; i < n; i++) {
        var d1 = (deg2 - deg1) * i / n;
        var d2 = (deg2 - deg1) * (i + 1) / n;
        var polygon = polararc(r1, r2, deg1 + d1, deg1 + d2, p); /* or polarect */
        console.log(polygon);
        document.documentElement.innerHTML += polygon;
    }
}

console.log("Ability");
polarectset(10, 20, 54, 126, 1, 6);
polarectset(20, 30, 54, 126, 3, 6);
polarectset(30, 40, 54, 126, 3, 6);
polarectset(40, 50, 54, 126, 3, 6);

console.log("Attack");
polarectset(10, 20, 126, 198, 1, 6);
polarectset(20, 30, 126, 198, 3, 6);
polarectset(30, 40, 126, 198, 5, 6);
polarectset(40, 50, 126, 198, 5, 6);

console.log("Move");
polarectset(10, 20, 198, 270, 1, 6);
polarectset(20, 30, 198, 270, 3, 6);
polarectset(30, 40, 198, 270, 4, 6);
polarectset(40, 50, 198, 270, 5, 6);

console.log("Health");
polarectset(10, 20, 270, 342, 1, 6);
polarectset(20, 30, 270, 342, 3, 6);
polarectset(30, 40, 270, 342, 5, 6);
polarectset(40, 50, 270, 342, 5, 6);

console.log("Energy");
polarectset(10, 20, 342, 414, 1, 6);
polarectset(20, 30, 342, 414, 3, 6);
polarectset(30, 40, 342, 414, 5, 6);
polarectset(40, 50, 342, 414, 5, 6);

console.log("Marquee");
polarectset(0, 10, 15, 375, 12, 6);
