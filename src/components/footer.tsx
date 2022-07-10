import {
  IconWrench,
  IconDownload,
  IconUpload,
} from "@douyinfe/semi-icons/lib/es/icons";
import "./../index.css";
import { Space, Button, Modal, Form } from "@douyinfe/semi-ui";
import { useImmer } from "use-immer";
import store from "./../store";
import { convertSpeed } from "./../tool";
import { useTitle } from "ahooks";

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
        onOk={() => {
          console.log("ok");
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
        cancelText={"取消"}
        okText={"设置"}
      >
        <Form layout="vertical" onValueChange={(values) => console.log(values)}>
          <Form.Input
            label="全局最大下载速度"
            field="max-overall-download-limit"
            validateStatus="warning"
            labelPosition="left"
            style={{
              width: 220,
              marginLeft: 30,
            }}
            addonAfter="字节"
          />
          <Form.Input
            label="全局最大上传速度"
            field="max-overall-upload-limit"
            labelPosition="left"
            style={{ width: 220, marginLeft: 30 }}
            addonAfter="字节"
          />
        </Form>
      </Modal>
    </>
  );
};
