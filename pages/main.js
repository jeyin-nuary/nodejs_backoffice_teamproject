

        
        $(document).ready(function () {
            header();
        });

        function header() {
            $("#header").load("../public/header.html");   
        }

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
                const response = await fetch(`http://localhost:5500/api/menus/${search}`);
                const searchmenu =await response.json();
                $('#cards-box').empty()
                searchmenu["data"].forEach((menu) => {
                                        let menuName = menu['menuName']
                                        let menuimage = menu['menuUrl']
                                        let menuPrice = menu['menuPrice']
                    
                                        let temp_html = `<div class="col">
                                            <div class="card">
                                                <img src="${menuimage}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                <h5 class="card-title">${menuName}</h5>
                                                <p class="card-text">${menuPrice}</p>
                                                </div>
                                            </div>
                                        </div>`
                    
                                        $('#cards-box').append(temp_html)
                                        })
                                    
                 
        }


        

        