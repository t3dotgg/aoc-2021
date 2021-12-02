export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const processed = results.split("\n");

let aim = 0;
let x = 0;
let depth = 0;

processed.forEach((instruction) => {
  const [dir, amStr] = instruction.split(" ");

  const amount = parseInt(amStr, 10);

  if (dir === "forward") {
    x = x + amount;
    depth = depth + aim * amount;
  }
  if (dir === "down") aim = aim + amount;
  if (dir === "up") aim = aim - amount;
});

console.log(depth, x, depth * x);
