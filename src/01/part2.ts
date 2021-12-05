import { readFile } from 'fs/promises';

(async () => {
  const input = await readFile(__dirname + '/input', 'utf-8');
  const depths = input.split('\n').filter(Boolean);
  let increases = 0;
  const window = <number[]>[];
  let prevSum = 0;
  depths.forEach((depth, index) => {
    window.push(+depth);
    if (index < 3) return;
    if (window.length > 3) {
      window.shift();
    }
    const sum = window.reduce((a, b) => a + b, 0);
    if (prevSum < sum) increases++;
    prevSum = sum;
  });

  process.stdout.write(`${increases}\n`);
})();
