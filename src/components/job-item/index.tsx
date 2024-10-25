import React from "react";
import { View, Text, Image } from "@tarojs/components";
import { IJobInfo } from "../../../types/job";
import LabelList from "../label-list";
import styles from "./index.module.less";

interface IJobItemProps {
  info: IJobInfo;
}
const JobItem: React.FC<IJobItemProps> = ({ info }) => {
  return (
    <View className={styles.wrap}>
      <View className={styles.itemTop}>
        <Text className={styles.jobName}>{info.jobName}</Text>
        <Text className={styles.salaryDesc}>{info.salaryDesc}</Text>
      </View>
      <View className={styles.brand}>
        {info.brandName +
          "  " +
          info.brandStageName +
          "  " +
          info.brandScaleName}
      </View>
      <LabelList
        data={[...info.jobLabels, ...info.skills].slice(0, 3)}
        // marginBottom={0}
      />
      <View className={styles.bottom}>
        <View className={styles.bottomLeft}>
          <Image
            className={styles.avatar}
            src={info.bossAvatar}
            mode="aspectFill"
          />
          <Text>{info.bossName + "·" + info.bossTitle}</Text>
        </View>
        <View>{info.areaDistrict + " " + info.businessDistrict}</View>
      </View>
    </View>
  );
};

export default JobItem;
