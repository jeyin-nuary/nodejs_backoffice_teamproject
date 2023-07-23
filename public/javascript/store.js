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
                            <a href="${storeAddress}">${storeName} 메인 페이지 바로가기</a>
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

  // 리뷰 붙여주기
  try {
    orders.Reviews.forEach(item => {
      let { reviewContent, reviewUrl, reviewId } = item;

      const { nickname } = item.User;
      if (!reviewUrl) {
        reviewUrl =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGiXWUoHJNsqynR_l5uxpT01-bV5K0uy6Ox93GRaAHSscsgv7O44L9P5jj9FfEXI1S54&usqp=CAU';
      }

      let temp_html = ` <div class="review">
                        <div class="review-img">
                            <img src="${reviewUrl}">
                        </div>
                        <div class="review-content">
                            <div class="review-nickname">
                                <p>${nickname}</p>
                            </div>
                            <div class="review-nickname">
                                <p>${reviewContent}</p>
                            </div>
                        </div>

                        <div class="review-btn">
                            <button id="edit-btn" data-reviewId=${reviewId} class="add-menuBtn">리뷰 수정</button>
                            <button id="del-btn" data-reviewId=${reviewId} class="add-menuBtn">리뷰 삭제</button>
                        </div>
                    </div>`;
      $('.review-form').append(temp_html);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    // 리뷰 수정 페이지로 넘어가는 함수
    const moveEditRivew = async reviewId => {
      location.href = `/stores/${storeId}/reviews/${reviewId}`;
    };

    // 리뷰 아이디를 매개변수로 삽입해서  moveEditRivew함수 호출
    const editbutton = document.querySelectorAll('#edit-btn');
    editbutton.forEach(button => {
      button.addEventListener('click', () => {
        const reviewId = button.getAttribute('data-reviewId');
        moveEditRivew(reviewId);
      });
    });
  } catch (error) {
    console.log(error);
  }

  // 리뷰 삭제 함수
  const deleteReview = async reviewId => {
    const response = await fetch(`/api/stores/${storeId}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    const message = await response.json();
    if (message.message) {
      alert(message.message);
      location.reload();
    } else {
      alert(message.errorMessage);
    }
  };

  try {
    // 리뷰 삭제 아이디를 매개변수로 삽입해서 deleteRivew함수 호출
    const delButton = document.querySelectorAll('#del-btn');
    delButton.forEach(button => {
      button.addEventListener('click', () => {
        const reviewId = button.getAttribute('data-reviewId');
        deleteReview(reviewId);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// (사장) 주문 목록 상세 페이지로 이동하는 버튼 이벤트 지정
const orderListBtn = document.getElementById('order-listBtn');
orderListBtn.addEventListener('click', () => {
  location.href = `/stores/${storeId}/orders`;
});

// 리뷰 작성 페이지로 넘어가는 버튼 이벤트 지정
const moveReviewPage = document.getElementById('review-add');
moveReviewPage.addEventListener('click', () => {
  location.href = `/stores/${storeId}/reviews`;
});

// 메뉴 등록 페이지로 이동
document.getElementById('menuCrPgBtn').addEventListener('click', function() {
  window.location.href = `menuCr.html?storeId=${storeId}`;
});

// 메뉴 수정 페이지로 이동
document.getElementById('menuMdPgBtn').addEventListener('click', function() {
  window.location.href = `menuDetail.html?storeId=${storeId}`;
});
