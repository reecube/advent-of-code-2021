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

  parse(input: string): Item[] {
    return input.split('\n').filter(it => it.length).map(it => {
      const parts = it.split(' ');
      return { direction: parts[0], amount: parseInt(parts[1]) };
    });
  }

  solve(input: Item[]): Result {
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
}
