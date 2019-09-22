/**
 * Compares strings to sort
 *
 * @param {String} a
 * @param {String} b
 * @returns {Number}
 */
export function sortStr(a, b) {
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  return 0;
}

export function decimalFormat(number, decimals = 0, decPoint = ',', thousandsSep = ' ') {
  let s;

  number = +String(number).replace(/[^0-9+\-Ee.]/g, '');

  s = decimals
      ? String(Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)).split('.')
      : String(Math.round(number)).split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSep);
  }

  if (!!s[1] && (s[1].length < decimals)) {
    s[1] += new Array(decimals - s[1].length + 1).join('0');
  }

  return s.join(decPoint);
}

/**
 * The sum of the numbers
 *
 * @param {Array.<{Object}>} arr
 * @param {String} key - key with number
 * @returns {Number}
 */
export function sum(arr, key) {
  return arr.reduce((acc, cur) => {
    acc += cur[key];
    return acc;
  }, 0);
}