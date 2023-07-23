// 브라우저에 동적으로 표시하기 위해 파일을 만들었습니다. 저희는 ejs를 쓰지 않기에 render가 아닌 fetch로 연결했습니다.

// form 변수를 선언하고 storeRegister.html 파일에 id값이 store-register-form 인것을 찾고 form 변수에 담음
const form = document.getElementById('store-register-form');
// form 요소에 'submit' 이벤트 리스너를 추가하여 요청을 처리하게 함
form.addEventListener('submit', async e => {
  e.preventDefault();
  // 값들을 가져와서 아래의 변수들에 담음
  const storeName = document.getElementById('storeName').value;
  const storeAddress = document.getElementById('storeAddress').value;
  const storeUrl = document.getElementById('storeUrl').value;
  // 유효성 검사 추가
  if (!storeName) {
    alert('가게 이름을 입력해주세요.');
    return;
  }
  if (!storeAddress) {
    alert('가게 주소를 입력해주세요.');
    return;
  }
  // 에러핸들링
  try {
    // fetch 를 통해 아래 주소로 POST 요청
    const response = await fetch('/api/stores', {
      method: 'POST',
      // 이 부분은 서버와 브라우저간에 데이터 전송과정에서 문제가 없게 도와주는거라고 하는데 저도 검색하면서 알아낸거라 잘은 모릅니다...복붙해서 주석으로 남겨둘게요.
      // headers라는 객체에서 'Content-Type': 'application/json' 설정은 서버에 보내는 요청에 데이터 형식이 JSON임을 알리는 역할을 합니다. 이 설정을 사용하면 서버는 클라이언트가 보내는 데이터가 JSON 형식이라는 것을 인식하고, 이를 올바르게 처리할 수 있습니다.
      headers: {
        'Content-Type': 'application/json',
      },
      // 아래의 값들을 문자열로 반환
      body: JSON.stringify({
        storeName,
        storeAddress,
        storeUrl,
      }),
    });
    // response data들을 json으로 반환하고 그걸 result 변수에 할당
    const result = await response.json();
    // 유효성 검사
    if (response.status === 200) {
      alert('가게가 성공적으로 등록되었습니다!');
    } else if (response.status === 409) {
      alert('등록된 가게입니다.');
    } else {
      alert(result.errorMessage || '가게 등록에 실패하였습니다.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('가게 등록 중 오류가 발생하였습니다.');
  }
});
