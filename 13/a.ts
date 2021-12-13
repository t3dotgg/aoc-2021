export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");
// const results = await Deno.readTextFile("./example.txt");

const [points, instructions] = results.split("\n\n");

const lines = points
  .split("\n")
  .map((row) => row.split(",").map((c) => parseInt(c, 10)));

const pIn = instructions
  .split("\n")
  .map((row) => row.replace("fold along ", "").split("="));

console.log(lines, pIn);

const [dir, spot] = pIn[0];

const p = new Set<string>();

lines.forEach((point) => {
  const [x, y] = point;
  const s = parseInt(spot, 10);

  if (dir === "x" && x > s) {
    p.add(`${s - (x - s)}:${y}`);
  } else if (dir === "y" && y > s) {
    p.add(`${x}:${s - (y - s)}`);
  } else {
    p.add(`${x}:${y}`);
  }
});

console.log(p.size);
