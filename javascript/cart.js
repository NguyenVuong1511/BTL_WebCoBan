function loadToCart() {
    const products =JSON.parse(localStorage.getItem('cart')) || [];
    const listDiv = document.getElementById('product-list');
    listDiv.innerHTML = '';
    
    if (products.length === 0) {
        listDiv.innerHTML = '<p style="text-align: center;">Chưa có sản phẩm nào.</p>';
        return;
    }

    products.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'cart-item';
        const totalPrice = p.price * p.quantity;
        item.innerHTML = `
            <div class="cart-item-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="cart-item-details">
                <h3>${p.name}</h3>
                <p>Giá: ${Number(p.price).toLocaleString('vi-VN')} VNĐ</p>
                <p>Thành tiền: ${Number(totalPrice).toLocaleString('vi-VN')} VNĐ</p>
                <p>${p.description || ''}</p>
            </div>
            <div class="quantity-controls">
                <button class="decrease-quantity">-</button>
                <span>${p.quantity}</span>
                <button class="increase-quantity">+</button>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${p.id}">Xoá</button>
            </div>
        `;
        listDiv.appendChild(item);
    });
    const totalPrice = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `${Number(totalPrice).toLocaleString('vi-VN')} VNĐ`;
    }
}

function removeItem(id) {
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedProducts = products.filter(p => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
    loadToCart();
    const cart = document.getElementById('number_items');
    const number_item = JSON.parse(localStorage.getItem('cart')) || [];
    cart.innerHTML = number_item.length;
    const totalPrice = updatedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `${Number(totalPrice).toLocaleString('vi-VN')} VNĐ`;
    }
}

function increaseQuantity(id) {
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    if (product) {
        product.quantity += 1;
        product.total = product.price * product.quantity;
        localStorage.setItem('cart', JSON.stringify(products));
        loadToCart();
    }
}

function decreaseQuantity(id) {
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    if (product) {
        if (product.quantity > 1) {
            product.quantity -= 1;
            product.total = product.price * product.quantity;
            localStorage.setItem('cart', JSON.stringify(products));
            loadToCart();
        } else {
            removeItem(id);
        }
    }
}


$(document).ready(function () {
    //Kiểm tra tài khoản
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        $('.no_acc').addClass('close');
        container = document.getElementById('ten_tk');

        container.innerHTML = `
            ${JSON.parse(currentUser).fullname} <i class="fa-solid fa-caret-down"></i>
        `;

        text = document.getElementById('text_tk');
        text.innerHTML = 'Tài khoản';
        const cart = document.getElementById('number_items');
        const number_item = JSON.parse(localStorage.getItem('cart')) || [];
        cart.innerHTML = number_item.length;
        loadToCart();
    }
    else {
        $('.no_acc').removeClass('close');
        $('.yes_acc').addClass('close');
        container = document.getElementById('ten_tk');
        container.innerHTML = `
            Tài khoản <i class="fa-solid fa-caret-down"></i>
        `;
        const listDiv = document.getElementById('product-list');
        listDiv.innerHTML = '';
        listDiv.innerHTML = '<p style="text-align: center;">Chưa có sản phẩm nào.</p>';
    }

    // Hàm đăng xuất
    function logout() {
        localStorage.setItem('currentUser', '');
    }
    $("#dang_xuat").click(function () { 
        logout();
    });

    $('#product-list').on('click', '.remove-item', function () {
        const id = $(this).data('id');
        removeItem(id);
    });

    $('#product-list').on('click', '.increase-quantity', function () {
        const id = $(this).closest('.cart-item').find('.remove-item').data('id');
        increaseQuantity(id);
    });
    $('#product-list').on('click', '.decrease-quantity', function () {
        const id = $(this).closest('.cart-item').find('.remove-item').data('id');
        decreaseQuantity(id);
    });
});