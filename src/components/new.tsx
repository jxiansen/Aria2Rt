import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Nav,
  TabPane,
  Tabs,
  TextArea,
} from "@douyinfe/semi-ui";
import { Typography } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { IconFolder, IconStar } from "@douyinfe/semi-icons";
export default () => {
  const { Text } = Typography;
  const [rowsCount, setRowsCount] = useImmer(0);
  // 将所有链接存储拼接成一个字符串,最后在split成一个链接数组
  const [links, setLinks] = useImmer("");
  useEffect(() => {
    const count = links.split("\n").length - 1;
    setRowsCount(count);
    console.log();
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
        <TabPane
          tab={
            <Button theme="light" type="tertiary" style={{ marginBottom: 8 }}>
              立即下载
            </Button>
          }
          itemKey="4"
        />
      </Tabs>
    </div>
  );
};
