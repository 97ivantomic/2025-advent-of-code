import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Direction = "L" | "R";

class Rotation {
  constructor(
    public direction: Direction,
    public amount: number,
  ) {}
}

class Dial {
  constructor(
    public min = 0,
    public max = 99,
    public position = 50,
  ) {}

  turn(direction: Direction) {
    if (direction === "L") {
      this.turnLeft();
      return;
    }
    this.turnRight();
  }

  private turnLeft() {
    if (this.position === this.min) {
      this.position = this.max;
      return;
    }
    this.position -= 1;
  }

  private turnRight() {
    if (this.position === this.max) {
      this.position = this.min;
      return;
    }
    this.position += 1;
  }
}

function parseInput(): Rotation[] {
  const content = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .trim();
  const lines = content.split(/\r?\n/);
  const rotations = lines.map(
    (line) =>
      new Rotation(line[0] as Direction, Number(line.match(/\d+/)?.[0])),
  );

  return rotations;
}

function main() {
  const dial = new Dial();
  const rotations = parseInput();
  const hits = {
    endOfTurn: 0,
    endOfRotation: 0,
  };

  for (const rotation of rotations) {
    for (let i = 0; i < rotation.amount; i++) {
      dial.turn(rotation.direction);

      if (dial.position === 0) {
        hits.endOfTurn += 1;
      }
    }

    if (dial.position === 0) {
      hits.endOfRotation += 1;
    }
  }

  console.log(hits);
}

main();
