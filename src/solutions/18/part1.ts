import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { ComplexNestedArray } from './model';

export const tests: Test[] = [
  {
    input: '[[1,2],[[3,4],5]]',
    expected: 143,
  },
  {
    input: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]',
    expected: 1384,
  },
  {
    input: '[[[[1,1],[2,2]],[3,3]],[4,4]]',
    expected: 445,
  },
  {
    input: '[[[[3,0],[5,3]],[4,4]],[5,5]]',
    expected: 791,
  },
  {
    input: '[[[[5,0],[7,4]],[5,5]],[6,6]]',
    expected: 1137,
  },
  {
    input: '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]',
    expected: 3488,
  },
  {
    input: '[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]',
    expected: 4140,
  },
  {
    input: '[9,1]',
    expected: 29,
  },
  {
    input: '[1,9]',
    expected: 21,
  },
  {
    input: '[[9,1],[1,9]]',
    expected: 129,
  },
  // TODO: Implement this
];

function magnitude(input: any): number {
  if (typeof input === 'number') return input;

  if (!Array.isArray(input)) throw new Error('Invalid input!');

  if (input.length !== 2) throw new Error('Not a pair!');

  let left = input[0];
  let right = input[1];

  if (Array.isArray(left)) left = magnitude(left);
  if (Array.isArray(right)) right = magnitude(right);

  return 3 * left + 2 * right;
}

export function solve(input: ComplexNestedArray): Result {
  let result = 0;

  for (const line of input) {
    result += magnitude(line);
  }

  // TODO: Implement this

  return result;
}
