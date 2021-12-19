(() => {
  const DEBUG = true;

  let width = 0;
  let height = 0;

  function parseNbr(input, isX) {
    const nbr = parseInt(input);

    if (isX) width = Math.max(width, nbr + 1);
    else height = Math.max(height, nbr + 1);

    return nbr;
  }

  const instructions = document.body.innerText.split('\n').filter(it => it.length).map(it => {
    const parts = it.split(' -> ');

    if (parts.length !== 2) throw new Error(`Invalid input '${it}'!`);

    const from = parts[0].split(',');
    const to = parts[1].split(',');
    return {
      x1: parseNbr(from[0], true),
      y1: parseNbr(from[1], false),
      x2: parseNbr(to[0], true),
      y2: parseNbr(to[1], false),
    };
  });

  const canvas = [];

  for (let x = 0; x < width; x++) {
    const row = [];
    for (let y = 0; y < height; y++) {
      row.push(0);
    }
    canvas.push(row);
  }

  for (const instruction of instructions) {
    const x1 = instruction.x1;
    const x2 = instruction.x2;
    const y1 = instruction.y1;
    const y2 = instruction.y2;

    if (!(x1 === x2 || y1 === y2)) continue;

    if (DEBUG) console.log(x1, y1, '->', x2, y2);

    const diffX = x2 - x1;
    const diffY = y2 - y1;

    const absDiffX = Math.abs(diffX);
    const absDiffY = Math.abs(diffY);

    const factorX = (diffX > 0) ? 1 : ((diffX < 0) ? -1 : 0);
    const factorY = (diffY > 0) ? 1 : ((diffY < 0) ? -1 : 0);

    const distance = Math.max(absDiffX, absDiffY);

    for (let i = 0; i <= distance; i++) {
      const x = x1 + i * factorX;
      const y = y1 + i * factorY;

      canvas[y][x] += 1;
    }
  }

  let overlaps = 0;
  for (const row of canvas) {
    for (const pixel of row) {
      if (pixel <= 1) continue;

      overlaps += 1;
    }
  }
  console.log(overlaps);

  if (!DEBUG) return;

  // Draw
  const lines = [];
  for (const row of canvas) {
    const line = [];
    for (const pixel of row) {
      let char = '.';

      if (pixel > 0) {
        char = (pixel <= 9) ? pixel : '#';
      }

      line.push(char)
    }
    lines.push(line.join(''));
  }

  console.log(lines.join('\n'));
})();
