export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");
// const results = await Deno.readTextFile("./example.txt");

let lines = results.split("\n").map((row) => row.split("-"));

const validPaths = new Map<string, string[]>();

lines.forEach((row) => {
  const [first, second] = row;

  console.log(first, second);

  const f = validPaths.get(first) ?? [];
  validPaths.set(first, [...f, second]);

  const s = validPaths.get(second) ?? [];
  validPaths.set(second, [...s, first]);
});

let count = 0;

const traverseChildren: (
  cave: string,
  path: string,
  hasDoubled: boolean
) => void = (cave, path, hasDoubled) => {
  if (cave === "end") {
    count++;
    return;
  }

  if (
    cave === "start" ||
    (cave === cave.toLowerCase() && path.split(cave).length > 2) ||
    (cave === cave.toLowerCase() && path.split(cave).length > 1 && hasDoubled)
  )
    return;

  if (cave === cave.toLowerCase() && path.split(cave).length > 1) {
    path = path + cave + "-";
    validPaths
      .get(cave)
      ?.forEach((nextCave) => traverseChildren(nextCave, path, true));
  } else {
    path = path + cave + "-";
    validPaths
      .get(cave)
      ?.forEach((nextCave) => traverseChildren(nextCave, path, hasDoubled));
  }
};

const allPaths = validPaths.get("start")!.forEach((cave) => {
  const paths = "start-";
  return traverseChildren(cave, paths, false);
});

console.log(count);
