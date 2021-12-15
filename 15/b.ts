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

const getNeighbors = (x: number, y: number) => {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
};

const scoreBoard: number[][] = Array.apply(null, Array(height)).map((_) =>
  Array.apply(null, Array(width)).map((_) => Infinity)
);

scoreBoard[0][0] = 0;

const traverse = (x: number, y: number) => {
  if (fullGrid[y]?.[x] === undefined) {
    return;
  }

  let score = Math.min(
    ...getNeighbors(x, y).map(
      (coords) => scoreBoard[coords[1]]?.[coords[0]] ?? Infinity
    )
  );

  score = score + fullGrid[y][x];
  if (x === fullGrid[0].length - 1 && y === fullGrid.length - 1) {
    return;
  }

  if (score < scoreBoard[y][x]) {
    scoreBoard[y][x] = score;

    traverse(x, y + 1);
    traverse(x + 1, y);
  }
};

traverse(1, 0);
traverse(0, 1);
fullGrid[0][0] = 0;

let lastBoard: number[][] = [];
while (JSON.stringify(scoreBoard) !== JSON.stringify(lastBoard)) {
  lastBoard = scoreBoard.map((r) => [...r]);
  for (let x = 0; x < fullGrid[0].length; x++) {
    for (let y = 0; y < fullGrid.length; y++) {
      if (x === 0 && y === 0) continue;
      scoreBoard[y][x] =
        Math.min(
          ...getNeighbors(x, y).map(
            (coords) => scoreBoard[coords[1]]?.[coords[0]] ?? Infinity
          )
        ) + fullGrid[y][x];
    }
  }
}

console.log(
  "done",
  scoreBoard[scoreBoard.length - 1][scoreBoard[0].length - 1]
);
