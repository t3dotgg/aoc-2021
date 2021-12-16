export const aaaaa = "";

const input = (await Deno.readTextFile("./input.txt")).split("");

const inB = input.reduce((collection: string, char) => {
  let bitStr = parseInt(char, 16).toString(2);
  while (bitStr.length < 4) {
    bitStr = "0" + bitStr;
  }
  return collection + bitStr;
}, "");

let versionNumber = 0;

const bitRunner = (bits: string) => {
  const version = parseInt(bits.slice(0, 3), 2);
  versionNumber += version;

  const type = parseInt(bits.slice(3, 6), 2);

  if (type === 4) {
    let subI = 6;
    while (bits[subI] === "1") {
      subI += 5;
    }
    return subI + 5;
  }

  let currentIndex = 0;
  const id = bits[6];
  if (id == "0") {
    const length = parseInt(bits.slice(7, 22), 2);
    while (currentIndex < length) {
      currentIndex += bitRunner(bits.slice(22 + currentIndex));
    }
    currentIndex = 22 + length;
  } else {
    const length = parseInt(bits.slice(7, 18), 2);
    currentIndex = 18;
    for (let i = 0; i < length; i++) {
      currentIndex += bitRunner(bits.slice(currentIndex));
    }
  }

  return currentIndex;
};

bitRunner(inB);

console.log(versionNumber);
