class Client {
  ws: WebSocket;
  id: number;
  readyPromise: Promise<Client>;

  callbacks: {
    // 该对象纪录每一个id的请求对应的回调函数
    // 内容为 id => callback
    [id: number]: (data: any) => void;
  } = {};

  constructor(public url: string, public secret: string) {
    this.ws = new WebSocket(url);
    this.id = 1;
    // 监听发送消息事件,将事件中的数据解析出来
    this.ws.onmessage = (e) => {
      console.log("收到消息");
      try {
        const data = JSON.parse(e.data);
        const id = data.id;
        if (id) {
          const callback = this.callbacks[id];
          delete this.callbacks[id];
          callback(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    this.ws.onopen = (e) => {
      console.log(`连接开启`);
    };
    this.ws.onclose = (e) => {
      console.log("连接关闭");
    };
    this.ws.onerror = (e) => {
      console.log("连接错误");
    };
    this.readyPromise = new Promise((resolve) => {
      this.ws.onopen = () => {
        resolve(this);
      };
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
  Client.prototype[method] = function (...args: any[]) {
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

const client = new Client(
  "ws://81.68.209.144:6800/jsonrpc",
  "987f21ba8bde8bdaedc7"
);

export default client;
