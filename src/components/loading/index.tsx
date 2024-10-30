import React from "react";
import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import themeConfig from "../../config/theme";
import "./index.scss";

const Loading: React.FC = () => {
  return (
    <View className="default-loading">
      <AtIcon
        className="icon"
        value="loading-2"
        size="30"
        color={themeConfig.primaryColor}
      />
    </View>
  );
};

export default Loading;
