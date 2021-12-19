import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { Signal } from './model';
import { Dictionary } from '../../model/Dictionary';
import { verbose } from '../../helper/logger';

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: Signal[]): Result {
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

    verbose(ovValue.join(''), filtered.join(''));

    totalCount += filtered.length;
  }

  return totalCount;
}
