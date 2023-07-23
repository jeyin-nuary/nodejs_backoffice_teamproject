// 로그아웃
async function logout() {
  try {
    const response = await fetch('/logout', {
      method: 'GET',
      credentials: 'include', // 이 옵션을 추가하면 쿠키도 함께 전송
    });

    if (response.status === 200) {
      // 로그아웃 실행되면 메인 페이지로 이동
      window.location.href = '/main'; // 메인 페이지 url로 추후 변경
    } else {
      // 로그아웃 실패 처리
      console.error('로그아웃에 실패했습니다.');
    }
  } catch (error) {
    console.error('오류가 발생했습니다.', error);
  }
  //   const api = await fetch('/logout');
}
