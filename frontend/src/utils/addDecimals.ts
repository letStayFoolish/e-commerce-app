export function addDecimals(num: number) {
  return Math.round((num * 100) / 100).toFixed(2);
}
