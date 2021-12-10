export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const lines = results.split("\n");
console.log(lines);

let score = 0;

const ins = ["[", "{", "(", "<"];

const isMatch = (open: string, char: string) => {
  if (open === "<" && char === ">") return true;
  if (open === "{" && char === "}") return true;
  if (open === "[" && char === "]") return true;
  if (open === "(" && char === ")") return true;
  return false;
};

lines.forEach((line) => {
  const chars: string[] = [];
  const input = line.split("");
  for (let x = 0; x < input.length; x++) {
    const char = input[x];
    console.log("in", char);

    if (ins.includes(char)) {
      chars.push(char);
      continue;
    }

    const compare = chars.pop();

    console.log("compare", compare);
    if (!isMatch(compare!, char)) {
      if (char === ">") score += 25137;
      if (char === "}") score += 1197;
      if (char === "]") score += 57;
      if (char === ")") score += 3;
      return;
    }
  }
});

console.log(score);
