export {};

// let p1 = 4;
// let p2 = 8;

let p1 = 8;
let p2 = 3;

p1--;
p2--;

let dieRolls = 0;

let p1s = 0;
let p2s = 0;

const getDieVal = () => {
  const a = (dieRolls % 100) + 1;
  dieRolls++;
  const b = (dieRolls % 100) + 1;
  dieRolls++;
  const c = (dieRolls % 100) + 1;
  dieRolls++;

  return [a, b, c] as [number, number, number];
};

while (p1s < 1000 && p2s < 1000) {
  p1 += getDieVal().reduce((s, c) => s + c, 0);
  p1s += (p1 % 10) + 1;
  if (p1s >= 1000) break;

  p2 += getDieVal().reduce((s, c) => s + c, 0);
  p2s += (p2 % 10) + 1;
}

const ans = Math.min(p1s, p2s) * dieRolls;

console.log(ans);
