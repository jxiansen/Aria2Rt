import { useState, useEffect } from "react";
import {
  Notification,
  Button,
  ButtonGroup,
  Descriptions,
  Toast,
  Modal,
  Space,
  Checkbox,
} from "@douyinfe/semi-ui";

import ariaClient from "@/services/client";

const style = {
  boxShadow: "var(--semi-shadow-elevated)",
  backgroundColor: "var(--semi-color-bg-2)",
  borderRadius: "4px",
  padding: "10px",
  marginRight: "20px",
  width: "800px",
};

function RenderStatusPage() {
  const [status, setStatus] = useState({});

  const { version = "", enabledFeatures = [] } = status || {};

  const getAriaStatus = () => {
    ariaClient.getVersion().then((res) => {
      console.log(res);
      res && setStatus(res);
    });
  };

  const closeAriaClient = () => {
    Modal.confirm({
      title: "确定关闭",
      content: "您是否要关闭 aria2 客户端？",
      onConfirm: () => {
        ariaClient.shutdown().then((res) => {
          if (res) {
            Toast.success("关闭成功！");
          } else {
            Toast.error("关闭失败");
          }
        });
      },
    });
  };

  useEffect(() => {
    getAriaStatus();
  }, []);

  const data = [
    { key: "Aria2状态", value: <Button>已经连接</Button> },
    { key: "Aria2版本", value: version },
    {
      key: "已经启用功能",
      span: 4,
      value: (
        <div>
          {enabledFeatures.map((val, idx) => (
            <div key={idx}>
              <Space>
                <Checkbox checked />
                <span>{val}</span>
              </Space>
            </div>
          ))}
        </div>
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

          <Button type="danger" onClick={closeAriaClient}>
            关闭Aria2
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  return <Descriptions data={data} size="large" />;
}

export default RenderStatusPage;
