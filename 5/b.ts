export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const lines = results
  .split("\n")
  .map((r) =>
    r
      .split(" -> ")
      .map((point) => point.split(",").map((num) => parseInt(num, 10)))
  );

const generatePointKey = (x: number, y: number) => {
  return `${x}:${y}`;
};

const accessedPoints = new Map<string, number>();

lines.forEach((line) => {
  const [a, b] = line;

  const [x1, y1] = a;
  const [x2, y2] = b;

  const points: string[] = [];

  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      points.push(generatePointKey(x1, y));
    }
  } else if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      points.push(generatePointKey(x, y1));
    }
  } else {
    const slope = y2 > y1 ? 1 : -1;

    let y = y1;

    const sg = x2 > x1;
    for (let x = x1; sg ? x <= x2 : x >= x2; x += sg ? 1 : -1) {
      points.push(generatePointKey(x, y));
      y += slope;
    }
  }

  points.forEach((point) => {
    const currentCount = accessedPoints.get(point) ?? 0;
    accessedPoints.set(point, currentCount + 1);
  });
});

let doubles = 0;

accessedPoints.forEach((val) => {
  if (val > 1) {
    doubles++;
  }
});

console.log("aaa", doubles);
