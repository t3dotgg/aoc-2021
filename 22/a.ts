export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

console.log(lines);

const minA = -50;
const maxA = 50;
const minB = -50;
const maxB = 50;
const minC = -50;
const maxC = 50;

const parsed = lines
  .map((line) => {
    const [s, rest] = line.split(" x=");

    const state = s === "on";

    const [a, b, c] = rest
      .replace("z", "")
      .replace("y", "")
      .split(",=")
      .map((r) => r.split("..").map((p) => parseInt(p, 10)));

    return { points: [a, b, c], on: state };
  })
  .reverse();

let count = 0;

for (let x = minA; x <= maxA; x++) {
  for (let y = minB; y <= maxB; y++) {
    for (let z = minC; z <= maxC; z++) {
      let index = 0;
      let answer: boolean | undefined = undefined;
      while (index < parsed.length && answer === undefined) {
        const { points: p, on } = parsed[index];
        if (
          p[0][0] <= x &&
          x <= p[0][1] &&
          p[1][0] <= y &&
          y <= p[1][1] &&
          p[2][0] <= z &&
          z <= p[2][1]
        ) {
          answer = on;
        }
        index++;
      }
      if (answer) count++;
    }
  }
}

console.log(count);
