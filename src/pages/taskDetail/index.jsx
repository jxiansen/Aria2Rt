import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Tabs, Steps, TabPane } from "@douyinfe/semi-ui";

import Overview from "./overview";
import ariaClient from "@/services/client";
import ConnectStatus from "./connectStatus";
import Pieces from "./pieces";
import FileList from "./fileList";

function RenderTaskDetail(props) {
  const { gid: taskId } = useParams();

  const [taskStatus, setTaskStatus] = useState({});

  const getTaskStatus = () => {
    taskId &&
      ariaClient.tellStatus(taskId).then((res) => {
        setTaskStatus(res || {});
      });
  };

  useEffect(() => {
    setInterval(() => {
      getTaskStatus();
    }, 1000);
  }, []);

  return (
    <div>
      <Tabs>
        <TabPane tab="总览" itemKey="dashPreview">
          <Overview taskStatus={taskStatus} />
        </TabPane>
        <TabPane tab="区块信息" itemKey="area">
          <Pieces bitfield={taskStatus.bitfield || {}} />
        </TabPane>
        <TabPane tab="文件列表" itemKey="fileList">
          <FileList
            list={taskStatus.files || []}
            taskName={taskStatus?.bittorrent?.info?.name}
          />
        </TabPane>
        <TabPane tab="连接状态" itemKey="connectStatus">
          <ConnectStatus taskId={taskId} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default RenderTaskDetail;
