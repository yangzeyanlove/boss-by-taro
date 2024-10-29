import { makeAutoObservable, runInAction } from 'mobx';
import Taro from "@tarojs/taro";
import request from '../common/request';
import { IJobInfo } from '../../types/job';
import appStore from './app';

interface IJobListResponse {
  code: number;
  message: string;
  zpData: {
    jobList: IJobInfo[];
  };
}
class JobStore {
  // 头部透明度
  headerOpacity: number = 0;
  // 头部高度
  headerHeight: number = 0;
  // 搜索条高度
  searchBarHeight: number = 0;
  // 搜索条offsetTop
  searchBarOffsetTop: number = 0;
  // 搜索条透明度
  searchBarOpacity: number = 0.5;
  // 搜索条右边位置
  searchBarRight: number = 0;
  // 是否显示定位过滤器
  isShowFixedFilter: boolean = false;
  topContenHeight: number = 0;
  // 数据相关变量
  list: any[] = [];
  loading: boolean = false;
  refreshing: boolean = false;
  currentType: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  // 随着页面滚动，头部的透明度变化
  setHeaderOpacity() {
    Taro.createSelectorQuery().select('#job-list-scroll-view').scrollOffset((rect: any) => {
      const scrollTop = rect.scrollTop;
      // 控制header透明度
      runInAction(() => {
        // if (scrollTop < 5) {
        //   this.headerOpacity = 0;
        //   return;
        // }
        if (scrollTop <= this.searchBarHeight) {
          this.headerOpacity = Math.min(scrollTop / this.searchBarHeight, 1);
          return;
        }
        this.headerOpacity = 1;
      });
    }).exec();
  }

  // 随着页面滚动，搜索条定位改变
  setSearchStyle() {
    Taro.createSelectorQuery().select('#job-list-scroll-view').scrollOffset((rect: any) => {
      const scrollTop = rect.scrollTop;
      runInAction(() => {
        const offsetRight = appStore.sysInfo.screenWidth - appStore.capsuleButton.left + 2;
        // 控制搜索条的offsetTop
        if (scrollTop <= this.searchBarHeight) {
          this.searchBarOffsetTop = scrollTop;
          this.searchBarOpacity = 0.5 + parseFloat((0.5 * scrollTop / this.searchBarHeight).toFixed(1));
          this.searchBarRight = scrollTop / this.searchBarHeight * offsetRight;
        } else {
          this.searchBarOffsetTop = this.searchBarHeight;
          this.searchBarOpacity = 1;
          this.searchBarRight = offsetRight;
        }
        // this.searchBarOffsetTop = scrollTop;
        if (scrollTop <= this.searchBarHeight && this.searchBarOffsetTop < appStore.sysInfo.statusBarHeight) {
          this.searchBarOffsetTop = this.headerHeight - scrollTop;
        } else {
          this.searchBarOffsetTop = appStore.sysInfo.statusBarHeight;
        }
      });
    }).exec();
  }

  // 设置头部高度
  setHeaderHeight() {
    Taro.createSelectorQuery().select('#job-list-header').boundingClientRect((rect: any) => {
      if (!rect) {
        return;
      }
      runInAction(() => {
        this.headerHeight = rect.height;
      });
    }).exec();
  }

  // 获取搜索条高度
  setSearchBarSize() {
    Taro.createSelectorQuery().select('#job-list-search-bar').boundingClientRect((rect: any) => {
      if (!rect) {
        return;
      }

      runInAction(() => {
        this.searchBarHeight = rect.height;
      });
    }).exec();
  }

  // 设置过滤器，顶部区域高度
  setTopContentHeight() {
    Taro.createSelectorQuery().select('#job-list-topWrap').boundingClientRect((rect: any) => {
      if (!rect) {
        return;
      }
      runInAction(() => {
        this.topContenHeight = rect.height;
      });
    }).exec();
  }

  // 设置过滤器的显隐
  setFilterDisplay() {
    Taro.createSelectorQuery().select('#job-list-scroll-view').scrollOffset((rect: any) => {
      const scrollTop = rect.scrollTop;
      runInAction(() => {
        this.isShowFixedFilter = (this.topContenHeight - scrollTop) <= this.headerHeight;
      });
    }).exec();
  }

  async fetchData(isRefresh = false) {
    // 正在请求中，不重复请求
    if (this.loading) {
      return;
    }

    runInAction(() => {
      // 如果是下拉刷新
      if (isRefresh) {
        this.refreshing = true;
      }
      // 开启请求中
      this.loading = true;
    });

    try {
      const res: IJobListResponse = await request({
        url: 'https://result.eolink.com/1PU8uLH9435a64bcd63e35fcb4dd6948bff5e7ebb444977?uri=/job/new-list',
      });
      runInAction(() => {
        if (res && res.zpData && res.zpData.jobList) {
          this.list = isRefresh ? res.zpData.jobList : [...this.list, ...res.zpData.jobList];
        }
        // this.loading = false;
        // this.refreshing = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.refreshing = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
        this.refreshing = false;
      });
    }
  }
}

export default new JobStore();