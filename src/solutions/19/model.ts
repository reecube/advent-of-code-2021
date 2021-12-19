export interface Scanner {
  readonly line: string;
  readonly name: string;
  readonly id: string;
  readonly entries: number[][];
}
