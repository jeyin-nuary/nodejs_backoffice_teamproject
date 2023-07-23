const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get('storeId');
const menuId = urlParams.get('menuId');

// 메뉴 등록
document.getElementById('menuCrBtn').addEventListener('click', async function() {
  const menuName = document.getElementById('menuName').value;
  const menuPrice = document.getElementById('menuPrice').value;
  const menuimg = document.getElementById('menuimg').value;
  const menuInfo = document.getElementById('menuInfo').value;

  try {
    const response = await fetch(`/api/stores/${storeId}/menus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        menuName,
        menuPrice,
        menuimg,
        menuInfo,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      alert('메뉴가 등록되었습니다');
      window.location.href;
    } else {
      console.log(data.errMessage);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// 가게 페이지로 이동
document.getElementById('menuClBtn').addEventListener('click', function() {
  window.location.href = `store.html?storeId=${storeId}`;
});

// // 메뉴 사진 업로드
const fileInput = document.querySelector('#image');
const uploadBtn = document.querySelector('#uploadBtn');

uploadBtn.addEventListener('click', function() {
  var formData = new FormData();
  formData.append('image', fileInput.files[0]);
  fetch(`/api/stores/${storeId}/menus/1`, {
    method: 'POST',
    cache: 'no-cache',
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      alert(data.Message);
      location.reload();
    });
});

fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];
};
