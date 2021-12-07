export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

let min = Infinity;
let max = 0;

const crabs = results.split(",").map((f) => parseInt(f, 10));
crabs.forEach((crab) => {
  if (crab > max) max = crab;
  if (crab < min) min = crab;
});

let minFuel = Infinity;
for (let x = min; x < max; x++) {
  let fuel = 0;
  crabs.forEach((crab) => (fuel += Math.abs(x - crab)));
  if (fuel < minFuel) minFuel = fuel;
}

console.log(minFuel);
