import { Table, Space, Checkbox } from "@douyinfe/semi-ui";

import ariaClient from "@/services/client";

import { filesize } from "filesize";
import { useMemo } from "react";

function insertIntoTree(tree, pathParts, data) {
  if (pathParts.length === 0) {
    return;
  }

  const part = pathParts[0];
  let node = tree.find((item) => item.name === part);

  if (!node) {
    node = { name: part, key: pathParts.join("/"), children: [] };
    tree.push(node);
  }

  if (pathParts.length === 1) {
    node.data = data;

    delete node.children;
  } else {
    insertIntoTree(node.children, pathParts.slice(1), data);
  }
}

function RenderFileList(props) {
  const { list } = props || {};
  console.log(list, "list");
  const dataSource = useMemo(() => {
    const tree = [];
    list &&
      list.forEach((item) => {
        const path = item.path.split("/").filter((part) => part.length > 0);
        const suffixArr = ariaClient?._options?.path
          ?.split("/")
          .filter((part) => part.length > 0);
        const pathParts = path.slice(suffixArr.length + 1, path.length);

        insertIntoTree(tree, pathParts, item);
      });

    console.log(tree);
    return tree;
  }, [list]);

  const columns = [
    {
      title: "文件名",
      dataIndex: "name",
      render: (text, record, idx) => {
        const checked = record?.data?.selected;

        return (
          <Space>
            <Checkbox checked={checked} />
            <span>{text}</span>
          </Space>
        );
      },
    },
    {
      title: "进度",
      render: (text, record, idx) => {
        const _data = record.data;
        if (_data) {
          const { completedLength, length } = _data || {};
          const progress = ((completedLength / length) * 100).toFixed(2);
          return progress + " %";
        }

        return null;
      },
    },
    {
      title: "文件大小",
      dataIndex: "length",
      render: (text, record, idx) => {
        if (record.data) {
          const fileLength = record.data.length || 0;
          return filesize(fileLength);
        }
        return null;
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
    } else {
      return {};
    }
  };

  return (
    <Table
      size="small"
      onRow={handleRow}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
}

export default RenderFileList;
