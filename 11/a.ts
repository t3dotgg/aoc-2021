export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

let lines = results
  .split("\n")
  .map((row) => row.split("").map((char) => parseInt(char, 10)));

let flashes = 0;
const bumpSpot = (y: number, x: number) => {
  if (lines[y]?.[x] === undefined) return;

  lines[y][x]++;
  if (lines[y][x] == 10) {
    flashes++;
    bumpSpot(y, x - 1);
    bumpSpot(y, x + 1);
    bumpSpot(y - 1, x - 1);
    bumpSpot(y - 1, x);
    bumpSpot(y - 1, x + 1);
    bumpSpot(y + 1, x - 1);
    bumpSpot(y + 1, x);
    bumpSpot(y + 1, x + 1);
  }
};

let i = 0;
while (i < 100) {
  lines.forEach((row, y) => row.forEach((_, x) => bumpSpot(y, x)));
  lines = lines.map((row) => row.map((p) => (p > 9 ? 0 : p)));
  i++;
}

console.log(flashes);
