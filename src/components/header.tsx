import { Avatar, Button, Nav, Input, Divider } from "@douyinfe/semi-ui";
import {
  IconPlus,
  IconPlay,
  IconPause,
  IconSearch,
  IconDelete,
  IconGridView,
  IconSort,
  IconGithubLogo,
} from "@douyinfe/semi-icons";

export default () => {
  return (
    <>
      <Nav
        mode="horizontal"
        header={
          <>
            <Button
              theme="borderless"
              icon={<IconPlus size="large" />}
              style={{
                color: "var(--semi-color-primary)",
              }}
            >
              新建
            </Button>
            <Divider layout="vertical" margin="8px" />
            <Button
              theme="borderless"
              icon={<IconPlay />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
            />
            <Button
              theme="borderless"
              icon={<IconPause />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
            />
            <Button
              theme="borderless"
              icon={<IconDelete />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
            />
            <Divider layout="vertical" margin="8px" />
            <Button
              theme="borderless"
              icon={<IconGridView />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
            />
            <Button
              theme="borderless"
              icon={<IconSort />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
            />
            <Divider layout="vertical" margin="8px" />

            <Button
              theme="borderless"
              icon={<IconGithubLogo />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
            />
          </>
        }
        footer={
          <Input
            size="large"
            defaultValue="搜索"
            suffix={<IconSearch />}
          ></Input>
        }
      ></Nav>
    </>
  );
};
