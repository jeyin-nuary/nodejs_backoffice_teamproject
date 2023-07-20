$(document).ready(() => {
  getOrders();
});
// url에서 storeId 가져오기
const getStoreIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('storeId');
};
const storeId = getStoreIdFromUrl();

// 서버로부터 주문 목록을 가져와 화면에 표시하는 함수
const getOrders = async () => {
  try {
    const response = await fetch(`/api/stores/${storeId}/orders`);
    const orders = await response.json();

    orders.forEach(order => {
      if (order.orderStatus === '주문 등록') {
        const { orderId, userAddress, deliveryReq, orderQuantity, orderStatus } = order;
        const { menuImg, menuName, menuPrice } = order.Menu;
        const totalPrice = menuPrice * orderQuantity;

        let temp_html = `<div class="order-list">
                                 <div class="order-tag">
                                    <div class="menu-img">
                                      <img src="${menuImg}">
                                    </div>
                                    <div class="menu-name">
                                        <p class="menu-name-name">${menuName}</p>
                                        <div class="address">
                                            <p class="user-address">${userAddress}</p>
                                        </div>
                                    </div>
                                    <div class="order-req">
                                        <p>${deliveryReq}</p>
                                    </div>
                                    <div>
                                    <p>오더상태: ${orderStatus}</p>
                                    <p>수량: ${orderQuantity}</p>
                                    <p>총액: ${totalPrice}</p>
                                    </div>
                                    <div class="button-container">
                                        <button id="order-ApprovalBtn" class="order-approval" data-orderId=${orderId}>Order Approval</button>
                                        <button id="order-RefuseBtn" class="order-refusal" data-orderId=${orderId}>Order Refuse</button>
                                    </div>
    
                                </div>
                            </div>`;

        $('.flow').append(temp_html);
      } else if (order.orderStatus === '주문 승인' || order.orderStatus === '배달 시작') {
        const { orderId, userAddress, deliveryReq, orderQuantity, orderStatus } = order;
        const { menuImg, menuName, menuPrice } = order.Menu;
        const totalPrice = menuPrice * orderQuantity;

        let temp_html = `<div class="order-list">
                                 <div class="order-tag">
                                    <div class="menu-img">
                                      <img src="${menuImg}">
                                    </div>
                                    <div class="menu-name">
                                        <p class="menu-name-name">${menuName}</p>
                                        <div class="address">
                                            <p class="user-address">${userAddress}</p>
                                        </div>
                                    </div>
                                    <div class="order-req">
                                        <p>${deliveryReq}</p>
                                    </div>
                                    <div>
                                    <p>오더상태: ${orderStatus}</p>
                                    <p>수량: ${orderQuantity}</p>
                                    <p>총액: ${totalPrice}</p>
                                    </div>
                                    <div class="button-container">
                                      <button id="delivery-startBtn" class="order-approval" data-orderId=${orderId}>Delivery Start</button>
                                     <button id="delivery-completedBtn" class="order-refusal" data-orderId=${orderId}>Delivery completed</button>
                                    </div>
                                </div>
                            </div>`;

        $('.flow-2').append(temp_html);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

// 오더 상태 승인
const orderApproval = async event => {
  try {
    if (event.target.id === 'order-ApprovalBtn') {
      const req = { orderStatus: '주문 승인' };
      let result = await fetch(`/api/orders/${event.target.dataset.orderid}/change`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      result = await result.json();
      alert(result.message);
      window.location.reload();
    }
  } catch (error) {
    alert(error);
  }
};
// 오더 상태 거절
const orderRefuse = async event => {
  try {
    if (event.target.id === 'order-RefuseBtn') {
      const req = { orderStatus: '주문 거절' };
      let result = await fetch(`/api/orders/${event.target.dataset.orderid}/change`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      result = await result.json();
      alert(result.message);
      window.location.reload();
    }
  } catch (error) {
    alert(error);
  }
};
// 오더 상태 배달 시작
const deliveryStart = async event => {
  try {
    if (event.target.id === 'delivery-startBtn') {
      const req = { orderStatus: '배달 시작' };
      let result = await fetch(`/api/orders/${event.target.dataset.orderid}/change`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      result = await result.json();
      alert(result.message);
      window.location.reload();
    }
  } catch (error) {
    alert(error);
  }
};
// 오더 상태 배달 완료
const deliveryCompleted = async event => {
  try {
    if (event.target.id === 'delivery-completedBtn') {
      const req = { orderStatus: '배달 완료' };
      let result = await fetch(`/api/orders/${event.target.dataset.orderid}/change`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });
      result = await result.json();
      alert(result.message);
      window.location.reload();
    }
  } catch (error) {
    alert(error);
  }
};

const body = document.getElementsByTagName('body')[0];

body.addEventListener('click', orderApproval);
body.addEventListener('click', orderRefuse);
body.addEventListener('click', deliveryStart);
body.addEventListener('click', deliveryCompleted);
