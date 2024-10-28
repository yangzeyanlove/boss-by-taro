import React from "react";
import { View } from "@tarojs/components";

interface DividerProps {
  thickness?: number; // 分割线厚度，默认为 1
  color?: string; // 分割线颜色，默认为 #ff0000
  marginVertical?: number; // 上下间距，默认为 0
}

const Divider: React.FC<DividerProps> = ({
  thickness = 1,
  color = "#EFEFEF",
  marginVertical = 0,
}) => {
  return (
    <View
      style={{
        height: thickness,
        backgroundColor: color,
        margin: `${marginVertical}px 0`,
      }}
    />
  );
};

// const styles = StyleSheet.create({
//   divider: {
//     width: '100%', // 分割线宽度为 100%
//   },
// });

export default Divider;
