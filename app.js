// navigaation responsiveness
bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
};

// scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } // else {entry.target.classList.remove('show');}
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// generating the shop items

let shop = document.getElementById('shop');


// basket stores selected items
let basket = JSON.parse(localStorage.getItem("data")) || []


//generates card in shop usig html and array
let generateShop = () => {
    return (shop.innerHTML= shopItemsData.map((x)=>{
        let {id, brand, name, price, img} = x;
        let search = basket.find((x) => x.id === id) || []
        return `
        <div id=product-id-${id} class="pro">
                    <img src=${img} alt="">
                    <div class="des">
                        <h5>${name}</h5>
                        <h4>R ${price}</h4>
                    </div>
    
                    <div class="buttons">
                        <span onclick="decrement(${id})" class="minus">-</span>
                        <div id=${id} class="quatinty">
                        ${search.item === undefined? 0: search.item}
                        </div>
                        <span onclick="increment(${id})" class="plus">+</span>
                    </div>
                </div>
        `
    }).join(""));
};

generateShop();


// shows using id which item is seleted
let increment = (id) => {
    let selectedItem = id;
//checking if id exists in basket
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    
    //console.log(basket);
    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;

    //checking if id exists in basket
        let search = basket.find((x) => x.id === selectedItem.id);

        if(search === undefined) return
        else if(search.item === 0) return;
        else {search.item -= 1;}

        update(selectedItem.id);
        basket = basket.filter((x) => x.item !== 0);
        //console.log(basket);
        

        localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};
//adding all numbers and display in cart
let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}
calculation()