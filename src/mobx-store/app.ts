import Taro from "@tarojs/taro";
import { makeAutoObservable } from 'mobx';

class AppStore {
  sysInfo: any = {};  // 系统信息，包括顶部栏高度，视频宽度，高度等等
  capsuleButton: any = {};  // 右上角胶囊按钮信息

  constructor() {
    makeAutoObservable(this);
  }

  getSysInfo() {
    try {
      this.sysInfo = Taro.getSystemInfoSync();
      this.capsuleButton = Taro.getMenuButtonBoundingClientRect();
      console.log('sysInfo:', Taro.getSystemInfoSync());
      console.log('capsuleButton:', Taro.getMenuButtonBoundingClientRect());
    } catch (e) {
      // Do something when catch error
    }
  }
}

export default new AppStore();