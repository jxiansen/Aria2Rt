import {
  IconWrench,
  IconDownload,
  IconUpload,
} from "@douyinfe/semi-icons/lib/es/icons";
import { Space, Button, Modal, Form, Notification } from "@douyinfe/semi-ui";
import { useImmer } from "use-immer";
import store from "./../store";
import { convertSpeed } from "./../tool";
import { useTitle } from "ahooks";
import { useState } from "react";
import client from "../client";

export default () => {
  // 从store中解构出下载和上传速度
  const { downloadSpeed, uploadSpeed } = store.globalState;
  const [modalVisible, setModalVisible] = useImmer(false);

  // useTitle hook 用来更新页面的title状态
  useTitle(
    `下载: ${convertSpeed(downloadSpeed)},上传:${convertSpeed(
      uploadSpeed
    )} - Aria2Rt `
  );

  // 存储全局设置选项
  const [options, setOptions] = useState({});

  // 处理设置按钮点击事件
  const handleClick = () => {
    const reg = /\d+[k|K|m|M]?/;
    const optionsArr = Object.values(options);
    // 使用正则表达式对输入的字符串进行校验是否满足指定的要求
    if (optionsArr.every((i: any) => reg.test(i))) {
      Notification.warning({
        title: "提交成功",
        duration: 1,
      });
      // @ts-ignore
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
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          快速设置
        </Button>
      </Space>
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Space
          align="center"
          style={{
            marginRight: "24px",
          }}
        >
          <IconDownload size="large" style={{ color: "#208fe5" }} />
          <span> {convertSpeed(downloadSpeed)}</span>
        </Space>

        <Space align="center">
          <IconUpload size="large" style={{ color: "#74a329" }} />
          <span> {convertSpeed(uploadSpeed)}</span>
        </Space>
      </span>
      <Modal
        title="全局速度限制"
        visible={modalVisible}
        onOk={handleClick}
        onCancel={() => {
          setModalVisible(false);
        }}
        cancelText={"取消"}
        okText={"设置"}
      >
        <Form
          layout="vertical"
          onValueChange={(values: any) => {
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
            style={{
              width: 220,
              marginLeft: 10,
            }}
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
};
