import { Table } from "@douyinfe/semi-ui";
import { useMemo } from "react";
import { set } from "lodash";

// todo 待优化
function toTree(obj) {
  const tree = [];

  for (const key in obj) {
    const val = obj[key];

    const node = {
      fileName: key,
      uk: key,
    };

    if (val.index) {
      Object.assign(node, val);
    } else {
      node.children = toTree(obj[key]);
    }

    tree.push(node);
  }

  return tree;
}

const getPathList = (pathStr, taskName) => {
  const _path = pathStr.split("/") || [];

  const targetIdx = _path.findIndex((item) => item === taskName);
  return _path.slice(targetIdx + 1);
};

function RenderFileList(props) {
  const { list, taskName } = props || {};

  const dataSource = useMemo(() => {
    if (!Array.isArray(list) || !list.length || !taskName) {
      return [];
    }

    const obj = {};

    for (let item of list) {
      const { index, completedLength, length, path, selected } = item || {};
      const pathList = getPathList(path, taskName);

      const val = {
        index,
        progress: ((completedLength / length) * 100).toFixed(2),
        selected: Boolean(selected),
        size: +length,
      };
      set(obj, pathList, val);
    }

    return toTree(obj);
  }, [list]);

  const columns = [
    {
      title: "文件名",
      dataIndex: "fileName",
    },
    {
      title: "进度",
      dataIndex: "progress",
    },
    {
      title: "文件大小",
      dataIndex: "size",
    },
  ];

  return (
    <Table
      rowKey="uk"
      size="small"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
}

export default RenderFileList;
