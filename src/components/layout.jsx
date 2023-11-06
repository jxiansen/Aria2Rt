import { Layout, Notification } from "@douyinfe/semi-ui";
import FooterContent from "./footer";
import HeaderContent from "./header";
import SiderContent from "./sider";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";

const { Header, Footer, Sider, Content } = Layout;

function RenderPageLayout(props) {
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
}

export default RenderPageLayout;
