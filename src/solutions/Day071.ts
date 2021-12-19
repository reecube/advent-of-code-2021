import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

export default class DefaultSolution implements Solution<number[]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): number[] {
    return input.trim().split(',').filter(it => it.length).map(it => parseInt(it));
  }

  solve(input: number[]): Result {
    const sortedCrabs = [...input].sort();
    const centerPosition = Math.ceil(sortedCrabs.length * 0.5);
    const startPosition = sortedCrabs[centerPosition];

    function calcFuel(position: number) {
      let totalFuel = 0;

      for (const crab of input) {
        const fuel = Math.abs(crab - position);

        totalFuel += fuel;
      }

      return totalFuel;
    }

    function findPosition(position: number): number[] {
      const positionFuel = calcFuel(position);
      const positionUpFuel = calcFuel(position + 1);
      const positionDownFuel = calcFuel(position - 1);

      const diffUp = positionUpFuel - positionFuel;
      const diffDown = positionDownFuel - positionFuel;

      if (diffDown < 0) return findPosition(position - 1);

      if (diffUp < 0) return findPosition(position + 1);

      return [position, positionFuel];
    }

    return findPosition(startPosition)[1];
  }
}
