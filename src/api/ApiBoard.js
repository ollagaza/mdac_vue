import request from '../utils/request';

export default {
  // Board
  getBoardInfo: (board_code, data) => request({
    url: `/board/${board_code}/boardinfo`,
    method: 'post',
    data,
  }),

  createBoard: board_info => request({
    url: '/board/createboard',
    method: 'post',
    data: board_info,
  }),

  updateBoard: (board_seq, board_info) => request({
    url: `/board/${board_seq}/updateclass`,
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

}