async function sendEmail(event) {
  try {
    event.preventDefault();
    const email = document.getElementById('email').value;
    await $.ajax({
      type: 'POST',
      url: '/api/signUp/confirm',
      data: { email },
      success: data => {
        alert(data.message);
      },
      error: error => {
        alert(error.responseJSON.errorMessage);
      },
    });
  } catch (error) {
    console.log(error);
  }
}
const confirmBtn = document.getElementById('confirm');
confirmBtn.addEventListener('click', sendEmail);

// 회원가입 정보를 서버로 전송
async function signup(reg) {
  try {
    reg.preventDefault();
    const email = document.getElementById('email').value;
    const authCode = document.getElementById('authCode').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const address = document.getElementById('address').value;

    const signUp = {
      email,
      AuthCode: authCode,
      nickname,
      password,
      confirmPassword,
      userAddress: address,
    };

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUp),
    });
    const data = await response.json();
    if (data.message) {
      alert(data.message, data.newUser);
      location.href = '/login';
    } else {
      alert(data.errorMessage);
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
const signupBtn = document.getElementById('signup');
signupBtn.addEventListener('click', signup);
