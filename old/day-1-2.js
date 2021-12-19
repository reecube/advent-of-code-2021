const nbrs = document.body.innerText.split('\n').map(it => parseInt(it));
counter = 0;
for (let i = 1; i < nbrs.length - 2; i++) {
  const A = nbrs[i + 0] + nbrs[i + 1] + nbrs[i + 2];
  const B = nbrs[i - 1] + nbrs[i + 0] + nbrs[i + 1];
  if (A > B) counter++;
}
console.log(counter);
