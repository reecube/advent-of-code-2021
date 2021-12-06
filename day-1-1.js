const nbrs = document.body.innerText.split('\n').map(it => parseInt(it));
counter = 0;
for (let i = 1; i < nbrs.length; i++) {
  if (nbrs[i] > nbrs[i - 1]) counter++;
}
console.log(counter);
