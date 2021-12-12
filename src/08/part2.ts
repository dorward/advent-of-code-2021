import { readFile } from 'fs/promises';

type NumberToWires = Record<number, string>;
type WiresToNumber = Record<string, number>;

const format_segment = (segment: string) => segment.split('').sort().join('');
const format_side = (side: string) =>
  side.trim().split(' ').map(format_segment);
const format_line = (line: string) => line.trim().split('|').map(format_side);

const getSupersetWithNumberOfWires = (
  input: string[],
  number_of_wires: number,
  subset: string
) =>
  input.find((wiring) => {
    if (wiring.length !== number_of_wires) return false;
    const wires = wiring.split('');
    const has_all_from_sub = subset
      .split('')
      .every((wire) => wires.includes(wire));
    return has_all_from_sub;
  });

const getDifference = (subset: string, superset: string) => {
  const sub = subset.split('');
  const sup = superset.split('');
  return sup.filter((wire) => !sub.includes(wire)).join('');
};

(async () => {
  const input = await readFile(process.argv[2], 'utf-8');
  const data = input.trim().split('\n').map(format_line);
  const numbers = data.map((line) => {
    const [input, output] = line;
    const map: NumberToWires = {};
    map[1] = input.find((wiring) => wiring.length === 2);
    map[4] = input.find((wiring) => wiring.length === 4);
    map[7] = input.find((wiring) => wiring.length === 3);
    map[8] = input.find((wiring) => wiring.length === 7);
    // 3 is the only 5 segment number which includes all the segments from 7
    map[3] = getSupersetWithNumberOfWires(input, 5, map[7]);
    // 9 has everything 3 has plus top_left
    map[9] = getSupersetWithNumberOfWires(input, 6, map[3]);
    const remaining_after_nine = input.filter(
      (wiring) => !Object.values(map).includes(wiring)
    );
    map[0] = getSupersetWithNumberOfWires(remaining_after_nine, 6, map[1]);
    map[6] = remaining_after_nine.find(
      (wiring) => wiring.length === 6 && wiring !== map[0]
    );
    const remaining_after_zero = remaining_after_nine.filter(
      (wiring) => !Object.values(map).includes(wiring)
    );
    const top_left = getDifference(map[3], map[9]);
    map[2] = remaining_after_zero.find((wire) => !wire.includes(top_left));
    map[5] = remaining_after_zero.find((wire) => wire.includes(top_left));

    const wires_to_number = Object.entries(map).reduce(
      (acc, [number, wire]) => {
        acc[wire] = +number;
        return acc;
      },
      {} as WiresToNumber
    );

    const number = +output.map((wires) => wires_to_number[wires]).join('');
    return number;
  });

  const total = numbers.reduce((acc, number) => acc + number, 0);
  process.stdout.write(`Total: ${total}\n`);
})();
