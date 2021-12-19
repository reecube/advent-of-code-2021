import { Test } from '../../model/Test';
import { Result } from '../../model/Result';

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: number[]): Result {
  let result = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) result++;
  }

  return result;
}
