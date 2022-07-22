import {
  Notification,
  Button,
  ButtonGroup,
  Descriptions,
  Toast,
  Popconfirm,
} from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";
import { useState } from "react";
import client from "../client";

const getVersion = async () => {
  const ready = await client.readyPromise;
  // @ts-ignore
  return ready.getVersion();
};

const style = {
  boxShadow: "var(--semi-shadow-elevated)",
  backgroundColor: "var(--semi-color-bg-2)",
  borderRadius: "4px",
  padding: "10px",
  marginRight: "20px",
  width: "800px",
};

export default () => {
  const [visible, setVisible] = useState(false);
  const { data, error, loading } = useRequest(getVersion);
  if (loading) {
    return <h1>加载中</h1>;
  }
  const dataa = [
    { key: "Aria2状态", value: <Button>已经连接</Button> },
    { key: "Aria2版本", value: data.version },
    {
      key: "启用功能",
      value: (
        <ButtonGroup size="small">
          {data.enabledFeatures.map((val: string, idx: number) => {
            return <Button key={idx}>{val}</Button>;
          })}
        </ButtonGroup>
      ),
    },
    {
      key: "操作",
      value: (
        <ButtonGroup size="small">
          <Button
            type="tertiary"
            onClick={() => {
              Notification.success({
                title: "操作成功",
                content: "会话已经成功保存",
                duration: 2,
                theme: "light",
              });
            }}
          >
            保存会话
          </Button>
          <Popconfirm
            title="确认关闭？"
            content="aria2客户端讲会被关闭掉"
            onConfirm={async () => {
              // @ts-ignore
              const res = await client.shutdown();
              Toast.success(res);
            }}
          >
            <Button type="danger">关闭Aria2</Button>
          </Popconfirm>
        </ButtonGroup>
      ),
    },
  ];
  return <Descriptions data={dataa} row size="large" style={style} />;
};
