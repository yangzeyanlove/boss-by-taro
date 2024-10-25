import React from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";

interface ILabelListProps {
  data: string[];
}
const LabelList: React.FC<ILabelListProps> = ({ data }) => {
  return (
    <View className={styles.wrap}>
      {data.map((item, index) => (
        <Text className={styles.item} key={index}>
          {item}
        </Text>
      ))}
    </View>
  );
};

export default LabelList;
