import request from '../utils/request';

export default {
  getProjectList: () => request({
    url: '/project/projectinfo',
    method: 'post',
  }),
  getStatusList: () => request({
    url: '/datastatus/statuslist',
    method: 'get',
  }),
  getCategoryStatusList: (data) => request({
    url: '/datastatus/categorystatuslist',
    data,
    method: 'post',
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
  getCategoryList: (data) => request({
    url: '/datastatus/getcategory',
    data, 
    method: 'post',
  }),
  getFileList: (pro_seq, div_seq, data) => request({
    url: `/datastatus/getfilelist/${pro_seq}/${div_seq}`,
    data,
    method: 'post',
  }),
  getViewList: (pro_seq, div_seq, data) => request({
    url: `/datastatus/getviewlist/${pro_seq}/${div_seq}`,
    data,
    method: 'post',
  }),
  getClassList: (pro_seq) => request({
    url: `/datastatus/getclasslist/${pro_seq}`,
    method: 'post',
  }),
  getDivSum: (data) => request({
    url: '/datastatus/getdivsum',
    data,
    method: 'post',
  }),
  setWorkIn: (pro_seq, div_seq, data) => request({
    url: `/datastatus/setworkin/${pro_seq}/${div_seq}`,
    data,
    method: 'post',
  }),
  delWork: (pro_seq, div_seq, data) => request({
    url: `/datastatus/delwork/${pro_seq}/${div_seq}`,
    data,
    method: 'post',
  }),
  getHis: (seq, data) => request({
    url: `/datastatus/getHis/${seq}`,
    data,
    method: 'post',
  }),
  resultDown: (seq, params) => request({
    url: `/datastatus/resultdown/${seq}`,
    params,
    method: 'get',
  }),
  getStatusClass: seq => request({
    url: `/datastatus/statusclass/${seq}`,
    method: 'get',
  }),
};
