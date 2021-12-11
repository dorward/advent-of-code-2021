import { readFile } from 'fs/promises';

const finalDay = +process.argv[3];

type NewFishOnWhichDay = Record<number, number>;

(async () => {
  const input = await readFile(process.argv[2], 'utf-8');
  let counters: NewFishOnWhichDay = input
    .trim()
    .split(',')
    .map(Number)
    .reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as NewFishOnWhichDay);

  for (let day = 1; day <= finalDay; day++) {
    counters = Object.entries(counters).reduce(
      (acc, [breedingDay, fishCount]) => {
        if (+breedingDay === day - 1) {
          const dayForNewFish = day + 8;
          acc[+dayForNewFish] = (acc[+dayForNewFish] || 0) + fishCount;

          const nextDayForTheseFish = day + 6;
          acc[+nextDayForTheseFish] =
            (acc[+nextDayForTheseFish] || 0) + fishCount;
        } else {
          acc[+breedingDay] = (acc[+breedingDay] || 0) + fishCount;
        }
        return acc;
      },
      {} as NewFishOnWhichDay
    );
    const count = Object.values(counters).reduce((acc, curr) => acc + curr, 0);
    process.stdout.write(`Day ${day}: ${count} fish\n`);
  }
  process.stdout.write(`Fin\n`);
})();
