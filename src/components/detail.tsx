import { Tabs, TabPane, Table, Tree } from "@douyinfe/semi-ui";
import { HeatMapGrid } from "react-grid-heatmap";
import {
  convert,
  convertArrToTree,
  formatSeconds,
  getNameFromFiles,
  sizeTostr,
} from "./../tool";
import { useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../client";
import { useImmer } from "use-immer";

export default () => {
  let { gid } = useParams();
  const [isTorrent, setTorrentStatus] = useState(false);
  async function getDetails() {
    const ready = await client.readyPromise;
    // @ts-ignore
    return client.tellStatus(gid);
    // return ready.getPeers(gid);
  }
  const { data, error, loading } = useRequest(getDetails, {
    pollingInterval: 1000,
  });

  // 每次数据文件信息更新后重新设置数据流
  useEffect(() => {
    if (data) {
      if (data.bittorrent) {
        setTorrentStatus(true);
        // @ts-ignore
        setTreeData(convertArrToTree(data.files));
      }
    }
  }, [data]);

  const tableData = [
    {
      key: "0",
      name: "任务名称",
      value: (() => (data ? getNameFromFiles(data.files[0]) : ""))(),
    },
    {
      key: "1",
      name: "任务大小",
      value: (() => {
        if (data) {
          const value =
            sizeTostr(data.totalLength) + " (" + data.files.length + "个文件)";
          return value;
        }
        return "";
      })(),
    },
    {
      key: "2",
      name: "任务状态",
      value: (() => {
        if (data) {
          return data.status === "active" ? "正在下载" : "暂停";
        }
        return "";
      })(),
    },
    {
      key: "3",
      name: "进度",
      value: (() => {
        if (data) {
          return (
            ((data.completedLength / data.totalLength) * 100).toFixed(2) + "%"
          );
        }
        return "";
      })(),
    },
    {
      key: "4",
      name: "下载",
      value: (() => {
        if (data) {
          return sizeTostr(data.completedLength);
        }
        return "";
      })(),
    },
    {
      key: "5",
      name: "上传",
      value: (() => {
        if (data) {
          return sizeTostr(data.uploadLength);
        }
        return "";
      })(),
    },
    {
      key: "6",
      name: "剩余时间",
      value: (() => {
        if (data) {
          return formatSeconds(data.downloadSpeed, data.totalLength);
        }
        return "";
      })(),
    },
    {
      key: "7",
      name: "下载路径",
      value: (() => {
        return data ? data.dir : "";
      })(),
    },
    {
      key: "8",
      name: "特征值",
      value: (() => {
        if (data) {
          return data.infoHash;
        }
        return "";
      })(),
    },
    {
      key: "9",
      name: "种子数/连接数",
      value: (() => {
        if (data) {
          return data.numSeeders + "/" + data.connections;
        }
        return "";
      })(),
    },
    {
      key: "10",
      name: "BT服务器",
      value: (() => {
        try {
          if (data && data.bittorrent.announceList.length) {
            return data.bittorrent.announceList.reduce(
              (acc: string, cur: string) => acc + " | " + cur
            );
          }
        } catch (err) {
          return "";
        }
      })(),
    },
  ];
  // 如果是种子连接则删除多余的字段
  if (!isTorrent) {
    tableData.length = 8;
  }

  const columns = [
    {
      title: "标题",
      dataIndex: "name",
      fixed: "left",
      width: 100,
      align: "left",
    },
    {
      title: "大小",
      dataIndex: "value",
      fixed: "left",
      width: 100,
      align: "left",
    },
  ];

  // 文件列表树形结构初始值
  const [treeData, setTreeData] = useImmer({
    Node1: {
      "Child Node1": "0-0-1",
      "Child Node2": "0-0-2",
    },
    Node2: "0-1",
  });

  return (
    <Tabs type="line">
      <TabPane tab="总览" itemKey="1">
        <Table
          dataSource={tableData}
          // @ts-ignore
          columns={columns}
          pagination={false}
          showHeader={false}
          bordered={false}
        />
      </TabPane>
      <TabPane tab="区块信息" itemKey="2">
        <div style={{ margin: "40px 0 0 50px" }}>
          <HeatMapGrid
            // @ts-ignore
            data={data === undefined ? [] : convert(data.bitfield)}
            cellStyle={(_x, _y, ratio) => ({
              background: `rgb(12, 160, 44, ${ratio})`,
              fontSize: ".8rem",
              color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
            })}
            cellHeight="12px"
            square
          />
        </div>
      </TabPane>
      <TabPane tab="文件列表" itemKey="3">
        <Tree searchRender={false} treeDataSimpleJson={treeData} />
      </TabPane>
    </Tabs>
  );
};
