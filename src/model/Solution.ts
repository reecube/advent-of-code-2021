import { Test } from './Test';
import { Result } from './Result';

export interface Solution<T> {
  readonly tests: Test[];

  parse(input: string): T;

  solve(input: T): Result;
}
