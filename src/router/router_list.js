import IndexPage from '../pages/IndexPage';
import IndexPage2 from '../pages/IndexPage_new';
import IndexTest from '../pages/IndexTest';
import DashBoard from '../pages/DashBoard';
import Project from '../components/datamanagement/ProjectList';
import Division from '../components/datamanagement/DivisionList';
import Codegroup from '../components/datamanagement/CodegroupList';
import Class from '../components/datamanagement/ClassList';
import Page2 from '../pages/Page2';
import StatisticsWorker from '../components/statistics/StatisticsWorker';
import StatisticsProject from '../components/statistics/StatisticsProject';
import Chart from '../components/statistics/ChartTest';
import MemberList from '../components/member/MemberList';
import Board from '../components/board/Board';

const router_list = [
  {
    path: '/',
    name: 'index',
    component: IndexPage2,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/test',
    name: 'indextest',
    component: IndexTest,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashBoard,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
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
    path: '/codegroup/:ref_codegroup',
    name: 'codegroup',
    component: Codegroup,
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
    path: '/statisticsworker/:search_seq',
    name: 'statisticsworker',
    component: StatisticsWorker,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/statisticsproject/:search_seq',
    name: 'statisticsproject',
    component: StatisticsProject,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/chart',
    name: 'chart',
    component: Chart,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/member',
    name: 'member',
    component: MemberList,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/board/:board_code',
    name: 'board',
    component: Board,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: true, helpCode: 'main' },
  }
];


export default router_list;
