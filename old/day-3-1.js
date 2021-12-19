const items = document.body.innerText.split('\n').map(line => line.split('').map(it => parseInt(it))).filter(it => it.length);

const sum = items[0].map(() => 0);

items.forEach(item => {
  for (let i = 0; i < sum.length; i++) {
    sum[i] += item[i];
  }
});

const max = Math.floor(items.length / 2);

const gamma = sum.map(it => (it >= max) ? 1 : 0).join('');
const gammaRate = parseInt(gamma, 2);

const epsilon = sum.map(it => (it <= max) ? 1 : 0).join('');
const epsilonRate = parseInt(epsilon, 2);

console.log(gammaRate * epsilonRate);
