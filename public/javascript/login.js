const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const userLogin = async () => {
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('your_pass').value;

    console.log(email, password);

    // 로그인 로직 구현
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, // 사용자가 입력한 이메일 주소
        password, // 사용자가 입력한 비밀번호
      }),
    });

    const data = await response.json();

    if (data.message) {
      alert(data.message);
      location.href = '/';
    } else {
      alert(data.errorMessage);
      location.reload();
    }

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data.message); // 서버에서 보낸 로그인 메시지를 출력하거나 다른 처리를 수행

    //   window.location.href = '/';
    //   //   const loginContainer = document.getElementById('form-group form-button');
    //   //   loginContainer.style.display = 'block'; // 로그인 버튼을 보여줌
    // } else {
    //   const data = await response.json();
    //   console.log(data.errorMessage);
    // }
  } catch (error) {
    console.error('오류 발생:', error);
  }
};

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
      location.href = '/';
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

loginBtn.addEventListener('click', userLogin);
logoutBtn.addEventListener('click', userLogout);
