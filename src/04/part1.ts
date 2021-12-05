import chalk from 'chalk';
import { readFile } from 'fs/promises';

type Cell = {
  value: number;
  checked: boolean;
};
type Row = Cell[];
type Board = Row[];

const createBoards = (numbers: number[], lines: string[]): Board[] => {
  const boards: Board[] = [[]];
  lines.forEach((line) => {
    if (line.match(/^\s*$/)) {
      if (boards[boards.length - 1].length !== 0) {
        boards.push([]);
      }
      return;
    }

    const row: Row = line
      .trim()
      .split(/\s+/)
      .map((string) => {
        // console.log(string);
        const cell = {
          value: +string,
          checked: false
        };

        return cell;
      });

    boards[boards.length - 1].push(row);
  });
  return boards;
};

const printBoards = (boards: Board[]): void => {
  boards.forEach((board: Board) => {
    board.forEach((row: Row) => {
      row.forEach((cell: Cell) => {
        const value = `${cell.value}`;
        const padded = value.padStart(5);
        const formatted = cell.checked
          ? chalk.green(padded)
          : chalk.red(padded);

        process.stdout.write(formatted);
      });
      process.stdout.write('\n');
    });
    process.stdout.write('\n');
  });
};

const checkNumberOnBoards = (boards: Board[], number: number): void => {
  boards.forEach((board: Board) => {
    board.forEach((row: Row) => {
      row.forEach((cell: Cell) => {
        if (cell.value === number) {
          cell.checked = true;
        }
      });
    });
  });
};

const checkForWin = (boards: Board[]): Board => {
  const winningBoard =
    boards.find((board) =>
      board.find((row) => row.every((cell) => cell.checked))
    ) ||
    boards.find((board) => {
      const rowLength = board[0].length;
      for (let i = 0; i < rowLength; i++) {
        if (board.every((row) => row[i].checked)) {
          return true;
        }
      }
      return false;
    });
  return winningBoard;
};

const showWin = (board: Board, number: number) => {
  const sumOfUncheckedInBoard = board.reduce((total, row) => {
    const sumOfUncheckedInRow = row.reduce((total, cell) => {
      if (cell.checked) {
        return total;
      }
      return total + cell.value;
    }, 0);
    return total + sumOfUncheckedInRow;
  }, 0);
  process.stdout.write(
    `${number} is a winner! The score is ${number} * ${sumOfUncheckedInBoard} = ${chalk.green(
      number * sumOfUncheckedInBoard
    )}\n\n\n`
  );
};

(async () => {
  const input = await readFile(process.argv[2], 'utf-8');
  const lines = input.trim().split('\n');
  const numbers = lines.shift().split(',').map(Number);
  const boards = createBoards(numbers, lines);
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    process.stdout.write(chalk.yellow(`Checking ${number}\n`));
    checkNumberOnBoards(boards, number);
    printBoards(boards);
    const win = checkForWin(boards);
    if (win) {
      showWin(win, number);
      break;
    }
  }
})();
