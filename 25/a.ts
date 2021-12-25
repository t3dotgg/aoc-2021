export {};

let lines = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((r) => r.split(""));

console.log(lines);

let oldLines: string[][] = [];

let runs = 0;
console.log("\n\n Step", runs);
lines.forEach((row) => {
  let p = row.join("");
  console.log(p);
});

while (JSON.stringify({ oldLines }) !== JSON.stringify({ oldLines: lines })) {
  runs++;
  oldLines = [...lines.map((r) => [...r])];
  const newLines = [...lines.map((r) => [...r])];

  for (let p = 0; p < 2; p++) {
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[0].length; x++) {
        const cur = lines[y][x];
        if (p === 0 && cur === ">") {
          const nextPos = (x + 1) % lines[0].length;
          if (lines[y][nextPos] === ".") {
            newLines[y][nextPos] = ">";
            newLines[y][x] = ".";
          }
        }

        if (p === 1 && cur === "v") {
          const nextPos = (y + 1) % lines.length;
          if (lines[nextPos][x] === ".") {
            newLines[nextPos][x] = "v";
            newLines[y][x] = ".";
          }
        }
      }
    }
    lines = [...newLines.map((r) => [...r])];
  }
}

console.log(runs);
