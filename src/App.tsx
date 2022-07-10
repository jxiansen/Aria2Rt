import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import Downloading from "./components/downloading";
import Stopped from "./components/stopped";
import New from "./components/new";
import Detail from "./components/detail";
import Test from "./components/test";

export default () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="downloading" element={<Downloading />} />
        <Route path="waiting" element={<h1>waiting</h1>} />
        <Route path="stopped" element={<Stopped />} />
        <Route path="new" element={<New />} />
        <Route path="test" element={<Test />} />
        <Route path="task/detail/:gid" element={<Detail />} />
        <Route path="settings">
          <Route path="ui" element={<h1>ui</h1>} />
          <Route path="aria2">
            <Route path="basic" element={<h1>basic</h1>} />
            <Route path="http-ftp-sftp" element={<h1>http-ftp-sftp</h1>} />
            <Route path="http" element={<h1>http</h1>} />
            <Route path="ftp-sftp" element={<h1>ftp-sftp</h1>} />
            <Route path="bt" element={<h1>bt</h1>} />
            <Route path="metalink" element={<h1>metalink</h1>} />
            <Route path="metalink" element={<h1>metalink</h1>} />
            <Route path="rpc" element={<h1>rpc</h1>} />
            <Route path="advanced" element={<h1>advanced</h1>} />
          </Route>
        </Route>
        <Route path="status" element={<h1>status </h1>} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
