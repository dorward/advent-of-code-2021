import { readFile } from 'fs/promises';

const finalDay = +process.argv[3];

(async () => {
  const input = await readFile(process.argv[2], 'utf-8');
  let counters = input.trim().split(',').map(Number);
  for (let day = 1; day <= finalDay; day++) {
    let newFish = 0;
    counters = counters.map((counter) => {
      counter--;
      if (counter < 0) {
        newFish++;
        counter = 6;
      }
      return counter;
    });
    while (newFish) {
      counters.push(8);
      newFish--;
    }
    process.stdout.write(`Day ${day}: ${counters.length} fish\n`);
  }
  process.stdout.write(`Fin\n`);
})();
