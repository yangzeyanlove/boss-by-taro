import React from "react";
import { observer } from "mobx-react";
import {
  Text,
  View,
  ScrollView,
  Image,
  RichText,
  Map,
} from "@tarojs/components";
import styles from "./index.module.scss";
import appStore from "../../../mobx-store/app";
import jobDetailStore from "../../../mobx-store/job-detail";
import { JoinString } from "../../../common/utils";
import Divider from "../../../components/divider";
import LabelList from "../../../components/label-list";
import { AtIcon, AtButton } from "taro-ui";

definePageConfig({
  navigationBarTitleText: "职位详情",
});

// 底部操作定位
const ButtomCtrl = ({ isHolder = false }) => {
  return (
    <View
      className={styles.bottomWrap}
      style={{
        position: isHolder ? "relative" : "fixed",
        opacity: isHolder ? 0 : 1,
        paddingBottom: appStore.getSafeBottom() + "px",
      }}
    >
      <View className={styles.bottomBtn}>
        <View className={styles.icon}>
          <AtIcon value="share-2" size="20" />
          <View>分享</View>
        </View>
        <View className={styles.icon}>
          <AtIcon value="star" size="20" />
          <View>收藏</View>
        </View>
        <View className={styles.btnWrap}>
          <AtButton type="primary">立即沟通</AtButton>
        </View>
      </View>
    </View>
  );
};

const TopInfo = observer(() => {
  const getLocation = (separator = ""): string =>
    JoinString(
      [
        jobDetailStore.currentJob.cityName,
        jobDetailStore.currentJob.areaDistrict,
        jobDetailStore.currentJob.businessDistrict,
      ],
      separator
    );

  return (
    <View className={styles.topInfo}>
      <View className={styles.topInfoFirst}>
        <Text className={styles.jobName}>
          {jobDetailStore.currentJob.jobName}
        </Text>
        <Text className={styles.salaryDesc}>
          {jobDetailStore.currentJob.salaryDesc}
        </Text>
      </View>
      <View className={styles.topInfoSecond}>
        <AtIcon value="map-pin" size="16" />
        <View style={{ width: "4px" }} />
        <Text>{getLocation("·")}</Text>
        <View style={{ width: "18px" }} />
        <AtIcon value="shopping-bag-2" size="16" />
        <View style={{ width: "4px" }} />
        <Text>{jobDetailStore.currentJob.jobExperience}</Text>
        <View style={{ width: "18px" }} />
        <AtIcon value="sketch" size="16" />
        <View style={{ width: "4px" }} />
        <Text>{jobDetailStore.currentJob.jobDegree}</Text>
      </View>
    </View>
  );
});

const BossInfo = observer(() => {
  const info = jobDetailStore.currentJob;
  return (
    <View className={styles.bossInfo}>
      <View className={styles.bossInfoLeft}>
        <Image
          className={styles.avatar}
          src={info.bossAvatar}
          mode="aspectFill"
        />
        <View>
          <View className={styles.bossName}>{info.bossName}</View>
          <View className={styles.subTitle}>
            {info.brandName + "." + info.bossTitle}
          </View>
          <View className={styles.thirdTitle}>今日活跃</View>
        </View>
      </View>
      <AtIcon value="chevron-right" />
    </View>
  );
});

const JobInfoDetail = observer(() => {
  const info = jobDetailStore.currentJob;
  const content = `职位类型：全职、兼职
岗位职责：
1. 负责公司网站和应用的前端开发，确保界面的兼容性和性能。
2. 根据产品需求和设计稿，开发高质量、响应式的用户界面。
3. 优化前端性能，提升用户体验，解决浏览器兼容性问题。
4. 与后端开发人员密切配合，完成接口对接和数据交互。
5. 维护和更新现有系统，修复bug，提升系统稳定性。
6. 参与前端技术选型，提出技术改进建议，推动技术创新。
7. 编写前端开发文档，确保项目的可维护性和可扩展性。
岗位要求：
1. 计算机科学或相关专业本科及以上学历。
2. 3年以上前端开发经验，熟悉HTML、CSS、JavaScript等前端技术。
3. 精通至少一种前端框架，如React、Vue.js或Angular。
4. 熟悉前端构建工具和版本控制工具，如Webpack、Git等。
5. 具备良好的前端性能优化能力，了解常见的性能瓶颈及解决方案。
6. 具有良好的跨浏览器兼容性处理经验，能够解决各种浏览器中的兼容性问题。
7. 具备良好的沟通能力和团队合作精神，能够与设计师和后端工程师协作完成项目。
8. 对前端技术有浓厚兴趣，愿意持续学习和探索新的技术。
福利待遇：
- 具有竞争力的薪资和奖金制度。
- 五险一金，带薪年假，节日福利。
- 提供丰富的培训和职业发展机会。
- 良好的工作环境和团队氛围。`;
  return (
    <View>
      <View className={styles.blockTitle}>职位详情</View>
      <LabelList
        data={info.skills.slice(0, 3)}
        itemStyle={{ padding: "5px 10px", marginRight: "10px" }}
      />
      <View className={styles.content} id="job-detail-content">
        <RichText nodes={content} />
        <View className={styles.more}>查看全部</View>
      </View>
    </View>
  );
});

const CompanyInfo = observer(() => {
  const info = jobDetailStore.currentJob;
  return (
    <View className={styles.companyInfo}>
      <View className={styles.bossInfo}>
        <View className={styles.bossInfoLeft}>
          <Image
            className={styles.logo}
            src={info.brandLogo}
            mode="aspectFill"
          />
          <View>
            <View className={styles.brandName}>{info.brandName}</View>
            <View className={styles.subTitle}>
              {JoinString([
                info.brandStageName,
                info.brandScaleName,
                info.brandIndustry,
              ])}
            </View>
          </View>
        </View>
        <AtIcon value="chevron-right" />
      </View>

      <View className={styles.mapWrap}>
        <Map
          style={{ width: "100%", height: "200px" }}
          show-location
          enableScroll={false}
          enableZoom={false}
          markers={[
            {
              id: 123456,
              title: "大冲地铁站",
              longitude: 113.944063,
              latitude: 22.542939,
              iconPath: "",
              width: 12,
              height: 20,
              callout: {
                content: "深圳市南山区大冲地铁站",
                color: "#666",
                fontSize: 12,
                anchorX: 0,
                anchorY: 0,
                borderRadius: 5,
                borderWidth: 0,
                borderColor: "none",
                bgColor: "#ffffff",
                padding: 10,
                display: "ALWAYS",
                textAlign: "center",
              },
            },
          ]}
          longitude={113.944063}
          latitude={22.542939}
          onError={() => {}}
          onClick={() => {}}
        >
          {/* <CoverView className={styles.position}>
            深圳市南山区大冲地铁站
          </CoverView> */}
        </Map>
      </View>
    </View>
  );
});

const OtherInfo = () => {
  return (
    <View>
      <View className={styles.blockTitle}>
        <AtIcon value="lock" size="20" color="#306DFA" />
        BOSS安全提示
      </View>
      <View className={styles.others}>
        BOSS直聘严禁用人单位和招聘者用户做出任何损害求职者合法权益的违法违规行为，包括但不限于扣押求职者证件、收取求职者财物、向求职者集资、让求职者入股、诱导求职者异地入职、异地参加培训、违法违规使用求职者简历等，您一旦发现此类行为，
        请立即举报
      </View>
    </View>
  );
};

const JobDetail: React.FC = () => {
  return (
    <View className={styles.container}>
      <ScrollView>
        <TopInfo />
        <Divider marginVertical={20} />
        <BossInfo />
        <Divider marginVertical={20} />
        <JobInfoDetail />
        <Divider marginVertical={20} />
        <CompanyInfo />
        <Divider marginVertical={20} />
        <OtherInfo />
        <ButtomCtrl isHolder />
      </ScrollView>
      <ButtomCtrl />
    </View>
  );
};

export default React.memo(JobDetail);
