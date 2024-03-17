import chunk from "lodash/chunk";
import set from "lodash/set";
import get from "lodash/get";
import invert from "lodash/invert";
import assign from "lodash/assign";

export function formatBytes(bytes) {
  const _bytes = parseInt(bytes);
  if (_bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(_bytes) / Math.log(k));
  return (_bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

// 计算下载进度
export function getPercent(completedLength, totalLength) {
  const per = ((completedLength / totalLength) * 100).toFixed(2);
  if (isNaN(per)) {
    return 0;
  }
  return per;
}

// 计算下载剩余时间
export function getRemainTime(completedLength, totalLength, downloadSpeed) {
  const remainBytes = totalLength - completedLength;
  if (downloadSpeed === 0) {
    return "剩余时间未知";
  }
  const remainTime = remainBytes / downloadSpeed;
  if (remainTime > 24 * 60 * 60) {
    return "超过一天";
  }
  var h = Math.floor(remainTime / 3600);
  var m = Math.floor((remainTime / 60) % 60);
  var s = Math.floor(remainTime % 60);
  return h + "小时" + m + "分钟" + s + "秒";
}

/**
 * 网速转换,将BPS转换为适当的维度单位
 * @param {string}
 * @return {string}
 */
export function convertSpeed(speed) {
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
export function sizeTostr(size) {
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
export function formatSeconds(speed, totalLength) {
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
export const convert = (char) => {
  if (typeof char !== "string") {
    return [];
  }
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
export function getNameFromFiles(files) {
  try {
    if (files.path.length) {
      return files.path.replace("/root/downloads/", "");
    }

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
export function convertArrToTree(arr) {
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
function getTreeData(obj) {
  const pathArr = [];
  for (let key in obj) {
    const newPathArr = [...pathArr, key];
    // 当前键对应的值
    let val = get(obj, newPathArr);
    // 如果是数字就调换 key-val值

    if (!isNaN(key)) {
      obj[val] = key;

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

export function decodePercentEncodedString(s) {
  if (!s) {
    return s;
  }

  var ret = "";

  for (var i = 0; i < s.length; i++) {
    var ch = s.charAt(i);

    if (ch === "%" && i < s.length - 2) {
      var code = s.substring(i + 1, i + 3);
      ret += String.fromCharCode(parseInt(code, 16));
      i += 2;
    } else {
      ret += ch;
    }
  }

  return ret;
}

// 将十六进制字符串转换为二进制字符串
export const hexToBinary = (hexString) => {
  let binaryString = "";
  for (let i = 0; i < hexString.length; i++) {
    const hexChar = hexString[i];
    let binaryChar = parseInt(hexChar, 16).toString(2);
    binaryChar = binaryChar.padStart(4, "0");
    binaryString += binaryChar;
  }
  return binaryString;
};

// 计算下载剩余时间
export function calculateRemainingTime(remainingLength, downloadSpeed) {
  if (!remainingLength || downloadSpeed === 0) {
    return "超过一天";
  }

  // 计算剩余时间（单位：秒）
  const remainingSeconds = remainingLength / downloadSpeed;

  // 格式化剩余时间
  const hours = remainingSeconds / 3600;
  const minutes = (remainingSeconds % 3600) / 60;
  const seconds = (remainingSeconds % 3600) % 60;

  if (hours > 24) {
    return "超过一天";
  }

  const _h = `${Math.trunc(hours)}`.padStart(2, "0");
  const _m = `${Math.trunc(minutes)}`.padStart(2, "0");
  const _s = `${Math.trunc(seconds)}`.padStart(2, "0");

  // 返回格式化后的剩余时间
  return [_h, _m, _s].join(":");
}

/**
 * Returns a human readable file size string from size in bytes.
 *
 * @param  {Number} size s
 * @return {String}
 */
export function formattedFileSize(size) {
  const i = size ? Math.floor(Math.log(size) / Math.log(1024)) : 0;

  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "KB", "MB", "GB", "TB"][i]
  );
}
