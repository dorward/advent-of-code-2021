import { readFile } from 'fs/promises';

type Cell = number;
type Row = Cell[];
type Grid = Row[];

class Vents {
  public grid: Grid = [];
  addLine(x1: number, y1: number, x2: number, y2: number) {
    // Make sure the grid is big enough
    this.checkPoint(x1, y1);
    this.checkPoint(x2, y2);
    // Determine if we are going horizontal or vertical
    const isHorizontal = y1 === y2;
    const isVertical = x1 === x2;
    if (isHorizontal) {
      this.addHorizontalRow(y1, x1, x2);
    } else if (isVertical) {
      this.addVerticalColumn(x1, y1, y2);
    } else {
      this.addDiagonalColumn(x1, y1, x2, y2);
    }
  }
  checkPoint(x: number, y: number) {
    while (y >= this.grid.length) this.grid.push([]);
    this.grid.forEach((row) => {
      while (x >= row.length) row.push(0);
    });
  }
  addHorizontalRow(y: number, x1: number, x2: number) {
    [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
    const row = this.grid[y];
    for (let x = x1; x <= x2; x++) row[x] += 1;
  }
  addVerticalColumn(x: number, y1: number, y2: number) {
    [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];
    for (let y = y1; y <= y2; y++) this.grid[y][x] += 1;
  }
  addDiagonalColumn(x1: number, y1: number, x2: number, y2: number) {
    const xMod = x1 > x2 ? -1 : 1;
    const yMod = y1 > y2 ? -1 : 1;
    for (
      let x = x1, y = y1;
      x !== x2 + xMod || y !== y2 + yMod;
      x += xMod, y += yMod
    ) {
      this.grid[y][x] += 1;
    }
  }
  countPointsOfOverlap() {
    return this.grid.reduce((sum, row) => {
      return sum + row.reduce((sum, entry) => sum + (entry > 1 ? 1 : 0), 0);
    }, 0);
  }
  toString() {
    return this.grid
      .map((row) => row.map((entry) => entry || '.').join(''))
      .join('\n');
  }
}

(async () => {
  const input = await readFile(process.argv[2], 'utf-8');
  const lines = input.trim().split('\n');
  const coordinates = lines.map((line) =>
    line.match(/(\d+),(\d+) -> (\d+),(\d+)/)
  );
  const vents = new Vents();
  coordinates.forEach((line) => {
    const [x1, y1, x2, y2] = line.slice(1).map(Number);
    vents.addLine(x1, y1, x2, y2);
  });
  process.stdout.write(
    `${vents.toString()}\n\nPoints of overlap: ${vents.countPointsOfOverlap()}\n\n`
  );
})();
