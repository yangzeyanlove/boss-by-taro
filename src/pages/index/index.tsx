import React from "react";
import { observer } from "mobx-react";
import Taro from "@tarojs/taro";
import { View, Text, Icon, Image, ScrollView } from "@tarojs/components";
import JobItem from "../../components/job-item";
import styles from "./index.module.less";
import jobStore from "../../mobx-store/job";

// const data = Array.from({ length: 100 }, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

const Header: React.FC = () => {
  const [safeHeight, setSafeHeight] = React.useState<number | undefined>(0);

  React.useEffect(() => {
    try {
      const res = Taro.getSystemInfoSync();
      setSafeHeight(res.statusBarHeight);
    } catch (e) {
      // Do something when catch error
    }
  });

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
        <Icon className={styles.icon} type="search" size="14" />
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
  // 滚动到底部加载更多
  const loadMoreData = () => {
    console.log("load more data....");
    jobStore.fetchData();
  };

  React.useEffect(() => {
    jobStore.fetchData();
  }, []);

  return (
    <ScrollView
      scrollY
      className={styles.index}
      lowerThreshold={60}
      onScrollToLower={loadMoreData}
    >
      <View className={styles.topWrap}>
        {/* 顶部导航 */}
        <Header />
        {/* 搜索框 */}
        <SearchBar />
        {/* 功能按钮 */}
        <TopFunction />
      </View>
      {/* 筛选过滤 */}
      <Filter />
      {jobStore.list.map((item, index) => (
        <JobItem key={index} info={item} />
      ))}
      <View className={styles.bottomLoading}>
        <van-loading type="spinner" color="#14B2B2" />
      </View>
    </ScrollView>
  );
});

export default Index;
