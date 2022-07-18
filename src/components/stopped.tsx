import { Table, Progress, Tooltip } from "@douyinfe/semi-ui";
import { sizeTostr } from "./../tool";
import { divide, floor } from "lodash";
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { getNameFromFiles } from "./../tool";
import { useInterval, useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useEffect, useMemo } from "react";
import client from "../client";

export default function App() {
  const [isLoading, setLoading] = useImmer(true);
  // 所有已经完成的任务数据存储
  const [dataSource, setDataSource] = useImmer<any[]>([]);
  const navigate = useNavigate();

  async function getStop() {
    const ready = await client.readyPromise;
    // @ts-ignore
    return await ready.tellStopped(-1, 1000, [
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
      "bittorrent",
      "infoHash",
    ]);
  }
  const { data, error, loading } = useRequest(getStop, {
    pollingInterval: 2000,
  });

  useEffect(() => {
    console.log(data);
    if (data && data.length) {
      setDataSource(data);
    }
    if (loading) {
      setLoading(false);
    }
  }, [data]);

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
      sorter: (a: any, b: any) => (a.totalLength - b.totalLength > 0 ? 1 : -1),
      render: (size: string) => {
        return <div>{sizeTostr(size)}</div>;
      },
    },
    {
      title: "进度",
      dataIndex: "files2",
      sorter: (a: any, b: any) =>
        a.completedLength - b.completedLength > 0 ? 1 : -1,

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

  const scroll = useMemo(() => ({ y: 800 }), []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        // @ts-ignore
        onRow={handleRow}
        loading={isLoading}
      />
    </>
  );
}
