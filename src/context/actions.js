export const test = () => ({
  type: 'TEST'
});

export const change = e => ({
  value: e.target.value,
  type: 'CHANGE',
});