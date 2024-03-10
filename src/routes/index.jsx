import Layout from "@/components/layout";
import Downloading from "@/pages/downloading";
import Stopped from "@/pages/stopped";
import New from "@/components/new";
import Detail from "@/pages/detail";
import Waiting from "@/pages/waiting";
import Settings from "@/pages/settings";
import Status from "@/pages/status";
import Charts from "@/components/charts";

import { useRoutes } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "downloading", element: <Downloading /> },
      { path: "waiting", element: <Waiting /> },
      { path: "stopped", element: <Stopped /> },
      { path: "new", element: <New /> },
      { path: "task/detail/:gid", element: <Detail /> },
      { path: "settings", element: <Settings /> },
      { path: "status", element: <Status /> },
      { path: "dashboard", element: <Charts /> },
    ],
  },
];

function Router() {
  let element = useRoutes(routes);
  return element;
}

export default Router;
