import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { Instruction } from './model';

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: Instruction[]): Result {
  let v = 0;
  let h = 0;
  let aim = 0;

  for (const item of input) {
    const amount = item.amount;
    switch (item.direction) {
      case 'forward':
        h += amount;
        v += aim * amount;
        break;
      case 'up':
        aim -= amount;
        break;
      case 'down':
        aim += amount;
        break;
      case '':
        continue;
      default:
        throw new Error(`Unexpected direction '${item.direction}'!`);
    }
  }

  return v * h;
}
