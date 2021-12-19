import { Signal } from './model';

export function parseInput(input: string): Signal[] {
  return input.split('\n').filter(it => it.length).map(it => {
    const parts = it.split(' | ');

    if (parts.length !== 2) throw new Error(`Invalid input '${it}'!`);

    const uniqueSignalPatterns = parts[0].split(' ').map(it => it.split('').sort().join(''));

    if (uniqueSignalPatterns.length !== 10) throw new Error(`Invalid input '${it}'!`);

    const outputValue = parts[1].split(' ').map(it => it.split('').sort().join(''));

    if (outputValue.length !== 4) throw new Error(`Invalid input '${it}'!`);

    return {
      uniqueSignalPatterns: uniqueSignalPatterns,
      outputValue: outputValue,
    };
  });
}
