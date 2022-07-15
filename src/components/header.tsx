import { Avatar, Button, Nav, Input, Divider } from "@douyinfe/semi-ui";
import {
  IconPlus,
  IconPlay,
  IconPause,
  IconSearch,
  IconSun,
  IconDelete,
  IconGridView,
  IconMoon,
  IconSort,
  IconShrinkScreenStroked,
  IconGithubLogo,
  IconFullScreenStroked,
} from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useFullscreen } from "ahooks";
import { useImmer } from "use-immer";

export default () => {
  // 将document.body传递给ref,然后使用hooks来设置全屏
  const ref = useRef(document.body);
  const navigate = useNavigate();
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);
  const [isDarkMode, setDarkMode] = useImmer(false);
  const switchMode = () => {
    setDarkMode(!isDarkMode);
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      // 以下这行代码，window.setMode仅用于当通过本Demo切换时，通知Semi官网Header记录更新当前模式（只用于演示）。在您的代码里无需存在。
    } else {
      body.setAttribute("theme-mode", "dark");
    }
  };
  return (
    <Nav mode="horizontal">
      <Nav.Header>
        <>
          <Button
            theme="borderless"
            icon={<IconPlus size="large" />}
            style={{
              color: "var(--semi-color-primary)",
            }}
            onClick={() => {
              navigate("/new");
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
            onClick={() => {
              window.location.href = "https://github.com/jxiansen/Aria2Rt";
            }}
            theme="borderless"
            icon={<IconGithubLogo />}
            style={{
              color: "var(--semi-color-text-2)",
            }}
          />
        </>
      </Nav.Header>

      <Nav.Footer>
        {isDarkMode ? (
          <Button
            theme="borderless"
            onClick={switchMode}
            icon={<IconSun size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />
        ) : (
          <Button
            theme="borderless"
            onClick={switchMode}
            icon={<IconMoon size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />
        )}

        {isFullscreen ? (
          <Button
            theme="borderless"
            onClick={toggleFullscreen}
            icon={<IconShrinkScreenStroked size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />
        ) : (
          <Button
            theme="borderless"
            onClick={toggleFullscreen}
            icon={<IconFullScreenStroked size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />
        )}
        <Input size="large" defaultValue="搜索" suffix={<IconSearch />}></Input>
      </Nav.Footer>
    </Nav>
  );
};
