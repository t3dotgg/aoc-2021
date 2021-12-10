export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const lines = results.split("\n");
console.log(lines);

const ins = ["[", "{", "(", "<"];

const isMatch = (open: string, char: string) => {
  if (open === "<" && char === ">") return true;
  if (open === "{" && char === "}") return true;
  if (open === "[" && char === "]") return true;
  if (open === "(" && char === ")") return true;
  return false;
};

const goodLines: string[][] = [];

lines.forEach((line) => {
  const chars: string[] = [];
  const input = line.split("");
  let failed = false;
  for (let x = 0; x < input.length; x++) {
    const char = input[x];

    if (ins.includes(char)) {
      chars.push(char);
      continue;
    }

    const compare = chars.pop();

    if (!isMatch(compare!, char)) {
      failed = true;
      return;
    }
  }

  if (!failed) goodLines.push(chars);
});

const scores = goodLines.map((line) => {
  let cScore = 0;
  while (line.length !== 0) {
    const char = line.pop();
    if (char === "<") cScore = cScore * 5 + 4;
    if (char === "{") cScore = cScore * 5 + 3;
    if (char === "[") cScore = cScore * 5 + 2;
    if (char === "(") cScore = cScore * 5 + 1;
  }
  return cScore;
});

const sorted = scores.sort((a, b) => b - a);

console.log(sorted[23]);
