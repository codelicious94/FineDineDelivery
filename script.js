let recipes = [
    {
        "Category": "Salate",
        "Image": "./img/salad.jpg",
        "Dishes": [
            {
                "Titel": "Gemischter Salat",
                "Description": "Zubereitet mit Eisbergsalat, Tomaten, Gurken, Zwiebeln, Rucola, Karotten und Rotkohl",
                "Preis": "12.00"
            },
            {
                "Titel": "Griechischer Salat",
                "Description": "Zubereitet mit Feta, Eisbergsalat, Tomaten und Rucola",
                "Preis": "14.90"
            },
            {
                "Titel": "Caprese-Salat",
                "Description": "Zubereitet mit Mozzarella, Tomaten, Balsamico und Olivenöl",
                "Preis": "18.90"
            },
            {
                "Titel": "Caesar-Salat",
                "Description": "Zubereitet mit Pouletstreifen(CH), Eisbergsalat, Tomaten, Gurken, Rucola und Karotten",
                "Preis": "24.90"
            }
        ]
    },
    {
        "Category": "Vorspeisen",
        "Image": "./img/starter.jpg",
        "Dishes": [
            {
                "Titel": "Bündnerfleisch Carpaccio",
                "Description": "Zubereitet mit Bündnerfleisch, Doppelhartkäse, Estragon, Balsamico, Olivenöl, Walnüsse und eingelegte Eierschwämmli",
                "Preis": "14.90"
            },
            {
                "Titel": "Avocado-Lachs-Brötli (6 Stk.)",
                "Description": "Zubereitet mit Rauchlachs, Avocado, Frischkäse, Limettensaft, Steinofenbrot fein geschnitten und Granatapfel",
                "Preis": "21.90"
            },
            {
                "Titel": "Crostini mit Räucherlachs und Kaviar (6 Stk.)",
                "Description": "Zubereitet mit Rauchlachs, Schmand, Limettensaft, Steinofenbrot fein geschnitten und Kaviar",
                "Preis": "36.50"
            }
        ]
    },
    {
        "Category": "Steaks",
        "Image": "./img/steaks.jpg",
        "Dishes": [
            {
                "Titel": "Rindshuftsteak",
                "Description": "Zubereitet mit Huftsteak vom Schweizer Rind (ca.400g), Pommes-Frites und Kreuterbutter",
                "Preis": "38.90"
            },
            {
                "Titel": "T-Bone Steak",
                "Description": "Zubereitet mit T-Bone Steak vom Schweizer Rind (ca.650g), Pommes-Frites und Kreuterbutter",
                "Preis": "42.90"
            },
            {
                "Titel": "Wagyu Steak",
                "Description": "Zubereitet mit Wagyu (ca. 250g), Ofenkartoffeln und Gemüse",
                "Preis": "54.90"
            }
        ]
    },
    {
        "Category": "Dessert",
        "Image": "./img/dessert.jpg",
        "Dishes": [
            {
                "Titel": "Tiramisu",
                "Description": "Zubereitet mit starkem Kaffee, frischen Eiweiss, Mascarpone, Zitrone, Zucker, Orangenlikör und Amaretto",
                "Preis": "12.90"
            },
            {
                "Titel": "Mousse au Chocolat",
                "Description": "Zubereitet mit dunkler Schokolade, frischen Eigelb, Vollrahm und Zucker",
                "Preis": "14.90"
            },
            {
                "Titel": "Crème Brûlée",
                "Description": "Zubereitet mit Milch, Sahne, frischen Eigelb, Vanilleschote und Zucker",
                "Preis": "17.90"
            }
        ]
    }
];

window.onload = function() {
    loadRecipes();
    render();
    renderTotalItems();
    adjustSidebarPosition();
};

window.onscroll = function() {
    adjustSidebarPosition();
};

function render() { 
    let dishcontainer = document.getElementById('dishcontainer');
    dishcontainer.innerHTML = ''; 

    for (let i = 0; i < recipes.length; i++) { 
        let recipeList = recipes[i];
        let categoryId = recipeList.Category.toLowerCase();
            dishcontainer.innerHTML += showDishes(recipeList, categoryId);

        for (let j = 0; j < recipeList.Dishes.length; j++) {
            dishcontainer.innerHTML += renderDishes(i, j);
        }
    }
    renderBasket();
    renderPrice();  
}

function showDishes(recipeList, categoryId) {
    return /*HTML*/ `   
    <div class="category" id="${categoryId}">
        <div class="category-image-container">
            <img src="${recipeList.Image}" class="category-image">
        </div>
        <h2>${recipeList.Category}</h2>
    </div>
    `;
}

function renderDishes(i, j) {  
    let elements = recipes[i].Dishes[j];
    return /*HTML*/ `
        <div class="dish">
            <div class="add-dish">
                <h3>${elements.Titel}</h3>
                <img class="add-dish-button" onclick="addToBasket(${i},${j})" src="./img/add-dish.png" alt="Add-Dish">
            </div>
            <p>${elements.Description}</p>
            <p id="price${i}${j}"><b>Preis: ${elements.Preis} CHF</b></p>
        </div>`;
}

let food = [];
let prices = [];
let amount = [];

function addToBasket(i, j) { 
    let dish = recipes[i].Dishes[j];
    let index = food.findIndex(item => item.Titel === dish.Titel);
    if (index === -1) {
        food.push(dish); 
        prices.push(parseFloat(dish.Preis)); 
        amount.push(1);
    } else {
        amount[index]++;
    }
    saveRecipes();
    renderBasket();
    renderPrice();
    renderTotalItems();
}

function renderBasket() {  
    let shoppingCart = document.getElementById('basket');
    shoppingCart.innerHTML = /*HTML*/ `
        <div class="basket-title">
            <h2>Warenkorb</h2>
            <img onclick="cancelButton()" class="cancel-button" src="./img/cancel.png" alt="cancel-button">
        </div>
    `;

    if (food.length === 0) {
        shoppingCart.innerHTML += showEmptyBasket();
    } else {
        for (let i = 0; i < food.length; i++) {
            shoppingCart.innerHTML += showFilledBasket(i);
        }
        renderPrice();
    }
}

function openBasketButton() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('d-none');
    sidebar.classList.add('d-block');
}

function cancelButton() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('d-block');
    sidebar.classList.add('d-none');
}

function showEmptyBasket() {
    return /*HTML*/ `
    <div class="basket-choose">
        <img class="basket-logo" src="./img/basket.png" alt="Basket">
        <p>Wähle leckere Gerichte aus der Speisekarte und bestelle Dein Menü.</p>
    </div>
`;
}

function showFilledBasket(i) {
    return /*HTML*/ `
    <div class="food-on-basket">
        <h3>${food[i].Titel}</h3>
        ${renderBasket2(i)}
        <p>${(prices[i] * amount[i]).toFixed(2)} CHF</p>
    </div>
    `;
}

function renderBasket2(i) { 
    return /*HTML*/`
        <div class="filledShoppingCartAddRemoveAmountContainer">
            <div class="filledShoppingCartRemoveContainer">
                <img class="amount-icons" onclick="decreaseAmount(${i})" src="./img/minus.png" alt="Entfernen">
            </div>
            <div class="filledShoppingCartSeccondAmoundContainer">
                <p>${amount[i]}</p>
            </div>
            <div class="filledShoppingCartAddContainer">
                <img class="amount-icons" onclick="increaseAmount(${i})" src="./img/add-dish.png" alt="Hinzufügen">
            </div>
        </div>`;
}

function renderPrice() {
    let subtotal = 0;
    for (let i = 0; i < prices.length; i++) {
        subtotal += prices[i] * amount[i];
    }
    let total = subtotal; 

    let priceContainer = document.getElementById('price-container');
    if (!priceContainer) {
        priceContainer = document.createElement('div');
        priceContainer.id = 'price-container';
        document.getElementById('basket').appendChild(priceContainer);
    }

    priceContainer.innerHTML = showPrice(subtotal, total, priceContainer); 
}

function showPrice(subtotal, total, priceContainer) { 
    return /*HTML*/ `
    <div class="price-details">
        <div class="price-details-position">
            <p><b>Zwischensumme:</b></p>
            <p><b>${subtotal.toFixed(2)} CHF</b></p>
        </div>
        <div class="price-details-position">
            <p><b>Lieferkosten:</b></p>
            <p><b>Kostenlos</b></p>
        </div>
        <div class="price-details-position">
            <p><b>Gesamtpreis:</b></p>
            <p><b>${total.toFixed(2)} CHF</b></p>
        </div>
        <div class="basket-button" id="order-button" onclick="orderButton()">
        <button class="btn btn-primary">Bestellen</button>
        </div>
    </div>
`;
}

function toggleOrderButton() {
    let orderButton = document.getElementById('order-button');
    if (food.length > 0) {
        orderButton.classList.remove('d-none');
        orderButton.classList.add('d-block');
    } else {
        orderButton.classList.remove('d-block');
        orderButton.classList.add('d-none');
    }
}

function orderButton() {
    let orderButton = document.getElementById('order-button');
    if (!orderButton.classList.contains('d-none')) {
        orderButton.classList.remove('d-block');
        orderButton.classList.add('d-none');
        alert('Ihre Bestellung wurde erfolgreich aufgegeben!'); 
        food = [];
        prices = [];
        amount = [];
        renderBasket();
        renderPrice();
        toggleOrderButton();
        renderTotalItems();
    }
}

function renderTotalItems() {
    let totalAmount = 0;
    for (let i = 0; i < amount.length; i++) {
        totalAmount += amount[i];
    }
    let totalAmountContainer = document.getElementById('fullAmount');
    if (totalAmountContainer) {
        totalAmountContainer.innerHTML = `${totalAmount}`;
    }
}

function increaseAmount(i) { 
    if (i >= 0 && i < amount.length) {
        amount[i]++;
        saveRecipes();
        renderBasket();
        renderPrice();
        renderTotalItems();
    }
}

function decreaseAmount(i) { 
    if (i >= 0 && i < amount.length && amount[i] > 0) {
        amount[i]--;
        if (amount[i] === 0) {
            food.splice(i, 1);
            prices.splice(i, 1);
            amount.splice(i, 1);
        }
        saveRecipes();
        renderBasket();
        renderPrice();
        renderTotalItems();
    }
}

function adjustSidebarPosition() {
    let shoppingCart = document.getElementById('sidebar');
    if (window.scrollY > 0) {
        shoppingCart.style.top = '0px';
    } else {
        shoppingCart.style.top = '120px';
    }
}

function saveRecipes() {
    localStorage.setItem('food', JSON.stringify(food));
    localStorage.setItem('prices', JSON.stringify(prices));
    localStorage.setItem('amount', JSON.stringify(amount));
}

function loadRecipes() {
    if (localStorage.getItem('food')) {
        food = JSON.parse(localStorage.getItem('food'));
        prices = JSON.parse(localStorage.getItem('prices'));
        amount = JSON.parse(localStorage.getItem('amount'));
        renderBasket();
        renderPrice();
        toggleOrderButton();
    }
}
