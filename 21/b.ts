export {};

// let p1 = 4;
// let p2 = 8;

let p1 = 8;
let p2 = 3;

p1--;
p2--;

const cache = new Map<string, [number, number]>();

const doCheck = (
  p1: number,
  s1: number,
  p2: number,
  s2: number,
  dofirst: boolean
) => {
  if (s1 >= 21) return [1, 0];
  if (s2 >= 21) return [0, 1];

  const marker = JSON.stringify({ p1, s1, p2, s2, dofirst });
  if (cache.has(marker)) return cache.get(marker)!;

  let p1wins = 0;
  let p2wins = 0;

  for (let x = 1; x < 4; x++) {
    for (let y = 1; y < 4; y++) {
      for (let z = 1; z < 4; z++) {
        const score = x + y + z;
        if (dofirst) {
          const newP1 = (p1 + score) % 10;
          const newS1 = s1 + newP1 + 1;
          const [sp1, sp2] = doCheck(newP1, newS1, p2, s2, false);
          p1wins += sp1;
          p2wins += sp2;
        } else {
          const newP2 = (p2 + score) % 10;
          const newS2 = s2 + newP2 + 1;
          const [sp1, sp2] = doCheck(p1, s1, newP2, newS2, true);
          p1wins += sp1;
          p2wins += sp2;
        }
      }
    }
  }

  cache.set(marker, [p1wins, p2wins]);

  return [p1wins, p2wins];
};

const ans = doCheck(p1, p2, 0, 0, true);

console.log(ans);
