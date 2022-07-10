export default class Aria2Client {
  ws: WebSocket;
  id: number;
  readyPromise: Promise<Aria2Client>;

  callbacks: {
    // 该对象纪录每一个id的请求对应的回调函数
    // 内容为 id => callback
    [id: number]: (data: any) => void;
  } = {};

  constructor(
    public ip: string = "127.0.0.1",
    public port: number | string,
    public secret: string
  ) {
    var url = `ws://${ip}:${port}/jsonrpc`;
    this.ws = new WebSocket(url);
    this.id = 1;

    // 监听发送消息事件,将事件中的数据解析出来
    this.ws.addEventListener("message", (e) => {
      var data = JSON.parse(e.data);
      var id = data.id;
      if (id) {
        var callback = this.callbacks[id];
        callback(data);
        // delete this.callbacks[id];
      } else {
        // 说明是事件如： onDownloadStart, onDownloadError
      }
    });

    /**
     * 构建出这个client的时候就创建一个 Promise ,这个Promise等待监听到 webSocket Open连接成功事件的时候 resolve
     */
    // 监听webSocket建立成功事件
    this.readyPromise = new Promise((resolve) => {
      this.ws.addEventListener("open", (e) => {
        resolve(this);
      });
    });
  }

  ready() {
    return this.readyPromise;
  }

  addUri(...args: any[]) {
    return new Promise((resolve, reject) => {
      var id = this.id++;
      function callback(data: any) {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.result);
        }
      }

      this.callbacks[id] = callback;
      this.ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          id: id,
          method: "aria2.addUri",
          params: [`token:${this.secret}`, ...args],
        })
      );
    });
  }
}

// 所有的方法
var allMethods = [
  "aria2.addUri",
  "aria2.addTorrent",
  "aria2.getPeers",
  "aria2.addMetalink",
  "aria2.remove",
  "aria2.pause",
  "aria2.forcePause",
  "aria2.pauseAll",
  "aria2.forcePauseAll",
  "aria2.unpause",
  "aria2.unpauseAll",
  "aria2.forceRemove",
  "aria2.changePosition",
  "aria2.tellStatus",
  "aria2.getUris",
  "aria2.getFiles",
  "aria2.getServers",
  "aria2.tellActive",
  "aria2.tellWaiting",
  "aria2.tellStopped",
  "aria2.getOption",
  "aria2.changeUri",
  "aria2.changeOption",
  "aria2.getGlobalOption",
  "aria2.changeGlobalOption",
  "aria2.purgeDownloadResult",
  "aria2.removeDownloadResult",
  "aria2.getVersion",
  "aria2.getSessionInfo",
  "aria2.shutdown",
  "aria2.forceShutdown",
  "aria2.getGlobalStat",
  "aria2.saveSession",
  "system.multicall",
  "system.listMethods",
  "system.listNotifications",
];

// 将所有方法数组挂载到这个类的原型上，方便后面调用
allMethods.forEach((methodName) => {
  var method = methodName.split(".")[1];
  // @ts-ignore
  Aria2Client.prototype[method] = function (...args: any[]) {
    return new Promise((resolve, reject) => {
      var id = this.id++;
      function callback(data: any) {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.result);
        }
      }

      this.callbacks[id] = callback;

      this.ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          id: id,
          method: methodName,
          params: [`token:${this.secret}`, ...args],
        })
      );
    });
  };
});
