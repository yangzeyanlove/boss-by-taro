// 主题配置
import themeConfig from './config/theme';

// 应用相关配置
export default defineAppConfig({
  pages: [
    // 'pages/position/index',
    'pages/job/index',
    'pages/job/detail/index',
    'pages/position/index',
    'pages/chat/index',
    'pages/my/index',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/job/index',
        text: '找工作',
        iconPath: 'assets/images/work.png', // 替换为你的图标类名
        selectedIconPath: 'assets/images/work-on.png',
      },
      {
        pagePath: 'pages/position/index',
        text: '深圳',
        iconPath: 'assets/images/position.png',
        selectedIconPath: 'assets/images/position-on.png',
      },
      {
        pagePath: 'pages/chat/index',
        text: '聊天',
        iconPath: 'assets/images/chat.png',
        selectedIconPath: 'assets/images/chat-on.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'assets/images/my.png',
        selectedIconPath: 'assets/images/my-on.png',
      },
    ],
    color: themeConfig.color,
    selectedColor: themeConfig.primaryColor,
    backgroundColor: '#fff',
    borderStyle: 'black',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // 按需注入和用时注入，组件
  usingComponents: {},
  lazyCodeLoading: 'requiredComponents',
});
