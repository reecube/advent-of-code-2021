import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

interface Scanner {
  readonly line: string;
  readonly name: string;
  readonly id: string;
  readonly entries: number[][];
}

export default class DefaultSolution implements Solution<Scanner[]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): Scanner[] {
    const lines =  input.split('\n').filter(it => it.length);

    const result: Scanner[] = [];

    let currentScanner: Scanner | null= null;
    for (const line of lines) {
      const match = line.match(/^--- (?<name>[a-z]*?) (?<id>[0-9]*?) ---$/);

      if (match && match.groups) {
        if (currentScanner) result.push(currentScanner);

        currentScanner = {
          line: line,
          name: match.groups.name,
          id: match.groups.id,
          entries: [],
        };

        continue;
      }

      if (!currentScanner) throw new Error('Unexpected state!');

      const instructions = line.split(',').map(it => parseInt(it));

      currentScanner.entries.push(instructions);
    }

    return result;
  }

  solve(input: Scanner[]): Result {

    // TODO: Implement this
    throw new Error('Not implemented yet!');
  }
}
