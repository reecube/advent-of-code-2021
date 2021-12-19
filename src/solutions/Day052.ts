import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

const DEBUG = false;

interface Move {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
}

export default class DefaultSolution implements Solution<Move[]> {
  width = 0;
  height = 0;

  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  private parseNbr(input: string, isX: boolean) {
    const nbr = parseInt(input);

    if (isX) this.width = Math.max(this.width, nbr + 1);
    else this.height = Math.max(this.height, nbr + 1);

    return nbr;
  }

  parse(input: string): Move[] {
    return input.split('\n').filter(it => it.length).map(it => {
      const parts = it.split(' -> ');

      if (parts.length !== 2) throw new Error(`Invalid input '${it}'!`);

      const from = parts[0].split(',');
      const to = parts[1].split(',');
      return {
        x1: this.parseNbr(from[0], true),
        y1: this.parseNbr(from[1], false),
        x2: this.parseNbr(to[0], true),
        y2: this.parseNbr(to[1], false),
      };
    });
  }

  solve(input: Move[]): Result {
    const canvas = [];

    for (let x = 0; x < this.width; x++) {
      const row = [];
      for (let y = 0; y < this.height; y++) {
        row.push(0);
      }
      canvas.push(row);
    }

    for (const instruction of input) {
      const x1 = instruction.x1;
      const x2 = instruction.x2;
      const y1 = instruction.y1;
      const y2 = instruction.y2;

      if (DEBUG) console.log(x1, y1, '->', x2, y2);

      const diffX = x2 - x1;
      const diffY = y2 - y1;

      const absDiffX = Math.abs(diffX);
      const absDiffY = Math.abs(diffY);

      const factorX = (diffX > 0) ? 1 : ((diffX < 0) ? -1 : 0);
      const factorY = (diffY > 0) ? 1 : ((diffY < 0) ? -1 : 0);

      const distance = Math.max(absDiffX, absDiffY);

      for (let i = 0; i <= distance; i++) {
        const x = x1 + i * factorX;
        const y = y1 + i * factorY;

        canvas[y][x] += 1;
      }
    }

    let overlaps = 0;
    for (const row of canvas) {
      for (const pixel of row) {
        if (pixel <= 1) continue;

        overlaps += 1;
      }
    }

    if (!DEBUG) return overlaps;

    // Draw
    const lines: string[] = [];
    for (const row of canvas) {
      const line = [];
      for (const pixel of row) {
        let char: any = '.';

        if (pixel > 0) {
          char = (pixel <= 9) ? pixel : '#';
        }

        line.push(char)
      }
      lines.push(line.join(''));
    }

    console.log(lines.join('\n'));

    return overlaps;
  }
}
