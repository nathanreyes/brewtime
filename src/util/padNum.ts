export default function padNum(num: number, digits = 2) {
  return num <= 9999 ? `000${num}`.slice(-digits) : num;
}
