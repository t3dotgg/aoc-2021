export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");
// const results = await Deno.readTextFile("./example.txt");

const grid = results
  .split("\n")
  .map((row) => row.split("").map((i) => parseInt(i, 10)));

const width = grid[0].length * 5;
const height = grid.length * 5;

const fullGrid = Array.apply(null, Array(height)).map((_, y) =>
  Array.apply(null, Array(width)).map((_, x) => {
    const realX = x % grid[0].length;
    const realY = y % grid.length;

    const score =
      ((grid[realY][realX] +
        Math.floor(y / grid.length) +
        Math.floor(x / grid[0].length) -
        1) %
        9) +
      1;

    return score;
  })
);

const scoreBoard: number[][] = Array.apply(null, Array(height)).map((_) =>
  Array.apply(null, Array(width)).map((_) => Infinity)
);

const x = width - 1;
const y = height - 1;

scoreBoard[y][x] = fullGrid[y][x];

const getNeighbors = (x: number, y: number) => {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
};

const finalScores: number[] = [];

const traverse = (x: number, y: number) => {
  if (fullGrid[y]?.[x] === undefined) {
    return;
  }

  let score = Math.min(
    ...getNeighbors(x, y).map(
      (coords) => scoreBoard[coords[1]]?.[coords[0]] ?? Infinity
    )
  );

  if (x === 0 && y === 0) {
    finalScores.push(score);
    console.log(score);
    return;
  }

  score = score + fullGrid[y][x];

  if (score < scoreBoard[y][x]) {
    scoreBoard[y][x] = score;

    traverse(x - 1, y);
    traverse(x, y - 1);
  }
};

traverse(x - 1, y);
traverse(x, y - 1);

// Correct for test cases, off by between 1 and 3 for real answer 😅
console.log("done", Math.min(...finalScores));
