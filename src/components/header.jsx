import {
  Button,
  Nav,
  Divider,
  Typography,
  Tooltip,
  Notification,
} from "@douyinfe/semi-ui";
import {
  IconPlus,
  IconPlay,
  IconPause,
  IconSun,
  IconDelete,
  IconMoon,
  IconShrinkScreenStroked,
  IconGithubLogo,
  IconFullScreenStroked,
} from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
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
                    恢复所有的任务;
                    ready.unpauseAll();
                    return;
                  }
                  curGid.forEach((gid) => {
                    恢复指定任务;
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
                    暂停所有的任务;
                    ready.forcePauseAll();
                    return;
                  }
                  curGid.forEach((gid) => {
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
        <Button
          onClick={() => {
            Notification.open({
              title: "使用说明😀",
              content: <NotificationContent />,
              duration: 3,
            });
          }}
        >
          戳我哦(⊙o⊙)
        </Button>
      </Nav.Footer>
    </Nav>
  );
};

function NotificationContent() {
  const { Paragraph, Title, Text } = Typography;
  return (
    <div>
      <Text>本工具可以用来下载图片,http,ftp,磁力链接,种子文件</Text>
      <br />
      <Text>内核调用的aria2可以说是最强大的下载工具了</Text>
      <br />
      <a href="https://www.ygdy8.com/">
        <Text>种子资源下载</Text>
      </a>
      <a href="http://81.68.209.144:3000" style={{ marginLeft: "20px" }}>
        <Text>查看下载文件</Text>
      </a>
    </div>
  );
}
