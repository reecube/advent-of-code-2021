import { Solution } from '../model/Solution';
import { Test } from '../model/Test';
import { Result } from '../model/Result';

const BOARD_SIZE = 5;

interface BoardCell {
  nbr: number;
  gone: boolean;
}

interface BingoBoard {
  won: boolean;
  instruction: number | false;
  rows: BoardCell[][];
}

export default class DefaultSolution implements Solution<string[]> {
  readonly tests: Test[] = [
    // Implemented without TDD
  ];

  parse(input: string): string[] {
    return input
      .split('\n');
  }

  solve(input: string[]): Result {
    const firstLine = input.shift();

    if (!firstLine) throw new Error('Invalid first line!');

    const instructions = firstLine.split(',').map(it => parseInt(it));

    // Delete empty line
    input.shift();

    const bingoBoards: BingoBoard[] = [];

    const parseLine = (line: string): BoardCell[] => {
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
      bingoBoards.push({
        won: false,
        instruction: false,
        rows: [
          parseLine(input[i + 0]),
          parseLine(input[i + 1]),
          parseLine(input[i + 2]),
          parseLine(input[i + 3]),
          parseLine(input[i + 4]),
        ],
      });
    }

    const winners: BingoBoard[] = [];

    for (const instruction of instructions) {
      for (const bingoBoard of bingoBoards) {
        if (bingoBoard.won) continue;

        bingoBoard.rows.forEach(row => row.forEach(field => field.gone = field.gone || field.nbr === instruction));

        let found = false;

        // Check rows
        for (let i = 0; i < BOARD_SIZE; i++) {
          let count = 0;
          for (let j = 0; j < BOARD_SIZE; j++) {
            if (!bingoBoard.rows[i][j].gone) continue;
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
            if (!bingoBoard.rows[j][i].gone) continue;
            count += 1;
          }
          if (count < BOARD_SIZE) continue;
          found = true;
          break;
        }

        if (!found) continue;

        bingoBoard.won = true;
        bingoBoard.instruction = instruction;
        winners.push(bingoBoard);
      }
    }

    if (!winners.length) throw new Error('Invalid instructions!');

    const winner = winners[winners.length - 1];

    let sum = 0;

    for (const bbRow of winner.rows) {
      for (const field of bbRow) {
        if (field.gone) continue;

        sum += field.nbr;
      }
    }

    console.log(winner, sum);

    return sum * (winner.instruction || 0);
  }
}
