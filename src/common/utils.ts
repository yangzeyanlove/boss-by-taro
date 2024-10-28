/**
 * 拼接字符串
 * @param arr
 * @param separator
 * @returns
 */
export const JoinString = (arr: string[], separator: string = '·') => {
  // 过滤空字符串
  arr = arr.filter(item => item);
  return arr.join(separator);
};
