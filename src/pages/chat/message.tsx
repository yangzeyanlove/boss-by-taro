// 消息
import React from "react";
import { observer } from "mobx-react";
import { Text, View, ScrollView, Image } from "@tarojs/components";
import styles from "./message.module.scss";
import chatStore from "../../mobx-store/chat";
import { AtIcon } from "taro-ui";

// const data = Array.from({ length: 100 }, (_, index) => ({
//   id: index + 1, // 生成从1开始的唯一ID
//   title: `Title ${index + 1}`,
// }));

interface ITopFilterProps {
  isHolder?: boolean;
}

const TopFilter: React.FC<ITopFilterProps> = observer(
  ({ isHolder = false }) => {
    return (
      <View className={styles.topFilter} style={{ opacity: isHolder ? 0 : 1 }}>
        {chatStore.msgTypeArr.map((item, index) => (
          <Text
            className={`${styles.item} ${
              chatStore.currentMsgType === index ? styles.active : ""
            }`}
            onClick={() => chatStore.changeMessageType(index)}
          >
            {item}
          </Text>
        ))}
      </View>
    );
  }
);

const FixedTopFilter: React.FC = () => {
  return (
    <View className={styles.fixedTopFilter}>
      <TopFilter />
    </View>
  );
};

const MessageItem = observer(({ data }) => {
  return (
    <View className={styles.messageItem}>
      {data.avatar ? (
        <Image className={styles.avatar} src={data.avatar} mode="aspectFill" />
      ) : (
        <View
          className={styles.avatar}
          style={{
            background: data.isLatest
              ? "radial-gradient(circle at 99% 1%, #ffffff, #F6C65A, #F1B850)"
              : "radial-gradient(circle at 99% 1%, #ffffff, #7AE4B3, #5BC6AE)",
          }}
        >
          <AtIcon
            value={data.isLatest ? "add" : "bell"}
            size="28"
            color="#ffffff"
          />
        </View>
      )}
      <View className={styles.msgContent}>
        <View className={styles.msgContentTop}>
          <View>
            <Text className={styles.name}>{data.name}</Text>
            <Text className={styles.subTitle}>
              {data.brandName + "." + data.title}
            </Text>
          </View>
          <View>{data.date}</View>
        </View>
        <View className={styles.msgBottom}>
          {data.type ? (
            <Text style={{ color: "grey" }}>[{data.type}] </Text>
          ) : null}
          <Text>{data.content}</Text>
        </View>
      </View>
    </View>
  );
});

const ScrollList = observer(() => {
  React.useEffect(() => {
    chatStore.fetchData();
  }, []);

  return (
    <ScrollView style={{ height: "100%" }} scrollY>
      <TopFilter isHolder />
      {chatStore.list.map((item, index) => (
        <MessageItem key={item.uid + index} data={item} />
      ))}
    </ScrollView>
  );
});

const Message: React.FC = () => {
  return (
    <View className={styles.container}>
      <FixedTopFilter />
      <ScrollList />
    </View>
  );
};

export default React.memo(Message);
