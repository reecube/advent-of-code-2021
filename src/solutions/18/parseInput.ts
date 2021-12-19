import { parseLines } from '../../helper/parse';
import { ComplexNestedArray } from './model';

export function parseInput(input: string): ComplexNestedArray {
  const lines = parseLines(input);

  const result: any[] = [];

  for (const line of lines) {
    result.push(JSON.parse(line));
  }

  return result;
}
