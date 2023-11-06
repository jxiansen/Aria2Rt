import { getVersion } from "@/services";
import {
  Notification,
  Button,
  ButtonGroup,
  Descriptions,
  Toast,
  Popconfirm,
} from "@douyinfe/semi-ui";

import { useState, useEffect } from "react";

const style = {
  boxShadow: "var(--semi-shadow-elevated)",
  backgroundColor: "var(--semi-color-bg-2)",
  borderRadius: "4px",
  padding: "10px",
  marginRight: "20px",
  width: "800px",
};

export default () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getVersion().then((res) => {
      const { result } = res || {};
      if (!result) {
        console.log(res);
        return Toast.error("获取版本信息失败");
      }
      console.log(result);
      setStatus(result);
    });
  }, []);

  if (!status) return null;

  const data = [
    { key: "Aria2状态", value: <Button>已经连接</Button> },
    { key: "Aria2版本", value: status.version },
    {
      key: "启用功能",
      value: (
        <ButtonGroup size="small">
          {status.enabledFeatures.map((val, idx) => {
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
  return <Descriptions data={data} row size="large" style={style} />;
};
