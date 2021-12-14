export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const [top, linesBody] = results.split("\n\n");

const lines = linesBody
  .split("\n")
  .map((r) => r.split(" -> ") as [string, string]);

let steps = 0;

let polymer = top;

const rules = new Map<string, string>(lines);

while (steps < 10) {
  let newPolymer = polymer[0];
  for (let x = 1; x < polymer.length; x++) {
    const pair = polymer[x - 1] + polymer[x];
    if (rules.get(pair)) {
      newPolymer += rules.get(pair) + polymer[x];
    } else {
      newPolymer += x;
    }
  }
  polymer = newPolymer;
  steps++;
}

const counts = new Map<string, number>();

polymer.split("").forEach((char) => {
  counts.set(char, (counts.get(char) ?? 0) + 1);
});

let min = Infinity;
let max = 0;

counts.forEach((val) => {
  if (val < min) min = val;
  if (val > max) max = val;
});

console.log(max - min);
