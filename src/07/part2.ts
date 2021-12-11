import { readFile } from 'fs/promises';

(async () => {
  const input = await readFile(process.argv[2], 'utf-8');
  const startingPositions = input.split(',').map(Number);
  const [max, min] = [
    Math.max(...startingPositions),
    Math.min(...startingPositions)
  ];
  let best_day = <number>null;
  let best_score = Infinity;
  for (let target = min; target <= max; target++) {
    const fuelCost = startingPositions
      .slice(0)
      .reduce((total_fuel, start, index, arr) => {
        const steps_for_this_one = Math.abs(target - start);
        const fuel_for_this_one =
          0.5 * (steps_for_this_one * (steps_for_this_one + 1));
        const new_total = total_fuel + fuel_for_this_one;
        if (new_total > best_score) {
          // We are over the limit already
          arr.splice(1); // Kill the array to abort early
        }
        return new_total;
      }, 0);
    if (fuelCost < best_score) {
      best_score = fuelCost;
      best_day = target;
    }
    process.stdout.write(`${target}: ${fuelCost}\n`);
  }
  process.stdout.write(`Fin: ${best_day} costs ${best_score}\n`);
})();
