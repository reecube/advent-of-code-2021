(() => {
  const lines = document.body.innerText.split('\n');

  const scannerList = [];

  let currentScanner = null;
  for (const line of lines) {
    if (typeof line !== 'string' || !line.length) continue;

    const match = line.match(/^--- (?<name>[a-z]*?) (?<id>[0-9]*?) ---$/);

    if (match) {
      if (currentScanner) scannerList.push(currentScanner);

      currentScanner = {
        line: line,
        name: match.groups.name,
        id: match.groups.id,
        entries: [],
      };

      continue;
    }

    if (!currentScanner) throw new Error('Unexpected state!');

    const instructions = line.split(',').map(it => parseInt(it));

    currentScanner.entries.push(instructions);
  }

  // TODO: Implement this

  return scannerList;
})();
