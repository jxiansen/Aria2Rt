import {
  Button,
  TabPane,
  Tabs,
  TextArea,
  Toast,
  Upload,
} from "@douyinfe/semi-ui";

import { isURL, isMagnetURI } from "validator";
import { Typography } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { IconBolt } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";

export default () => {
  const { Text } = Typography;
  const [rowsCount, setRowsCount] = useImmer(0);
  // 将所有链接存储拼接成一个字符串,最后在split成一个链接数组
  const [links, setLinks] = useImmer("");
  const [urls, setUrls] = useImmer([]);
  const navigate = useNavigate();
  useEffect(() => {
    const count = links.split("\n").length - 1;
    setRowsCount(count);

    setUrls(links.split("\n").filter((i) => !!i));
  }, [links]);

  const handleFileChange = (file) => {
    // 读取File对象中的文件
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async function () {
      let base64 = reader.result.split("base64,")[1];
      const ready = await client.readyPromise;

      ready.addTorrent(base64);
      Toast.info({
        content: "添加种子下载成功",
        duration: 1,
      });
      setTimeout(() => {
        navigate("/downloading");
      }, 1000);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  return (
    <div>
      <Tabs type="line">
        <TabPane tab="链接" itemKey="1">
          <br />
          <Text>下载链接 ({rowsCount}) 个链接:</Text>
          <br />
          <br />
          <TextArea
            autosize
            rows={10}
            showClear
            style={{ border: "rgba(var(--semi-grey-9), .08)" }}
            placeholder="支持多个URL地址,每个地址回车占一行,支持 url 和 磁力链接"
            onChange={(val) => {
              setLinks(val);
            }}
          />
          <Button
            theme="light"
            type="tertiary"
            style={{ marginTop: 28 }}
            onClick={() => {
              // 对地址数组中的每一个链接进行检查,如果不符合规范报错提示,成功添加下载任务后跳转回下载页面
              if (urls.every((i) => isURL(i) || isMagnetURI(i))) {
                // 允许提交

                client.addUri(urls);
                navigate("/downloading");
              } else {
                Toast.info({
                  content: "链接地址错误,请检查后再提交",
                  duration: 3,
                });
              }
            }}
          >
            立即下载
          </Button>
        </TabPane>

        <TabPane tab="种子下载" itemKey="2">
          <Upload
            action="#"
            dragIcon={<IconBolt />}
            draggable={true}
            onFileChange={(Array) => {
              handleFileChange(Array[0]);
            }}
            showUploadList={false}
            dragMainText={"点击上传文件或拖拽文件到这里"}
            dragSubText="仅支持 .torrent 种子文件"
            style={{ marginTop: 10 }}
          ></Upload>
        </TabPane>
      </Tabs>
    </div>
  );
};
