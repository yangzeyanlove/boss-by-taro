// 对我感兴趣
import React from "react";
import { observer } from "mobx-react";
import { View, ScrollView } from "@tarojs/components";
import styles from "./seen-me.module.scss";
import jobStore from "../../mobx-store/job";
import JobItem from "../../components/job-item";
import Loading from "../../components/loading";

const InterestedMe: React.FC = observer(() => {
  React.useEffect(() => {
    jobStore.fetchData();
  }, []);

  return (
    <ScrollView className={styles.scrollWrap} scrollY>
      {jobStore.list.map((item, index) =>
        index % 2 ? <JobItem key={index} info={item} /> : null
      )}
      <View style={{ textAlign: "center" }}>
        <Loading />
      </View>
    </ScrollView>
  );
});

export default React.memo(InterestedMe);
