import React from "react";
import { observer } from "mobx-react";
import { View, Text, ScrollView, Image, RichText } from "@tarojs/components";
import styles from "./index.module.scss";
import appStore from "../../mobx-store/app";
import myStore from "../../mobx-store/my";
import { AtIcon, AtButton } from "taro-ui";

const Header: React.FC = observer(() => {
  return (
    <View
      className={styles.headerWrap}
      style={{
        paddingTop: appStore.sysInfo.statusBarHeight,
      }}
    >
      <View
        className={styles.header}
        style={{ height: appStore.capsuleButton.height }}
      />
    </View>
  );
});

const UserInfo: React.FC = () => {
  return (
    <View className={styles.userInfo} style={{ background: "none" }}>
      <Image
        className={styles.avatar}
        src="https://img.bosszhipin.com/boss/avatar/avatar_6.png"
        mode="aspectFill"
      />
      <View className={styles.userInfoRight}>
        <View className={styles.name}>杨先生</View>
        <View className={styles.tips}>
          <Text>简历评分99分，建议优化 </Text>
          <AtIcon value="clock" size="14" color="#5E5E5E" />
        </View>
      </View>
    </View>
  );
};

const TotalNum: React.FC = () => {
  return (
    <View className={styles.totalNum}>
      <View>
        <View className={styles.num}>458</View>
        <View>沟通过</View>
      </View>
      <View>
        <View className={styles.num}>10</View>
        <View>待面试</View>
      </View>
      <View>
        <View className={styles.num}>12</View>
        <View>收藏</View>
      </View>
    </View>
  );
};

const ZhaoPin: React.FC = () => {
  return (
    <View className={styles.block + " " + styles.zhaoPin}>
      <View className={styles.title}>我要招聘</View>
      <View>千万招聘者的选择</View>
      <View className={styles.ctrl}>
        <AtButton type="primary" size="small" circle>
          去招聘
        </AtButton>
      </View>
    </View>
  );
};

const CommonFunc: React.FC = () => {
  const styleOne = {
    color: "#FFA572",
    fontSize: "24px",
    // position: "absolute",
    position: "absolute",
    right: 0,
    bottom: 2,
  };
  const styleTwo = {
    color: "#1FB7BA",
    fontSize: "32px",
    position: "relative",
    zIndex: 1,
  };
  return (
    <View className={styles.block}>
      <View className={styles.blTitle}>常用功能</View>
      <View className={styles.funcList}>
        <View>
          <View className={styles.item}>
            <View
              className="icon iconfont icon-a-xuanzhongyezi"
              style={{ ...styleOne, position: "absolute" }}
            />
            <View
              className="icon iconfont icon-jianli"
              style={{ ...styleTwo, position: "relative", fontSize: "28px" }}
            />
          </View>
          <View>在线简历</View>
        </View>
        <View>
          <View className={styles.item}>
            <View
              className="icon iconfont icon-a-xuanzhongyezi"
              style={{ ...styleOne, position: "absolute" }}
            />
            <View
              className="icon iconfont icon-wenjian1"
              style={{ ...styleTwo, position: "relative" }}
            />
          </View>
          <View>附件简历</View>
        </View>
        <View className={styles.item}>
          <View className={styles.item}>
            <View
              className="icon iconfont icon-a-xuanzhongyezi"
              style={{ ...styleOne, position: "absolute" }}
            />
            <View
              className="icon iconfont icon-xinheart256"
              style={{ ...styleTwo, position: "relative" }}
            />
          </View>
          <View>求职意向</View>
        </View>
        <View>
          <View className={styles.item}>
            <View
              className="icon iconfont icon-a-xuanzhongyezi"
              style={{ ...styleOne, position: "absolute" }}
            />
            <View
              className="icon iconfont icon-goumaicantuan"
              style={{ ...styleTwo, position: "relative" }}
            />
          </View>
          <View>我的道具</View>
        </View>
      </View>
    </View>
  );
};

const OtherFunc = () => {
  const data = [
    {
      label: "面试刷题",
      icon: "bullet-list",
    },
    {
      label: "简历刷新",
      icon: "repeat-play",
    },
    {
      label: "求职工具",
      icon: "settings",
    },
    {
      label: "无障碍求职",
      icon: "heart",
    },
    {
      label: "通知与提醒",
      icon: "bell",
    },
    {
      label: "账号与安全",
      icon: "lock",
    },
    {
      label: "隐私保护",
      icon: "alert-circle",
    },
    {
      label: "隐私政策",
      icon: "numbered-list",
    },
    {
      label: "意见反馈",
      icon: "help",
    },
  ];
  return (
    <View className={styles.block}>
      <View className={styles.blTitle}>其他功能</View>
      <View className={styles.otherFuncList}>
        {data.map((item, index) => (
          <View key={index} className={styles.otherFuncItem}>
            <AtIcon value={item.icon} size="28" color="#5E5E5E" />
            <View className={styles.otherFuncLabel}>{item.label}</View>
          </View>
        ))}
      </View>
    </View>
  );
};

const FixedHeader = observer(() => {
  return (
    <View
      className={styles.fixedHeader}
      style={{ opacity: myStore.topOpacity }}
    >
      <Header />
    </View>
  );
});

const Index: React.FC = () => {
  const handleScroll = () => {
    myStore.setTopOpacity();
  };

  return (
    <View className={styles.container}>
      <ScrollView
        id="my-scroll-view"
        className={styles.scrollContent}
        scrollY
        scrollX={false}
        enhanced={true}
        showScrollbar={false}
        scrollWithAnimation
        onScroll={handleScroll}
      >
        <View className={styles.topWrap}>
          <Header />
          <UserInfo />
        </View>
        <TotalNum />
        <ZhaoPin />
        <CommonFunc />
        <OtherFunc />

        <View className={styles.logout}>
          <View>
            <AtButton size="normal">退出登录</AtButton>
          </View>
          <View style={{ height: "20px" }} />
          <RichText
            className={styles.bottomInfo}
            nodes={`客服电话 400-065-5799 工作时间 8:00-22:00 <br />
            老年人直连热线 400-661-6030 工作时间 8:00-22:00 <br />
            算法举报与未成年人举报渠道同上
            <br />
            人力资源服务许可证 营业执照 朝阳区人社局监督电话 <br />
            京ICP备19000001号-1 京ICP证17001号
            <br />
            算法备案信息`}
          />
        </View>
      </ScrollView>
      <FixedHeader />
    </View>
  );
};

export default React.memo(Index);
