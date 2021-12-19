import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { Instruction } from './model';

export const tests: Test[] = [
  // Implemented without TDD
  {
    input: 'forward 5\n' +
      'down 5\n' +
      'forward 8\n' +
      'up 3\n' +
      'down 8\n' +
      'forward 2',
    expected: 150,
  },
];

export function solve(input: Instruction[]): Result {
  let v = 0;
  let h = 0;

  for (const item of input) {
    const amount = item.amount;
    switch (item.direction) {
      case 'forward':
        h += amount;
        break;
      case 'up':
        v -= amount;
        break;
      case 'down':
        v += amount;
        break;
      case '':
        continue;
      default:
        throw new Error(`Unexpected direction '${item.direction}'!`);
    }
  }

  return v * h;
}
