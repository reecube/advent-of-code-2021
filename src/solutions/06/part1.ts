import { Test } from '../../model/Test';
import { Result } from '../../model/Result';

const DEBUG = false;

const DAYS = 80;

const maxLength = DAYS.toString().length;

function debug(label: string, state: number[]) {
  if (!DEBUG) return;

  if (state.length >= 30) return console.log(label, 'length:', state.length);

  console.log(label, state.join(','));
}

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: number[]): Result {
  let state = [...input];

  debug('Initial state:', state);

  for (let i = 0; i < DAYS; i++) {
    let zeroCounter = 0;

    state = state.map(entry => {
      if (entry > 0) return entry - 1;

      zeroCounter += 1;

      return 6;
    });

    for (let j = 0; j < zeroCounter; j++) {
      state.push(8);
    }

    debug(`After ${(i + 1).toString().padStart(maxLength, ' ')} days:`, state);
  }

  return state.length;
}
