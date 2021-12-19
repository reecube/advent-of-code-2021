import { parseLines } from '../../helper/parse';
import { Path } from './model';

export function parseInput(input: string): Path[] {
  return parseLines(input).map(line => {
    const parts = line.split('-');

    return {
      from: parts[0],
      to: parts[1],
    };
  });
}
