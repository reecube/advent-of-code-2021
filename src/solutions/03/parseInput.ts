export function parseInput(input: string): number[][] {
  return input
    .split('\n')
    .filter(it => it.length)
    .map(
      line => line.split('').map(it => parseInt(it)),
    );
}
