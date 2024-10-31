import { lazy } from 'react';
import {
  makeAutoObservable,
  runInAction
} from 'mobx';
import Taro from "@tarojs/taro";
import appStore from './app';

interface IType {
  label: string;
  icon: string;
  component?: any;
}
class PositionStore {
  typeArr: IType[] = [
    {
      label: '选岗位',
      icon: 'calendar',
      component: lazy(() => import('../pages/position/right-one')),
    }, {
      label: '挑地点',
      icon: 'map-pin',
      component: lazy(() => import('../pages/position/right-two')),
    }, {
      label: '找公司',
      icon: 'home',
      component: lazy(() => import('../pages/position/right-three')),
    }, {
      label: '选行业',
      icon: 'analytics',
      component: lazy(() => import('../pages/position/right-four')),
    }, {
      label: '看直播',
      icon: 'video',
      component: lazy(() => import('../pages/position/right-five')),
    }
  ];
  currentType: number = 0;
  mainContainerHeight: number = 0
  slidingLayerHeight: number = 0;
  scrollOffsetY: number = 0;
  scrollIntoViewId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  get slidingLayerOffset() {
    return this.currentType * this.slidingLayerHeight;
  }

  setCurrentType(val: number, item?: any) {
    runInAction(() => {
      this.currentType = val;
      // 设置右边滚动位置
      this.scrollIntoViewId = item.icon + "-right-content";
    });
  }

  init() {
    this.setSlidingLayerHeight();
    this.setMainContainerHeight();
  }

  // 获取容器高度
  setMainContainerHeight() {
    Taro.createSelectorQuery().select('#position-main-container').boundingClientRect((rect: any) => {
      if (!rect) {
        return;
      }
      runInAction(() => {
        this.mainContainerHeight = rect.height;
      });
    }).exec();
  }

  // 获取滑动层高度
  setSlidingLayerHeight() {
    Taro.createSelectorQuery().select('#position-sliding-layer').boundingClientRect((rect: any) => {
      if (!rect) {
        return;
      }
      runInAction(() => {
        this.slidingLayerHeight = rect.height;
      });
    }).exec();
  }

  // 滚动事件
  scrollEventHandle() {
    this.typeArr.forEach((item, index) => {
      Taro.createSelectorQuery().select(`#${item.icon}-right-content`).boundingClientRect((rect: any) => {
        if (!rect) {
          return;
        }
        if (rect.top > 0 && rect.top <= appStore.sysInfo.safeArea.height) {
          runInAction(() => {
            this.currentType = index;
          });
        }
      }).exec();
    });
  }

  // 设置滚动距离
  setScrollOffsetY(val: number) {
    this.scrollOffsetY = val;
  }
}

export default new PositionStore();