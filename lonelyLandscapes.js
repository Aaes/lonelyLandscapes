var start = function () {
    var canvas = document.getElementById("canvas");
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    var skyColor = getRandomColor();
    var skyColorLight = skyColor;
    var skyColorDark = shadeColor(skyColor, -50);
    var hillColor = getRandomColor();
    var hillColorDark = shadeColor(hillColor, -30);
    var hillColorDarker = shadeColor(hillColor, -90);
    var colorSwatches = document.querySelectorAll("#colors div");
    colorSwatches[0].style.backgroundColor = skyColorLight;
    colorSwatches[1].style.backgroundColor = skyColorDark;
    colorSwatches[2].style.backgroundColor = hillColor;
    colorSwatches[3].style.backgroundColor = hillColorDark;
    colorSwatches[4].style.backgroundColor = hillColorDarker;
    var region = new Path2D();
    region.arc(width / 2, height / 3, 160, 0, Math.PI * 2);
    ctx.clip(region);
    var skyGradient = ctx.createLinearGradient(width / 2, 0, width / 2, width);
    skyGradient.addColorStop(0, skyColorLight);
    skyGradient.addColorStop(1, skyColorDark);
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, width);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "black";
    ctx.strokeStyle = skyGradient;
    ctx.beginPath();
    ctx.arc(width / 2, height / 3, 159, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    var starCount = 250;
    for (var index = 0; index < starCount; index++) {
        var coords = {
            x: Math.random() * width,
            y: Math.random() * height,
        };
        ctx.fillStyle = "white";
        ctx.fillRect(coords.x, coords.y, 1, 1);
    }
    drawHill(ctx, 200, hillColor, hillColor, width, height);
    drawHill(ctx, 260, hillColor, hillColorDarker, width, height);
};
var drawHill = function (ctx, offset, color, colorLight, width, height) {
    var hillGradient = ctx.createLinearGradient(width / 2, 200, width / 2, width);
    hillGradient.addColorStop(0, color);
    hillGradient.addColorStop(1, colorLight);
    var amplitude = 5;
    var offsetX = 0;
    var waveLength = 1 / Math.floor(Math.random() * (24 - 16 + 1) + 16);
    var drawFunction = function (x) {
        return amplitude * Math.cos(x * waveLength + offsetX) + offset;
    };
    drawFunctionPolygon(0, width, height / 1.6, drawFunction, ctx, hillGradient);
};
var drawFunctionPolygon = function (startX, endX, height, lineFunction, ctx, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(startX, lineFunction(startX));
    for (var x = startX + 1; x <= endX; x++) {
        ctx.lineTo(x, lineFunction(x));
    }
    ctx.lineTo(endX, height);
    ctx.lineTo(startX, height);
    ctx.closePath();
    ctx.fill();
};
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);
    R = Math.round((R * (100 + percent)) / 100);
    G = Math.round((G * (100 + percent)) / 100);
    B = Math.round((B * (100 + percent)) / 100);
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);
    return "#" + RR + GG + BB;
}
document.addEventListener("DOMContentLoaded", start);
//# sourceMappingURL=lonelyLandscapes.js.map