import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { Dictionary } from '../../model/Dictionary';

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: string[][]): Result {
  const validInstructions = [
    {
      open: '(',
      close: ')',
      points: 1,
    },
    {
      open: '[',
      close: ']',
      points: 2,
    },
    {
      open: '{',
      close: '}',
      points: 3,
    },
    {
      open: '<',
      close: '>',
      points: 4,
    },
  ];

  const instructionMap: Dictionary<any> = {};

  for (const validInstruction of validInstructions) {
    instructionMap[validInstruction.open] = validInstruction;
  }

  const scores = [];

  lineLoop: for (const instructions of input) {
    const stack = [];

    instructionLoop: for (const instruction of instructions) {
      for (const validInstruction of validInstructions) {
        if (instruction === validInstruction.open) {
          stack.push(instruction);
          continue instructionLoop;
        }

        if (instruction !== validInstruction.close) {
          continue;
        }

        const lastInstruction = stack.pop();

        if (lastInstruction === validInstruction.open) continue instructionLoop;

        const expected = validInstructions.filter(it => it.open === lastInstruction);

        console.error(`Expected '${expected[0].close}', but found '${instruction}' instead.`);

        continue lineLoop;
      }

      throw new Error(`Invalid instruction '${instruction}'!`);
    }

    const incomplete = stack.map(it => instructionMap[it]).reverse();

    let lineScore = 0;

    for (const entry of incomplete) {
      lineScore *= 5;
      lineScore += entry.points;
    }

    console.log(incomplete.map(it => it.close).join(''), lineScore, 'total points');

    scores.push(lineScore);
  }

  scores.sort((a, b) => b - a);

  return scores[Math.round(scores.length / 2) - 1];
}
