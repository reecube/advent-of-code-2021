const items = document.body.innerText.split('\n').map(it => {
  const parts = it.split(' ');
  return {direction: parts[0], amount: parseInt(parts[1])};
});

let v = 0;
let h = 0;
let aim = 0;

for (const item of items) {
  const amount = item.amount;
  switch (item.direction) {
    case 'forward':
      h += amount;
      v += aim * amount;
      break;
    case 'up':
      aim -= amount;
      break;
    case 'down':
      aim += amount;
      break;
    case '':
      continue;
    default:
      throw new Error(`Unexpected direction '${item.direction}'!`);
  }
}

console.log(v * h);
