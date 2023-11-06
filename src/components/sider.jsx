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
import { useImmer } from "use-immer";

export default () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useImmer([]);

  return (
    <Nav
      style={{ maxWidth: 220, height: "100%" }}
      onSelect={({ itemKey, selectedKeys, selectedItems, isOpen }) => {
        setSelectedKey(selectedKeys);
        navigate(itemKey.toString());
      }}
      selectedKeys={selectedKey}
      items={[
        {
          itemKey: "downloading",
          text: +numActive ? `正在下载(${numActive})` : `正在下载`,
          icon: <IconDownload size="large" />,
        },
        {
          itemKey: "dashboard",
          text: "监控",
          icon: <IconPulse size="large" />,
        },
        {
          itemKey: "waiting",
          text: +numWaiting ? `正在等待(${numWaiting})` : "正在等待",
          icon: <IconClock size="large" />,
        },
        {
          itemKey: "stopped",
          text: +numStopped
            ? `已完成/已经停止(${numStopped})`
            : "已完成/已经停止",
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
        logo: (
          <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />
        ),
        text: "Aria2Rt",
      }}
      footer={{
        collapseButton: true,
      }}
    />
  );
};
