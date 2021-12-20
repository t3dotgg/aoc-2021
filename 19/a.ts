import {
  List,
  Map,
  Set,
} from "https://deno.land/x/immutable@4.0.0-rc.12-deno.1/mod.ts";

type Point = [number, number, number];
type Scanner = Point[];
let deltas: Point[] = [[0, 0, 0]];
let tfs = Set<List<number>>();

const data = Deno.readTextFileSync("./input.txt")
  .trim()
  .split("\n\n")
  .map((x) => x.split("\n"))
  .map((x) => {
    x.shift();
    return x;
  })
  .map((x) => x.map((y) => y.split(",").map((z) => parseInt(z)) as Point));

function mergeAll(scanners: List<Scanner>) {
  let current: Scanner = scanners.first()!;
  scanners = scanners.rest();

  while (scanners.size > 0) {
    console.log("remaining scanners:", scanners.size);
    console.log(JSON.stringify(tfs.toJSON()));
    let updated = false;

    for (let scanner of scanners) {
      let out = matchCheck(current, scanner);

      if (out !== undefined) {
        current = out;
        scanners = scanners.delete(scanners.indexOf(scanner));
        updated = true;
        break;
      }
    }

    if (!updated) {
      throw new Error("failed");
    }
  }

  return current;
}

function matchCheck(a: Scanner, b: Scanner): Scanner | undefined {
  let curB = b;
  let tf: [number, number, number] = [1, 2, 3];

  for (let xr = 0; xr < 4; xr++) {
    // xy rotation
    curB = curB.map((p) => [-p[1], p[0], p[2]]);
    tf = [-tf[1], tf[0], tf[2]];
    for (let yr = 0; yr < 4; yr++) {
      // yz rotation
      curB = curB.map((p) => [p[0], -p[2], p[1]]);
      tf = [tf[0], -tf[2], tf[1]];
      for (let zr = 0; zr < 4; zr++) {
        // xz rotation
        curB = curB.map((p) => [-p[2], p[1], p[0]]);
        tf = [-tf[2], tf[1], tf[0]];
        tfs = tfs.add(List(tf));
        const delta = matchCheckNoRotate(a, curB);
        if (delta !== undefined) {
          let merged = Set(a.map(List)).union(
            Set(
              curB
                .map((p) => [p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]])
                .map(List)
            )
          );
          deltas.push(delta);
          return merged
            .toArray()
            .map((p) => p.toArray() as [number, number, number]);
        }
      }
    }
  }

  return undefined;
}

function matchCheckNoRotate(
  a: Scanner,
  b: Scanner
): [number, number, number] | undefined {
  let aSet = Set(a.map(List));
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      let common = 0;
      let delta = [a[i][0] - b[j][0], a[i][1] - b[j][1], a[i][2] - b[j][2]] as [
        number,
        number,
        number
      ];

      for (let k = 0; k < b.length; k++) {
        if (aSet.has(List(b[k].map((p, i) => p + delta[i])))) {
          common++;
        }
      }

      if (common >= 12) {
        return delta;
      }
    }
  }

  return undefined;
}

function maxManhattan(pos: [number, number, number][]) {
  let max = 0;

  for (let p of pos) {
    for (let q of pos) {
      max = Math.max(
        max,
        Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2])
      );
    }
  }

  return max;
}

const out = mergeAll(List(data));
console.log(JSON.stringify(out));
console.log(JSON.stringify(deltas));
console.log(JSON.stringify(tfs.toJSON()));
const totalLength = out.length;
const maxDist = maxManhattan(deltas);

console.log("part 1", totalLength);
console.log("part 2", maxDist);
