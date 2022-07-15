import { Table, Progress, Tooltip } from "@douyinfe/semi-ui";
import { sizeTostr } from "./../tool";
import { divide, floor } from "lodash";
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { getNameFromFiles } from "./../tool";
import { useInterval } from "ahooks";
import { useImmer } from "use-immer";
import { useMemo } from "react";

export default function App() {
  const [isLoading, setLoading] = useImmer(true);
  // 所有已经完成的任务数据存储
  const [dataSource, setDataSource] = useImmer<any[]>([]);
  const navigate = useNavigate();

  // 每隔2秒获取一次数据
  useInterval(() => {
    ws.send(tellStopped);
  }, 1000);

  // 当有数据传递过来的时候,设置存入本地state并设置加载成功
  ws.addEventListener("message", (e) => {
    setDataSource(JSON.parse(e?.data).result);
    setLoading(false);
  });

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
