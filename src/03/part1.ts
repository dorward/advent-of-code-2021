import { readFile } from 'fs/promises';

(async () => {
  const input = await readFile(__dirname + '/input', 'utf-8');
  const binaries = input.split('\n').filter(Boolean);
  const oneCount: number[] = [];
  const zeroCount: number[] = [];
  binaries.forEach((binary, line) => {
    binary.split('').forEach((bit, index) => {
      if (!line) {
        oneCount[index] = zeroCount[index] = 0;
      }
      if (bit === '1') oneCount[index]++;
      if (bit === '0') zeroCount[index]++;
    });
  });

  const gammaBits: number[] = [];
  const epsilonBits: number[] = [];
  oneCount.forEach((ones, index) => {
    const zeros = zeroCount[index];
    gammaBits.push(ones > zeros ? 1 : 0);
    epsilonBits.push(ones < zeros ? 1 : 0);
  });
  const gammaDecimal = parseInt(gammaBits.join(''), 2);
  const epsilonDecimal = parseInt(epsilonBits.join(''), 2);

  process.stdout.write(
    `gammaBits: ${gammaBits.join('')}\nepsilonBits: ${epsilonBits.join('')}\n`
  );
  process.stdout.write(
    `gammaDecimal: ${gammaDecimal}\nepsilonDecimal: ${epsilonDecimal}\n`
  );
  process.stdout.write(`power consumption: ${gammaDecimal * epsilonDecimal}\n`);
})();
