import { Breadcrumb, Skeleton } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  return (
    <>
      <Breadcrumb
        style={{
          marginBottom: "24px",
        }}
        routes={["首页", "当这个页面标题很长时需要省略", "上一页", "详情页"]}
      />
      <div
        style={{
          borderRadius: "10px",
          border: "1px solid var(--semi-color-border)",
          height: "376px",
          padding: "32px",
        }}
      >
        <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={true}>
          <p>Hi, Bytedance dance dance.</p>
          <p>Hi, Bytedance dance dance.</p>
        </Skeleton>
      </div>
    </>
  );
};
