import { Instruction } from './model';
import { parseLines } from '../../helper/parse';

export function parseInput(input: string): Instruction[] {
  return parseLines(input).map(it => {
    const parts = it.split(' ');

    return { direction: parts[0], amount: parseInt(parts[1]) };
  });
}
