// Get elements
const label = document.getElementById('label');
const shoppingCart = document.getElementById('shopping-cart');
const cartIcon = document.getElementById("cartAmount");

// Retrieve basket data from localStorage
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Update cart icon count
const updateCartIcon = () => {
    const itemCount = basket.reduce((total, item) => total + item.item, 0);
    cartIcon.innerHTML = itemCount;
};
updateCartIcon();

// Generate cart items
const generateCartItems = () => {
    if (basket.length !== 0) {
        shoppingCart.innerHTML = basket.map(({ id, item }) => {
            const product = shopItemsData.find(product => product.id === id) || {};
            const { img, name, price } = product;
            return `
            <div class="cart-item">
                <img width="120" src=${img} alt="${name}" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">R ${price}</p>
                        </h4>
                    </div>
                    <div class="buttons">
                        <span onclick="changeItemQuantity(${id}, 'decrement')" class="minus">-</span>
                        <div id=${id} class="quantity">${item}</div>
                        <span onclick="changeItemQuantity(${id}, 'increment')" class="plus">+</span>
                    </div>
                    <h3>R ${item * price}</h3>
                    <span onclick="removeItem(${id})" class="i-x">X</span>
                </div>
            </div>`;
        }).join('');
    } else {
        shoppingCart.innerHTML = '';
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="shop.html">
            <button class="HomeBtn">Back to home</button>
        </a>`;
    }
};

generateCartItems();

// Change item quantity
const changeItemQuantity = (id, action) => {
    const product = basket.find(item => item.id === id);

    if (!product) return;

    if (action === 'increment') {
        product.item += 1;
    } else if (action === 'decrement' && product.item > 0) {
        product.item -= 1;
    }

    basket = basket.filter(item => item.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    updateCartIcon();
    updateTotalAmount();
};

// Remove item from cart
const removeItem = (id) => {
    basket = basket.filter(item => item.id !== id);
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    updateCartIcon();
    updateTotalAmount();
};

// Clear cart
const clearCart = () => {
    basket = [];
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    updateCartIcon();
    updateTotalAmount();
};

// Update total amount
const updateTotalAmount = () => {
    if (basket.length !== 0) {
        const total = basket.reduce((sum, { id, item }) => {
            const product = shopItemsData.find(product => product.id === id) || {};
            return sum + (item * product.price);
        }, 0);
        label.innerHTML = `
        <h2>Subtotal: R${total}</h2>
        <button class="checkout">CHECKOUT</button>
        <br>
        <button onclick="clearCart()" class="removeAll">Clear cart</button>`;
    } else {
        label.innerHTML = '';
    }
};

updateTotalAmount();
