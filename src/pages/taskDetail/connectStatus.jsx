import { getPeers } from "@/services";
import { useEffect, useRef, useMemo, useState } from "react";
import { Table, Space } from "@douyinfe/semi-ui";
import { IconArrowDown, IconArrowUp } from "@douyinfe/semi-icons";
import BitFieldCanvas from "@/components/bitFieldSvg";
import parseClientFromPeerid from "@/helpers/parsePeerid";
import { decodePercentEncodedString, formattedFileSize } from "@/utils";

function ConnectStatus(props) {
  const { taskId } = props || {};

  const [peerList, setPeerList] = useState([]);

  const queryPeersStatus = () => {
    getPeers(taskId).then((res) => {
      setPeerList(res || []);
    });
  };

  const dataSource = useMemo(() => {
    if (!Array.isArray(peerList)) {
      return [];
    }

    return peerList;
  }, [peerList]);

  const columns = [
    {
      title: "地址",
      dataIndex: "ip",
    },
    {
      title: "客户端",
      dataIndex: "peerId",
      render: (text) => {
        const peerId = text ? decodePercentEncodedString(text) : "";
        const clientInfo = parseClientFromPeerid(peerId) || {};
        const { client, version } = clientInfo || {};

        if (client === "unknown" || !client) {
          return null;
        }

        return `${client} (${version})`;
      },
    },
    {
      title: "状态",
      dataIndex: "bitfield",
      render: (text) => {
        return <BitFieldCanvas bitField={text} />;
      },
    },
    {
      title: "下载速度",
      dataIndex: "downloadSpeed",
      render: (text) => {
        return (
          <Space spacing={2}>
            <IconArrowDown size={16} style={{ color: "#208fe5" }} />
            <span>{`${formattedFileSize(Number(text))}/s`}</span>
          </Space>
        );
      },
    },
    {
      title: "上传速度",
      dataIndex: "uploadSpeed",
      render: (text) => {
        return (
          <Space spacing={2}>
            <IconArrowUp size={16} style={{ color: "#74a329" }} />
            <span>{`${formattedFileSize(Number(text))}/s`}</span>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    const timeId = setInterval(() => {
      queryPeersStatus();
    }, [1000]);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!taskId) {
    return null;
  }

  return (
    <Table
      rowKey="peerId"
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
}

export default ConnectStatus;
