import { useState, useEffect, useMemo } from "react";
import { List, Collapsible, Row, Col, Space } from "@douyinfe/semi-ui";
import { Line } from "@ant-design/plots";
import { IconPlusCircle } from "@douyinfe/semi-icons";

import { formattedFileSize, calculateRemainingTime } from "@/utils";

const statusMap = {
  active: "正在下载",
};

const modeMap = {
  single: "1个文件",
};

const config = {
  xField: "now",
  yField: "speed",
  point: {
    shapeField: "square",
    sizeField: 4,
  },

  interaction: {
    tooltip: {
      // body: false,
      // marker: false,
      // groupName: false,
      // sort: (item) => {
      //   console.log(item);
      // },
      filter: (item) => {
        if (item.name === "speed") {
          return null;
        }
        return item;
      },
    },
  },
  colorField: "category",
  style: {
    lineWidth: 2,
  },
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

  const [lineData, setLineData] = useState([]);

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
        if (!totalLength) {
          return null;
        }
        const size = formattedFileSize(+totalLength);

        return (
          <Space>
            {size ? size : null}
            <span style={{ color: "#325ab4" }}>
              {(mode && modeMap[mode]) || ""}
            </span>
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
        if (!completedLength || !totalLength) {
          return null;
        }
        const progress = ((completedLength / totalLength) * 100).toFixed(2);

        return progress ? `${progress} %` : null;
      },
    },
    {
      name: "下载",
      genView: () => {
        if (!completedLength || !downloadSpeed) {
          return null;
        }
        const completedSize = formattedFileSize(+completedLength);
        const speed = formattedFileSize(+downloadSpeed);
        return `${completedSize} @ ${speed} /s`;
      },
    },

    {
      name: "上传",
      genView: () => {
        if (!uploadLength || !uploadSpeed) {
          return null;
        }
        const uploadSize = formattedFileSize(+uploadLength);
        const speed = formattedFileSize(+uploadSpeed);

        return `${uploadSize} @ ${speed} /s`;
      },
    },
    {
      name: "分享率",
      genView: () => {
        if (!completedLength || !uploadLength) {
          return null;
        }
        return (uploadLength / completedLength).toFixed(2) + " %";
      },
    },
    {
      name: "剩余时间",
      genView: () => {
        if (!downloadSpeed || !totalLength || !completedLength) {
          return null;
        }

        const remainTime = totalLength - completedLength;
        return calculateRemainingTime(remainTime, downloadSpeed);
      },
    },
    {
      name: "种子数/连接数",
      genView: () => {
        if (!numSeeders || !connections) {
          return null;
        }
        return `${numSeeders} / ${connections}`;
      },
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
        if (!announceList?.length) {
          return null;
        }

        return (
          <div>
            <Space>
              {announceList[0]}
              {announceList.length > 1 ? (
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
              {announceList.slice(1).map((item, idx) => (
                <p key={idx}>{item}</p>
              ))}
            </Collapsible>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!uploadSpeed || !downloadSpeed) {
      return;
    }

    const dist = lineData.slice(-18);
    const now = new Date().toLocaleTimeString();

    dist.push({
      now: now,
      speed: +downloadSpeed,
      category: "download",
    });
    dist.push({
      now: now,
      speed: +uploadSpeed,
      category: "upload",
    });

    setLineData(dist);
  }, [uploadSpeed, downloadSpeed]);

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

      {/* theme="classicDark"  */}
      <Line height={300} data={lineData} {...config} />
    </div>
  );
}

export default Overview;
