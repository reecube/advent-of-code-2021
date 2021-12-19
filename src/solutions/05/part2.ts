import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { Move } from './model';

const DEBUG = false;

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: Move[]): Result {
  const canvas = [];

  let width = 0;
  let height = 0;

  for (const move of input) {
    width = Math.max(width, move.x1 + 1, move.x2 + 1);
    height = Math.max(height, move.y1 + 1, move.y2 + 1);
  }

  for (let x = 0; x < width; x++) {
    const row = [];
    for (let y = 0; y < height; y++) {
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
