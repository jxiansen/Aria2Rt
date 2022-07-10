import Aria2Client from "./aria2-client";
import resso from "resso";
// 声明数据 store 方便子组件引入
const client = new Aria2Client("81.68.209.144", "6800", "987f21ba8bde8bdaedc7");
const store = resso({
  client, //客户端实例
  // 全局状态
  globalState: {
    downloadSpeed: "0",
    numActive: "0",
    numStopped: "0",
    numStoppedTotal: "0",
    numWaiting: "0",
    uploadSpeed: "0",
  },
  active: [],
});

export default store;
