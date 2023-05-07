let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


//updating basket
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}
calculation()

let generateCartItems = () => {
    if (basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img, name, price} = search
            return `
            <div class="cart-item">
                <img width="120" src=${img} alt=""/>

                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-prie">R ${price}</p>
                        </h4>
                        
                    </div>

                    <div class="buttons">
                        <span onclick="decrement(${id})" class="minus">-</span>

                        <div id=${id} class="quatinty">
                        ${item}</div>

                        <span onclick="increment(${id})" class="plus">+</span>
                        
                    </div>

                    <h3>
                    R ${item * search.price}
                    </h3>

                    <span onclick="removeItem(${id})" class="i-x">X</span>

                </div>
            </div>
            `;
        }).join(''));
    }
    else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="shop.html">
        <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
};

generateCartItems();


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
    
    generateCartItems();
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
        generateCartItems();
        localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id)=>{
    let selectedItem = id
    //console.log(selectedItem.id);
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

}

let totalAmount = ()=>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) => x + y, 0);
        //console.log(amount)
        label.innerHTML = `
        <h2>Subtotal : R${amount}</h2>
        <button class="checkout">CHECKOUT</button>
        <br>
        <button onclick="clearCart()" class="removeAll">Clear cart</button>
        `;
    } else return
}

totalAmount();