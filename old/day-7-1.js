(() => {
  const crabs = document.body.innerText.trim().split(',').filter(it => it.length).map(it => parseInt(it));

  const sortedCrabs = [...crabs].sort();
  const centerPosition = Math.ceil(sortedCrabs.length * 0.5);
  const startPosition = sortedCrabs[centerPosition];

  function calcFuel(position) {
    let totalFuel = 0;

    for (const crab of crabs) {
      const fuel = Math.abs(crab - position);

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
