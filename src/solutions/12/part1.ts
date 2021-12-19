import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { Path } from './model';
import { Dictionary } from '../../model/Dictionary';

export const tests: Test[] = [
  {
    input: 'start-A\n' +
      'start-b\n' +
      'A-c\n' +
      'A-b\n' +
      'b-d\n' +
      'A-end\n' +
      'b-end',
    expected: 10,
  },
  {
    input: 'dc-end\n' +
      'HN-start\n' +
      'start-kj\n' +
      'dc-start\n' +
      'dc-HN\n' +
      'LN-dc\n' +
      'HN-end\n' +
      'kj-sa\n' +
      'kj-HN\n' +
      'kj-dc',
    expected: 19,
  },
  {
    input: 'fs-end\n' +
      'he-DX\n' +
      'fs-he\n' +
      'start-DX\n' +
      'pj-DX\n' +
      'end-zg\n' +
      'zg-sl\n' +
      'zg-pj\n' +
      'pj-he\n' +
      'RW-he\n' +
      'fs-DX\n' +
      'pj-RW\n' +
      'zg-RW\n' +
      'start-pj\n' +
      'he-WI\n' +
      'zg-he\n' +
      'pj-fs\n' +
      'start-RW',
    expected: 226,
  },
  // TODO: Implement this
];

export function solve(input: Path[]): Result {
  const pathMap: Dictionary<string[]> = {};

  for (const path of input) {
    if (!pathMap.hasOwnProperty(path.from)) pathMap[path.from] = [];
    if (!pathMap.hasOwnProperty(path.to)) pathMap[path.to] = [];

    pathMap[path.from].push(path.to);
    pathMap[path.to].push(path.from);
  }

  const smallCaves: string[] = [];
  for (const [cave, directions] of Object.entries(pathMap)) {
    if (directions.length !== 1) continue;

    smallCaves.push(cave);
  }

  console.log(pathMap, smallCaves);

  // TODO: continue here

  return 0;
}
