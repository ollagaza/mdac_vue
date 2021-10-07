import IndexPage from '../pages/IndexPage';
import DashBoard from '../pages/DashBoard';
import DataList from '../pages/DataList';
import DataDivision from '../pages/DataDivison';
import DataDetail from '../pages/DataDetail';
import Project from '../components/datamanagement/ProjectList';
import Division from '../components/datamanagement/DivisionList';
import Class from '../components/datamanagement/ClassList';
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
    path: '/datastatus',
    name: 'datastatus',
    component: DataList,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: false, login: true, helpCode: 'main' },
  },
  {
    path: '/datadivision',
    name: 'datadivision',
    component: DataDivision,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: false, login: true, helpCode: 'main' },
  },
  {
    path: '/datadetail',
    name: 'datadetail',
    component: DataDetail,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: false, login: true, helpCode: 'main' },
  },
  {
    path: '/project',
    name: 'project',
    component: Project,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/division',
    name: 'division',
    component: Division,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/class',
    name: 'class',
    component: Class,
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
