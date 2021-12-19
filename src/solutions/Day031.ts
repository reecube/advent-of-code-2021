import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

interface Item {
  readonly direction: string;
  readonly amount: number;
}

export default class DefaultSolution implements Solution<Item[]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): Item[] {
    return input.split('\n').filter(it => it.length).map(it => {
      const parts = it.split(' ');
      return { direction: parts[0], amount: parseInt(parts[1]) };
    });
  }

  solve(input: Item[]): Result {
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
}
