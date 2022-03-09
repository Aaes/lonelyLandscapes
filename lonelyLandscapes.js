var start = function () {
    var canvas = document.getElementById("canvas");
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    var skyColorLight = "blue";
    var skyColorDark = "grey";
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
    var hillGradient = ctx.createLinearGradient(width / 2, 0, width / 2, width);
    hillGradient.addColorStop(0, "red");
    hillGradient.addColorStop(1, "darkgrey");
    var amplitude = 5;
    var offsetY = 200;
    var offsetX = 0;
    var waveLength = 1 / 16;
    drawFunctionPolygon(0, width, height / 1.5, function (x) { return amplitude * Math.cos(x * waveLength + offsetX) + offsetY; }, ctx, hillGradient);
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
document.addEventListener("DOMContentLoaded", start);
//# sourceMappingURL=lonelyLandscapes.js.map