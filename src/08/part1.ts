import { readFile } from 'fs/promises';

const number_of_segments = {
  2: 1, // 1 has 2 segments
  7: 1, // 8 has 7 segments
  3: 1, // 7 has 3 segments
  4: 1 // 4 has 4 segments
};

(async () => {
  const input = await readFile(process.argv[2], 'utf-8');
  const data = input
    .trim()
    .split('\n')
    .map((line) => {
      const [input, output] = line.split('|');
      const output_segments = output.trim().split(' ');
      return output_segments;
    });
  const segments = data.flat();
  const number = segments.filter((segment) =>
    Object.keys(number_of_segments).includes(segment.length.toString())
  ).length;

  process.stdout.write(`Total: ${number}\n`);
})();
