import { Progress, Tooltip, Table } from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";
import floor from "lodash/floor";
import divide from "lodash/divide";
import { getNameFromFiles, sizeTostr } from "../utils";
import { IconChevronRight } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import ariaClient from "@/services/client";

function RenderWaiting() {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getWaitingList = () => {
    ariaClient.tellWaiting(1, 130).then((res) => {
      console.log(res);
    });
  };

  const rowSelection = {
    // onSelectAll: (selected) => {
    //   if (selected) {
    //     store.selectedAll = true;
    //   }
    // },
    // onSelect: (record, selected) => {
    //   if (selected) {
    //     store.curGid.push(record.gid);
    //   }
    // },
  };
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
      title: "状态",
      dataIndex: "status",
      render: () => "已经暂停",
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

  useEffect(() => {
    getWaitingList();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      onRow={handleRow}
      rowKey="gid"
      loading={isLoading}
      rowSelection={rowSelection}
    />
  );
}

export default RenderWaiting;
