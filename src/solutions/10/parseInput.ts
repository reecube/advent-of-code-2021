export function parseInput(input: string): string[][] {
  return input.split('\n').filter(it => it.length).map(line => {
    return line.split('');
  });
}
