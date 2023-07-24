document.addEventListener('DOMContentLoaded', function() {
  // 헤더 파일을 동적으로 가져와서 삽입
  fetch('./header.html')
    .then(response => response.text())
    .then(data => {
      const headerElement = document.getElementById('myHeader');
      headerElement.innerHTML = data;

      // 토글 버튼과 메뉴 요소에 이벤트 리스너 추가
      const toggleBtn = document.querySelector('.navbar__toogleBtn');
      const menu = document.querySelector('.navbar__menu');
      const users = document.querySelector('.navbar__users');

      toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        users.classList.toggle('active');
      });

      // 로그아웃 버튼 이벤트 리스너 추가
      const logoutBtn = document.getElementById('logOut-btn');
      logoutBtn.addEventListener('click', userLogout);
    });
});

// 로그아웃 구현
const userLogout = async () => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // 서버에서 로그아웃이 성공적으로 처리된 경우
    if (data.message) {
      alert(data.message);
      location.href = '/login';
    } else {
      alert(data.errorMessage);
      location.reload(); // 오류 발생 시 페이지 새로고침
    }
  } catch (error) {
    // 서버 요청이 실패한 경우 추가적인 오류 처리 작업을 수행
    console.error(error);
    alert('서버 요청 실패. 로그인 상태 확인 후 다시 시도해주세요.'); // 오류 메시지
    location.href = 'login.html'; // 오류 발생 시 로그인 페이지로
  }
};
