import { readFile } from 'fs/promises';

class Sub {
  public depth: number;
  public position: number;
  public aim: number;

  constructor() {
    this.depth = 0;
    this.position = 0;
    this.aim = 0;
  }

  forward(distance: number): void {
    this.position += distance;
    this.depth += this.aim * distance;
    process.stdout.write(`forward ${distance} goes to ${this.position}\n`);
    process.stdout.write(`depth goes to ${this.depth}\n`);
  }

  up(adjustment: number): void {
    this.aim -= adjustment;
    process.stdout.write(`up ${adjustment} sets aim to ${this.aim}\n`);
  }

  down(adjustment: number): void {
    this.aim += adjustment;
    process.stdout.write(`down ${adjustment} sets aim to ${this.aim}\n`);
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
