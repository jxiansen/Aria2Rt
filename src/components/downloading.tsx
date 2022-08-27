import { Table, Progress, Tooltip } from "@douyinfe/semi-ui";
import floor from "lodash/floor";
import divide from "lodash/divide";
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import client from "../client";
import { useEffect } from "react";
import store from "../store";
import {
  sizeTostr,
  convertSpeed,
  formatSeconds,
  getNameFromFiles,
} from "./../tool";

async function getActive() {
  const ready = await client.readyPromise;
  // @ts-ignore
  return ready.tellActive([
    "gid",
    "totalLength",
    "completedLength",
    "uploadSpeed",
    "downloadSpeed",
    "connections",
    "numSeeders",
    "seeder",
    "status",
    "errorCode",
    "verifiedLength",
    "verifyIntegrityPending",
    "files",
  ]);
}

const rowSelection = {
  onSelectAll: (selected: boolean) => {
    if (selected) {
      store.selectedAll = true;
    }
  },
  onSelect: (record: any, selected: boolean) => {
    const { curGid } = store;
    if (selected) {
      // @ts-ignore
      curGid.push(record.gid);
    }
  },
};

export default () => {
  const navigate = useNavigate();
  const { data, error, loading } = useRequest(getActive, {
    pollingInterval: 1000,
  });

  useEffect(() => {}, [data]);

  const columns = [
    {
      title: "文件名",
      dataIndex: "files",
      render: (data: any, record: any, index: number) => {
        const fileName = getNameFromFiles(record.files[0]);
        return (
          <>
            <span>{fileName} </span>
            <span style={{ color: "#208fe5", fontSize: "13px" }}>
              ({data.length}个文件)
            </span>
          </>
        );
      },
    },
    {
      title: "总大小",
      dataIndex: "totalLength",
      sorter: (a: any, b: any) => (a.size - b.size > 0 ? 1 : -1),
      render: (size: string) => {
        return <div>{sizeTostr(size)}</div>;
      },
    },
    {
      title: "进度",
      dataIndex: "progress",
      sorter: (a: any, b: any) =>
        a.completedLength / a.totalLength - b.completedLength / b.totalLength >
        0
          ? 1
          : -1,
      // text参数是数据源，record是数组中的一个纪录,index是索引
      render: (data: any, record: any, index: number) => {
        const [completed, all] = [+record.completedLength, +record.totalLength];
        let per = completed === 0 ? 0 : floor(divide(completed, all) * 100, 2);
        return (
          <Progress
            percent={per}
            showInfo
            size="large"
            style={{ height: "10px" }}
            format={(per) => per + "%"}
          />
        );
      },
    },
    {
      title: "剩余时间",
      dataIndex: "remainTime",
      sorter: (a: any, b: any) =>
        a.downloadSpeed / a.totalLength - b.downloadSpeed / b.totalLength > 0
          ? 1
          : -1,
      render: (data: any, record: any, index: number) => {
        return formatSeconds(record.downloadSpeed, record.totalLength);
      },
    },
    {
      title: "下载速度",
      dataIndex: "downloadSpeed",
      sorter: (a: any, b: any) => (a.speed - b.speed > 0 ? 1 : -1),
      render: (speed: string, record: any) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>{convertSpeed(speed)}</span>
            <span style={{ color: "#208fe5", fontSize: "13px" }}>
              ({record.numSeeders ? record.numSeeders : 0}/{record.connections})
            </span>
          </div>
        );
      },
    },
    {
      title: "查看详情",
      dataIndex: "navigate",
      render: (data: string, record: any) => {
        return (
          <Tooltip content={"点击查看任务详情"} position="left">
            <IconChevronRight
              size="extra-large"
              onClick={() => {
                navigate(`/task/detail/${record.gid}`);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  const handleRow = (record: any, index: any) => {
    // 给偶数行设置斑马纹
    if (index % 2 === 0) {
      return {
        style: {
          background: "var(--semi-color-fill-0)",
        },
      };
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="gid" // 为表格中的每一行指定一个key
      pagination={false}
      // @ts-ignore
      onRow={handleRow}
      // @ts-ignore
      rowSelection={rowSelection}
    />
  );
};
