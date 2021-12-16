export const aaaaa = "";

const input = (await Deno.readTextFile("./input.txt")).split("");

const inB = input.reduce((collection: string, char) => {
  let bitStr = parseInt(char, 16).toString(2);
  while (bitStr.length < 4) {
    bitStr = "0" + bitStr;
  }
  return collection + bitStr;
}, "");

const bitRunner = (bits: string) => {
  const type = parseInt(bits.slice(3, 6), 2);

  if (type === 4) {
    let subI = 6;
    let value = "";
    while (bits[subI] === "1") {
      value += bits.slice(subI + 1, subI + 5);
      subI += 5;
    }
    value += bits.slice(subI + 1, subI + 5);
    return { count: subI + 5, value: parseInt(value, 2) };
  }

  let currentIndex = 0;
  const values: number[] = [];

  const id = bits[6];
  if (id == "0") {
    const length = parseInt(bits.slice(7, 22), 2);
    let subIndex = 0;
    while (subIndex < length) {
      const res = bitRunner(bits.slice(22 + subIndex));
      subIndex += res.count;
      values.push(res.value);
    }
    currentIndex = 22 + length;
  } else {
    const length = parseInt(bits.slice(7, 18), 2);
    let subIndex = 18;
    for (let i = 0; i < length; i++) {
      const res = bitRunner(bits.slice(subIndex));
      subIndex += res.count;
      values.push(res.value);
    }
    currentIndex = subIndex;
  }

  const value = getVal(type, values);
  return { count: currentIndex, value };
};

const getVal = (key: number, values: number[]) => {
  if (key === 0) return values.reduce((a, b) => a + b);
  if (key === 1) return values.reduce((a, b) => a * b);
  if (key === 2) return values.reduce((a, b) => Math.min(a, b));
  if (key === 3) return values.reduce((a, b) => Math.max(a, b));
  if (key === 5) return values[0] > values[1] ? 1 : 0;
  if (key === 6) return values[0] < values[1] ? 1 : 0;
  if (key === 7) return values[0] == values[1] ? 1 : 0;
  return 0;
};

const end = bitRunner(inB);

console.log(end.value);
