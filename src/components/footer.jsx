import { Space, Button, Modal, Form, Notification } from "@douyinfe/semi-ui";
import {
  IconWrench,
  IconDownload,
  IconUpload,
} from "@douyinfe/semi-icons/lib/es/icons";
import { useState } from "react";

import { formattedFileSize } from "@/utils";
import { changeGlobalOption } from "@/services";

function Footer(props) {
  const { globalStatus } = props || {};

  const { downloadSpeed, uploadSpeed } = globalStatus || {};

  const [visible, setVisible] = useState(false);

  // 存储全局设置选项
  const [globalSpeed, setGlobalSpeed] = useState({});

  // 处理设置按钮点击事件
  const handleConfirm = () => {
    const reg = /\d+[k|K|m|M]?/;
    const optionsArr = Object.values(globalSpeed);
    // 使用正则表达式对输入的字符串进行校验是否满足指定的要求
    if (optionsArr.every((i) => reg.test(i))) {
      changeGlobalOption(globalSpeed).then((res) => {
        if (res === "OK") {
          Notification.warning({
            title: "提交成功",
            duration: 1,
          });
        }
        console.log(res);
      });
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
        {downloadSpeed ? (
          <Space align="center" style={{ marginRight: "24px" }}>
            <IconDownload size="large" style={{ color: "#208fe5" }} />
            <span> {formattedFileSize(+downloadSpeed) + "/s"}</span>
          </Space>
        ) : null}

        {uploadSpeed ? (
          <Space align="center">
            <IconUpload size="large" style={{ color: "#74a329" }} />
            <span> {formattedFileSize(+uploadSpeed) + "/s"}</span>
          </Space>
        ) : null}
      </span>

      <Modal
        title="全局速度限制"
        visible={visible}
        cancelText="取消"
        okText="确定"
        onOk={handleConfirm}
        onCancel={() => setVisible(false)}
      >
        <Form
          layout="vertical"
          onValueChange={(conf) =>
            setGlobalSpeed((curConf) => ({
              ...curConf,
              ...conf,
            }))
          }
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
