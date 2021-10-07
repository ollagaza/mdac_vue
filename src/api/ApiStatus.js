import request from '../utils/request';

export default {
  getProjectList: () => request({
    url: '/datastatus/projectlist',
    method: 'get',
  }),
  getStatusList: () => request({
    url: '/datastatus/statuslist',
    method: 'get',
  }),
  getDivision: (seq, data) => request({
    url: `/datastatus/getdivsion/${seq}`,
    data,
    method: 'post',
  }),
  getWokerList: () => request({
    url: '/datastatus/getworker',
    method: 'post',
  }),
  getJobList: (pro_seq, div_seq, data) => request({
    url: `/datastatus/getjob/${pro_seq}/${div_seq}`,
    data,
    method: 'post',
  }),
  getStatusClass: seq => request({
    url: `/datastatus/statusclass/${seq}`,
    method: 'get',
  }),
};
