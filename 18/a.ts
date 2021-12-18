export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

type SNum = [number | SNum, number | SNum] | number;

const addLeft: (x: number | SNum, n: number | null) => number | SNum = (
  x,
  n
) => {
  if (n === null) return x;
  if (typeof x === "number") return x + n;
  return [addLeft(x[0], n), x[1]];
};
const addRight: (x: number | SNum, n: number | null) => number | SNum = (
  x,
  n
) => {
  if (n === null) return x;
  if (typeof x === "number") return x + n;
  return [x[0], addRight(x[1], n)];
};

const split: (x: SNum | number) => [boolean, SNum | number] = (x) => {
  if (typeof x === "number") {
    if (x >= 10) {
      return [true, [Math.floor(x / 2), Math.ceil(x / 2)]];
    }

    return [false, x];
  }
  let [first, second] = x;

  let change = false;
  [change, first] = split(first);

  if (change) return [true, [first, second]];

  [change, second] = split(second);
  return [change, [first, second]];
};

const exp: (
  input: SNum,
  depth: number
) => [boolean, SNum | null, SNum, SNum | null] = (input, depth = 4) => {
  if (typeof input === "number") return [false, null, input, null];

  let [first, second] = input;

  if (depth === 0) return [true, first, 0, second];

  let [exploded, left, a, right] = exp(first, depth - 1);
  first = a;
  if (exploded)
    return [true, left, [first, addLeft(second, right as number)], null];
  [exploded, left, second, right] = exp(second, depth - 1);
  if (exploded)
    return [true, null, [addRight(first, left as number), second], right];

  return [false, null, input, null];
};

const magnitude: (x: SNum) => number = (x) => {
  if (typeof x === "number") return x;

  const [first, second] = x;
  return 3 * magnitude(first) + 2 * magnitude(second);
};

const combineNumbers = (a: SNum, b: SNum) => {
  let hasDiff = true;
  let x: SNum = [a, b];
  while (hasDiff) {
    [hasDiff, , x] = exp([(x as [SNum, SNum])[0], (x as [SNum, SNum])[1]], 4);
    if (hasDiff) continue;

    [hasDiff, x] = split(x);
  }

  return x;
};

let sum = JSON.parse(lines[0]) as SNum;

let current = 1;
while (current < lines.length) {
  sum = combineNumbers(sum, JSON.parse(lines[current]) as SNum);
  current++;
}

console.log(magnitude(sum));
