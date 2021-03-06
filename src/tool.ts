import { useWebSocket } from "ahooks";
import { chunk, set, get, invert, assign } from "lodash";
import React, { useState, useEffect, useCallback } from "react";
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

/**
 * 从files对象中获得文件名
 */
export function getNameFromFiles(files: object[]) {
  try {
    // @ts-ignore
    if (files.path.length) {
      // @ts-ignore
      return files.path.replace("/root/downloads/", "");
    }
    // @ts-ignore
    const url = files.uris[0].uri;
    if (url.length) {
      const arr = url.split("/");
      return arr.pop();
    }
  } catch (err) {
    console.log(`解析文件名出错`);
    return "错误名";
  }
}

// 将数组的扁平结构转换成树状结构,返回对象
export function convertArrToTree(arr: any) {
  const obj = {};
  let id = 0;
  let prePath;
  for (let item of arr) {
    const per = ((item.completedLength / item.length) * 100).toFixed(2);
    const size = sizeTostr(item.length);
    const temp = item.path.split("/").splice(4);
    const fileName = temp.pop();
    const path = temp.join(".");
    if (path !== prePath) {
      id = 0;
    }
    let newPath = path + "." + id;
    if (!path.length) {
      // @ts-ignore
      newPath = id;
    }
    set(
      obj,
      newPath,
      `文件名：${
        fileName ? fileName : item.path.split("/").reverse()[0]
      }\xa0\xa0\xa0\xa0\xa0\xa0进度：${per}%\xa0\xa0\xa0\xa0\xa0\xa0文件大小：${size}`
    );
    id++;
    prePath = path;
  }
  return getTreeData(obj);
}

// 遍历对象数的所有叶子节点并调换键值顺序
function getTreeData(obj: object) {
  const pathArr: string[] = [];
  for (let key in obj) {
    const newPathArr = [...pathArr, key];
    // 当前键对应的值
    let val = get(obj, newPathArr);
    // 如果是数字就调换 key-val值
    // @ts-ignore
    if (!isNaN(key)) {
      // @ts-ignore
      obj[val] = key;
      // @ts-ignore
      delete obj[key];
      continue;
    }
    // 如果是数组就遍历
    if (Array.isArray(val)) {
      set(obj, newPathArr, invert(assign({}, val)));
      continue;
    }
    // 如果是对象就继续递归执行
    getTreeData(val);
  }
  return obj;
}
