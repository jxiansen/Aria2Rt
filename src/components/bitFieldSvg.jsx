import { useRef, useEffect } from "react";

import { hexToBinary } from "@/utils";

function BitFieldCanvas(props) {
  const { bitField, width = 0.5, color = "#208fe5" } = props || {};
  // 获取 Canvas 元素的引用
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 将十六进制字符串转换为二进制字符串
    const binaryString = hexToBinary(bitField);

    // 设置 Canvas 的宽度和高度
    canvas.width = 400;
    canvas.height = 20;

    // 清空 Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制条形码
    for (let i = 0; i < binaryString.length; i++) {
      const bit = binaryString[i];
      const x = i * width;
      const y = 0;
      const fill = bit === "1" ? color : "white";
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, width, canvas.height);
    }
  }, [bitField, width, color]);

  return <canvas ref={canvasRef} />;
}

export default BitFieldCanvas;
