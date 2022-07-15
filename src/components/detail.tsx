import { Tabs, TabPane, Table } from "@douyinfe/semi-ui";
import { HeatMapGrid } from "react-grid-heatmap";
import { convert } from "./../tool";
import { useInterval, useMount, useRequest } from "ahooks";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { IconMore } from "@douyinfe/semi-icons";
import client from "../client";
import { useImmer } from "use-immer";

export default () => {
  let { gid } = useParams();
  async function getDetails() {
    const ready = await client.readyPromise;
    // @ts-ignore
    return client.tellStatus(gid);
    // return ready.getPeers(gid);
  }
  const { data, error, loading } = useRequest(getDetails, {
    pollingInterval: 1000,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  const columns = [
    {
      dataIndex: "name",
    },
    {
      dataIndex: "value",
    },
  ];
  const tableData = [
    {
      key: "1",
      name: "任务名称",
      value: 123,
    },
    {
      key: "2",
      name: "任务大小",
      value: "2M",
    },
    {
      key: "3",
      name: "任务状态",
      value: "2M",
    },
    {
      key: "4",
      name: "进度",
      value: "2M",
    },
    {
      key: "5",
      name: "下载",
      value: "2M",
    },
    {
      key: "6",
      name: "上传",
      value: "2M",
    },
    {
      key: "7",
      name: "分享率",
      value: "2M",
    },
    {
      key: "8",
      name: "剩余时间",
      value: "2M",
    },
    {
      key: "9",
      name: "种子数/连接数",
      value: "2M",
    },
    {
      key: "10",
      name: "特征值",
      value: (() => {
        return data ? data.dir : "";
      })(),
    },
    {
      key: "11",
      name: "下载路径",
      value: (() => {
        return data ? data.dir : "";
      })(),
    },
    {
      key: "12",
      name: "BT服务器",
      value: (() => {
        return data ? data.dir : "";
      })(),
    },
  ];

  // function dataToTable(data: object) {
  //   let tableData = [];
  //   for (let key in data) {
  //     if(key )
  //   }
  // }

  return (
    <div>
      <Tabs type="line">
        <TabPane tab="总览" itemKey="1">
          <Table columns={columns} dataSource={tableData} pagination={false} />;
        </TabPane>
        <TabPane tab="区块信息" itemKey="2">
          <div style={{ margin: "40px 0 0 50px" }}>
            <HeatMapGrid
              // @ts-ignore
              data={data === undefined ? [] : convert(data.bitfield)}
              cellStyle={(_x, _y, ratio) => ({
                background: `rgb(12, 160, 44, ${ratio})`,
                fontSize: ".8rem",
                color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
              })}
              cellHeight="12px"
              square
            />
          </div>
        </TabPane>
        <TabPane tab="文件列表" itemKey="3">
          <h3>帮助</h3>
          <p
            style={{
              lineHeight: 1.8,
              color: "var(--semi-color-text-0)",
              fontWeight: 600,
            }}
          >
            Q：有新组件需求、或者现有组件feature不能满足业务需求？
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
            右上角问题反馈，提交issue，label选择Feature Request / New Component
            Request 我们会高优处理这些需求。
          </p>
          <p
            style={{
              lineHeight: 1.8,
              color: "var(--semi-color-text-0)",
              fontWeight: 600,
            }}
          >
            Q：对组件的使用有疑惑？
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
            欢迎进我们的客服lark群进行咨询提问。
          </p>
        </TabPane>
        <TabPane tab="连接状态" itemKey="4">
          <h3>帮助</h3>
          <p
            style={{
              lineHeight: 1.8,
              color: "var(--semi-color-text-0)",
              fontWeight: 600,
            }}
          >
            Q：有新组件需求、或者现有组件feature不能满足业务需求？
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
            右上角问题反馈，提交issue，label选择Feature Request / New Component
            Request 我们会高优处理这些需求。
          </p>
          <p
            style={{
              lineHeight: 1.8,
              color: "var(--semi-color-text-0)",
              fontWeight: 600,
            }}
          >
            Q：对组件的使用有疑惑？
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
            欢迎进我们的客服lark群进行咨询提问。
          </p>
        </TabPane>
      </Tabs>
    </div>
  );
};
