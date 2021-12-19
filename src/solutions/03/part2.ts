import { Test } from '../../model/Test';
import { Result } from '../../model/Result';

export const tests: Test[] = [
  // Implemented without TDD
];

function calcSum(subset: number[][]) {
  const sum = subset[0].map(() => 0);

  subset.forEach(item => {
    for (let i = 0; i < sum.length; i++) {
      sum[i] += item[i];
    }
  });

  return sum;
};

export function solve(input: number[][]): Result {
  const size = input[0].length;

  let subset;

  subset = input;
  for (let i = 0; i < size; i++) {
    const sum = calcSum(subset);

    const max = Math.floor(subset.length / 2);

    const bit = (sum[i] >= max) ? 1 : 0;

    subset = subset.filter(it => it[i] === bit);

    if (subset.length === 1) break;
  }
  if (subset.length !== 1) {
    console.error(subset);
    throw new Error('Unexpected result!');
  }
  const oxygenGeneratorRating = subset[0].join('');
  const oxygenGeneratorRatingDec = parseInt(oxygenGeneratorRating, 2);

  subset = input;
  for (let i = 0; i < size; i++) {
    const sum = calcSum(subset);

    const max = Math.floor(subset.length / 2);

    const bit = (sum[i] < max) ? 1 : 0;

    subset = subset.filter(it => it[i] === bit);

    if (subset.length === 1) break;
  }
  if (subset.length !== 1) {
    console.error(subset);
    throw new Error('Unexpected result!');
  }
  const scrubberRating = subset[0].join('');
  const scrubberRatingDec = parseInt(scrubberRating, 2);

  return oxygenGeneratorRatingDec * scrubberRatingDec;
}
