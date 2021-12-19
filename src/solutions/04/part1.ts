import { Test } from '../../model/Test';
import { Result } from '../../model/Result';
import { verbose } from '../../helper/logger';

const BOARD_SIZE = 5;

export const tests: Test[] = [
  // Implemented without TDD
];

export function solve(input: string[]): Result {
  const firstLine = input.shift();

  if (!firstLine) throw new Error('Invalid first line!');

  const instructions = firstLine.split(',').map(it => parseInt(it));

  // Delete empty line
  input.shift();

  const bingoBoards = [];

  const parseLine = (line: string) => {
    const fields = [];

    for (let i = 0; i < line.length; i += 3) {
      const nbr = line.substr(i, 2);

      fields.push({
        nbr: parseInt(nbr),
        gone: false,
      });
    }

    if (fields.length !== BOARD_SIZE) throw new Error('Invalid line!');

    return fields;
  };

  for (let i = 0; i < input.length; i += BOARD_SIZE + 1) {
    bingoBoards.push([
      parseLine(input[i + 0]),
      parseLine(input[i + 1]),
      parseLine(input[i + 2]),
      parseLine(input[i + 3]),
      parseLine(input[i + 4]),
    ]);
  }

  for (const instruction of instructions) {
    for (const bingoBoard of bingoBoards) {
      bingoBoard.forEach(row => row.forEach(field => field.gone = field.gone || field.nbr === instruction));

      let found = false;

      // Check rows
      for (let i = 0; i < BOARD_SIZE; i++) {
        let count = 0;
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (!bingoBoard[i][j].gone) continue;
          count += 1;
        }
        if (count < BOARD_SIZE) continue;
        found = true;
        break;
      }

      // Check cols
      for (let i = 0; i < BOARD_SIZE; i++) {
        let count = 0;
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (!bingoBoard[j][i].gone) continue;
          count += 1;
        }
        if (count < BOARD_SIZE) continue;
        found = true;
        break;
      }

      if (!found) continue;

      let sum = 0;

      for (const bbRow of bingoBoard) {
        for (const field of bbRow) {
          if (field.gone) continue;

          sum += field.nbr;
        }
      }

      verbose(bingoBoard, sum, instruction);

      return sum * instruction;
    }
  }

  throw new Error('Invalid instructions!');
}
