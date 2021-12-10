import request from '../utils/request';

export default {
  // Board
  getBoardInfo: (board_code, data) => request({
    url: `/board/${board_code}/boardinfo`,
    method: 'post',
    data,
  }),

  createBoard: data => request({
    url: '/board/createboard',
    method: 'post',
    data,
  }),

  updateBoard: (board_seq, board_info) => request({
    url: `/board/${board_seq}/updateboard`,
    method: 'post',
    data: board_info,
  }),

  delBoard: params => request({
    url: '/board/delboard',
    method: 'post',
    data: {
      params,
    },
  }),

  uploadFile: (board_code, data) => request({
    url: `/board/${board_code}/upload`,
    method: 'post',
    data,
  }),

}