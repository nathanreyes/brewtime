export default function pick<T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> {
  return keys.reduce((result: any, key) => {
    if (obj && obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}
