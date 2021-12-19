export function parseInput(input: string): number[][] {
  return input.split('\n').filter(it => it.length).map(line => {
    return line.split('').map(it => parseInt(it));
  });
}
