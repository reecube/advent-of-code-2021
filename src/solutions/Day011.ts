import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

export default class DefaultSolution implements Solution<number[]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): number[] {
    return input.split('\n').filter(it => it.length).map(it => parseInt(it));
  }

  solve(input: number[]): Result {
    let result = 0;

    for (let i = 1; i < input.length; i++) {
      if (input[i] > input[i - 1]) result++;
    }

    return result;
  }
}
