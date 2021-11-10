const StatusToStr = (code) => {
  let str = '라벨대기중';
  switch (code) {
    case 'A':
      str = '라벨할당';
      break;
    case 'A1':
      str = '라벨작업중';
      break;
    case 'A2':
      str = '라벨완료';
      break;
    case 'B1':
      str = '검수1';
      break;
    case 'B2':
      str = '검수1완료';
      break;
    case 'B5':
      str = '검수1반려';
      break;
    case 'C1':
      str = '검수2';
      break;
    case 'C2':
      str = '검수2완료';
      break;
    case 'C5':
      str = '검수2반려';
      break;
    case 'D1':
      str = '검수3';
      break;
    case 'D2':
      str = '검수3완료';
      break;
    case 'D5':
      str = '검수3반려';
      break;
    case 'E2':
      str = '완료';
      break;
    default:
      str = '작업대기';
      break;
  }
  return str;
};

const log_typeToStr = (code) => {
  let str = '로그인';
  switch (code) {
    case '1009':
      str = '로그아웃';
      break;
    case '1002':
      str = '정보수정';
      break;
    case '1001':
      str = '등록';
      break;
    default:
      str = '로그인';
      break;
  }
  return str;
};
export default {
  StatusToStr,
  log_typeToStr,
}
