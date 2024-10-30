import { lazy } from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import request from '../common/request';

interface ITabItem {
  title: string;
  component: any;
}
interface IListResponse {
  code: number;
  message: string;
  zpData: {
    result: any[];
  };
}
class ChatStore {
  tabList: ITabItem[] = [
    {
      title: '消息',
      component: lazy(() => import('../pages/chat/message')),
    },
    {
      title: '看过我',
      component: lazy(() => import('../pages/chat/seen-me')),
    },
    {
      title: '新职位',
      component: lazy(() => import('../pages/chat/new-job')),
    },
    {
      title: '对我感兴趣',
      component: lazy(() => import('../pages/chat/interested-me')),
    }
  ];
  activeTab: number = 0;
  msgTypeArr: string[] = ["全部", "新招呼", "仅沟通", "有交换"];
  currentMsgType: number = 0;
  // 数据相关变量
  allData: any[] = [];
  list: any[] = [];
  loading: boolean = false;
  refreshing: boolean = false;
  currentIndex: number = 0;
  loadedTypeArr: string[] = [];
  // 其他数据
  others = [
    {
      'uid': 1141998241,
      'name': '易宝软件 发布了新职位',
      'avatar': '',
      'brandName': '',
      'title': '',
      'date': '09:33',
      'type': '',
      'content': '40位Boss新发布',
      'isLatest': true,
      'isNotice': false,
    },
    {
      'uid': 1141998241,
      'name': '通知',
      'avatar': '',
      'brandName': '系统通知',
      'title': '',
      'date': '星期四',
      'type': '',
      'content': '简历曝光将降低',
      'isLatest': false,
      'isNotice': true,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  changeTab(val: number) {
    runInAction(() => {
      this.activeTab = val;
    });
  }

  changeMessageType(val: number) {
    runInAction(() => {
      this.currentMsgType = val;
      this.fetchData(true);
    });
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
      const res: IListResponse = await request({
        url: 'https://result.eolink.com/1PU8uLH9435a64bcd63e35fcb4dd6948bff5e7ebb444977?uri=/chat/list-content',
      });

      runInAction(() => {
        if (res && res.zpData && res.zpData.result) {
          this.list = isRefresh ? res.zpData.result : [...this.list, ...res.zpData.result];
        }
        switch (this.currentMsgType) {
          case 0:
            this.list = [...this.others, ...this.list];
            break;
          default:
            this.list = this.list.filter((item, index) => index % 4 === this.currentMsgType);
            break;
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

export default new ChatStore();