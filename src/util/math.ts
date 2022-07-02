export function roundInt(num: number) {
  return Math.round(num);
}

export function roundTenth(num: number) {
  return Math.round(10 * num) / 10;
}

export function roundHundredth(num: number) {
  return Math.round(100 * num) / 100;
}
