import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";
import Downloading from "@/pages/downloading";
import Stopped from "@/pages/stopped";
import New from "@/components/new";
import Waiting from "@/pages/waiting";
import Settings from "@/pages/settings";
import Status from "@/pages/status";
import { getGlobalStat } from "@/services";
import TaskDetail from "@/pages/taskDetail";

import "@/assets/index.less";

function App() {
  const [globalStatus, setGlobalStatus] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  const context = {
    globalStatus,
    isDarkMode,
  };

  const initData = () => {
    getGlobalStat().then((res) => {
      setGlobalStatus(res);
    });
  };

  useEffect(() => {
    setInterval(() => {
      initData();
    }, 1000);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout context={context} />}>
          <Route path="downloading" element={<Downloading />} />
          <Route path="task/detail/:gid" element={<TaskDetail />} />
          <Route path="waiting" element={<Waiting />} />
          <Route path="stopped" element={<Stopped />} />
          <Route path="new" element={<New />} />
          <Route path="settings" element={<Settings />} />
          <Route path="status" element={<Status />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
