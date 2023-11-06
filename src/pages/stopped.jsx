import { Table, Progress, Tooltip, Button, Toast } from "@douyinfe/semi-ui";
import { sizeTostr } from "../utils";
import floor from "lodash/floor";
import divide from "lodash/divide";
import { IconChevronRight, IconDelete } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { getNameFromFiles } from "../utils";
import { useRequest } from "ahooks";
import { useImmer } from "use-immer";
import { useEffect } from "react";
// import client from "../client";

export default function App() {
  const [isLoading, setLoading] = useImmer(true);
  // 所有已经完成的任务数据存储
  const navigate = useNavigate();

  async function getStop() {
    const ready = await client.readyPromise;

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
  const { data, error, loading } = useRequest(getStop);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [data]);

  const columns = [
    {
      title: "文件名",
      dataIndex: "files",
      render: (data, record, index) => {
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
      sorter: (a, b) => (a.totalLength - b.totalLength > 0 ? 1 : -1),
      render: (size) => {
        return <div>{sizeTostr(size)}</div>;
      },
    },
    {
      title: "进度",
      dataIndex: "files2",
      sorter: (a, b) => (a.completedLength - b.completedLength > 0 ? 1 : -1),

      // text参数是数据源，record是数组中的一个纪录,index是索引
      render: (data, record, index) => {
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
      render: (data, record) => {
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
      render: (data, record) => {
        return (
          <Button
            theme="borderless"
            type="primary"
            onClick={async () => {
              // 删除当前的纪录
              const ready = await client.readyPromise;

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

  const handleRow = (record, index) => {
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
        onRow={handleRow}
        loading={isLoading}
      />
    </>
  );
}
