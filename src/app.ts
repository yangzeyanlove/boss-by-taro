import { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import appStore from './mobx-store/app';
import './assets/iconfont/iconfont.css'; // 引入字体图标
import './styles/app.less';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
    appStore.getSysInfo();
  });

  // children 是将要会渲染的页面
  return children;
}



export default App;
