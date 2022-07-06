import { Collapse, Nav } from "@douyinfe/semi-ui";
import {
  IconDuration,
  IconServer,
  IconTickCircle,
  IconDownload,
  IconSetting,
  IconClock,
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
        // @ts-ignore
        setSelectedKey(selectedKeys);
        navigate(itemKey.toString());
      }}
      selectedKeys={selectedKey}
      items={[
        {
          itemKey: "downloading",
          text: "正在下载",
          icon: <IconDownload size="large" />,
        },
        {
          itemKey: "waiting",
          text: "正在等待",
          icon: <IconClock size="large" />,
        },
        {
          itemKey: "stopped",
          text: "已完成/已经停止",
          icon: <IconTickCircle size="large" />,
        },
        {
          itemKey: "settings/ui",
          text: "界面设置",
          icon: <IconDuration size="large" />,
        },
        {
          itemKey: "settings/aria2",
          text: "Aria2设置",
          icon: <IconSetting size="large" />,
          items: [
            {
              itemKey: "settings/aria2/basic",
              text: "基本设置",
            },
            {
              itemKey: "settings/aria2/http-ftp-sftp",
              text: "HTTP/FTP/SFTP设置",
            },
            {
              itemKey: "settings/aria2/http",
              text: "HTTP设置",
            },
            {
              itemKey: "settings/aria2/ftp-sftp",
              text: "FTP/SFTP设置",
            },
            {
              itemKey: "settings/aria2/bt",
              text: "BitTorrent 设置",
            },
            {
              itemKey: "settings/aria2/metalink",
              text: "Metalink 设置",
            },
            {
              itemKey: "settings/aria2/rpc",
              text: "RPC 设置",
            },
            {
              itemKey: "settings/aria2/advanced",
              text: "高级 设置",
            },
          ],
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
