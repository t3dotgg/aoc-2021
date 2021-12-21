export {};

let p1 = 4;
let p2 = 8;

// let p1 = 8;
// let p2 = 3;

p1--;
p2--;

const cache = new Map<string, [number, number]>();

const doCheck = (p1: number, s1: number, p2: number, s2: number) => {
  if (s2 >= 21) return [0, 1];

  const marker = JSON.stringify({ p1, s1, p2, s2 });
  if (cache.has(marker)) return cache.get(marker)!;

  let p1wins = 0;
  let p2wins = 0;

  for (let x = 1; x < 4; x++) {
    for (let y = 1; y < 4; y++) {
      for (let z = 1; z < 4; z++) {
        const newP1 = (p1 + x + y + z) % 10;
        const newS1 = s1 + newP1 + 1;
        const [sp2, sp1] = doCheck(p2, s2, newP1, newS1);
        p1wins += sp1;
        p2wins += sp2;
      }
    }
  }

  cache.set(marker, [p1wins, p2wins]);

  return [p1wins, p2wins];
};

const ans = doCheck(p1, 0, p2, 0);

console.log(ans);
