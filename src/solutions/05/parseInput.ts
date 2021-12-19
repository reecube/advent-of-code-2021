import { Move } from './model';

export function parseInput(input: string): Move[] {
  return input.split('\n').filter(it => it.length).map(it => {
    const parts = it.split(' -> ');

    if (parts.length !== 2) throw new Error(`Invalid input '${it}'!`);

    const from = parts[0].split(',');
    const to = parts[1].split(',');
    return {
      x1: parseInt(from[0]),
      y1: parseInt(from[1]),
      x2: parseInt(to[0]),
      y2: parseInt(to[1]),
    };
  });
}
