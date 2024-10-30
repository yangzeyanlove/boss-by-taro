import React from "react";
import { observer } from "mobx-react";
import { View, Text, Icon, ScrollView } from "@tarojs/components";
import JobItem from "../../components/job-item";
import styles from "./index.module.scss";
import jobStore from "../../mobx-store/job";
import appStore from "../../mobx-store/app";
import Loading from "../../components/loading";

// const data = Array.from({ length: 100 }, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

// 定位，浮动在顶部的头部
const FixedHeader: React.FC = observer(() => {
  return (
    <View
      className={styles.fixed}
      style={{
        background: `rgba(255, 255, 255, ${jobStore.headerOpacity})`,
        // background: "grey",
      }}
    >
      <Header />
    </View>
  );
});

// 头部内容
const Header: React.FC = observer(() => {
  return (
    <View id="job-list-header">
      <View style={{ height: appStore.sysInfo.statusBarHeight }} />
      <View className={styles.title}>BOSS直聘</View>
    </View>
  );
});

// 搜素栏
interface IHolderProps {
  isHolder?: boolean;
}
const SearchBar: React.FC<IHolderProps> = ({ isHolder = false }) => {
  return (
    <View
      id="job-list-search-bar"
      className={styles.searchBar}
      style={{
        opacity: isHolder ? 0 : 1,
      }}
    >
      <View
        className={styles.searchInput}
        style={{
          background: `rgba(245, 245, 245, ${jobStore.searchBarOpacity})`,
          height: appStore.capsuleButton.height,
        }}
      >
        <Icon className={styles.icon} type="search" size="14" />
        <Text>搜索职位名称、公司</Text>
      </View>
    </View>
  );
};

// 浮动在顶部的搜索栏
const FixedSearchBar: React.FC = observer(() => {
  return (
    <View
      style={{
        position: "fixed",
        top: jobStore.searchBarOffsetTop,
        left: 0,
        right: jobStore.searchBarRight + "px",
        // transform: `translate3d(0, -${jobStore.searchBarOffsetTop}px, 0)`,
        transform: `translate3d(0, 0, 0)`,
      }}
    >
      <SearchBar />
    </View>
  );
});

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
      <View className={styles.topFuncWrap}>
        {arr.map((item, index) => (
          <View key={index} className={styles.item}>
            <View
              className={`${styles.funcIcom} ${styles["img" + (index + 1)]}`}
            />
            <View className={styles.name}>{item.name}</View>
          </View>
        ))}
      </View>
    </View>
  );
};

// 职位过滤器
const Filter: React.FC = observer(() => {
  return (
    <View id="job-list-filter" className={styles.filterWrap}>
      <View className={styles.filterKey}>
        <Text className={styles.item + " " + styles.active}>
          前端开发工程师
        </Text>
        <Text className={styles.item}>全栈工程师</Text>
        <View className={styles.add}>+</View>
      </View>
      <View
        className={styles.filterType}
        style={{ display: jobStore.isShowFixedFilter ? "block" : "none" }}
      >
        <View>
          <Text className={styles.leftTypeItem + " " + styles.active}>
            推荐
          </Text>
          <Text className={styles.leftTypeItem}>附近</Text>
        </View>
        <View className={styles.rightType}>
          <Text className={styles.rightTypeItem}>深圳</Text>
          <Text className={styles.rightTypeItem}>筛选</Text>
        </View>
      </View>
    </View>
  );
});

// 定位过滤器
const FixedFilter: React.FC = observer(() => {
  return (
    <View
      style={{
        position: "fixed",
        top: jobStore.headerHeight,
        left: 0,
        right: 0,
        opacity: jobStore.isShowFixedFilter ? 1 : 0,
      }}
    >
      <Filter />
    </View>
  );
});

const ScrollList: React.FC = observer(() => {
  // 滚动到底部加载更多
  const loadMoreData = () => {
    console.log("load more data....");
    jobStore.fetchData();
  };

  const handleScroll = () => {
    jobStore.setHeaderOpacity();
    jobStore.setSearchStyle();
    jobStore.setFilterDisplay();
  };

  React.useEffect(() => {
    jobStore.fetchData();
  }, []);

  return (
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
      <View className={styles.topWrap} id="job-list-topWrap">
        {/* 顶部导航 */}
        <View className={styles.holder}>
          <Header />
        </View>
        {/* 搜索框 */}
        <SearchBar isHolder={true} />
        {/* 功能按钮 */}
        <View style={{ height: "10rpx" }} />
        <TopFunction />
      </View>
      {/* 筛选过滤 */}
      <Filter />
      {jobStore.list.map((item, index) => (
        <JobItem key={index} info={item} />
      ))}
      <View className={styles.bottomLoading}>
        <Loading />
      </View>
    </ScrollView>
  );
});

// 页面组件
const Index: React.FC = () => {
  React.useEffect(() => {
    jobStore.setHeaderHeight();
    jobStore.setSearchBarSize();
    jobStore.setTopContentHeight();
    jobStore.setSearchStyle();
  });
  return (
    <View className={styles.container}>
      <ScrollList />
      <FixedHeader />
      <FixedSearchBar />
      <FixedFilter />
    </View>
  );
};

export default React.memo(Index);
