import { useEffect } from "react";
import { Line } from "@ant-design/plots";
import store from "../store";
import { useImmer } from "use-immer";

const DemoLine = () => {
  const { downloadSpeed, uploadSpeed } = store.globalState;
  const [data, setData] = useImmer([
    {
      time: new Date().toLocaleTimeString(),
      speed: 0,
      category: "下载速度",
    },
    {
      time: new Date().toLocaleTimeString(),
      speed: 10,
      category: "上传速度",
    },
  ]);
  useEffect(() => {
    setData((draft) => {
      draft.push({
        time: new Date().toLocaleTimeString(),
        speed: Number(downloadSpeed),
        category: "下载速度",
      });
      draft.push({
        time: new Date().toLocaleTimeString(),
        speed: Number(uploadSpeed),
        category: "上传速度",
      });
    });
  }, [downloadSpeed, uploadSpeed]);

  const config = {
    data,
    xField: "time",
    yField: "speed",
    seriesField: "category",
    xAxis: {
      title: {
        text: "全局速度",
        style: {
          lineWidth: 2,
        },
      },
    },
  };

  return <Line {...config} />;
};

export default DemoLine;
