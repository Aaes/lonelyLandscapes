const start = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");

  // choose some colors
  const skyColorLight = "blue";
  const skyColorDark = "grey";

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
  const hillGradient = ctx.createLinearGradient(width / 2, 0, width / 2, width);
  hillGradient.addColorStop(0, "red");
  hillGradient.addColorStop(1, "darkgrey");

  const amplitude = 5;
  const offsetY = 200;
  const offsetX = 0;
  const waveLength = 1 / 16;
  drawFunctionPolygon(
    0,
    width,
    height / 1.5,
    (x) => amplitude * Math.cos(x * waveLength + offsetX) + offsetY,
    ctx,
    hillGradient
  );
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

document.addEventListener("DOMContentLoaded", start);
