import { Form, Spin, Toast } from "@douyinfe/semi-ui";
import { useRequest } from "ahooks";
// import client from "../client";
// 导入中文名和原字段翻译映射配置
import filedMap from "@/assets/transloateConfig.json";

// 处理表单数据变化,重新提交
const handleChange = async (val) => {
  for (let key in val) {
    const value = val[key].toString();
    val[key] = value;
  }
  const ready = await client.readyPromise;
  ready.changeGlobalOption(val);
  Toast.info({
    content: "设置修改成功🤞",
    duration: 2,
  });
};

const getOptions = async () => {
  const ready = await client.readyPromise;
  return ready.getGlobalOption();
};

export default () => {
  // 页面一加载就开始请求数据
  const { data, error, loading } = useRequest(getOptions);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="I am loading..." />
      </div>
    );
  }
  return (
    <Form
      labelPosition="left"
      labelWidth="450px"
      labelAlign="left"
      style={{ padding: "10px", width: "80%" }}
      onValueChange={(val) => {
        handleChange(val);
      }}
    >
      {Object.keys(data).map((key, idx) => {
        const val = data[key];
        if (val === "true" || val === "false") {
          return (
            <Form.Switch
              key={idx}
              label={filedMap[key] ? `${filedMap[key]}: (${key})` : key}
              field={key}
              initValue={val === "true" ? true : false}
            />
          );
        }

        return (
          <Form.Input
            key={idx}
            field={key}
            label={filedMap[key] ? `${filedMap[key]}: (${key})` : key}
            trigger="blur"
            initValue={val}
            style={{ width: 200 }}
            rules={[
              { required: true, message: "内容不能为空" },
              { type: "string", message: "类型错误" },
            ]}
          />
        );
      })}
    </Form>
  );
};
