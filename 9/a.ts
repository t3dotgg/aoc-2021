export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const lines = results
  .split("\n")
  .map((row) => row.split("").map((char) => parseInt(char, 10)));

const yMax = lines.length;
const xMax = lines[0].length;

let risk = 0;

let x = 0;
let y = 0;
while (y < yMax) {
  while (x < xMax) {
    const current = lines[y][x];

    if (
      (y === yMax - 1 || current < lines[y + 1][x]) &&
      (y === 0 || current < lines[y - 1][x]) &&
      (x === xMax - 1 || current < lines[y][x + 1]) &&
      (x === 0 || current < lines[y][x - 1])
    ) {
      risk = risk + 1 + current;
    }

    x++;
  }
  x = 0;
  y++;
}

console.log(risk);
