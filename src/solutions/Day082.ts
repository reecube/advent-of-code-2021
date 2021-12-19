import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';
import { Dictionary } from '../model/Dictionary';

const DEBUG = false;

interface Instruction {
  uniqueSignalPatterns: string[];
  outputValue: string[];
}

function diff(a: any, b: any): any {
  if (!Array.isArray(a)) a = Array.from(a);
  if (!Array.isArray(b)) b = Array.from(b);

  // https://stackoverflow.com/a/33034768
  return a
    .filter((x: any) => !b.includes(x))
    .concat(b.filter((x: any) => !a.includes(x)));
}

export default class DefaultSolution implements Solution<Instruction[]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): Instruction[] {
    return input.split('\n').filter(it => it.length).map(it => {
      const parts = it.split(' | ');

      if (parts.length !== 2) throw new Error(`Invalid input '${it}'!`);

      const uniqueSignalPatterns = parts[0].split(' ').map(it => it.split('').sort().join(''));

      if (uniqueSignalPatterns.length !== 10) throw new Error(`Invalid input '${it}'!`);

      const outputValue = parts[1].split(' ').map(it => it.split('').sort().join(''));

      if (outputValue.length !== 4) throw new Error(`Invalid input '${it}'!`);

      return {
        uniqueSignalPatterns: uniqueSignalPatterns,
        outputValue: outputValue,
      };
    });
  }

  solve(input: Instruction[]): Result {
    const digitDecoder: Dictionary<number> = {
      'abcefg': 0, // A: -d: 0
      'cf': 1, // UNIQUE
      'acdeg': 2, // B: -bf: 0
      'acdfg': 3, // B: -be: 1
      'bcdf': 4, // UNIQUE
      'abdfg': 5, // B: -ce: 2
      'abdefg': 6, // A: -c: 1
      'acf': 7, // UNIQUE
      'abcdefg': 8, // UNIQUE
      'abcdfg': 9, // A: -e: 2
    };

    let totalSum = 0;

    for (const instruction of input) {
      const usp = instruction.uniqueSignalPatterns;

      const baseDecoder: Dictionary<any> = {};
      const smartDecoder: Dictionary<Dictionary<any>> = {
        '1': {},
        '2': {},
      };

      for (const [code, digit] of Object.entries(digitDecoder)) {
        const options = usp.filter(it => it.length === code.length);

        if (options.length === 1) {
          baseDecoder[options[0]] = code;

          continue;
        }

        for (const option of options) {
          if (!baseDecoder.hasOwnProperty(option)) baseDecoder[option] = [];

          baseDecoder[option].push(code);

          const missingLetters = diff('abcdefg', option).join('');
          smartDecoder[missingLetters.length][option] = missingLetters;
        }
      }

      const decoder: Dictionary<any> = {};

      for (const [from, to] of Object.entries(baseDecoder)) {
        if (Array.isArray(to)) continue;

        decoder[from] = to;
      }

      for (const [from, missingLetter] of Object.entries(smartDecoder['1'])) {
        const id = Object.values(smartDecoder['2']).filter(it => it.includes(missingLetter));

        switch (id.length) {
          case 0:
            decoder[from] = 'abcefg';
            break;
          case 1:
            decoder[from] = 'abdefg';
            break;
          case 2:
            decoder[from] = 'abcdfg';
            break;
          default:
            throw new Error('Unexpected input!');
        }
      }

      for (const [from, missingLetters] of Object.entries(smartDecoder['2'])) {
        const id = Object.values(smartDecoder['1']).filter(it => missingLetters.includes(it));

        switch (id.length) {
          case 0:
            decoder[from] = 'acdeg';
            break;
          case 1:
            decoder[from] = 'acdfg';
            break;
          case 2:
            decoder[from] = 'abdfg';
            break;
          default:
            throw new Error('Unexpected input!');
        }
      }

      const ov = instruction.outputValue.map(it => digitDecoder[decoder[it]]).join('');

      totalSum += parseInt(ov);
    }

    return totalSum;
  }
}
