export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");
// const results = await Deno.readTextFile("./example.txt");

const [points, instructions] = results.split("\n\n");

const lines = points.split("\n").map((row) => row.replace(",", ":"));

const pIn = instructions
  .split("\n")
  .map((row) => row.replace("fold along ", "").split("="));

let currentPoints = new Set<string>(lines);

console.log(lines, pIn);

pIn.forEach((fold) => {
  const [dir, spot] = fold;

  const p = new Set<string>();

  currentPoints.forEach((point) => {
    const [x, y] = point.split(":").map((i) => parseInt(i, 10));
    const s = parseInt(spot, 10);

    if (dir === "x" && x > s) {
      p.add(`${s - (x - s)}:${y}`);
    } else if (dir === "y" && y > s) {
      p.add(`${x}:${s - (y - s)}`);
    } else {
      p.add(`${x}:${y}`);
    }
  });

  currentPoints = p;
});

console.log(currentPoints);

let print = "";
for (let y = 0; y < 6; y++) {
  for (let x = 0; x < 40; x++) {
    if (currentPoints.has(`${x}:${y}`)) {
      print += "X";
    } else {
      print += " ";
    }
  }
  print += "\n";
}

console.log(print);
