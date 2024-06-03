import { h, Component } from 'vue';
import { RouterLink } from 'vue-router';
import { NIcon, MenuOption } from 'naive-ui';
import {
  StatsChartOutline,
  DocumentTextOutline,
  CloudDownloadOutline,
  GridOutline,
  ListOutline,
  HomeOutline,
  PersonCircleOutline,
  ExtensionPuzzleOutline,
  InformationCircleOutline,
  EllipsisHorizontalCircleOutline,
  LinkOutline,
  PawOutline,
  PrismOutline,
  PricetagOutline,
  PlanetOutline
} from '@vicons/ionicons5';

// 菜单图标渲染函数
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/// 菜單選項數組
export const menuOptions: MenuOption[] = [
  {
    label: () => h(
      RouterLink,
      {
        to: { name: '首頁' }
      },
      { default: () => '首頁' }
    ),
    key: '首頁',
    icon: renderIcon(HomeOutline)
  },
  {
    type: 'divider',
    props: {
      style: { marginLeft: '32px' }
    }
  },
  {
    label: () => h(
      RouterLink,
      {
        to: { name: '個人資料' }
      },
      { default: () => '個人資料' }
    ),
    key: '個人資料',
    icon: renderIcon(PersonCircleOutline)
  },
  {
    label: '功能管理',
    key: '功能管理',
    icon: renderIcon(ListOutline),
    children: [
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '功能列表' }
          },
          { default: () => '功能列表' }
        ),
        key: '功能列表',
        icon: renderIcon(GridOutline)
      },
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '配置文件' }
          },
          { default: () => '配置文件' }
        ),
        key: '配置文件',
        icon: renderIcon(DocumentTextOutline)
      },
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '節點狀態' }
          },
          { default: () => '節點狀態' }
        ),
        key: '節點狀態',
        icon: renderIcon(StatsChartOutline)
      },
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '下載' }
          },
          { default: () => '下載' }
        ),
        key: '下載',
        icon: renderIcon(CloudDownloadOutline)
      }
    ]
  },
  {
    label: '擴展功能',
    key: '擴展功能',
    icon: renderIcon(ExtensionPuzzleOutline),
    children: [
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '免費域名' }
          },
          { default: () => '免費域名' }
        ),
        key: '免費域名',
        icon: renderIcon(LinkOutline)
      }
    ]
  },
  {
    label: '增值中心',
    key: '增值中心',
    icon: renderIcon(PrismOutline),
    children: [
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '購買點數卡' }
          },
          { default: () => '購買點數卡' }
        ),
        key: '購買點數卡',
        icon: renderIcon(PlanetOutline)
      },
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '積分商城' }
          },
          { default: () => '積分商城' }
        ),
        key: '積分商城',
        icon: renderIcon(PricetagOutline)
      },
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '消費記錄' }
          },
          { default: () => '消費記錄' }
        ),
        key: '消費記錄',
        icon: renderIcon(PawOutline)
      }
    ]
  },
  {
    label: '其他資訊',
    key: '其他資訊',
    icon: renderIcon(EllipsisHorizontalCircleOutline),
    children: [
      {
        label: () => h(
          RouterLink,
          {
            to: { name: '其他' }
          },
          { default: () => '其他' }
        ),
        key: '其他',
        icon: renderIcon(InformationCircleOutline)
      },
    ]
  },
];
