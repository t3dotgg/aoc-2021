export const aaaaa = "";

const results = await Deno.readTextFile("./input.txt");
// const results = await Deno.readTextFile("./example.txt");

const lines = results.split("\n").map((row) => row.split("-"));

const validPaths = new Map<string, string[]>();

lines.forEach((row) => {
  const [first, second] = row;

  console.log(first, second);

  const f = validPaths.get(first) ?? [];
  validPaths.set(first, [...f, second]);

  const s = validPaths.get(second) ?? [];
  validPaths.set(second, [...s, first]);
});

const traverseChildren: (cave: string, path: string[]) => string[][] = (
  cave,
  path
) => {
  if (cave === cave.toLowerCase() && path.includes(cave)) return [];

  if (cave === "end") return [[...path, "end"]];

  path = [...path, cave];
  return validPaths
    .get(cave)!
    .flatMap((nextCave) => traverseChildren(nextCave, path));
};

const allPaths = validPaths.get("start")!.flatMap((cave) => {
  const paths: string[] = ["start"];
  return traverseChildren(cave, paths);
});

console.log(allPaths.length);
