import React from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";
import { AtIcon } from "taro-ui";

const data = [
  {
    title: "附近工作",
    subTitle: "根据你的位置推荐岗位",
  },
  {
    title: "南山区",
    subTitle: "最近查看职位所属县职位综合",
  },
  {
    title: "字节跳动",
    subTitle: "最近查看职位地点周边",
  },
  {
    title: "骑行20分钟",
    subTitle: "20分钟内可达范围岗位综合",
  },
];
const areaData = [
  {
    title: "罗湖区",
  },
  {
    title: "福田区",
  },
  {
    title: "南山区",
  },
  {
    title: "宝安区",
  },
  {
    title: "龙岗区",
  },
  {
    title: "盐田区",
  },
];
const metroData = [
  {
    title: "10号线/坂田线",
    color: "#EA6183",
  },
  {
    title: "16号线/龙坪线",
    color: "#1D24A3",
  },
  {
    title: "2号线/8号线",
    color: "#B45A1F",
  },
  {
    title: "6号线/光明线",
    color: "#028186",
  },
  {
    title: "6号线支线",
    color: "#02AD8E",
  },
  {
    title: "坪山云巴1号线",
    color: "#2249A3",
  },
];

const Index = () => {
  return (
    <View>
      <View className={styles.title}>附近找工作</View>
      <View style={{ height: "20px" }} />
      <View className={styles.blockList}>
        {data.map((item, index) => (
          <View
            key={index}
            className={styles.blockItemWrap}
            style={{ width: "100%", padding: 0, marginBottom: "20px" }}
          >
            <View className={styles.blockItem + " " + styles.blockItemIcon}>
              <View className={styles.title}>{item.title}</View>
              <View className={styles.subTitle}>{item.subTitle}</View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: "30px" }} />

      <View className={styles.title}>找特点区县工作</View>
      <View className={styles.blockList}>
        {areaData.map((item, index) => (
          <View key={index} className={styles.blockItemWrap}>
            <View className={styles.blockItem}>{item.title}</View>
          </View>
        ))}
      </View>
      <View className={styles.more}>
        <Text>全部岗位</Text>
        <AtIcon value="chevron-down" size={14} />
      </View>

      <View style={{ height: "30px" }} />

      <View className={styles.title}>地铁周边</View>
      <View className={styles.blockList}>
        {metroData.map((item, index) => (
          <View key={index} className={styles.blockItemWrap}>
            <View
              className={styles.colorBlock}
              style={{
                backgroundColor: item.color,
              }}
            />
            <View className={styles.blockItem}>{item.title}</View>
          </View>
        ))}
      </View>
      <View className={styles.more}>
        <Text>全部岗位</Text>
        <AtIcon value="chevron-down" size={14} />
      </View>
    </View>
  );
};

export default React.memo(Index);
