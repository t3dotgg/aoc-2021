export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const processed = results.split("\n").map((line) => line.split(""));

console.log(processed);

const length = processed[0].length;

let gamma = "";
let delta = "";

for (let x = 0; x < length; x++) {
  let zeros = 0;
  let ones = 0;
  processed.forEach((line) => {
    if (line[x] === "0") {
      zeros++;
    }
    if (line[x] === "1") {
      ones++;
    }
  });

  if (zeros > ones) {
    gamma = gamma + "0";
    delta = delta + "1";
  } else {
    gamma = gamma + "1";
    delta = delta + "0";
  }
}

console.log("gamma", gamma, delta);

console.log("res", parseInt(gamma, 2) * parseInt(delta, 2));
