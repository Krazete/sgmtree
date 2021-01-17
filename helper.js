function polar(r, deg, p) {
    var x = 50 + r * Math.cos(deg * Math.PI / 180);
    var y = 50 - r * Math.sin(deg * Math.PI / 180);
    if (p) {
        var dp = Math.pow(10, p);
        return Math.round(dp * x) / dp + "," + Math.round(dp * y) / dp;
    }
    return x + "," + y;
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
