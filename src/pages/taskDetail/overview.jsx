import { useState, useEffect, useMemo } from "react";
import { List, Collapsible, Row, Col, Space } from "@douyinfe/semi-ui";
import { filesize } from "filesize";
import { IconPlusCircle } from "@douyinfe/semi-icons";

import { calculateRemainingTime } from "@/utils";

const statusMap = {
  active: "正在下载",
};

const modeMap = {
  single: "1个文件",
};

function Overview(props) {
  const { taskStatus = {} } = props || {};
  const {
    downloadSpeed,
    files,
    bittorrent,
    infoHash,
    status,
    numPieces,
    numSeeders,
    pieceLength,
    connections,
    completedLength,
    totalLength,
    dir,
    uploadSpeed,
    uploadLength,
  } = taskStatus || {};
  const { mode, info, announceList } = bittorrent || {};

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((cur) => !cur);
  };

  const overViewList = [
    {
      name: "任务名称",
      genView: () => {
        return info?.name || "";
      },
    },
    {
      name: "任务大小",
      genView: () => {
        return (
          <Space>
            <span>{filesize(totalLength || 0)}</span>
            <span style={{ color: "#325ab4" }}>{modeMap?.[mode]}</span>
          </Space>
        );
      },
    },
    {
      name: "任务状态",
      genView: () => {
        return (status && statusMap[status]) || "";
      },
    },
    {
      name: "进度（健康度）",
      genView: () => {
        const progress = ((completedLength / totalLength) * 100).toFixed(2);
        return progress ? `${progress} %` : null;
      },
    },
    {
      name: "下载",
      genView: () => {
        const completedSize = filesize(completedLength || 0);
        const speed = filesize(downloadSpeed || 0);
        return `${completedSize} @ ${speed} /s`;
      },
    },

    {
      name: "上传",
      genView: () => {
        const uploadSize = filesize(uploadLength || 0);
        const speed = filesize(uploadSpeed || 0);
        return `${uploadSize} @ ${speed} /s`;
      },
    },
    {
      name: "分享率",
      genView: () => {
        return (uploadLength / completedLength).toFixed(2) + " %";
      },
    },
    {
      name: "剩余时间",
      genView: () => {
        const remainTime = totalLength - completedLength;
        return calculateRemainingTime(remainTime, downloadSpeed);
      },
    },
    {
      name: "种子数/连接数",
      genView: () => `${numSeeders} / ${connections}`,
    },
    {
      name: "特征值",
      genView: () => infoHash || "",
    },
    {
      name: "下载路径",
      genView: () => dir || "",
    },
    {
      name: `BT 服务器`,
      genView: () => {
        return (
          <div>
            <Space>
              {announceList?.[0]}
              {announceList?.length > 1 ? (
                <>
                  <IconPlusCircle
                    style={{ color: "#208fe5", cursor: "pointer" }}
                    size="16"
                    onClick={toggleOpen}
                  />
                  <span>共计 {announceList?.length || ""} </span>
                </>
              ) : null}
            </Space>
            <Collapsible isOpen={isOpen}>
              {announceList?.slice(1).map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </Collapsible>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <List
        dataSource={overViewList}
        renderItem={(item, idx) => {
          const { name: itemName, genView } = item || {};
          const itemView = typeof genView === "function" ? genView() : null;

          return (
            <List.Item>
              <Row style={{ width: "100%" }}>
                <Col span={10}>{itemName}</Col>
                <Col span={14}>{itemView}</Col>
              </Row>
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default Overview;
