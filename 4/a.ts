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

const boardContainsWinner = (b: typeof boards) => {
  let c = 0;
  while (c < b.length) {
    const board = b[c];

    for (let x = 0; x < board[0].length; x++) {
      const items = board[x].filter((item) => item.called);
      if (items.length === board[x].length) {
        return board;
      }
    }

    for (let y = 0; y < board[0].length; y++) {
      const items = board.filter((r) => r[y].called);
      if (items.length === board[y].length) {
        return board;
      }
    }

    c++;
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

let res:
  | boolean
  | {
      value: number;
      called: boolean;
    }[][] = false;
let index = -1;

while (!res && index < calls.length) {
  index++;
  const calling = calls[index];
  bs = callNumber(bs, calling);
  res = boardContainsWinner(bs);
}

console.log(res);

let sum = 0;

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
