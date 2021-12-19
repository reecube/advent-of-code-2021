import { Test } from '../../model/Test';
import { Result } from '../../model/Result';

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: number[]): Result {
  let result = 0;

  for (let i = 1; i < input.length - 2; i++) {
    const A = input[i + 0] + input[i + 1] + input[i + 2];
    const B = input[i - 1] + input[i + 0] + input[i + 1];
    if (A > B) result++;
  }

  return result;
}
