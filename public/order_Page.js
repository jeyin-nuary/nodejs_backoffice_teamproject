// 브라우저에 DB에 저장된 storeName이 나오게 경로 설정.
const urlSearch = new URLSearchParams(location.search);
const storeId = urlSearch.get('storeId');
console.log(storeId);

const storeName = document.getElementById('storeName');
const form = document.getElementById('orderForm');
const menuSelect = document.getElementById('menuId');
const deliveryReq = document.getElementById('deliveryReq');
const orderQuantity = document.getElementById('orderQuantity');
const menuPrice = document.getElementById('menuPrice');
const totalPrice = document.getElementById('totalPrice');
const menuInfo = document.getElementById('menuInfo');
const menuImg = document.getElementById('menuImg');

let nowPrice;
let data;

const getData = async () => {
  const response = await fetch(`/api/stores/${storeId}`);
  data = await response.json();
  console.log(data);

  const menus = data.Menus.map(menu => {
    return `<option value=${menu.menuId}>${menu.menuName}</option>`;
  });
  storeName.innerText = data.storeName;
  menuSelect.innerHTML = menus;
  menuPrice.innerText = data.Menus[0].menuPrice;
  menuInfo.innerText = data.Menus[0].menuInfo;
  totalPrice.innerText = data.Menus[0].menuPrice;
  menuImg.setAttribute('src', data.Menus[0].menuImg);
  nowPrice = data.Menus[0].menuPrice;
};

getData();

const selectChange = () => {
  const value = Number(menuSelect.options[menuSelect.selectedIndex].value);
  // console.log(value);
  console.log(data);
  const menus = data.Menus;
  const findMenu = menus.find(menu => menu.menuId === value);
  menuPrice.innerText = findMenu.menuPrice;
  menuInfo.innerText = findMenu.menuInfo;
  totalPrice.innerText = findMenu.menuPrice;
  orderQuantity.setAttribute('data-price', `${findMenu.menuPrice}`);
  menuImg.setAttribute('src', findMenu.menuImg);
  orderQuantity.value = 1;

  nowPrice = findMenu.menuPrice;
  console.log(findMenu);
};
const quantityChange = () => {
  const quantity = Number(orderQuantity.value);
  totalPrice.innerText = `${nowPrice * quantity}`;
};
orderQuantity.addEventListener('change', quantityChange);

menuSelect.addEventListener('change', selectChange);

form.addEventListener('submit', async event => {
  event.preventDefault();
  // menuId 경로 만들어서 fetch 안에 ${} 감싸서 id 만 적을수 있게 함
  const menuId = Number(menuSelect.options[menuSelect.selectedIndex].value);
  try {
    const response = await fetch(`/api/stores/${storeId}/menus/${menuId}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 나중에 로그인할때 middle ware token :: "Authorization": "Bearer 토큰 값" 넣어야함
      },
      body: JSON.stringify({
        orderQuantity: parseInt(orderQuantity.value),
        deliveryReq: deliveryReq.value,
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
