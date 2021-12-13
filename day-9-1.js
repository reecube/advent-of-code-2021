(() => {
  const matrix = document.body.innerText.split('\n').filter(line => line.length).map(line => {
    return line.split('').map(it => parseInt(it));
  });

  const size = matrix.length;

  let result = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let counterLower = 0;

      for (let y2 = -1; y2 <= 1; y2++) {
        const relY = y + y2;

        const absY2 = Math.abs(y2);

        for (let x2 = -1; x2 <= 1; x2++) {
          const relX = x + x2;

          // Skip diagonal ones
          if (absY2 === Math.abs(x2)) continue;

          if (relY < 0 || relY >= size || relX < 0 || relX >= size) {
            counterLower += 1;
            continue;
          }

          const diff = matrix[y][x] - matrix[relY][relX];

          if (diff >= 0) continue;

          counterLower += 1;
        }
      }

      if (counterLower < 4) continue;

      const riskLevel = 1 + matrix[y][x];

      result += riskLevel;
    }
  }

  return result;
})();
