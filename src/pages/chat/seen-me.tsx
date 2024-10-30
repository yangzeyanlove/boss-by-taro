// 看过我
import React from "react";
import { observer } from "mobx-react";
import { View, ScrollView, Image } from "@tarojs/components";
import styles from "./seen-me.module.scss";
import jobStore from "../../mobx-store/job";
import JobItem from "../../components/job-item";
import Loading from "../../components/loading";

// const data = Array.from({ length: 100 }, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

const SeenMe: React.FC = observer(() => {
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
      className={styles.scrollWrap}
      scrollY
      lowerThreshold={60}
      onScrollToLower={loadMoreData}
    >
      <View className={styles.block}>
        <View className={styles.top} />
      </View>
      {jobStore.list.map((item, index) => (
        <JobItem key={index} info={item} />
      ))}
      <View style={{ textAlign: "center" }}>
        <Loading />
      </View>
    </ScrollView>
  );
});

export default React.memo(SeenMe);
