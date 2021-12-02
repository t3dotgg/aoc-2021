export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const processed = results.split("\n");

let depth = 0;
let x = 0;

processed.forEach((instruction) => {
  const [dir, amStr] = instruction.split(" ");

  const amount = parseInt(amStr, 10);

  if (dir === "forward") x = x + amount;
  if (dir === "down") depth = depth + amount;
  if (dir === "up") depth = depth - amount;
});

console.log(depth, x, depth * x);
