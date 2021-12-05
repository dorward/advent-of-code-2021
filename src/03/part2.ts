import { readFile } from 'fs/promises';

const mostCommonBit = (bytes: string[][], index: number) => {
  let ones = 0;
  let zeros = 0;
  bytes.forEach((byte) => {
    if (byte[index] === '1') {
      ones++;
    } else {
      zeros++;
    }
  });
  if (ones >= zeros) {
    return '1';
  }
  return '0';
};

(async () => {
  const input = await readFile(__dirname + '/input', 'utf-8');
  const binaries = input
    .split('\n')
    .filter(Boolean)
    .map((string) => string.split(''));

  let oxygen: string[][] = [...binaries];
  let scrubber: string[][] = [...binaries];

  binaries[0].forEach((_, index) => {
    if (oxygen.length > 1) {
      const oxygenBit = mostCommonBit(oxygen, index);
      oxygen = oxygen.filter((byte) => byte[index] === oxygenBit);
    }

    if (scrubber.length > 1) {
      const scrubberBit = mostCommonBit(scrubber, index) === '1' ? '0' : '1';
      scrubber = scrubber.filter((byte) => byte[index] === scrubberBit);
    }
    process.stdout.write(
      `After index ${index} the data set has been reduced to ${oxygen.length} oxygen and ${scrubber.length} scrubber\n`
    );
  });

  const oxygenDecimal = parseInt(oxygen[0].join(''), 2);
  const scrubberDecimal = parseInt(scrubber[0].join(''), 2);

  process.stdout.write(`Oxygen ${oxygen[0].join('')} = ${oxygenDecimal}\n`);
  process.stdout.write(
    `Scrubber ${scrubber[0].join('')} = ${scrubberDecimal}\n`
  );
  process.stdout.write(
    `Life support rating ${oxygenDecimal * scrubberDecimal}\n`
  );
})();
