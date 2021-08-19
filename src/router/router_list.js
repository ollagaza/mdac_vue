import IndexPage from '../pages/IndexPage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';

const router_list = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/page1',
    name: 'page1',
    component: Page1,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
  {
    path: '/page2',
    name: 'page2',
    component: Page2,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: false, helpCode: 'main' },
  },
];


export default router_list;
