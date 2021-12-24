export {};

const lines = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((r) => r.split(" "));

const CHUNK_SIZE = 18;

const getChunkScore = (chunk: string[][], digit: number, z0: number) => {
  const x = (z0 % 26) + parseInt(chunk[5][2], 10) === digit ? 0 : 1;
  const z = Math.floor(z0 / parseInt(chunk[4][2], 10));
  const z1 = z * (25 * x + 1);
  const z2 = z1 + x * (digit + parseInt(chunk[15][2], 10));
  return z2;
};

const chunkEvalRecursive = (
  ins: string[][],
  id: number,
  z0: number,
  rb: number
): number => {
  if (id + CHUNK_SIZE >= ins.length) {
    for (let i = 9; i > 0; i--) {
      if (getChunkScore(ins.slice(id), i, z0) === 0) {
        return i;
      }
    }
    return 0;
  } else {
    if (ins[id + 4][2] === "1") {
      for (let i = 9; i > 0; i--) {
        const res = chunkEvalRecursive(
          ins,
          id + CHUNK_SIZE,
          getChunkScore(ins.slice(id, id + CHUNK_SIZE), i, z0),
          rb - 1
        );

        if (res > 0) {
          return i * Math.pow(10, rb) + res;
        }
      }
    } else {
      let x = z0 % 26;
      x += parseInt(ins[id + 5][2]);
      if (x <= 0 || x > 9) return 0;
      const res = chunkEvalRecursive(
        ins,
        id + CHUNK_SIZE,
        getChunkScore(ins.slice(id, id + CHUNK_SIZE), x, z0),
        rb - 1
      );

      if (res > 0) {
        return x * Math.pow(10, rb) + res;
      }
    }
  }
  return 0;
};

console.log(chunkEvalRecursive(lines, 0, 0, 13));
