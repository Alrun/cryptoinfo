export function sorting(arr = [], sortBy, reverse = false) {
  const sortedArr = arr.sort((a, b) => {
    // console.log(a[sortBy]);

    if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
      if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
        return 1;
      }
      if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
        return -1;
      }
      return 0;
    }
    if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
      return a[sortBy] - b[sortBy];
    }
    return console.error(`Not valid format data ${ a } or ${ b } for sorting!`);
  });

  if (reverse) {
    return sortedArr.reverse()
  }

  return sortedArr;
}