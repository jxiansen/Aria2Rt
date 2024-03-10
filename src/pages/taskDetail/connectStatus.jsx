import { getPeers } from "@/services";
import { useEffect, useRef, useMemo, useState } from "react";
import { Table } from "@douyinfe/semi-ui";
import BitFieldCanvas from "@/components/bitFieldSvg";
import parseClientFromPeerid from "@/helpers/parsePeerid";
import { decodePercentEncodedString } from "@/utils";

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

        if (clientInfo && clientInfo.client !== "unknow") {
          const { client = "", version = "" } = clientInfo || {};
          return `${client} (${version})`;
        }

        return null;
      },
    },
    {
      title: "状态",
      dataIndex: "owner",
    },
    {
      title: "进度",
      dataIndex: "bitfield",
      render: (text) => {
        return <BitFieldCanvas bitField={text} />;
      },
    },
    {
      title: "下载速度",
      dataIndex: "downloadSpeed",
    },
    {
      title: "上传速度",
      dataIndex: "uploadSpeed",
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
