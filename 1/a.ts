export const x = "";

const results = await Deno.readTextFile("./input.txt");

const depths = results.split("\n").map((n) => parseInt(n, 10));

console.log(depths);

let increases = 0;
let lastDepth: number | undefined = undefined;

depths.forEach((depth) => {
  if (lastDepth !== undefined && depth > lastDepth) increases++;

  lastDepth = depth;
});
console.log("increases", increases);
