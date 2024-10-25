import React from "react";
import { observer } from "mobx-react";
import Taro from "@tarojs/taro";
import { View, Text, Icon, Image } from "@tarojs/components";
import JobItem from "../../components/job-item";
import styles from "./index.module.less";
import jobStore from "../../mobx-store/job";

const data = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1, // 生成从1开始的唯一ID
  title: `Title ${index + 1}`,
}));

interface IHeaderProps {
  safeHeight: number | undefined;
}
const Header: React.FC<IHeaderProps> = ({ safeHeight = 0 }) => {
  return (
    <View className={styles.header}>
      <View style={{ height: safeHeight }} />
      <View className={styles.title}>BOSS直聘</View>
    </View>
  );
};

const SearchBar: React.FC = () => {
  return (
    <View className={styles.searchBar}>
      <View className={styles.searchInput}>
        <Icon className={styles.icon} type="search" size={14} />
        <Text className={styles.placeholder}>搜索职位名称、公司</Text>
      </View>
    </View>
  );
};

const TopFunction: React.FC = () => {
  const arr = [
    {
      name: "附近工作",
      icon: require("../../assets/images/job/1.png"),
    },
    {
      name: "热门兼职",
      icon: require("../../assets/images/job/2.png"),
    },
    {
      name: "高薪机会",
      icon: require("../../assets/images/job/3.png"),
    },
    {
      name: "行业图谱",
      icon: require("../../assets/images/job/4.png"),
    },
    {
      name: "今日速配",
      icon: require("../../assets/images/job/5.png"),
    },
  ];
  return (
    <View className={styles.topFunction}>
      {arr.map((item, index) => (
        <View key={index} className={styles.item}>
          <Image
            className={styles.itemIcon}
            src={item.icon}
            mode="aspectFill"
          />
          <View>{item.name}</View>
        </View>
      ))}
    </View>
  );
};

const Filter: React.FC = () => {
  return (
    <View className={styles.filter}>
      <Text className={styles.item + " " + styles.active}>前端开发工程师</Text>
      <Text className={styles.item}>全栈工程师</Text>
      <View className={styles.add}>+</View>
    </View>
  );
};

const Index: React.FC = observer(() => {
  const res: Taro.getSystemInfoSync.Result = Taro.getSystemInfoSync();
  console.log("====>>>>", res);

  React.useEffect(() => {
    jobStore.fetchData();
  }, []);

  return (
    <View
      className={styles.index}
      style={{
        background: "linear-gradient(to bottom, #13ACA7, #F5F5F5 300px)",
      }}
    >
      {/* 顶部导航 */}
      <Header safeHeight={res.statusBarHeight} />
      {/* 搜索框 */}
      <SearchBar />
      {/* 功能按钮 */}
      <TopFunction />
      {/* 筛选过滤 */}
      <Filter />
      {jobStore.list.map((item, index) => (
        <JobItem key={index} info={item} />
      ))}
    </View>
  );
});

export default Index;
