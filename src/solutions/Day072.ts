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
    let sum = 0;
    for (const crab of input) {
      sum += crab;
    }

    const startPosition = Math.round(sum / input.length);

    function calcFuel(position: number) {
      let totalFuel = 0;

      for (const crab of input) {
        const distance = Math.abs(crab - position);

        let fuel = 0;
        for (let i = 0; i < distance; i++) {
          fuel += i + 1;
        }

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
