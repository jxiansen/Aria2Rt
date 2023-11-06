// 所有的方法
const allMethods = [
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

class Client {
  constructor(url, secret) {
    this.url = url;
    this.secret = secret;
    this.messageQueue = [];
    this.messageId = 0;
    this.connected = false;
    this.messagePromise = {};

    this.ws = new WebSocket(url);

    this.ws.onopen = (event) => {
      this.connected = true;
      console.log("连接开启");
      this.sendQueueMessage();
    };

    this.ws.onclose = (event) => {
      console.log("连接关闭");
    };

    this.ws.onerror = (event) => {
      console.log("连接错误");
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const messageId = data.id;
        if (messageId && this.messagePromise[messageId]) {
          this.messagePromise[messageId].resolve(data);
          delete this.messagePromise[messageId];
        }
      } catch (e) {
        console.log(e);
      }
    };
  }

  generateId() {
    return this.messageId++;
  }

  generateMessage(methodName, messageId, args) {
    return {
      jsonrpc: "2.0",
      id: messageId,
      method: methodName,
      params: [`token:${this.secret}`, ...args],
    };
  }

  send(methodName, ...args) {
    const messageId = this.generateId();
    const message = this.generateMessage(methodName, messageId, args);

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const promise = new Promise((resolve, reject) => {
        this.messagePromise[messageId] = { resolve, reject };
      });
      this.ws.send(JSON.stringify(message));
      return promise;
    } else {
      // 连接未建立，将消息放入队列中
      return new Promise((resolve, reject) => {
        this.messageQueue.push({ methodName, args, resolve, reject });
      });
    }
  }

  sendQueueMessage() {
    for (const { methodName, args, resolve, reject } of this.messageQueue) {
      this.send(methodName, ...args)
        .then(resolve)
        .catch(reject);
    }
    this.messageQueue = [];
  }
}

const wsClient = new Client(
  "ws://116.62.32.11:6800/jsonrpc",
  "75fe9843c50a37c116ab"
);

export default wsClient;
