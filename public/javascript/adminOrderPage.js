$(document).ready(() => {
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
      console.log(orders);

      orders.forEach(order => {
        if (order.orderStatus === '주문 등록') {
          const { userAddress, deliveryReq, orderQuantity, orderStatus } = order;
          const { menuImg, menuName, menuPrice } = order.Menu;
          const totalPrice = menuPrice * orderQuantity;

          const temp_html = `<div class="order-list">
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
                                        <button id="OrderApprovalBtn" class="order-approval">Order Approval</button>
                                        <button class="order-refusal">Order Refuse</button>
                                    </div>
    
                                </div>
                            </div>`;

          $('.flow').append(temp_html);
        } else if (order.orderStatus === '주문 승인' || order.orderStatus === '배달 시작') {
          const { userAddress, deliveryReq, orderQuantity, orderStatus } = order;
          const { menuImg, menuName, menuPrice } = order.Menu;
          const totalPrice = menuPrice * orderQuantity;

          const temp_html = `<div class="order-list">
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
                                      <button class="order-approval">Delivery Start</button>
                                     <button class="order-refusal">Delivery completed</button>
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

  getOrders();
});
