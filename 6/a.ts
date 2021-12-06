export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

let fish = results.split(",").map((f) => parseInt(f, 10));

console.log(fish);

let days = 0;

while (days < 80) {
  days++;
  fish = fish.flatMap((p) => {
    if (p === 0) {
      return [6, 8];
    }
    return [p - 1];
  });
  console.log("count on day", days, ": ", fish.length);
}

console.log(fish.length);
