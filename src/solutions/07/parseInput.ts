export function parseInput(input: string): number[] {
  return input.trim().split(',').filter(it => it.length).map(it => parseInt(it));
}
