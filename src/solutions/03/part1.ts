import { Test } from '../../model/Test';
import { Result } from '../../model/Result';

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: number[][]): Result {
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
