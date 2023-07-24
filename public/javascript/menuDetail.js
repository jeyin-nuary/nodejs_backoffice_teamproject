const urlParams = new URLSearchParams(window.location.search);
const storeId = urlParams.get('storeId');
const menuId = urlParams.get('menuId');

// 메뉴 수정
document.getElementById('menuMdBtn').addEventListener('click', async function() {
  const menuName = document.getElementById('menuName').value;
  const menuPrice = document.getElementById('menuPrice').value;
  const menuimg = document.getElementById('menuimg').value;
  const menuInfo = document.getElementById('menuInfo').value;

  try {
    const response = await fetch(`/api/stores/${storeId}/menus/${menuId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
      alert('메뉴가 수정되었습니다');
      window.location.href;
    } else {
      console.log(data.errMessage);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

//메뉴 삭제
document.getElementById('menuDlBtn').addEventListener('click', async function() {
  try {
    const response = await fetch(`/api/stores/${storeId}/menus/${menuId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = await response.json();
      // 삭제성공
      console.log(data.message);
      alert('메뉴가 삭제되었습니다');
      window.location.href;
    } else {
      // 삭제 실패
      console.log('메뉴 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.log('오류가 발생했습니다.', error);
  }
});

// 가게 페이지로 이동
document.getElementById('menuClBtn').addEventListener('click', function() {
  window.location.href = `store.html?storeId=${storeId}`;
});
