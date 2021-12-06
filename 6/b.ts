export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const fish = results.split(",").map((f) => parseInt(f, 10));

let days = 0;

let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

fish.forEach((p) => {
  counts[p] = counts[p] + 1;
});

while (days < 256) {
  days++;
  const p = counts.shift();
  counts = [...counts, p!];
  counts[6] += p!;
}

let sum = 0;

counts.forEach((c) => (sum += c));

console.log("done", sum);
