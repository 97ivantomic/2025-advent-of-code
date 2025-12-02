import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Range {
  first: number;
  last: number;
}

function parseInput(): Range[] {
  return fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .trim()
    .split(",")
    .map((input) => {
      const [first, last] = input.split("-");
      return { first: Number(first), last: Number(last) };
    });
}

function isValid(id: string) {
  const length = id.length;
  if (length % 2 !== 0) {
    return true;
  }

  const firstHalf = id.slice(0, length / 2);
  const secondHalf = id.slice(length / 2);
  if (firstHalf !== secondHalf) {
    return true;
  }

  return false;
}

function main() {
  const ranges = parseInput();
  let sum = 0;

  for (const range of ranges) {
    for (let i = range.first; i <= range.last; i++) {
      if (isValid(i.toString())) {
        continue;
      }
      sum += i;
    }
  }

  console.log(sum);
}

main();
