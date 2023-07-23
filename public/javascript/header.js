document.addEventListener('DOMContentLoaded', function () {
  // 헤더 파일을 동적으로 가져와서 삽입
  fetch('./header.html')
    .then((response) => response.text())
    .then((data) => {
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
    });
});
