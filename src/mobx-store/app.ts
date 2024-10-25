import Taro from "@tarojs/taro";
import { makeAutoObservable, runInAction } from 'mobx';

class AppStore {
  sysInfo: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  getSysInfo() {
    try {
      this.sysInfo = Taro.getSystemInfoSync();
    } catch (e) {
      // Do something when catch error
    }
  }
}

export default new AppStore();