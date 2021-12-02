export const x = "";

const results = await Deno.readTextFile("./input.txt");

const depths = results.split("\n").map((n) => parseInt(n, 10));

let increases = 0;

for (let i = 0; i < depths.length - 3; i++) {
  if (depths[i] < depths[i + 3]) increases++;
}

console.log("increases", increases);
