// Navigation responsiveness
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Generating the shop items
const shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
    shop.innerHTML = HomepageItemsData.map(({ id, brand, name, price, img }) => {
        const search = basket.find(item => item.id === id) || {};
        const itemCount = search.item || 0;
        return `
            <div id="product-id-${id}" class="pro">
                <img src=${img} alt="${name}">
                <div class="des">
                    <h5>${name}</h5>
                    <h4>R ${price}</h4>
                </div>
                <div class="buttons">
                    <span onclick="decrement(${id})" class="minus">-</span>
                    <div id="${id}" class="quantity">${itemCount}</div>
                    <span onclick="increment(${id})" class="plus">+</span>
                </div>
            </div>`;
    }).join("");
};

generateShop();

const update = (id) => {
    const search = basket.find(item => item.id === id);
    if (search) {
        document.getElementById(id).innerHTML = search.item;
        calculation();
    }
};

const increment = (id) => {
    let selectedItem = basket.find(item => item.id === id);

    if (selectedItem) {
        selectedItem.item += 1;
    } else {
        basket.push({ id, item: 1 });
    }

    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

const decrement = (id) => {
    let selectedItem = basket.find(item => item.id === id);

    if (selectedItem) {
        if (selectedItem.item > 1) {
            selectedItem.item -= 1;
        } else {
            basket = basket.filter(item => item.id !== id);
        }

        update(id);
        localStorage.setItem("data", JSON.stringify(basket));
    }
};

const calculation = () => {
    const cartIcon = document.getElementById("cartAmount");
    const totalItems = basket.reduce((sum, item) => sum + item.item, 0);
    cartIcon.innerHTML = totalItems;
};

calculation();
