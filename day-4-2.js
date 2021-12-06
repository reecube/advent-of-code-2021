(() => {
  const BOARD_SIZE = 5;

  const lines = document.body.innerText.split('\n');

  const instructions = lines.shift().split(',').map(it => parseInt(it));

  // Delete empty line
  lines.shift();

  const bingoBoards = [];

  const parseLine = (line) => {
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

  for (let i = 0; i < lines.length; i += BOARD_SIZE + 1) {
    bingoBoards.push({
      won: false,
      instruction: false,
      rows: [
        parseLine(lines[i + 0]),
        parseLine(lines[i + 1]),
        parseLine(lines[i + 2]),
        parseLine(lines[i + 3]),
        parseLine(lines[i + 4]),
      ],
    });
  }

  const winners = [];

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

  return console.log(sum * winner.instruction);
})();
