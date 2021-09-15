import IndexPage from '../pages/IndexPage';
import DashBoard from '../pages/DashBoard';
import Datalist from '../components/datamanagement/DataList';
import ProjectList from '../components/datamanagement/ProjectList';
import Page2 from '../pages/Page2';
import StatisticsPerson from '../components/statistics/StatisticsPerson';
import StatisticsProject from '../components/statistics/StatisticsProject';
import MemberList from '../components/member/MemberList';

const router_list = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/datalist',
    name: 'datalist',
    component: Datalist,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/projectlist',
    name: 'projectlist',
    component: ProjectList,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/page2',
    name: 'page2',
    component: Page2,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/statisticsperson',
    name: 'statisticsperson',
    component: StatisticsPerson,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/statisticsproject',
    name: 'statisticsproject',
    component: StatisticsProject,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/member',
    name: 'member',
    component: MemberList,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
];


export default router_list;
