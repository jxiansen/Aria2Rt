import { Table, Progress, Tooltip, Button } from "@douyinfe/semi-ui";
import { IconDelete } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import {
  formatBytes,
  getPercent,
  getRemainTime,
  sizeTostr,
  convertSpeed,
  formatSeconds,
  getNameFromFiles,
} from "../utils";
import { tellActive } from "@/services";

const rowSelection = {
  onSelectAll: (selected) => {
    if (selected) {
      store.selectedAll = true;
    }
  },
  onSelect: (record, selected) => {
    const { curGid } = store;
    if (selected) {
      curGid.push(record.gid);
    }
  },
};

const formatData = (data) => {
  if (!Array.isArray(data) && data.length === 0) return [];

  const output = [];

  for (let item of data) {
    const {
      gid,
      bittorrent,
      completedLength,
      totalLength,
      downloadSpeed,
      files,
    } = item || {};
    const { info } = bittorrent || {};
    const { name } = info || {};

    output.push({
      gid: gid,
      name: name,
      size: formatBytes(totalLength) + `   ${files.length}个文件`,
      progress: getPercent(completedLength, totalLength),
      remainTime: getRemainTime(completedLength, totalLength, downloadSpeed),
      downloadSpeed: formatBytes(downloadSpeed) + "/s",
    });
  }
  return output;
};

function Downloading() {
  const [activeList, setActiveList] = useState([]);

  const initTaskList = () => {
    tellActive().then((res) => {
      console.log(res);
      setActiveList(res || []);
    });
  };

  useEffect(() => {
    let timeId = setInterval(() => {
      initTaskList();
    }, 2000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  const dataSource = useMemo(() => {
    return formatData(activeList);
  }, [activeList]);

  const columns = [
    {
      title: "文件名",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "大小",
      dataIndex: "size",
      width: "15%",
    },
    {
      title: "进度",
      dataIndex: "progress",
      render: (data, record, index) => {
        return (
          <Progress
            percent={Number(data)}
            style={{ height: 20, width: 200 }}
            showInfo
            size="large"
          />
        );
      },
    },
    {
      title: "剩余时间",
      dataIndex: "remainTime",
      width: "15%",
    },
    {
      title: "下载速度",
      dataIndex: "downloadSpeed",
      width: "15%",
    },
    {
      title: "操作",
      render: (data, record) => {
        return (
          <>
            <Button size="small">删除</Button>
            <Button size="small">详情</Button>
          </>
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
    <Table
      dataSource={dataSource}
      rowKey="gid" // 为表格中的每一行指定一个key
      columns={columns}
      pagination={false}
      onRow={handleRow}
      // rowSelection={rowSelection}
    />
  );
}

export default Downloading;
