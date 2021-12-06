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
    bingoBoards.push([
      parseLine(lines[i + 0]),
      parseLine(lines[i + 1]),
      parseLine(lines[i + 2]),
      parseLine(lines[i + 3]),
      parseLine(lines[i + 4]),
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

      console.log(bingoBoard, sum, instruction);

      return console.log(sum * instruction);
    }
  }

  throw new Error('Invalid instructions!');
})();
