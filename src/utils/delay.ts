/**
 * 指定されたミリ秒（ms）の遅延を発生させる非同期関数です。
 *
 * @param ms - 待機する時間をミリ秒単位で指定します。
 *
 * @example
 * // 1秒待機
 * await delay(1000);
 */
export const delay = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));
