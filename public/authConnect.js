$(document).ready(function () {
  // 회원 가입 폼 제출 시 실행되는 함수
  $('#register-form').submit(function (e) {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 사용자가 입력한 데이터 가져오기
    var formData = {
      email: $('#email').val(),
      nickname: $('#nickname').val(),
      password: $('#pass').val(),
      confirmPassword: $('#confirmPassword').val(),
      userAddress: $('#userAddress').val(),
      // agree_term: $('#agree-term').prop('checked'),
    };
  });
});

//     // AJAX 요청 보내기
//     $.ajax({
//       type: 'POST',
//       url: '/backend/signup', // 내가 만든 회원 가입 API 주소를 입력해야 함. /프론트에서 여기로 데이터를 보내고, 백엔드에서는 받은 데이터를 처리하여 회원가입을 완료하는 로직 구현해야 함
//       data: formData,
//       success: function (response) {
//         // 성공적인 응답 처리
//         console.log('회원 가입 성공:', response);
//         // 여기서 추가적인 처리를 할 수 있습니다. 예를 들면 회원 가입 성공 메시지를 표시하는 등의 동작이 있을 수 있습니다.
//       },
//       error: function (error) {
//         // 오류 발생 시 처리
//         console.error('오류 발생:', error);
//         // 여기서 추가적인 오류 처리를 할 수 있습니다. 예를 들면 오류 메시지를 표시하는 등의 동작이 있을 수 있습니다.
//       },
//     });
//   });
// })};
