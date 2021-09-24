import request from '../utils/request';

export default {
  getProjectInfo: data => request({
    url: '/project/projectinfo',
    method: 'post',
    data,
  }),

  createProject: project_info => request({
    url: '/project/createproject',
    method: 'post',
    data: project_info,
  }),

  updateProject: (project_seq, project_info) => request({
    url: `/project/${project_seq}/updateproject`,
    method: 'post',
    data: project_info,
  }),

}
