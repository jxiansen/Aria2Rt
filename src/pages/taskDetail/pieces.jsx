import { Space } from "@douyinfe/semi-ui";

import { hexToBinary } from "@/utils";
import { useMemo } from "react";

function Pieces(props) {
  const { bitfield } = props || {};

  const dataSource = useMemo(() => {
    if (typeof bitfield !== "string" || bitfield.length === 0) {
      return [];
    }

    return hexToBinary(bitfield).split("");
  }, [bitfield]);

  return (
    <div>
      <div className="pieces-title">
        <Space>
          <span style={{ margin: 0 }} className="pieces-item completed"></span>
          <span>完成</span>
        </Space>
        <Space style={{ marginLeft: 8 }}>
          <span style={{ margin: 0 }} className="pieces-item"></span>
          <span>未完成</span>
        </Space>
      </div>

      <div className="pieces-area-wrapper">
        {dataSource.map((item, idx) => {
          return (
            <span
              key={idx}
              className={`pieces-item ${item === "1" ? "completed" : ""}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}

export default Pieces;
