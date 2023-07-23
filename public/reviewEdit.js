// url에서 storeId 가져오기
const getStoreIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('storeId');
};
const getReviewIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('reviewId');
};

const storeId = getStoreIdFromUrl();
const reviewId = getReviewIdFromUrl();

// 리뷰 작성
const editReview = async () => {
  try {
    // html요소 벨류값 가져오기
    const reviewContent = document.getElementById('review-content').value;
    let reviewRating = document.getElementById('star').value;
    const reviewUrl = document.getElementById('review-img').value;

    if (reviewRating === '-- 선택하기 --') {
      reviewRating = 0;
    }

    const req = { reviewContent, reviewUrl, reviewRating, storeId };

    const res = await fetch(`api/stores/${storeId}/reviews/${reviewId}`, {
      method: 'PATCH',
      body: JSON.stringify(req),
      headers: { 'Content-Type': 'application/json' },
    });
    const message = await res.json();

    if (message.message) {
      // 정상적으로 리뷰가 등록되었으면 확인 메세지를 응답하고,
      // 가게 상점 페이지로 넘어갑니다.
      alert(message.message);
      window.location.href = `/stores/${storeId}`;
    } else {
      alert(message.errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
};
// 리뷰 작성 버튼 이벤트 지정
const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', editReview);
// 뒤로가기 버튼 이벤트 지정
const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', () => {
  location.href = `/stores/${storeId}`;
});
