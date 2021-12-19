const items = document.body.innerText.split('\n').map(line => line.split('').map(it => parseInt(it))).filter(it => it.length);

const calcSum = (subset) => {
  const sum = subset[0].map(() => 0);

  subset.forEach(item => {
    for (let i = 0; i < sum.length; i++) {
      sum[i] += item[i];
    }
  });

  return sum;
};

const size = items[0].length;

let subset;

subset = items;
for (let i = 0; i < size; i++) {
  const sum = calcSum(subset);

  const max = Math.floor(subset.length / 2);

  const bit = (sum[i] >= max) ? 1 : 0;

  subset = subset.filter(it => it[i] === bit);

  if (subset.length === 1) break;
}
if (subset.length !== 1) {
  console.error(subset);
  throw new Error('Unexpected result!');
}
const oxygenGeneratorRating = subset[0].join('');
const oxygenGeneratorRatingDec = parseInt(oxygenGeneratorRating, 2);

subset = items;
for (let i = 0; i < size; i++) {
  const sum = calcSum(subset);

  const max = Math.floor(subset.length / 2);

  const bit = (sum[i] < max) ? 1 : 0;

  subset = subset.filter(it => it[i] === bit);

  if (subset.length === 1) break;
}
if (subset.length !== 1) {
  console.error(subset);
  throw new Error('Unexpected result!');
}
const scrubberRating = subset[0].join('');
const scrubberRatingDec = parseInt(scrubberRating, 2);

const lifeSupportRating = oxygenGeneratorRatingDec * scrubberRatingDec;

console.log(lifeSupportRating);
