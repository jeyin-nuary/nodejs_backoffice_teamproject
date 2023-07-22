function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
// 28번째 줄을 위해 선언
// const accessToken = getCookie('accessToken');

const form = document.getElementById('orderForm');

form.addEventListener('submit', async event => {
event.preventDefault(); const storeId = document.getElementById('storeId').value;
const menuId = document.getElementById('menuId').value;
const orderQuantity = document.getElementById('orderQuantity').value;
const deliveryReq = document.getElementById('deliveryReq').value;
const orderStatus = document.getElementById('orderStatus').value; if (!menuId) {
alert('메뉴를 선택해주세요!');
return;
}
if (!orderQuantity) {
alert('수량을 선택해주세요!');
}
try {
const response = await fetch(/stores/${storeId}/menus/${menuId}/order, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
// 나중에 로그인할때 middle ware token :: "Authorization": "Bearer 토큰 값" 넣어야함
},
body: JSON.stringify({
orderQuantity: parseInt(orderQuantity),
deliveryReq: deliveryReq,
orderStatus: orderStatus,
}),
});
const result = await response.json();
if (response.status === 200) {
alert('주문이 성공적으로 등록되었습니다!');
console.log(result);
} else {
alert(result.errorMessage || '주문을 등록하는데 실패하였습니다.');
}
} catch (error) {
console.error('Error:', error);
alert('주문요청중 오류가 발생하였습니다.');
}
});