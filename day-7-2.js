(() => {
  const crabs = document.body.innerText.trim().split(',').filter(it => it.length).map(it => parseInt(it));

  let sum = 0;
  for (const crab of crabs) {
    sum += crab;
  }

  const startPosition = Math.round(sum / crabs.length);

  function calcFuel(position) {
    let totalFuel = 0;

    for (const crab of crabs) {
      const distance = Math.abs(crab - position);

      let fuel = 0;
      for (let i = 0; i < distance; i++) {
        fuel += i + 1;
      }

      totalFuel += fuel;
    }

    return totalFuel;
  }

  function findPosition(position) {
    const positionFuel = calcFuel(position);
    const positionUpFuel = calcFuel(position + 1);
    const positionDownFuel = calcFuel(position - 1);

    const diffUp = positionUpFuel - positionFuel;
    const diffDown = positionDownFuel - positionFuel;

    if (diffDown < 0) return findPosition(position - 1);

    if (diffUp < 0) return findPosition(position + 1);

    return [position, positionFuel];
  }

  return findPosition(startPosition);
})();
