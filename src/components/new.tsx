import {
  Button,
  Dropdown,
  TabPane,
  Tabs,
  TextArea,
  Toast,
} from "@douyinfe/semi-ui";
// @ts-ignore
import { isURL } from "validator";
import { Typography } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { IconFolder } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import client from "../client";
export default () => {
  const { Text } = Typography;
  const [rowsCount, setRowsCount] = useImmer(0);
  // 将所有链接存储拼接成一个字符串,最后在split成一个链接数组
  const [links, setLinks] = useImmer("");
  const [urls, setUrls] = useImmer([]);
  const navigate = useNavigate();
  useEffect(() => {
    const count = links.split("\n").length - 1;
    setRowsCount(count);
    // @ts-ignore
    setUrls(links.split("\n").filter((i) => !!i));
  }, [links]);

  return (
    <div>
      <Tabs type="line">
        <TabPane tab="链接" itemKey="1">
          <br />
          <Text>下载链接 ({rowsCount}) 个链接:</Text>
          <br />
          <br />
          <TextArea
            autosize
            rows={10}
            showClear
            style={{ border: "rgba(var(--semi-grey-9), .08)" }}
            placeholder="支持多个URL地址,每个地址回车占一行"
            onChange={(val) => {
              setLinks(val);
            }}
          />
          <Button
            theme="light"
            type="tertiary"
            style={{ marginTop: 28 }}
            onClick={() => {
              // 对地址数组中的每一个链接进行检查,如果不符合规范报错提示,成功添加下载任务后跳转回下载页面
              if (urls.every((i) => isURL(i))) {
                // 允许提交
                // @ts-ignore
                client.addUri(urls);
                navigate("/downloading");
              } else {
                Toast.info({
                  content: "链接地址错误,请检查后再提交",
                  duration: 3,
                });
              }
            }}
          >
            立即下载
          </Button>
        </TabPane>
        <TabPane tab="选项" itemKey="2">
          <h3>快速起步</h3>
        </TabPane>
        <TabPane
          tab={
            <Dropdown
              trigger={"click"}
              position={"bottomRight"}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>打开种子文件</Dropdown.Item>
                  <Dropdown.Item>Menu Item 3</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <IconFolder />
            </Dropdown>
          }
          itemKey="3"
        />
      </Tabs>
    </div>
  );
};
