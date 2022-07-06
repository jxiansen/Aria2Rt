import { Layout, Nav } from "@douyinfe/semi-ui";
import Aria2Client from "./../aria2-client";
import FooterContent from "./footer";
import HeaderContent from "./header";
import SiderContent from "./sider";

import { Outlet } from "react-router-dom";
// @ts-ignore
window.Aria2Client = Aria2Client;

export default () => {
  const { Header, Footer, Sider, Content } = Layout;
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
