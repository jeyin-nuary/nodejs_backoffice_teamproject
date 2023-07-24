// $(document).ready(function() {});

// async function search() {
//     let search = $('#sbar1').val();
//             $('#mycardindex').empty()
//             await fetch(`http://localhost:5500/api/menus/${search}`,)
//             .then(data => {
//                 console.log(rows);
//                 let rows = data[menuId]
//                 $('#mycardindex').empty()
//                 rows.forEach((a) => {
//                     let menuName = a['menuName']
//                     let menuimage = a['menuUrl']
//                     let menuPrice = a['menuPrice']

//                     let temp_html = `<div class="col">
//                                             <div class="card">
//                                                 <img src="${menuimage}" class="card-img-top" alt="...">
//                                                 <div class="card-body">
//                                                 <h5 class="${menuName}"></h5>
//                                                 <p class="${menuPrice}"></p>
//                                                 </div>
//                                             </div>
//                                         </div>`

//                     $('#cards-box').append(temp_html)
//                     })
//                 })
// }

// function search() {
//     fetch(`http://localhost:5500/api/menus/${search}`).then(res => res.json()).then(data => {
//         let rows = data['result']

//         rows.forEach((menu) => {
//             let menuName = menu['menuName']
//             let menuimage = menu['menuUrl']
//             let menuPrice = menu['menuPrice']

//             let temp_html = `<div class="col">
//                                     <div class="card">
//                                         <img src="${menuimage}" class="card-img-top" alt="...">
//                                         <div class="card-body">
//                                         <h5 class="${menuName}"></h5>
//                                         <p class="${menuPrice}"></p>
//                                         </div>
//                                     </div>
//                                 </div>`

//             $('#mycardindex').append(temp_html)
//         })
//     })
// }

async function search() {
  let search = $('#sbar1').val();
  const response = await fetch(`/api/menus/${search}`);
  const searchmenu = await response.json();
  console.log(searchmenu);

  $('#cards-box').empty();
  searchmenu['data'].forEach(menu => {
    let menuName = menu['menuName'];
    let menuimage = menu['menuUrl'];
    let menuPrice = menu['menuPrice'];

    if (!menuimage) {
      menuimage =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYGiXWUoHJNsqynR_l5uxpT01-bV5K0uy6Ox93GRaAHSscsgv7O44L9P5jj9FfEXI1S54&usqp=CAU';
    }

    let temp_html = `<div class="col">
                        <div class="card">
                            <img src="${menuimage}" class="card-img-top"/>
                            <div class="card-body">
                            <h5 class="card-title">${menuName}</h5>
                            <p class="card-text">${menuPrice}</p>
                            </div>
                        </div>
                    </div>`;

    $('#cards-box').append(temp_html);
  });
}
