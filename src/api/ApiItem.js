import request from '../utils/request';

export default {
  getGroup: data => request({
    url: '/items/readgroup',
    method: 'post',
    data: data,
  }),
  getSido: () => request({
    url: '/items/readsido',
    method: 'get',
  }),
  getGugun: data => request({
    url: `/items/readgugun/${data}`,
    method: 'get',
  }),
  getActioncase: data => request({
    url: `/items/getActioncase/${data}`,
    method: 'get',
  }),
}
