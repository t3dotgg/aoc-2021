export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const lines = results.split("\n");

console.log(lines);

const processed = lines.map((line) => line.split(" | ")[1].split(" "));

console.log(processed);

const validLengths = [2, 3, 7, 4];

let count = 0;

processed.forEach((stuff) =>
  stuff.forEach((str) => {
    if (validLengths.includes(str.length)) {
      count++;
    }
  })
);

console.log(count);
