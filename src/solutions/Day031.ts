import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

export default class DefaultSolution implements Solution<number[][]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): number[][] {
    return input
      .split('\n')
      .filter(it => it.length)
      .map(
        line => line.split('').map(it => parseInt(it)),
      );
  }

  solve(input: number[][]): Result {
    const sum = input[0].map(() => 0);

    input.forEach(item => {
      for (let i = 0; i < sum.length; i++) {
        sum[i] += item[i];
      }
    });

    const max = Math.floor(input.length / 2);

    const gamma = sum.map(it => (it >= max) ? 1 : 0).join('');
    const gammaRate = parseInt(gamma, 2);

    const epsilon = sum.map(it => (it <= max) ? 1 : 0).join('');
    const epsilonRate = parseInt(epsilon, 2);

    return gammaRate * epsilonRate;
  }
}
