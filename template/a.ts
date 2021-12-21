export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

console.log(lines);
