export function parseLines(input: string): string[] {
  return input.split('\n').filter(it => it.length);
}

export function parseLinesAsNumbers(input: string): number[] {
  return parseLines(input).map(it => parseInt(it));
}
