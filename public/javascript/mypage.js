const nickName = document.getElementById('nickname');
const userPoint = document.getElementById('userPoint');
const email = document.getElementById('email');
const userAddress = document.getElementById('userAddress');
const deliveryReq = document.getElementById('deliveryReq');
const orderQuantity = document.getElementById('orderQuantity');
const totalPrice = document.getElementById('totalPrice');
const orderStatus = document.getElementById('orderStatus');

let data;
const value = 'menuId';
// menuId 실제 menuId넣어야할것 같습니다.

const getData = async () => {
  const response = await fetch('/mypage/userinfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  data = await response.json();
  const menus = data.Menus;

  const findMenu = menus.find(menu => menu.menuId === value);
  nickName.innerText = data.nickName;
  userPoint.innerText = data.userPoint;
  email.innerText = data.email;
  userAddress.innerText = data.userAddress;
  deliveryReq.innerText = data.deliveryReq;
  orderQuantity.setAttribute('data-price', `${findMenu.menuPrice}`);
  totalPrice.innerText = data.totalPrice;
  orderStatus.innerText = data.orderStatus;
};
getData();

// async function getUserInfo() {
//   try {
//     const response = await fetch('/mypage/userinfo', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       },
//     });
//     if (!response.ok) {
//       throw new Error('서버에서 데이터를 가져오는 데 문제가 발생했습니다.');
//     }
//     const data = await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// getUserInfo();
