import React from "react";
import { observer } from "mobx-react";
import { View, Text, Icon, ScrollView } from "@tarojs/components";
import JobItem from "../../components/job-item";
import styles from "./index.module.less";
import jobStore from "../../mobx-store/job";
import appStore from "../../mobx-store/app";

// const data = Array.from({ length: 100 }, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

// 定位，浮动在顶部的头部
const FixedHeader: React.FC = observer(() => {
  return (
    <View
      className={styles.fixed}
      style={{ background: `rgba(255, 255, 255, ${jobStore.headerOpacity})` }}
    >
      <Header />
    </View>
  );
});

// 头部内容
const Header: React.FC = observer(() => {
  return (
    <View className={styles.header}>
      <View style={{ height: appStore.sysInfo.statusBarHeight }} />
      <View className={styles.title}>BOSS直聘</View>
    </View>
  );
});

// 搜素栏
const SearchBar: React.FC = () => {
  React.useEffect(() => {
    jobStore.setSearchBarHeight();
  });

  return (
    <View className={styles.searchBar} id="job-list-search-bar">
      <View className={styles.searchInput}>
        <Icon className={styles.icon} type="search" size="14" />
        <Text>搜索职位名称、公司</Text>
      </View>
    </View>
  );
};

// 顶部功能模块按钮
const TopFunction: React.FC = () => {
  const arr = [
    {
      name: "附近工作",
    },
    {
      name: "热门兼职",
    },
    {
      name: "高薪机会",
    },
    {
      name: "行业图谱",
    },
    {
      name: "今日速配",
    },
  ];
  return (
    <View className={styles.topFunction}>
      {arr.map((item, index) => (
        <View key={index} className={styles.item}>
          <View
            className={`${styles.funcIcom} ${styles["img" + (index + 1)]}`}
          />
          <View>{item.name}</View>
        </View>
      ))}
    </View>
  );
};

// 职位过滤器
const Filter: React.FC = () => {
  return (
    <View className={styles.filter}>
      <Text className={styles.item + " " + styles.active}>前端开发工程师</Text>
      <Text className={styles.item}>全栈工程师</Text>
      <View className={styles.add}>+</View>
    </View>
  );
};

// 页面组件
const Index: React.FC = observer(() => {
  // 滚动到底部加载更多
  const loadMoreData = () => {
    console.log("load more data....");
    jobStore.fetchData();
  };

  const handleScroll = () => {
    jobStore.setHeaderOpacity();
  };

  React.useEffect(() => {
    jobStore.fetchData();
  }, []);

  return (
    <View className={styles.container}>
      <ScrollView
        id="job-list-scroll-view"
        scrollY
        scrollX={false}
        enhanced={true}
        showScrollbar={false}
        scrollWithAnimation
        className={styles.index}
        lowerThreshold={60}
        onScrollToLower={loadMoreData}
        onScroll={handleScroll}
        onScrollEnd={handleScroll}
      >
        <View className={styles.topWrap}>
          {/* 顶部导航 */}
          <View className={styles.holder}>
            <Header />
          </View>
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

      <FixedHeader />
    </View>
  );
});

export default Index;
