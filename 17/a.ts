export const aaaaa = "";

// const input = (await Deno.readTextFile("./input.txt"))
const input = (await Deno.readTextFile("./example.txt"))
  .replace("target area: x=", "")
  .split(", y=")
  .map((p) => p.split("..").map((q) => parseInt(q, 10)));

console.log(input);

const [[xMin, xMax], [yMin, yMax]] = input;

let highestY = -1;

let targetCount = 0;

let x = 0;
while (x < xMax) {
  let y = -xMax;
  while (y < xMax * 10) {
    let [cx, cy] = [0, 0];
    let vx = x;
    let vy = y;
    let currentMax = 0;
    let hitsTarget = false;

    while (cx < xMax && cy > yMin) {
      cx += vx;
      cy += vy;
      if (cy > currentMax) {
        currentMax = cy;
      }

      if (xMin <= cx && cx <= xMax && yMin <= cy && cy <= yMax) {
        highestY = currentMax;
        console.log("target hit", x, y);
        if (hitsTarget === false) {
          hitsTarget = true;
          targetCount++;
        }
      }

      if (vx > 0) vx--;
      vy--;
    }

    if (hitsTarget && currentMax > highestY) highestY = currentMax;
    y++;
  }
  x++;
}

console.log(highestY, targetCount);
