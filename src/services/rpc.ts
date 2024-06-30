import { v4 as uuid } from "uuid";
import axios from "axios";

import {
  IAria2ClientOptions,
  IJsonRPCResponse,
  IJsonRPCRequest,
  TAria2ClientMethodList,
  TAria2ClientNotificationList,
  IAria2ClientMulticallItem,
  TAria2ClientMulticallResult,
  Aria2ClientBaseClass,
  Aria2ClientSystemMethodsBaseClass,
  IAria2HttpClientOptions,
} from "./adapter";

import { btoa } from "./polyfill";

export namespace RpcHttp {
  /**
   * ### Aria2 Http Client
   *    **Events is not supported**
   */
  export class Client extends Aria2ClientBaseClass<IAria2HttpClientOptions> {
    /** @ignore  @internal */
    protected _options: IAria2ClientOptions & IAria2HttpClientOptions;
    /** @ignore  @internal */
    protected _system: SystemMethods;

    constructor(
      options: Readonly<IAria2ClientOptions & IAria2HttpClientOptions>
    ) {
      super();
      this._options = options;
      this._system = new SystemMethods(this);
    }

    public get system(): Aria2ClientSystemMethodsBaseClass<IAria2HttpClientOptions> {
      return this._system;
    }
    public async rawCall<T, R>(methods: string, ...args: T[]): Promise<R> {
      let id = uuid();
      let arg = [...args];
      if (this._options?.auth?.secret != undefined) {
        arg.unshift(("token:" + this._options.auth.secret) as unknown as T);
      }
      let url = `${this._options.protocol ?? "http"}://${this._options.host}:${
        this._options.port
      }/jsonrpc?method=${decodeURIComponent(methods)}&id=${decodeURIComponent(
        id
      )}&params=${btoa(JSON.stringify(arg))}`;
      let rsp = await axios(url, {
        method: "GET",
        ...this._options.fetchOptions,
      });
      let j: IJsonRPCResponse = rsp.data;
      if (j.error == undefined) {
        return j.result as unknown as R;
      } else {
        throw j.error;
      }
    }
    public async rawSend<T>(data: T): Promise<void> {
      throw new Error("Method not implemented.");
    }
    public async getCreateOptions(): Promise<
      Readonly<IAria2ClientOptions & IAria2HttpClientOptions>
    > {
      return this._options;
    }
  }
  export class SystemMethods extends Aria2ClientSystemMethodsBaseClass<IAria2HttpClientOptions> {
    public async multicall<T0, T1>(
      ...items: Readonly<IAria2ClientMulticallItem<T0>[]>
    ): Promise<TAria2ClientMulticallResult<T1>> {
      let rvers = {};
      let args: IJsonRPCRequest[] = [];
      let prs: TAria2ClientMulticallResult<T1> = [];
      let op = await this._client.getCreateOptions();
      for (const i of items) {
        let id = uuid();
        let a: string[] = [];
        if (op?.auth?.secret != undefined) a.push(op?.auth?.secret);
        args.push({
          jsonrpc: "2.0",
          id,
          params: [...a, ...i.params],
          method: i.methodName,
        } as IJsonRPCRequest);
        prs.push(
          new Promise((r, j) => {
            rvers[id] = { r, j };
          })
        );
      }
      new Promise(async () => {
        let url = `${op.protocol ?? "http"}://${op.host}:${
          op.port
        }/jsonrpc?method=&id=&params=${btoa(JSON.stringify(args))}`;
        let rep = await axios(url, {
          method: "GET",
          ...op.fetchOptions,
        });
        for (const r of rep.data as IJsonRPCResponse[]) {
          if (r.id != undefined && rvers[r.id] != undefined) {
            if (r.error != undefined) {
              rvers[r.id].j(r.error);
            } else {
              rvers[r.id].r(r.result);
            }
          }
        }
      });
      return prs;
    }
    public async listMethods(): Promise<TAria2ClientMethodList> {
      return await this._client.rawCall<void, TAria2ClientMethodList>(
        "system.listMethods"
      );
    }
    public async listNotifications(): Promise<TAria2ClientNotificationList> {
      return await this._client.rawCall<void, TAria2ClientNotificationList>(
        "system.listNotifications"
      );
    }
  }
}
