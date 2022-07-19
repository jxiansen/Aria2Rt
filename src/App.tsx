import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Downloading from "./components/downloading";
import Stopped from "./components/stopped";
import New from "./components/new";
import Detail from "./components/detail";
import Demo from "./components/demo";
import Waiting from "./components/waiting";
import Settings from "./components/settings";
import Status from "./components/status";

export default () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="downloading" element={<Downloading />} />
        <Route path="waiting" element={<Waiting />} />
        <Route path="stopped" element={<Stopped />} />
        <Route path="new" element={<New />} />
        <Route path="demo" element={<Demo />} />
        <Route path="task/detail/:gid" element={<Detail />} />
        <Route path="settings" element={<Settings />} />
        <Route path="status" element={<Status />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
