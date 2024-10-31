import React from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";
import { AtIcon } from "taro-ui";

const data = [
  "前端开发工程师",
  "web前端开发工程师",
  "前端开发工程",
  "vue前端开发工程师",
  "初级前端开发工程师",
  "react前端开发工程师",
];
const hotData = [
  {
    title: "国内电商运营",
    subTitle: "360000+个岗位",
  },
  {
    title: "跨境电商运营",
    subTitle: "360000+个岗位",
  },
  {
    title: "新媒体运营",
    subTitle: "360000+个岗位",
  },
  {
    title: "销售专员",
    subTitle: "360000+个岗位",
  },
  {
    title: "电话销售",
    subTitle: "360000+个岗位",
  },
  {
    title: "网络销售",
    subTitle: "360000+个岗位",
  },
];
const goodData = [
  {
    title: "包吃",
    subTitle: "360000+个岗位",
  },
  {
    title: "包住",
    subTitle: "360000+个岗位",
  },
  {
    title: "餐补",
    subTitle: "360000+个岗位",
  },
  {
    title: "房补",
    subTitle: "360000+个岗位",
  },
  {
    title: "住房补贴",
    subTitle: "360000+个岗位",
  },
  {
    title: "宿舍有空调",
    subTitle: "360000+个岗位",
  },
];

const Index = () => {
  return (
    <View>
      <View className={styles.title}>猜你喜欢</View>
      <View className={styles.blockList}>
        {data.map((item, index) => (
          <View key={index} className={styles.blockItemWrap}>
            <View className={styles.blockItem}>{item}</View>
          </View>
        ))}
      </View>

      <View style={{ height: "30px" }} />

      <View className={styles.title}>深圳热招岗位</View>
      <View className={styles.blockList}>
        {hotData.map((item, index) => (
          <View key={index} className={styles.blockItemWrap}>
            <View className={styles.blockItem}>
              {item.title}
              <View className={styles.subTitle}>{item.subTitle}</View>
            </View>
          </View>
        ))}
      </View>
      <View className={styles.more}>
        <Text>全部岗位</Text>
        <AtIcon value="chevron-down" size={14} />
      </View>

      <View style={{ height: "20px" }} />

      <View className={styles.title}>看福利好的岗位</View>
      <View className={styles.blockList}>
        {goodData.map((item, index) => (
          <View key={index} className={styles.blockItemWrap}>
            <View className={styles.blockItem}>
              {item.title}
              <View className={styles.subTitle}>{item.subTitle}</View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: "30px" }} />

      <View className={styles.title}>不知道自己适合做什么</View>
      <View className={styles.blockList}>
        <View className={styles.doWhatOne} />
        <View className={styles.doWhatTwo} />
      </View>
      <View className={styles.more}>
        <Text>全部岗位</Text>
        <AtIcon value="chevron-down" size={14} />
      </View>
    </View>
  );
};

export default React.memo(Index);
