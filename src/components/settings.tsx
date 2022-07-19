// @ts-nocheck
import { Form, Spin, Toast } from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";
import client from "../client";

// 中文名和原字段映射表
const filedMap = {
  "allow-overwrite": "允许覆盖",
  "allow-piece-length-change": "允许分片大小变化",
  "always-resume": "始终断点续传",
  "async-dns": "异步DNS",
  "auto-file-renaming": "文件自动重命名",
  "auto-save-interval": "自动保存间隔",
  "conditional-get": "条件下载",
  "conf-path": "配置文件路径",
  "console-log-level": "控制台日志级别",
  "content-disposition-default-utf8": "使用UTF-8处理",
  daemon: "启用后台进程",
  "deferred-input": "延迟加载",
  "disable-ipv6": "禁用IPv6",
  "disk-cache": "磁盘缓存",
  "download-result": "下载结果",
  dscp: "DSCP",
  "rlimit-nofile": "最多打开的文件描述符",
  "enable-color": "终端输出使用颜色",
  "enable-mmap": "启用MMap",
  "event-poll": "事件轮询方法",
  "file-allocation": "文件分配方法",
  "force-save": "强制保存",
  "save-not-found": "保存未找到的文件",
  "hash-check-only": "仅哈希检查",
  "human-readable": "控制台可读输出",
  "keep-unfinished-download-result": "保留未完成的任务",
  "max-download-result": "最多下载结果",
  "max-mmap-limit": "MMap最大限制",
  "max-resume-failure-tries": "最大断点续传尝试次数",
  "min-tls-version": "最低TLS版本",
  "log-level": "日志级别",
  "optimize-concurrent-downloads": "优化并发下载",
  "piece-length": "文件分片大小",
  "show-console-readout": "显示控制台输出",
  "summary-interval": "下载摘要输出间隔",
  "max-overall-download-limit": "全局最大下载速度",
  "max-download-limit": "最大下载速度",
  "no-conf": "禁用配置文件",
  "no-file-allocation-limit": "文件分配限制",
  URI: "启用参数化",
  quiet: "禁用控制台输出",
  "realtime-chunk-checksum": "实时数据块验证",
  "remove-control-file": "删除控制文件",
  "save-session": "状态保存文件",
  "save-session-interval": "保存状态间隔",
  "socket-recv-buffer-size": "Socket接收缓冲区大小",
  stop: "自动关闭时间",
  "truncate-console-readout": "缩短控制台输出内容",
};

// 处理表单数据变化,重新提交
const handleChange = async (val) => {
  for (let key in val) {
    const value = val[key].toString();
    val[key] = value;
  }
  const ready = await client.readyPromise;
  ready.changeGlobalOption(val);
  Toast.info({
    content: "设置修改成功🤞",
    duration: 2,
  });
};

const getOptions = async () => {
  const ready = await client.readyPromise;
  return ready.getGlobalOption();
};

export default () => {
  // 页面一加载就开始请求数据
  const { data, error, loading } = useRequest(getOptions);
  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="I am loading..." />
      </div>
    );
  }
  return (
    <Form
      labelPosition="left"
      labelWidth="750px"
      labelAlign="left"
      style={{ padding: "10px", width: "80%" }}
      onValueChange={(val) => {
        handleChange(val);
      }}
    >
      {Object.keys(data).map((key: string, idx) => {
        // @ts-ignore
        const val = data[key];
        if (val === "true" || val === "false") {
          return (
            <Form.Switch
              key={idx}
              label={filedMap[key] ? `${filedMap[key]}: (${key})` : key}
              field={key}
              initValue={val === "true" ? true : false}
            />
          );
        }

        return (
          <Form.Input
            key={idx}
            field={key}
            label={filedMap[key] ? `${filedMap[key]}: (${key})` : key}
            trigger="blur"
            initValue={val}
            style={{ width: 200 }}
            rules={[
              { required: true, message: "内容不能为空" },
              { type: "string", message: "类型错误" },
              // {
              //   validator: (rule, value) => value === "semi",
              //   message: "内容应该和初始值一样",
              // },
            ]}
          />
        );
      })}
    </Form>
  );
};
