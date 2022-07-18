import { Progress, Tooltip, Table } from "@douyinfe/semi-ui";
import { useRequest, useTimeout } from "ahooks";
import { floor, divide } from "lodash";
import { getNameFromFiles, sizeTostr } from "../tool";
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import client from "../client";
import { useEffect } from "react";

export default () => {
  const [dataSource, setDataSource] = useImmer<any[]>([]);
  const [isLoading, setLoading] = useImmer(true);
  const navigate = useNavigate();
  // =============================
  async function getWaiting() {
    const ready = await client.readyPromise;
    // @ts-ignore
    return await ready.tellWaiting(0, 1000, [
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
  const { data, error, loading } = useRequest(getWaiting, {
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
    {
      title: "状态",
      dataIndex: "status",
      render: () => "已经暂停",
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
      dataSource={dataSource}
      pagination={false}
      // @ts-ignore
      onRow={handleRow}
      loading={isLoading}
    />
  );
};
