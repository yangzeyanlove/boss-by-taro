/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    /** NODE 内置环境变量, 会影响到最终构建生成产物 */
    NODE_ENV: 'development' | 'production',
    /** 当前构建的平台 */
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'qq' | 'jd' | 'harmony' | 'jdrn'
    /**
     * 当前构建的小程序 appid
     * @description 若不同环境有不同的小程序，可通过在 env 文件中配置环境变量`TARO_APP_ID`来方便快速切换 appid， 而不必手动去修改 dist/project.config.json 文件
     * @see https://taro-docs.jd.com/docs/next/env-mode-config#特殊环境变量-taro_app_id
     */
    TARO_APP_ID: string
  }
}

declare var wx;

declare namespace JSX {
  interface IntrinsicElements {
    'van-button': any,
    'van-cell': any,
    'van-config-provider': any,
    'van-icon': any,
    'van-image': any,
    'van-row': any,
    'van-col': any,
    'van-popup': any,
    'van-toast': any,
    'van-transition': any,
    'van-calendar': any,
    'van-cascader': any,
    'van-checkbox': any,
    'van-checkbox-group': any,
    'van-datetime-picker': any,
    'van-field': any,
    'van-picker': any,
    'van-radio': any,
    'van-radio-group': any,
    'van-rate': any,
    'van-search': any,
    'van-slider': any,
    'van-stepper': any,
    'van-switch': any,
    'van-uploader': any,
    'van-action-sheet': any,
    'van-dialog': any,
    'van-dropdown-menu': any,
    'van-dropdown-item': any,
    'van-loading': any,
    'van-notify': any,
    'van-overlay': any,
    'van-share-sheet': any,
    'van-swipe-cell': any,
    'van-circle': any,
    'van-collapse': any,
    'van-collapse-item': any,
    'van-count-down': any,
    'van-divider': any,
    'van-empty': any,
    'van-notice-bar': any,
    'van-progress': any,
    'van-skeleton': any,
    'van-steps': any,
    'van-sticky': any,
    'van-tag': any,
    'van-grid': any,
    'van-index-bar': any,
    'van-index-anchor': any,
    'van-nav-bar': any,
    'van-sidebar': any,
    'van-sidebar-item': any,
    'van-tab': any,
    'van-tabs': any,
    'van-tabbar': any,
    'van-tabbar-item': any,
    'van-tree-select': any,
    'van-area': any,
    'van-card': any,
    'van-submit-bar': any,
    'van-goods-action': any,
    'van-goods-action-icon': any,
    'van-goods-action-button': any
  }
}
