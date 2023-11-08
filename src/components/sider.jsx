import { Nav } from "@douyinfe/semi-ui";
import {
  IconServer,
  IconTickCircle,
  IconDownload,
  IconSetting,
  IconClock,
  IconPulse,
} from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";

function RenderSider(props) {
  const { globalState } = props || {};
  const { numActive, numStopped, numWating } = globalState || {};

  const navigate = useNavigate();

  return (
    <Nav
      style={{ maxWidth: 220, height: "100%" }}
      onSelect={({ itemKey }) => {
        navigate(itemKey);
      }}
      items={[
        {
          itemKey: "downloading",
          text: `正在下载 ${Number(numActive) ? `(${numActive})` : ""}`,
          icon: <IconDownload size="large" />,
        },
        {
          itemKey: "dashboard",
          text: "监控",
          icon: <IconPulse size="large" />,
        },
        {
          itemKey: "waiting",
          text: `正在等待 ${Number(numWating) ? `(${numWating})` : ""}`,
          icon: <IconClock size="large" />,
        },
        {
          itemKey: "stopped",
          text: `已完成/已停止 ${Number(numStopped) ? `(${numStopped})` : ""}`,
          icon: <IconTickCircle size="large" />,
        },

        {
          itemKey: "settings",
          text: "Aria2设置",
          icon: <IconSetting size="large" />,
        },
        {
          itemKey: "status",
          text: "Aria2状态",
          icon: <IconServer size="large" />,
        },
      ]}
      header={{
        text: "Aria2Rt",
        logo: (
          <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />
        ),
      }}
      footer={{ collapseButton: true }}
    />
  );
}

export default RenderSider;
