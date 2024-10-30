import React from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";

interface ILabelListProps {
  data: string[];
  itemStyle?: {};
  style?: {};
}
const LabelList: React.FC<ILabelListProps> = ({ data, itemStyle, style }) => {
  return (
    <View className={styles.wrap} style={style}>
      {data.map((item, index) => (
        <Text className={styles.item} key={index} style={itemStyle}>
          {item}
        </Text>
      ))}
    </View>
  );
};

export default LabelList;
