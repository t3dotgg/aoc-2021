export const aaaaa = "";

const input = (await Deno.readTextFile("./input.txt"))
  .replace("target area: x=", "")
  .split(", y=")
  .map((p) => p.split("..").map((q) => parseInt(q, 10)));

console.log(input);

const [[xMin, xMax], [yMin, yMax]] = input;

const validCoords: [number, number][] = [];

let x = 0;
while (x < xMax * 2) {
  let y = -xMax;
  while (y < xMax * 10) {
    let [cx, cy] = [0, 0];
    let vx = x;
    let vy = y;
    let hitsTarget = false;

    while (cx < xMax && cy > yMin) {
      cx += vx;
      cy += vy;

      if (xMin <= cx && cx <= xMax && yMin <= cy && cy <= yMax) {
        console.log("target hit", x, y);
        if (hitsTarget === false) {
          hitsTarget = true;
          validCoords.push([x, y]);
        }
      }

      if (vx > 0) vx--;
      vy--;
    }

    y++;
  }
  x++;
}

console.log(validCoords.length);
