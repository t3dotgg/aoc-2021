export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const lines = results
  .split("\n")
  .map((row) => row.split("").map((char) => parseInt(char, 10)));

const yMax = lines.length;
const xMax = lines[0].length;

const calculateIfHole: (
  x: number,
  y: number,
  options: { x: number; y: number }[],
  grid: number[][]
) => boolean = (x, y, options, grid) => {
  const current = grid[y][x];
  if (options.every((option) => current < grid[option.y][option.x])) {
    return true;
  }
  return false;
};

const getValidSurroundingCoords = (x: number, y: number) => {
  const options = [];
  if (y < yMax - 1) options.push({ x, y: y + 1 });
  if (y > 0) options.push({ x, y: y - 1 });
  if (x < xMax - 1) options.push({ y, x: x + 1 });
  if (x > 0) options.push({ y, x: x - 1 });

  return options;
};

const risks: number[] = [];

let x = 0;
let y = 0;
while (y < yMax) {
  while (x < xMax) {
    const validDirections = getValidSurroundingCoords(x, y);
    const grid = [...lines.map((r) => [...r])];
    const current = calculateIfHole(x, y, validDirections, grid);
    if (current) {
      const basinPoints: Set<string> = new Set();
      let visitablePoints: { x: number; y: number }[] = [{ y, x }];
      while (visitablePoints.length) {
        const { x, y } = visitablePoints.shift()!;
        if (lines[y][x] === 9) continue;

        const point = `${x}:${y}`;
        if (basinPoints.has(point)) continue;

        basinPoints.add(point);

        visitablePoints = [
          ...visitablePoints,
          ...getValidSurroundingCoords(x, y),
        ];
      }

      risks.push(basinPoints.size);
    }

    x++;
  }
  x = 0;
  y++;
}

const [a, b, c] = risks.sort((a, b) => b - a);
console.log(a * b * c);
