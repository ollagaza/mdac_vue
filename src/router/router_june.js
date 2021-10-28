import DataStatus from '../pages/DataList';
import DataDivision from '../pages/DataDivison';
import DataDetail from '../pages/DataDetail';

const router_list_june = [
  {
    path: '/datastatus',
    name: 'datastatus',
    component: DataStatus,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: true, helpCode: 'main' },
  },
  {
    path: '/datadivision',
    name: 'datadivision',
    component: DataDivision,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: true, helpCode: 'main' },
  },
  {
    path: '/datadetail',
    name: 'datadetail',
    component: DataDetail,
    meta: { navigation: '', border_line: '', menu_id: '0', no_pad: true, guest: true, login: true, helpCode: 'main' },
  },
];


export default router_list_june;
