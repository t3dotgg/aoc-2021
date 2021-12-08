export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const lines = results.split("\n");
const processed = lines.map((line) =>
  line
    .split(" | ")
    .map((v) => v.split(" ").map((output) => output.split("").sort()))
);

const computerCharSystem = (input: string[][]) => {
  const isOne = input.find((r) => r.length === 2);
  const isSeven = input.find((r) => r.length === 3);
  const isFour = input.find((r) => r.length === 4);
  const isEight = input.find((r) => r.length === 7);
  const isNine = input.find(
    (r) => r.length === 6 && r.filter((c) => isFour!.includes(c)).length === 4
  );
  const isZero = input.find(
    (r) =>
      r.length === 6 &&
      r.filter((c) => isSeven!.includes(c)).length === 3 &&
      r.join() !== isNine?.join()
  );
  const isSix = input.find(
    (r) =>
      r.length === 6 &&
      r.join() !== isNine?.join() &&
      r.join() != isZero?.join()
  );
  const isFive = input.find(
    (r) => r.length === 5 && r.filter((c) => isSix?.includes(c)!).length === 5
  );
  const isThree = input.find(
    (r) =>
      r.length === 5 &&
      r.join() !== isFive?.join() &&
      r.filter((c) => isFour!.includes(c)).length === 3
  );
  const isTwo = input.find(
    (r) =>
      r.length === 5 &&
      r.join() !== isFive?.join() &&
      r.join() !== isThree?.join()
  );

  const numbers = input.map((digit) => {
    const joined = digit.join();
    if (isOne?.join() === joined) return 1;
    if (isTwo?.join() === joined) return 2;
    if (isThree?.join() === joined) return 3;
    if (isFour?.join() === joined) return 4;
    if (isFive?.join() === joined) return 5;
    if (isSix?.join() === joined) return 6;
    if (isSeven?.join() === joined) return 7;
    if (isEight?.join() === joined) return 8;
    if (isNine?.join() === joined) return 9;
    if (isZero?.join() === joined) return 0;

    return undefined;
  });

  const endDigits = parseInt(numbers.slice(-4).join(""), 10);

  return endDigits;
};

const count = processed.reduce(
  (count, row) => (count += computerCharSystem([...row[0], ...row[1]])),
  0
);

console.log(count);
