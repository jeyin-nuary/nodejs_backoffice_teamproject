const storeLists = document.getElementById('storeLists');

fetchStoreLists();

// 가게 목록 데이터를 가져오는 함수
async function fetchStoreLists() {
  try {
    const response = await fetch('/api/storelists');
    const { data } = await response.json();

    data.forEach(store => {
      if (store.storeUrl == 'NULL') {
        storeLists.innerHTML += `
      <div class="card mb-5">
  <div class="card-header">
   평점: ${'★'.repeat(store.storeRating)}
  </div>
  <div class="card-body">
    <h5 class="card-title">가게이름: ${store.storeName}</h5>
    <p class="card-text">주소: ${store.storeAddress}</p>
    <p>가게등록일: ${new Date(store.createdAt).toLocaleDateString()}</p>
    <a href="#" onclick="alert('등록된 주소가 없습니다!')" class="btn btn-primary">사이트 이동하기</a>
  </div>
</div>
      `;
      } else {
        storeLists.innerHTML += `
        <div class="card mb-5">
    <div class="card-header">
     평점: ${'★'.repeat(store.storeRating)}
    </div>
    <div class="card-body">
      <h5 class="card-title">가게이름: ${store.storeName}</h5>
      <p class="card-text">주소: ${store.storeAddress}</p>
      <p>가게등록일: ${new Date(store.createdAt).toLocaleDateString()}</p> 
      <a href=" ${store.storeUrl}" class="btn btn-primary">사이트 이동하기</a>
    </div>
  </div>
        `;
      }
    });
  } catch (error) {
    console.error('Error fetching store lists:', error);
  }
}
