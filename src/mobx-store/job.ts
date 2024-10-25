import { makeAutoObservable, runInAction } from 'mobx';
import Taro from "@tarojs/taro";
import request from '../common/request';
import { IJobInfo } from '../../types/job';

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
  // 搜索条高度
  searchBarHeight: number = 0;
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
      // console.log('当前滚动位置:', rect);
      const scrollTop = rect.scrollTop;
      if (scrollTop < 5) {
        this.headerOpacity = 0;
        return;
      }
      if (scrollTop <= this.searchBarHeight) {
        this.headerOpacity = Math.min(scrollTop / this.searchBarHeight, 1);
        return;
      }
      this.headerOpacity = 1;
    }).exec();
  }

  // 获取搜索条高度
  setSearchBarHeight() {
    Taro.createSelectorQuery().select('#job-list-search-bar').boundingClientRect((rect: any) => {
      if (rect) {
        console.log('节点高度:', rect);
        this.searchBarHeight = rect.height;
      }
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

      console.log(res);

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