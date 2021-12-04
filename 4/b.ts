export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");

const processed = results.split("\n\n");

const [callsStr, ...boardsStr] = processed;

const calls = callsStr.split(",").map((n) => parseInt(n, 10));

const boards = boardsStr.map((board) =>
  board.split("\n").map((row) =>
    row
      .split(" ")
      .flatMap((n) => (n === "" ? [] : [parseInt(n, 10)]))
      .map((n) => ({ value: n, called: false }))
  )
);

const boardContainsWinner = (board: typeof boards[number]) => {
  for (let x = 0; x < board[0].length; x++) {
    const items = board[x].filter((item) => item.called);
    if (items.length === board[x].length) {
      return true;
    }
  }

  for (let y = 0; y < board[0].length; y++) {
    const items = board.filter((r) => r[y].called);
    if (items.length === board[y].length) {
      return true;
    }
  }

  return false;
};

const callNumber = (b: typeof boards, call: number) => {
  return b.map((board) =>
    board.map((row) =>
      row.map((item) => ({
        value: item.value,
        called: item.called || call === item.value,
      }))
    )
  );
};

let bs = [...boards];

let index = -1;

let lastBoardIndex = -1;

while (bs.filter((b) => boardContainsWinner(b)).length < bs.length) {
  lastBoardIndex = bs.findIndex((b) => !boardContainsWinner(b));
  index++;
  const calling = calls[index];
  bs = callNumber(bs, calling);
}
let sum = 0;

const res = bs[lastBoardIndex];

if (res) {
  res.forEach((row) =>
    row.forEach((item) => {
      if (!item.called) {
        sum += item.value;
      }
    })
  );
}

console.log(sum * calls[index]);
