import { Table, Progress, Tooltip, Button, Toast } from "@douyinfe/semi-ui";
import { sizeTostr } from "./../tool";
import { divide, floor } from "lodash";
import { IconChevronRight, IconDelete } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { getNameFromFiles } from "./../tool";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import client from "../client";

export default function App() {
  const [isLoading, setLoading] = useImmer(true);
  // 所有已经完成的任务数据存储
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
    pollingInterval: 1000,
  });

  useEffect(() => {
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
      title: "删除纪录",
      dataIndex: "delete",
      render: (data: string, record: any) => {
        return (
          <Button
            theme="borderless"
            type="primary"
            onClick={async () => {
              // 删除当前的纪录
              const ready = await client.readyPromise;
              // @ts-ignore
              ready.removeDownloadResult(record.gid);
              Toast.info({
                content: "删除任务成功啦",
                duration: 1,
              });
            }}
          >
            <IconDelete />
          </Button>
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
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        // @ts-ignore
        onRow={handleRow}
        loading={isLoading}
      />
    </>
  );
}
