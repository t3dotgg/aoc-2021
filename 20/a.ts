export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n\n");

console.log(lines);

const rule = lines.shift();

const gs = lines[0].split("\n").map((r) => r.split(""));

let mainGrid = new Map<string, string>();

let minY = Infinity;
let maxY = 0;
let minX = Infinity;
let maxX = 0;
gs.forEach((r, y) => {
  r.forEach((c, x) => {
    mainGrid.set(`${x},${y}`, c);

    if (c === "#") {
      if (x - 2 < minX) minX = x - 2;
      if (x + 2 > maxX) maxX = x + 2;
      if (y - 2 < minY) minY = y - 2;
      if (y + 2 > maxY) maxY = y + 2;
    }
  });
});

console.log(mainGrid);

let allOnes = false;
const getCharForGridSpace = (x: number, y: number) => {
  const point = `${x},${y}`;
  const c = mainGrid.get(point);

  if (c === undefined && allOnes && rule?.[0] === "#") return 1;

  return c === "#" ? 1 : 0;
};

for (let runs = 0; runs < 50; runs++) {
  const newGrid = new Map<string, string>();

  let newMinY = Infinity;
  let newMaxY = 0;
  let newMinX = Infinity;
  let newMaxX = 0;

  // console.log("\n\n", runs);
  for (let y = minY; y < maxY; y++) {
    let printable = "";
    for (let x = minX; x < maxX; x++) {
      const chars = [
        getCharForGridSpace(x - 1, y - 1),
        getCharForGridSpace(x, y - 1),
        getCharForGridSpace(x + 1, y - 1),
        getCharForGridSpace(x - 1, y),
        getCharForGridSpace(x, y),
        getCharForGridSpace(x + 1, y),
        getCharForGridSpace(x - 1, y + 1),
        getCharForGridSpace(x, y + 1),
        getCharForGridSpace(x + 1, y + 1),
      ].join("");

      const value = parseInt(chars, 2);

      const res = rule?.[value];
      printable += res;

      newGrid.set(`${x},${y}`, res ?? ".");

      if (res === "#") {
        if (x - 2 < newMinX) newMinX = x - 2;
        if (x + 2 > newMaxX) newMaxX = x + 2;
        if (y - 2 < newMinY) newMinY = y - 2;
        if (y + 2 > newMaxY) newMaxY = y + 2;
      }
    }
    // console.log(printable);
  }

  minX = newMinX;
  maxX = newMaxX;
  minY = newMinY;
  maxY = newMaxY;

  mainGrid = newGrid;

  allOnes = !allOnes;

  if (runs === 1) {
    let count = 0;

    mainGrid.forEach((v) => {
      if (v === "#") count++;
    });
    console.log("part 1", count);
  }
}

let count = 0;

mainGrid.forEach((v) => {
  if (v === "#") count++;
});

console.log("part 2", count);
