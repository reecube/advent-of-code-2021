import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { Dictionary } from '../../model/Dictionary';

const DAYS = 256;

const FISH_SIZE = 8;

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: number[]): Result {
  const state: Dictionary<number> = {};

  for (let i = 0; i <= FISH_SIZE; i++) {
    state[i] = 0;
  }

  input.forEach(it => state[it] += 1);

  for (let i = 0; i < DAYS; i++) {
    const zero = state[0];

    for (let j = 0; j < FISH_SIZE; j++) {
      state[j] = state[j + 1];
    }

    state[6] += zero;
    state[8] = zero;
  }

  let total = 0;

  Object.values(state).forEach(it => total += it);

  return total
}
