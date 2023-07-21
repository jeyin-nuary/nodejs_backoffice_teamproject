$(document).ready(() => {
  getStore();
});
// url에서 storeId 가져오기
const getStoreIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('storeId');
};
const storeId = getStoreIdFromUrl();

// 서버로부터 데이터를 받아와서 붙여주는 함수
const getStore = async () => {
  const response = await fetch(`/api/stores/${storeId}`);
  const orders = await response.json();
  // 가게 정보 붙여주기
  try {
    let { storeAddress, storeName, storeRating, storeUrl } = orders;
    if (!storeUrl) {
      storeUrl =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGiXWUoHJNsqynR_l5uxpT01-bV5K0uy6Ox93GRaAHSscsgv7O44L9P5jj9FfEXI1S54&usqp=CAU';
    }

    const storeTitle = document.getElementById('store-name');
    $('.first-container').empty();
    storeTitle.innerText = `${storeName}`;
    let temp_html = `<div class="first-div">
                        <div class="store-img">
                            <img
                                src="${storeUrl}">
                            </div>
                        <div class="store-desc">
                            <a href="${storeAddress}">${storeAddress}</a>
                            <p>Rate: ${storeRating}</p>
                        </div>
                    </div>`;
    $('.first-container').append(temp_html);
  } catch (error) {
    console.error(error);
  }

  try {
    // 메뉴 목록 붙여주기
    orders['Menus'].forEach(item => {
      let { menuName, menuImg, menuPrice, menuInFo } = item;
      if (!menuImg) {
        menuImg =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGiXWUoHJNsqynR_l5uxpT01-bV5K0uy6Ox93GRaAHSscsgv7O44L9P5jj9FfEXI1S54&usqp=CAU';
      }
      let temp_html = `<div class="menu-container">
                            <div class="menuinfo">
                                <div class="menu-img">
                                    <img src="${menuImg}">
                                </div>
                                <div class="menu-info-container">
                                        <div class="menu-name">
                                            <p>${menuName}</p>
                                        </div>
                                        <div class="menu-price">
                                            <p>Price: ${menuPrice}</p>
                                        </div>
                                    </div>
                                    <div class="menu-desc">
                                        <p>${menuInFo}</p>
                                    </div>
                                </div>
                            </div>
                            </div>`;

      $('.second-container').append(temp_html);
    });
  } catch (error) {
    console.log(error);
  }
};

const orderListBtn = document.getElementById('order-listBtn');
orderListBtn.addEventListener('click', () => {
  location.href = `/stores/${storeId}/orders`;
});
