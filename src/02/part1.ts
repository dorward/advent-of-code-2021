import { readFile } from 'fs/promises';

class Sub {
  public depth: number;
  public position: number;

  constructor() {
    this.depth = 0;
    this.position = 0;
  }

  forward(distance: number): void {
    this.position += distance;
    process.stdout.write(`forward ${distance} goes to ${this.position}\n`);
  }

  up(distance: number): void {
    this.depth -= distance;
    process.stdout.write(`up ${distance} goes to ${this.depth}\n`);
  }

  down(distance: number): void {
    this.depth += distance;
    process.stdout.write(`down ${distance} goes to ${this.depth}\n`);
  }
}

type Direction = 'forward' | 'up' | 'down';

(async () => {
  const input = await readFile(__dirname + '/input', 'utf-8');
  const instructions = input.split('\n').filter(Boolean);
  const sub = new Sub();
  instructions.forEach((instruction: string) => {
    const [direction, distance] = instruction.split(' ');
    sub[direction as Direction](+distance);
  });
  process.stdout.write(
    `${sub.position} * ${sub.depth} = ${sub.depth * sub.position}\n`
  );
})();
