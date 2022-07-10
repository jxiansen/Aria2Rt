import { chunk } from "lodash";

/**
 * 网速转换,将BPS转换为适当的维度单位
 * @param {string}
 * @return {string}
 */
export function convertSpeed(speed: string) {
  if (speed.length < 4) {
    return `${speed}B/s`;
  }
  if (speed.length >= 4 && speed.length < 6) {
    return `${(parseInt(speed) / 1000).toFixed(2)}KB/s`;
  }
  if (speed.length >= 6 && speed.length < 9) {
    return `${(parseInt(speed) / 1000000).toFixed(2)}MB/s`;
  }
}

/**
 * 文件大小转换
 * @param {string}
 * @return {string}
 */
export function sizeTostr(size: string) {
  if (+size < 1024) {
    return Number(size + ".00").toFixed(2) + "B";
  }
  if (+size < 1024 ** 2) {
    return (+size / 1024).toFixed(2) + "KB";
  }
  if (+size < 1024 ** 3) {
    return (+size / 1024 ** 2).toFixed(2) + "MB";
  }
  if (+size < 1024 ** 4) {
    return (+size / 1024 ** 3).toFixed(2) + "GB";
  }
}

/**
 * 根据速度和文件总大小求出剩余时间
 * @param {string}
 * @param {string}
 * @return {string}
 */
export function formatSeconds(speed: string, totalLength: string) {
  const seconds = +totalLength / +speed;
  if (seconds > 24 * 60 * 60 || speed === "0") {
    return "超过一天";
  }
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds / 60) % 60);
  var s = Math.floor(seconds % 60);
  return h + "小时" + m + "分钟" + s + "秒";
}

/**
 * 转换字符串,将区块信息从十六进制转换成二进制的信息
 * @param {string}
 * @return {array}
 */

export const convert = (char: string) => {
  let res = "";
  for (let item of char) {
    let temp = parseInt(item, 16).toString(2);
    if (temp.length < 4) {
      res += temp.padStart(4, "0");
    } else {
      res += temp;
    }
  }
  // 每一个元素都是一横,从下往上，从左往右最后二维数组需要翻转一下
  return chunk([...res], 90);
};
