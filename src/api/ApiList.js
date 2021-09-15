import request from '../utils/request';

export default {
  createMyplant: (data, modeType) => request({
    url: `/myplant/in/${modeType}`,
    method: 'post',
    data,
  }),
  getMyplantList: () => request({
    url: '/myplant/list',
    method: 'get',
  }),
  getMyplantInfo: seq => request({
    url: `/myplant/info/${seq}`,
    method: 'get',
  }),
  createList: data => request({
    url: '/plant/createlist',
    method: 'post',
    data,
  }),
  createFile: (data, seq, progress_callback, cancel_source) => request({
    url: `/plant/createfile/${seq}`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: progress_callback,
    timeout: 0,
    cancelToken: cancel_source.token,
  }),
  getPlantList: params => request({
    url: '/plant/pagelist',
    method: 'get',
    params,
  }),
  getInfoData: data => request({
    url: '/plant/getinfo',
    method: 'post',
    data,
  }),
  delList: seq => request({
    url: `/plant/dellist/${seq}`,
    method: 'get',
  }),
  changeResult: data => request({
    url: '/plant/changeresult',
    method: 'post',
    data,
  }),
  getStatus: data => request({
    url: '/plant/status',
    method: 'post',
    data,
  }),
  reReqeust: seq => request({
    url: `/plant/rerequest/${seq}`,
    method: 'get',
  }),
}
