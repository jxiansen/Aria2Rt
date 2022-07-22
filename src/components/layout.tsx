import { Layout, Notification } from "@douyinfe/semi-ui";
import FooterContent from "./footer";
import HeaderContent from "./header";
import SiderContent from "./sider";
import { Outlet } from "react-router-dom";
import { useRequest } from "ahooks";
import store from "./../store";
import client from "../client";
import { useEffect } from "react";

async function getInfo() {
  const ready = await client.readyPromise;
  // @ts-ignore
  return ready.getGlobalStat();
}

export default () => {
  const { Header, Footer, Sider, Content } = Layout;
  const { data, error, loading } = useRequest(getInfo, {
    pollingInterval: 1000,
  });

  // 从store中解构出client实列和全局状态
  useEffect(() => {
    if (error) {
      Notification.error({
        content: "连接服务器失败",
        duration: 0,
      });
    } else {
      Notification.success({
        title: "Hi, Guys",
        content: "成功连接服务器啦了😘",
        duration: 1.5,
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      store.globalState = data;
    }
  }, [data]);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <SiderContent />
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
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};
