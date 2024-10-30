import React, { Suspense } from "react";
import { View, Text } from "@tarojs/components";
import { observer } from "mobx-react";
import { AtTabs, AtTabsPane } from "taro-ui";
import styles from "./index.module.scss";
import appStore from "../../mobx-store/app";
import chatStore from "../../mobx-store/chat";

const Header = observer(() => {
  return (
    <View className={styles.headerWrap}>
      <View style={{ height: appStore.sysInfo.statusBarHeight }} />
      <View
        className={styles.tabTitle}
        style={{
          paddingRight:
            appStore.sysInfo.screenWidth - appStore.capsuleButton.left,
        }}
      >
        {chatStore.tabList.map((item, index) => (
          <Text
            className={`${styles.item} ${
              index === chatStore.activeTab ? styles.active : ""
            }`}
            onClick={() => chatStore.changeTab(index)}
          >
            {item.title}
          </Text>
        ))}
      </View>
    </View>
  );
});

const TabView: React.FC = observer(() => {
  return (
    <View className={styles.tabWrap}>
      <AtTabs
        tabList={chatStore.tabList}
        current={chatStore.activeTab}
        onClick={(v) => chatStore.changeTab(v)}
      >
        {chatStore.tabList.map((item, index) => (
          <AtTabsPane key={index} index={index} current={chatStore.activeTab}>
            <Suspense fallback={<View>Loading...</View>}>
              {item.component && <item.component />}
            </Suspense>
          </AtTabsPane>
        ))}
      </AtTabs>
    </View>
  );
});

const Index: React.FC = () => {
  return (
    <View className={"chat-container " + styles.container}>
      <Header />
      <TabView />
    </View>
  );
};

export default Index;
