/***
 * @name doOnceInTime
 * @description 让一函数在一定的时间内只执行最后一次。本意是使用了 lodash-es 的 debounce 防抖函数，不知道是理解错误还是使用问题。
 *              防抖函数并不是想象中那样，在我设置的时间内只执行最后一次。而是同样会执行很多次，这并不是我所希望的。所以写了这个函数。
 * @param1 fn 一个执行函数
 * @params2 wait 时间范围
 * */

type DoOnceInTimeType<T extends (...args: any[]) => any> = (fn: T, wait: number) => T

let doOnceInTimer: ReturnType<typeof setTimeout> | undefined
export const doOnceInTime: DoOnceInTimeType<any> = (fn, wait) => {
  const doOnceInTimeFunc = function (...args: any[]) {
    clearTimeout(doOnceInTimer)
    doOnceInTimer = setTimeout(() => {
      fn(...args)
    }, wait)
  }

  return doOnceInTimeFunc
}
