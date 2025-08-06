let kartochki = document.querySelector('.kartochki')
let korzinka = document.querySelector('.korzinka')

let productsInCart = [] // массив корзины

fetch('https://fakestoreapi.com/products?limit=10')
    .then(response => response.json())
    .then(data => {
        genaratorProduct(data)
    })

function genaratorProduct(product) {
    kartochki.innerHTML = ''
    product.forEach(element => {
        let divCard = document.createElement('div')
        divCard.classList.add('card')
        divCard.innerHTML = `
            <img src="${element.image}" alt="" class="img">
            <h2 class="title">${element.title}</h2>
            <p class="description">${element.description}</p>
            <p class="category"><span class="span">Категория:</span> ${element.category}</p>
            <p class="price">${element.price} $</p>
            <button class="btn" onclick="addProduct('${element.title.replace(/'/g, "\\'")}', ${element.price})">Купить</button>
        `
        kartochki.appendChild(divCard)
    });
}

function addProduct(title, price) {
    productsInCart.push({ title, price })

    let total = productsInCart.reduce((sum, item) => sum + item.price, 0)

    let korzinaHTML = productsInCart.map(item => `
        <div class="tovar">
            <div class="product">
                <h2 class="title">${item.title}</h2>
                <p class="price">${item.price} $</p>
            </div>
        </div>
    `).join('')

    korzinka.innerHTML = `
        ${korzinaHTML}
        <div class="totalPrice">
            <h3>Общая стоимость: ${total.toFixed(2)} $</h3>
        </div>
    `
}