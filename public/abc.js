if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeItem = document.getElementsByClassName('remove')
    for (var i = 0; i <removeItem.length; i++) {
        var button =removeItem[i]
        button.addEventListener('click', remove)
    }

    var quantity = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantity.length; i++) {
        var input = quantity[i]
        input.addEventListener('change', quantityChanged)
    }

    var addtocart = document.getElementsByClassName('addtocart')
    for (var i = 0; i < addtocart.length; i++) {
        var button = addtocart[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you ')
    var products = document.getElementsByClassName('cart-items')[0]
    while (products.hasChildNodes()) {
        products.removeChild(products.firstChild)
    }
    updateCartTotal()
}

function remove(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var products = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = products.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity" type="number" value="1">
            <button class="btn remove" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    products.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', remove)
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText =  '$' + total

}
