import {
  IconWrench,
  IconDownload,
  IconUpload,
} from "@douyinfe/semi-icons/lib/es/icons";
import { Space, Button, Modal, Form, Notification } from "@douyinfe/semi-ui";
import { formatBytes } from "@/utils";
import { useState, useEffect } from "react";
import { getGlobalStat } from "@/services";

function Footer(props) {
  const [visible, setVisible] = useState(false);

  const [globalState, setGlobalState] = useState({});
  const { downloadSpeed, uploadSpeed } = globalState || {};

  useEffect(() => {
    setInterval(() => {
      getGlobalStat().then((res) => {
        const { result } = res || {};
        if (!result) {
          return;
        }
        document.title = `Aria2-下载${formatBytes(result.downloadSpeed)}/s`;
        setGlobalState(result);
      });
    }, 1000);
  }, []);

  // 存储全局设置选项
  const [options, setOptions] = useState({});

  // 处理设置按钮点击事件
  const handleClick = () => {
    const reg = /\d+[k|K|m|M]?/;
    const optionsArr = Object.values(options);
    // 使用正则表达式对输入的字符串进行校验是否满足指定的要求
    if (optionsArr.every((i) => reg.test(i))) {
      Notification.warning({
        title: "提交成功",
        duration: 1,
      });

      client.changeGlobalOption(options);
    } else {
      Notification.warning({
        title: "输入类型错误，请检查格式",
        duration: 1,
      });
    }
  };

  return (
    <>
      <Space align="center">
        <IconWrench size="large" />
        <Button onClick={() => setVisible(true)}>快速设置</Button>
      </Space>

      <span style={{ display: "flex", alignItems: "center" }}>
        <Space align="center" style={{ marginRight: "24px" }}>
          <IconDownload size="large" style={{ color: "#208fe5" }} />
          <span> {formatBytes(downloadSpeed) + "/s"}</span>
        </Space>

        <Space align="center">
          <IconUpload size="large" style={{ color: "#74a329" }} />
          <span> {formatBytes(uploadSpeed) + "/s"}</span>
        </Space>
      </span>

      <Modal
        title="全局速度限制"
        visible={visible}
        onOk={handleClick}
        onCancel={() => setVisible(false)}
        cancelText="取消"
        okText="确定"
      >
        <Form
          layout="vertical"
          onValueChange={(values) => {
            setOptions({
              ...options,
            });
            setOptions(values);
          }}
        >
          <Form.Input
            label="全局最大下载速度(k,m)"
            field="max-overall-download-limit"
            validateStatus="warning"
            labelPosition="left"
            style={{ width: 220, marginLeft: 10 }}
            addonAfter="字节"
          />
          <Form.Input
            label="全局最大上传速度(k,m)"
            field="max-overall-upload-limit"
            labelPosition="left"
            style={{ width: 220, marginLeft: 10 }}
            addonAfter="字节"
          />
        </Form>
      </Modal>
    </>
  );
}

export default Footer;
