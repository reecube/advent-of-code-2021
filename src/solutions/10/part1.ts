import { Test } from '../../model/Test';
import { Result } from '../../model/Result';

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: string[][]): Result {
  const validInstructions = [
    {
      open: '(',
      close: ')',
      points: 3,
    },
    {
      open: '[',
      close: ']',
      points: 57,
    },
    {
      open: '{',
      close: '}',
      points: 1197,
    },
    {
      open: '<',
      close: '>',
      points: 25137,
    },
  ];

  let totalPoints = 0;

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

        totalPoints += validInstruction.points;

        continue lineLoop;
      }

      throw new Error(`Invalid instruction '${instruction}'!`);
    }
  }

  return totalPoints;
}
