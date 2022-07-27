import { Button, Nav, Input, Divider, Tooltip } from "@douyinfe/semi-ui";
import {
  IconPlus,
  IconPlay,
  IconPause,
  IconSearch,
  IconSun,
  IconDelete,
  IconGridView,
  IconMoon,
  IconShrinkScreenStroked,
  IconGithubLogo,
  IconFullScreenStroked,
} from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useFullscreen } from "ahooks";
import { useImmer } from "use-immer";
import store from "../store";
import client from "../client";

export default () => {
  // 将document.body传递给ref,然后使用hooks来设置全屏
  const ref = useRef(document.body);
  const navigate = useNavigate();
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);
  const [isDarkMode, setDarkMode] = useImmer(false);
  const { curGid, selectedAll } = store;
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
            onClick={() => {
              navigate("/new");
            }}
          >
            新建
          </Button>
          <Divider layout="vertical" margin="8px" />
          <Tooltip content={"继续任务"}>
            <Button
              type="tertiary"
              theme="borderless"
              icon={<IconPlay />}
              onClick={async () => {
                if (curGid.length) {
                  const ready = await client.readyPromise;
                  if (selectedAll) {
                    // @ts-ignore 恢复所有的任务
                    ready.unpauseAll();
                    return;
                  }
                  curGid.forEach((gid) => {
                    // @ts-ignore 恢复指定任务
                    ready.unpause(gid);
                  });
                  curGid.length = 0;
                }
              }}
            />
          </Tooltip>
          <Tooltip content={"暂停任务"}>
            <Button
              theme="borderless"
              icon={<IconPause />}
              // 暂停文件下载
              onClick={async () => {
                if (curGid.length) {
                  const ready = await client.readyPromise;
                  if (selectedAll) {
                    // @ts-ignore 暂停所有的任务
                    ready.forcePauseAll();
                    return;
                  }
                  curGid.forEach((gid) => {
                    // @ts-ignore
                    ready.forcePause(gid);
                  });
                  curGid.length = 0;
                }
              }}
              style={{
                color: "var(--semi-color-text-2)",
              }}
            />
          </Tooltip>
          <Tooltip content={"删除任务"}>
            <Button
              theme="borderless"
              icon={<IconDelete />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
              onClick={async () => {
                if (curGid.length) {
                  const ready = await client.readyPromise;
                  curGid.forEach((gid) => {
                    // @ts-ignore
                    ready.forceRemove(gid);
                  });
                  curGid.length = 0;
                }
              }}
            />
          </Tooltip>
          <Divider layout="vertical" margin="8px" />
          <Tooltip content={"项目地址"}>
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
          </Tooltip>
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
