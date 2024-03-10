import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabs, TabPane, Table, Tree } from "@douyinfe/semi-ui";

import { useRequest } from "ahooks";

import {
  convert,
  convertArrToTree,
  formatSeconds,
  getNameFromFiles,
  sizeTostr,
} from "../utils";

import { useImmer } from "use-immer";
import { getPeers } from "@/services";

function TaskDetail() {
  const { gid } = useParams();
  const [isTorrent, setTorrentStatus] = useState(false);

  // const tableData = [
  //   {
  //     key: "0",
  //     name: "任务名称",
  //     value: (() => (data ? getNameFromFiles(data.files[0]) : ""))(),
  //   },
  //   {
  //     key: "1",
  //     name: "任务大小",
  //     value: (() => {
  //       if (data) {
  //         const value =
  //           sizeTostr(data.totalLength) + " (" + data.files.length + "个文件)";
  //         return value;
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "2",
  //     name: "任务状态",
  //     value: (() => {
  //       if (data) {
  //         return data.status === "active" ? "正在下载" : "暂停";
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "3",
  //     name: "进度",
  //     value: (() => {
  //       if (data) {
  //         return (
  //           ((data.completedLength / data.totalLength) * 100).toFixed(2) + "%"
  //         );
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "4",
  //     name: "下载",
  //     value: (() => {
  //       if (data) {
  //         return sizeTostr(data.completedLength);
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "5",
  //     name: "上传",
  //     value: (() => {
  //       if (data) {
  //         return sizeTostr(data.uploadLength);
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "6",
  //     name: "剩余时间",
  //     value: (() => {
  //       if (data) {
  //         return formatSeconds(data.downloadSpeed, data.totalLength);
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "7",
  //     name: "下载路径",
  //     value: (() => {
  //       return data ? data.dir : "";
  //     })(),
  //   },
  //   {
  //     key: "8",
  //     name: "特征值",
  //     value: (() => {
  //       if (data) {
  //         return data.infoHash;
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "9",
  //     name: "种子数/连接数",
  //     value: (() => {
  //       if (data) {
  //         return data.numSeeders + "/" + data.connections;
  //       }
  //       return "";
  //     })(),
  //   },
  //   {
  //     key: "10",
  //     name: "BT服务器",
  //     value: (() => {
  //       try {
  //         if (data && data.bittorrent.announceList.length) {
  //           return data.bittorrent.announceList.reduce(
  //             (acc, cur) => acc + " | " + cur
  //           );
  //         }
  //       } catch (err) {
  //         return "";
  //       }
  //     })(),
  //   },
  // ];
  // 如果是种子连接则删除多余的字段
  // if (!isTorrent) {
  //   tableData.length = 8;
  // }

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
    <button
      onClick={() => {
        getPeers("b642904bee10ef19").then((res) => {
          console.log(res);
        });
      }}
    >
      test
    </button>
  );

  return (
    <Tabs type="line">
      <TabPane tab="总览" itemKey="1">
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          showHeader={false}
          bordered={false}
        />
      </TabPane>
      <TabPane tab="区块信息" itemKey="2"></TabPane>
      <TabPane tab="文件列表" itemKey="3">
        <Tree searchRender={false} treeDataSimpleJson={treeData} />
      </TabPane>
    </Tabs>
  );
}

export default TaskDetail;
