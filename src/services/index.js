import wsClient from "./client";

// 获取应用的全局状态
export function getGlobalStat() {
  return wsClient.send("aria2.getGlobalStat");
}

// 获取正在活动的下载列表信息
export function tellActive() {
  return wsClient.send("aria2.tellActive");
}

export function tellStopped(params) {
  return wsClient.send("aria2.tellStopped", ...params);
}

export function getVersion() {
  return wsClient.send("aria2.getVersion");
}
