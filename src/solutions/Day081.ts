import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';
import { Dictionary } from '../model/Dictionary';

const DEBUG = false;

interface Signal {
  uniqueSignalPatterns: string[];
  outputValue: string[];
}

export default class DefaultSolution implements Solution<Signal[]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): Signal[] {
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

  solve(input: Signal[]): Result {
    const digitMap = {
      0: 6, // abc.efg
      1: 2, // ..c..f. UNIQUE
      2: 5, // a.cde.g
      3: 5, // a.cd.fg
      4: 4, // .bcd.f. UNIQUE
      5: 5, // ab.d.fg
      6: 6, // ab.defg
      7: 3, // a.c..f. UNIQUE
      8: 7, // abcdefg UNIQUE
      9: 6, // abcd.fg
    };

    let totalCount = 0;

    for (const instruction of input) {
      const usp = instruction.uniqueSignalPatterns;

      const uspMap: Dictionary<any[]> = {};

      for (const [digit, length] of Object.entries(digitMap)) {
        uspMap[digit] = usp.filter(it => it.length === length);
      }

      const invertedUspMap: Dictionary<any[]> = {};

      for (const [digit, combinations] of Object.entries(uspMap)) {
        for (const combination of combinations) {
          if (!invertedUspMap.hasOwnProperty(combination)) invertedUspMap[combination] = [];

          invertedUspMap[combination].push(digit);
        }
      }

      const ov = instruction.outputValue;

      const ovPossible = ov.map(it => invertedUspMap[it]);

      const ovValue = ovPossible.map(it => it.length === 1 ? it[0] : '?');

      const filtered = ovValue.filter(it => it !== '?');

      if (DEBUG) console.log(ovValue.join(''), filtered.join(''));

      totalCount += filtered.length;
    }

    return totalCount;
  }
}
