import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

export default class DefaultSolution implements Solution<number[][]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): number[][] {
    return input.split('\n').filter(it => it.length).map(line => {
      return line.split('').map(it => parseInt(it));
    });
  }

  solve(input: number[][]): Result {
    const sizeV = input.length;
    const sizeH = input[0].length;

    const localLows = [];

    for (let y = 0; y < sizeV; y++) {
      for (let x = 0; x < sizeH; x++) {
        let counterLower = 0;

        for (let y2 = -1; y2 <= 1; y2++) {
          const relY = y + y2;

          const absY2 = Math.abs(y2);

          for (let x2 = -1; x2 <= 1; x2++) {
            const relX = x + x2;

            // Skip diagonal ones
            if (absY2 === Math.abs(x2)) continue;

            if (relY < 0 || relY >= sizeV || relX < 0 || relX >= sizeH) {
              counterLower += 1;
              continue;
            }

            const diff = input[y][x] - input[relY][relX];

            if (diff >= 0) continue;

            counterLower += 1;
          }
        }

        if (counterLower < 4) continue;

        localLows.push({
          x: x,
          y: y,
          riskLevel: 1 + input[y][x],
        })
      }
    }

    function countBasin(x: number, y: number) {
      let counter = 0;

      let size = 1;

      for (let y2 = -1; y2 <= 1; y2++) {
        const relY = y + y2;

        const absY2 = Math.abs(y2);

        for (let x2 = -1; x2 <= 1; x2++) {
          const relX = x + x2;

          // Skip diagonal ones
          if (absY2 === Math.abs(x2)) continue;

          if (relY < 0 || relY >= sizeV || relX < 0 || relX >= sizeH) {
            counter += 1;
            continue;
          }

          const diff = input[relY][relX] - input[y][x];

          if (diff !== 1) continue;

          counter += 1;

          size += countBasin(relX, relY);
        }
      }

      if (counter < 3) return 0;

      return size;
    }

    const basins = [];

    for (const localLow of localLows) {
      const basin = countBasin(localLow.x, localLow.y);

      basins.push(basin);

      console.log(localLow.x, localLow.y, basin);
    }

    basins.sort((a, b) => b - a);

    console.log(basins);

    let result = 1;

    for (let i = 0; i < 3; i++) {
      result *= basins[i];
    }

    return result;
  }
}
