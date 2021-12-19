import { Result } from './Result';

export interface Test {
  readonly name?: string;
  readonly input: string;
  readonly expected: Result;
}
