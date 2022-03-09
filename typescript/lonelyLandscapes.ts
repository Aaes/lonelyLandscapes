const start = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  // choose some colors
  const skyColor = getRandomColor();
  const skyColorLight = skyColor;
  const skyColorDark = shadeColor(skyColor, -50);

  const hillColor = getRandomColor();
  const hillColorDark = shadeColor(hillColor, -30);
  const hillColorDarker = shadeColor(hillColor, -90);

  const colorSwatches = document.querySelectorAll("#colors div");
  (colorSwatches[0] as HTMLDivElement).style.backgroundColor = skyColorLight;
  (colorSwatches[1] as HTMLDivElement).style.backgroundColor = skyColorDark;
  (colorSwatches[2] as HTMLDivElement).style.backgroundColor = hillColor;
  (colorSwatches[3] as HTMLDivElement).style.backgroundColor = hillColorDark;
  (colorSwatches[4] as HTMLDivElement).style.backgroundColor = hillColorDarker;

  // draw the circle cutout
  let region = new Path2D();
  region.arc(width / 2, height / 3, 160, 0, Math.PI * 2);
  ctx.clip(region);

  // draw the sky
  const skyGradient = ctx.createLinearGradient(width / 2, 0, width / 2, width);
  skyGradient.addColorStop(0, skyColorLight);
  skyGradient.addColorStop(1, skyColorDark);

  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, width, width);

  // draw the circle shadow
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 15;
  ctx.shadowColor = "black";

  ctx.strokeStyle = skyGradient;
  ctx.beginPath();
  ctx.arc(width / 2, height / 3, 159, 0, Math.PI * 2);
  ctx.stroke();

  ctx.shadowBlur = 0;

  // draw the stars
  const starCount = 250;
  for (let index = 0; index < starCount; index++) {
    const coords = {
      x: Math.random() * width,
      y: Math.random() * height,
    };

    ctx.fillStyle = "white";
    ctx.fillRect(coords.x, coords.y, 1, 1);
  }

  // optional: draw a moon

  // draw the hills
  drawHill(ctx, 200, hillColor, hillColor, width, height);
  drawHill(ctx, 260, hillColor, hillColorDarker, width, height);
};

const drawHill = (
  ctx: CanvasRenderingContext2D,
  offset: number,
  color: string,
  colorLight: string,
  width: number,
  height: number
) => {
  const hillGradient = ctx.createLinearGradient(
    width / 2,
    200,
    width / 2,
    width
  );
  hillGradient.addColorStop(0, color);
  hillGradient.addColorStop(1, colorLight);

  const amplitude = 5;
  const offsetX = 0;
  const waveLength = 1 / Math.floor(Math.random() * (24 - 16 + 1) + 16);
  const drawFunction = (x: number) =>
    amplitude * Math.cos(x * waveLength + offsetX) + offset;

  drawFunctionPolygon(0, width, height / 1.6, drawFunction, ctx, hillGradient);
};

const drawFunctionPolygon = (
  startX: number,
  endX: number,
  height: number,
  lineFunction: (x: number) => number,
  ctx: CanvasRenderingContext2D,
  color: string | CanvasGradient
) => {
  ctx.beginPath();
  ctx.fillStyle = color;

  ctx.moveTo(startX, lineFunction(startX));

  for (let x = startX + 1; x <= endX; x++) {
    ctx.lineTo(x, lineFunction(x));
  }

  ctx.lineTo(endX, height);
  ctx.lineTo(startX, height);
  ctx.closePath();
  ctx.fill();
};

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// from https://stackoverflow.com/a/13532993
function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.round((R * (100 + percent)) / 100);
  G = Math.round((G * (100 + percent)) / 100);
  B = Math.round((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  let RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  let GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  let BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

document.addEventListener("DOMContentLoaded", start);
