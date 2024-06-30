import { Layout, Notification } from "@douyinfe/semi-ui";
import FooterContent from "./footer";
import HeaderContent from "./header";
import SiderContent from "./sider";
import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import ariaClient from "@/services/client";

import { formatBytes } from "@/utils";

const { Header, Footer, Sider, Content } = Layout;

function RenderPageLayout(props) {
  const { context } = props || {};
  const { globalStatus } = context || {};

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <SiderContent globalStatus={globalStatus} />
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
          <FooterContent globalStatus={globalStatus} />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default RenderPageLayout;
