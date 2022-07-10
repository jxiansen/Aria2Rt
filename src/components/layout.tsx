import { Layout, Toast, Notification } from "@douyinfe/semi-ui";
import Aria2Client from "./../aria2-client";
import FooterContent from "./footer";
import HeaderContent from "./header";
import SiderContent from "./sider";
import { Outlet } from "react-router-dom";
import { useInterval, useMount } from "ahooks";
import store from "./../store";
import { useEffect } from "react";

// @ts-ignore
window.Aria2Client = Aria2Client;

export default () => {
  const { Header, Footer, Sider, Content } = Layout;
  // 从store中解构出client实列和全局状态
  const { client, globalState } = store;

  useMount(() => {
    client
      .ready()
      .then(() => {
        Notification.success({
          title: "Hi, Guys",
          content: "You have connected the Server",
          duration: 1.5,
        });
      })
      .catch(() => {
        Notification.error({
          content: "connect fail",
          duration: 0,
        });
      });
  });

  /**
   * 每隔1秒钟获取一次全局状态,并更新
   */
  useInterval(() => {
    // 当client建立连接成功后执行下一步操作
    // client.ready().then((client) => {
    // @ts-ignore
    client.getGlobalStat().then((data) => {
      store.globalState = data;
    });
     // @ts-ignore
     client.tellActive().then((data) => {
      store.active = data;
    });
    // });
  }, 1000);
 

  return (
    <Layout
      style={{ border: "1px solid var(--semi-color-border)", height: "100vh" }}
    >
      <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <SiderContent />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
          <HeaderContent />
        </Header>
        <Content
          style={{
            padding: "24px",
            backgroundColor: "var(--semi-color-bg-0)",
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
