export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const processed = results.split("\n").map((line) => line.split(""));

const getOxygen = (input: string[][]) => {
  let currentBit = 0;
  while (input.length > 1) {
    let zeros = 0;
    let ones = 0;
    input.forEach((line) => {
      if (line[currentBit] === "0") {
        zeros++;
      }
      if (line[currentBit] === "1") {
        ones++;
      }
    });

    if (zeros > ones) {
      input = input.filter((line) => line[currentBit] === "0");
    } else {
      input = input.filter((line) => line[currentBit] === "1");
    }

    currentBit++;
  }

  return input[0];
};

const getCO2 = (input: string[][]) => {
  let currentBit = 0;
  while (input.length > 1) {
    let zeros = 0;
    let ones = 0;
    input.forEach((line) => {
      if (line[currentBit] === "0") {
        zeros++;
      }
      if (line[currentBit] === "1") {
        ones++;
      }
    });

    if (ones < zeros) {
      input = input.filter((line) => line[currentBit] === "1");
    } else {
      input = input.filter((line) => line[currentBit] === "0");
    }

    console.log("remaining", input.length);
    currentBit++;
  }
  return input[0];
};

const oxygen = getOxygen([...processed]).join("");
const co2 = getCO2([...processed]).join("");

console.log(oxygen, co2);

console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
