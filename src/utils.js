/**
 * Compares strings to sort
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
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

/**
 * Compares numbers to sort
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function sortNum(a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
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
 * @param {array.<{object}>} arr
 * @param {string} key - key with number
 * @returns {number}
 */
export function sum(arr, key) {
  return arr.reduce((acc, cur) => {
    if (!isNaN(cur[key])) {
      acc += cur[key];
    }
    return acc;
  }, 0);
}

export function lightenDarkenColor(color, percent) {
  let num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;

  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}