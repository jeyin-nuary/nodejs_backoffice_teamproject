// 브라우저에 동적으로 표시하기 위해 파일을 만들었습니다. 저희는 ejs를 쓰지 않기에 render가 아닌 fetch로 연결했습니다.

// storeLists 변수 선언 한뒤 storeList.html 파일에 id값이 storeLists 값을 찾고 storeLists 변수에 담음
const storeLists = document.getElementById('storeLists');
// 밑에 fetchStoreLists 함수에 있는 데이터를 가져올려고 호출
fetchStoreLists();

// API 에서 가게 목록 데이터를 가져오는 함수
async function fetchStoreLists() {
  try {
    const response = await fetch('/api/storelists'); // 이 부분 fetch를 통해 API를 가져옴
    const { data } = await response.json(); // 가져온 데이터를 json형식으로 반환
    // store(파라미터)로 각 가게들 정보를 담아서 foreach를 통해 차례대로 돌아감
    data.forEach(store => {
      if (store.storeUrl == 'NULL') {
        // 아래의 += 를 통해 계속 더해짐
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
