export {};

const lines = (await Deno.readTextFile("./input.txt")).split("\n");

console.log(lines);

const parsed = lines.map((line) => {
  const [s, rest] = line.split(" x=");

  const state = s === "on";

  const [a, b, c] = rest
    .replace("z", "")
    .replace("y", "")
    .split(",=")
    .map((r) => r.split("..").map((p) => parseInt(p, 10)) as [number, number]);

  return { points: [a, b, c], on: state };
});

const getSubrange = (
  c: [number, number],
  low: number,
  high: number
): number[] => {
  if (c[1] < low) return [];
  if (c[0] > high) return [];
  let c0 = Math.max(c[0], low);
  let c1 = Math.max(c[1], low);
  c0 = Math.min(c0, high);
  c1 = Math.min(c1, high);
  return [c0, c1];
};

const countWithInterruptions = (
  point: typeof parsed[number],
  rest: typeof parsed
): number => {
  const [xr, yr, zr] = point.points;
  let total = (xr[1] - xr[0]) * (yr[1] - yr[0]) * (zr[1] - zr[0]);

  const conflicts: typeof parsed = [];

  let index = 0;
  while (index < rest.length) {
    const compare = rest[index];
    index++;
    const [xr2, yr2, zr2] = compare.points;
    const cxr = getSubrange(xr2, xr[0], xr[1]);
    const cyr = getSubrange(yr2, yr[0], yr[1]);
    const czr = getSubrange(zr2, zr[0], zr[1]);

    if (cxr.length === 0 || cyr.length === 0 || czr.length === 0) continue;

    conflicts.push({
      on: compare.on,
      points: [cxr, cyr, czr] as [number, number][],
    });
  }

  index = 0;
  while (index < conflicts.length) {
    const conflict = conflicts[index];
    index++;
    total -= countWithInterruptions(conflict, conflicts.slice(index));
  }

  return total;
};

let count = 0;

parsed.forEach((r, i) => {
  if (r.on === false) return;
  count += countWithInterruptions(r, parsed.slice(i + 1));
});

console.log(count);
