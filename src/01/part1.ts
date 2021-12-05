import { readFile } from 'fs/promises';

(async () => {
  const input = await readFile(__dirname + '/input', 'utf-8');
  const depths = input.split('\n').filter(Boolean);
  let increases = 0;
  depths.reduce((prev, depth) => {
    if (+prev < +depth) increases++;
    return depth;
  });
  process.stdout.write(`${increases}\n`);
})();
