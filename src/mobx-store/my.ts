import { makeAutoObservable, runInAction } from 'mobx';
import Taro from "@tarojs/taro";


class MyStore {
  topOpacity: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setTopOpacity() {
    Taro.createSelectorQuery().select('#my-scroll-view').scrollOffset((rect: any) => {
      // 控制header透明度
      runInAction(() => {
        if (rect.scrollTop > 5) {
          this.topOpacity = 1;
        } else {
          this.topOpacity = 0
        }
      });
    }).exec();
  }
}

export default new MyStore();