import { Table, Progress, Tooltip } from "@douyinfe/semi-ui";
import * as dateFns from "date-fns";
import {
  sizeTostr,
  convertSpeed,
  formatSeconds,
  getNameFromFiles,
} from "./../tool";
import { divide, floor } from "lodash";
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import client from "../client";
import { useEffect } from "react";
import { useImmer } from "use-immer";

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

export default () => {
  const { data, error, loading } = useRequest(getActive, {
    pollingInterval: 1000,
  });

  const [files, setFiles] = useImmer([]);
  useEffect(() => {
    if (data) {
      setFiles(data.files);
    }
    console.log(data);
  }, [data]);

  const navigate = useNavigate();

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
      render: (size: string) => {
        return <div>{sizeTostr(size)}</div>;
      },
    },
    {
      title: "进度",
      dataIndex: "progress",
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
      render: (data: any, record: any, index: number) => {
        return formatSeconds(record.downloadSpeed, record.totalLength);
      },
    },
    {
      title: "下载速度",
      dataIndex: "downloadSpeed",
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
      pagination={false}
      // @ts-ignore
      onRow={handleRow}
    />
  );
};
