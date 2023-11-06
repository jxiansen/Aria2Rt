// import { Route, Routes, Navigate } from "react-router-dom";
// import Layout from "./components/layout";
// import Downloading from "./pages/downloading";
// import Stopped from "./pages/stopped";
// import New from "./components/new";
// import Detail from "./components/detail";
// import Waiting from "./pages/waiting";
// import Settings from "./pages/settings";
// import Status from "./pages/status";
// import Charts from "./components/charts";
// import { useEffect, useState } from "react";

// export default () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route path="downloading" element={<Downloading />} />
//         <Route path="waiting" element={<Waiting />} />
//         <Route path="stopped" element={<Stopped />} />
//         <Route path="new" element={<New />} />
//         <Route path="task/detail/:gid" element={<Detail />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="status" element={<Status />} />
//         <Route path="dashboard" element={<Charts />} />
//       </Route>
//       <Route path="*" element={<Navigate replace to="/" />} />
//     </Routes>
//   );
// };

import Router from "@/routes";

function App() {
  return <Router />;
}

export default App;
