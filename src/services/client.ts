import { RpcHttp } from "./rpc";

const ariaClient = new RpcHttp.Client({
  host: "116.62.32.11",
  port: 6800,
  path: "/root/downloads",
  auth: {
    secret: "27fb23016387f3abfff5",
  },
});

export default ariaClient;
