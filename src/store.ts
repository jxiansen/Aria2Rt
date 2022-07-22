import resso from "resso";
// 声明数据 store 方便子组件引入
const store = resso({
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
  curGid: [], // 当前选中的gid 任务编号
  selectedAll: false, // 是否选中所有的任务
});

export default store;
