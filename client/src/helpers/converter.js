export default (angka) => {
  let rupiah = '';
  const angkarev = angka.toString().split('').reverse().join('');
  for (let i = 0; i < angkarev.length; i += 1) if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`;

  return `Rp. ${rupiah.split('', rupiah.length - 1).reverse().join('')}`;
};
