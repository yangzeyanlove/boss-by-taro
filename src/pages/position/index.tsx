import React, { Suspense } from "react";
import { observer } from "mobx-react";
import { View, Text, ScrollView } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import appStore from "../../mobx-store/app";
import positionStore from "../../mobx-store/position";
import styles from "./index.module.scss";

// const data = Array.from({ length: 100 }, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

const Header = observer(() => {
  return (
    <View className={styles.headerWrap}>
      <View style={{ height: appStore.sysInfo.statusBarHeight }} />
      <View className={styles.header}>
        <Text className={styles.topLeft}>深圳</Text>
        <Text className={styles.title}>发现新机会</Text>
      </View>
    </View>
  );
});

const LeftList = observer(() => {
  React.useEffect(() => {
    positionStore.setSlidingLayerHeight();
  }, []);

  return (
    <View className={styles.left}>
      <View
        id="position-sliding-layer"
        className={styles.sliding}
        style={{
          transform: `translate3d(0, ${positionStore.slidingLayerOffset}px, 0)`,
        }}
      >
        <View className={styles.slidingContent}>
          <AtIcon value="check" size="24" />
          <View className={styles.title}>bg</View>
        </View>
        {positionStore.currentType ? (
          <View className={styles.rightTopBlock} />
        ) : null}
        <View className={styles.rightBottomBlock} />
      </View>
      {positionStore.typeArr.map((item, index) => (
        <View
          key={index}
          className={`${styles.item} ${
            positionStore.currentType === index ? styles.active : ""
          }`}
          onClick={() => positionStore.setCurrentType(index, item)}
        >
          <AtIcon value={item.icon} size="24" />
          <View className={styles.title}>{item.label}</View>
        </View>
      ))}
    </View>
  );
});

const ScrollRight = observer(() => {
  // 滚动事件
  const handleScroll = () => {
    positionStore.scrollEventHandle();
  };

  return (
    <ScrollView
      id="position-scroll-view"
      scrollY
      onScroll={handleScroll}
      scrollTop={positionStore.scrollOffsetY}
      scrollIntoView={positionStore.scrollIntoViewId}
      style={{ height: "100%" }}
    >
      {positionStore.typeArr.map((item, index) => (
        <View
          key={item.icon + "-right-content" + index}
          id={item.icon + "-right-content"}
          className={styles.rightBlock}
        >
          <Suspense fallback={<View>Loading...</View>}>
            {item.component && <item.component />}
          </Suspense>
        </View>
      ))}
    </ScrollView>
  );
});

const Index = () => {
  return (
    <View className={styles.container}>
      <Header />
      <View style={{ height: "5px" }} />
      <View className={styles.main} id="position-main-container">
        <LeftList />
        <View className={styles.right}>
          <ScrollRight />
        </View>
      </View>
    </View>
  );
};

export default React.memo(Index);
