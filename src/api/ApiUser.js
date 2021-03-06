import request from '../utils/request';

export default {
  verifyUserId: user_id => request({
    url: `/users/verify/${user_id}`,
    method: 'get',
  }),

  memtest: member_info => request({
    url: '/users/memtest',
    method: 'post',
    data: member_info,
  }),

  createUser: member_info => request({
    url: '/users/createuser',
    method: 'post',
    data: member_info,
  }),

  updateUser: (member_seq, member_info) => request({
    url: `/users/${member_seq}/updateuser`,
    method: 'post',
    data: member_info,
  }),

  login: (user_id, password) => request({
    url: '/auth',
    method: 'post',
    data: {
      user_id,
      password,
    },
  }),

  logout: () => request({
    url: '/auth/logout',
    method: 'get',
  }),


  getUserData: member_seq => request({
    url: `/users/${member_seq}/data`,
    method: 'get',
  }),

  // getUserList: (page, list_count, is_used, search_type, keyword, member_seq) => request({
  //   url: `/users/userinfo?page=${page}&list_count=${list_count}&is_used=${is_used}&search_type=${search_type}&keyword=${keyword}&member_seq=${member_seq}`,
  //   method: 'post',
  // }),

  getUserInfos: data => request({
    url: '/users/userinfo',
    method: 'post',
    data,
  }),

  getUserInfo: () => request({
    url: '/users/me',
    method: 'get',
  }),

  findUserId: data => request({
    url: '/users/find/id',
    method: 'post',
    data,
  }),

  sendAuthCode: data => request({
    url: '/users/send_auth_code',
    method: 'post',
    data,
  }),
  checkAuthCode: data => request({
    url: '/users/check_auth_code',
    method: 'post',
    data,
  }),

  resetPassword: data => request({
    url: '/users/reset_password',
    method: 'post',
    data,
  }),

  refreshToken: () => request({
    url: '/auth/token/refresh',
    method: 'post',
  }),

  changePassword: (seq, data) => request({
    url: `/users/changePassword/${seq}`,
    method: 'post',
    data,
  }),
  setUserUsed: (member_seq, params) => request({
    url: `/users/setuserdata/${member_seq}`,
    method: 'post',
    data: {
      params,
    },
  }),
  setUsersUsed: params => request({
    url: '/users/setusersdata',
    method: 'post',
    data: {
      params,
    },
  }),  
  delUsers: params => request({
    url: '/users/delusers',
    method: 'post',
    data: {
      params,
    },
  }),
  getUserCount: () => request({
    url: '/users/membercount',
    method: 'post',
  }),
  getUserHistory: (member_seq, data) => request({
    url: `/users/history/${member_seq}`,
    data,
    method: 'post',
  }),
}
