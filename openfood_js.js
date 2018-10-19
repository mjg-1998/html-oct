window.onload = function () {


    const shoppingKart=[];
    const inMyFridge=[];

    const displayFoodTable = (food, container) => {
        container.innerHTML+="<article class=card > " +
            "<img class=card-img-top src=\""+food.image_small_url+"\"  >"+'' +
            '<div class=card-body><h5 class=card-title>'+food.product_name
            +'</h5>' +
            '<a href="#" class="btn btn-info " id='+food._id+'pr ><i class="fas fa-shopping-basket"></i> Dans mon frigo!</a> ' +
            '<a href="#" class="btn btn-info" id='+food._id+'sc><i class="fas fa-cart-plus"></i> J\'en veux!</a>' +
            '</div></article>';
        let selector=food._id+'pr';
        let selec=food._id+'sc';
        document.getElementById(selector).addEventListener('click', function (e) {
            addtoFridge(food);
        }) ;
        document.getElementById(selec).addEventListener('click', function (e) {
            addToShoppingKart(food);
        }) ;
    };

    const displayShoppingTable = (food, container) => {
        container.innerHTML+="<article class=card > " +
            "<img class=card-img-top src=\""+food.image_front_small_url+"\" >"+'' +
            '<div class=card-body><h5 class=card-title>'+food.product_name
            +'</h5>' +
            '<a href="#" class="btn btn-danger " id='+food._id+'pr ><i class="fas fa-trash-alt"></i></a> ' +
            '<a href="#" class="btn btn-info " id='+food._id+'fr >Mettre au frigo</a> ' +
            '</div></article>';
        let selector=food._id+'pr';
        let select=food._id+'fr';
        document.getElementById(selector).addEventListener('click', function (e) {
            getOutOfKart(food);
        }) ;
        document.getElementById(select).addEventListener('click', function (e) {
            getOutOfKart(food);
            addtoFridge(food);
        }) ;
    };


    const displayFridgeTable = (food, container) => {
        container.innerHTML+="<div class=card > " +
            "<img class=card-img-top src=\""+food.image_front_small_url+"\" >"+'' +
            '<div class=card-body><h5 class=card-title>'+food.product_name
            +'</h5>' +
            '<a href="#" class="btn btn-danger " id='+food._id+'pr ><i class="fas fa-trash-alt"></i></a> ' +
            '</div></div>';
        let selector=food._id+'pr';
        document.getElementById(selector).addEventListener('click', function (e) {
            getOutOfFridge(food);
        }) ;
    };
    const addtoFridge = (food) => {
        if( inMyFridge.indexOf(food)=== -1) {
            inMyFridge.push(food);
            document.querySelector("#message").innerHTML=
                "<div class='alert alert-success' role='alert'>Produit ajouté au frigo !!</div>"
            ;
        }
        else {
            document.querySelector("#message").innerHTML=
                "<div class='alert alert-danger' role='alert'>Vous avez déjà ce produit dans votre frigo !!</div>"
            ;
        }
    };
    const openFridge = () => {
        const fridge = document.querySelector("#fridge");
        if(inMyFridge.length==0) fridge.innerHTML="Vous n'avez encore rien dans votre frigo....";
        else fridge.innerHTML="";
        for (let idx = 0; idx < inMyFridge.length; idx++) {
            let row = fridge.lastChild;
            if (idx % 3 == 0) {
                row = fridge.appendChild((document.createElement("div")));
                row.className = "row";
            }
            else {
                ;
            }
            let col = row.appendChild((document.createElement("article")));
            col.className = "col";
            displayFridgeTable(inMyFridge[idx], col);


        }
    };



    const findManyByName = () => {
        const name= document.querySelector('#rechercheProduit')['nomProduit'].value;
        const url = "https://world.openfoodfacts.org/cgi/search.pl?search_terms=" + name + "&search_simple=1&action=process&json=1&page_size=51";

        let req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            let prods = [];
            let data = JSON.parse(this.response);

            const basket = document.querySelector("#resultSearch");

            (data.products).forEach(food => {
                    prods.push(food);

                }
            );
            for (let idx = 0; idx < prods.length; idx++) {
                let row=basket.lastChild;
                if(idx%3 == 0 ){ row = basket.appendChild((document.createElement("div")));
                    row.className = "row";}
                else {
                    ;
                }
                let col=row.appendChild((document.createElement("div")));
                col.className="col";
                displayFoodTable(prods[idx],col);


            }
        };
        req.send();
    };


    const getOutOfFridge= (food) => {
        for(let index=0;index<inMyFridge.length;index++) {
            if(inMyFridge[index]==food) {
                inMyFridge.splice(index,1);
                openFridge();

            }
        }
    };

    const getOutOfKart = (food) => {
        for(let index=0;index<shoppingKart.length;index++) {
            if(shoppingKart[index]==food) {
                shoppingKart.splice(index,1);
                openShoppingKart();

            }
        }
    };


    const addToShoppingKart = (food) => {
        if( shoppingKart.indexOf(food)=== -1) {
            shoppingKart.push(food);
            document.querySelector("#message").innerHTML=
                "<div class='alert alert-success' role='alert'>Produit ajouté à la liste !!</div>"
            ;
        }
        else {
            document.querySelector("#message").innerHTML=
                "<div class='alert alert-danger' role='alert'>Vous avez déjà ajouté ce produit dans votre liste !!</div>"
            ;
        }
    };


    const openShoppingKart = () => {
        const scart = document.querySelector("#shoppingkart");
        if(shoppingKart.length==0) scart.innerHTML="Vous n'avez encore rien dans votre liste....";
        else scart.innerHTML="";
        for (let idx = 0; idx < shoppingKart.length; idx++) {
            let row = scart.lastChild;
            if (idx % 3 == 0) {
                row = scart.appendChild((document.createElement("div")));
                row.className = "row";
            }
            else {
                ;
            }
            let col = row.appendChild((document.createElement("article")));
            col.className = "col";
            displayShoppingTable(shoppingKart[idx], col);


        }
    };

    document.querySelector("#nav-frigo-tab").addEventListener('click', function (e) {
        openFridge();
    }) ;
    document.querySelector("#nav-listeCourse-tab").addEventListener('click', function (e) {
        openShoppingKart();
    }) ;
    document.querySelector("#search").addEventListener('click', function (e) {
        document.querySelector("#resultSearch").innerHTML="";
        findManyByName();
    })

};