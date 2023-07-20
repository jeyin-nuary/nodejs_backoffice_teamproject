
        
        $(document).ready(function () {
            header();
        });

        function header() {
            $("#header").load("../public/header.html");   
        }

        function search() { 
            async() => {
                console.log("test");
                try {
                    let search = $('#sbar1').val();
                    $('#mycardindex').empty()
                     await fetch(`/api/menus/${search}`).then( res => res.json()).then(data => {
                        let rows = data['result']
                        $('#mycardindex').empty()
                        rows.forEach((a) => {
                            let store = a['storeId']
                            let menuName = a['menuName']
                            let menuimage = a['menuUrl']
                            let menuPrice = a['menuPrice']
        
                            let temp_html = `<div class="col">
                                                    <div class="card">
                                                        <img src="${menuimage}" class="card-img-top" alt="...">
                                                        <div class="card-body">
                                                        <h5 class="${menuName}"></h5>
                                                        <p class="${menuPrice}"></p>
                                                        </div>
                                                    </div>
                                                </div>`
        
                            $('#cards-box').append(temp_html)
                            })
                        })
                }
                catch(error)
                {
                    console.error(error);
                }
            }
        }
        