import { Layout, Notification } from "@douyinfe/semi-ui";
import FooterContent from "./footer";
import HeaderContent from "./header";
import SiderContent from "./sider";
import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import { getGlobalStat } from "@/services";
import { formatBytes } from "@/utils";

const { Header, Footer, Sider, Content } = Layout;

function RenderPageLayout(props) {
  const [globalState, setGlobalState] = useState({});

  useEffect(() => {
    setInterval(() => {
      getGlobalStat().then((res) => {
        const { result } = res || {};
        if (!result) {
          return;
        }

        document.title = `Aria2-下载${formatBytes(result.downloadSpeed)}/s`;
        setGlobalState(result);
      });
    }, 1000);
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     // Notification.error({
  //     //   content: "连接服务器失败",
  //     //   duration: 0,
  //     // });
  //   } else {
  //     // Notification.success({
  //     //   title: "Hi, Guys",
  //     //   content: "成功连接服务器啦了😘",
  //     //   duration: 1.5,
  //     // });
  //   }
  // }, [error]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <SiderContent globalState={globalState} />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <HeaderContent />
        </Header>
        <Content
          style={{
            padding: "15px",
            backgroundColor: "var(--semi-color-bg-0)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            color: "var(--semi-color-text-2)",
            backgroundColor: "rgba(var(--semi-grey-0), 1)",
          }}
        >
          <FooterContent globalState={globalState} />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default RenderPageLayout;
