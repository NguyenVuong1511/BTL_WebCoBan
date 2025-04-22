// Hàm xem chi tiết, đặt hàng sản phẩm
function showProductDetail(product) {
    const detailWrapper = document.querySelector('.product_detail');
    const detailContainer = document.querySelector('.product_detail_main');

    // Thêm class để mở chi tiết
    detailWrapper.classList.add('product_detail_open');
    detailContainer.classList.add('product_detail_main_open');

    detailContainer.innerHTML = `
        <div class="product_detail_content">
            <button class="close_detail_btn" onclick="closeProductDetail()">✖</button>
            <img src="${product.image}" alt="${product.name}" style="width: 300px; height: 300px; object-fit: cover;">
            <div class="product_detail_info">
                <h2>${product.name}</h2>
                <p>Giá: ${Number(product.price).toLocaleString('vi-VN')} VNĐ</p>
                <p>Mô tả: ${product.description}</p>
                <label for="quantity">Số lượng: </label>
                <div class="quantity_input">
                    <button id="giam" onclick="decreaseQuantity(${product.price})">-</button>
                    <input type="number" id="quantity" min="1" value="1" oninput="updateTotal(${product.price})">
                    <button id="tang" onclick="increaseQuantity(${product.price})">+</button>
                </div>
                <p id="total_price">Thành tiền: ${Number(product.price).toLocaleString('vi-VN')} VNĐ</p>
                <button onclick='addToCart(${JSON.stringify(product)}, ${product.price}, Number(document.getElementById("quantity").value))'>Thêm vào giỏ hàng</button>
            </div>
        </div>
    `;
}

// Hàm cập nhật thành tiền dựa trên số lượng hiện tại
function updateTotal(price) {
    // Nếu price là chuỗi, loại bỏ dấu chấm hoặc dấu phẩy để lấy số thực sự
    if (typeof price === 'string') {
        price = parseInt(price.replace(/[.,]/g, ''), 10);
    }

    const quantity = parseInt(document.getElementById('quantity').value, 10) || 1;
    const total = price * quantity;

    // Định dạng số tiền theo chuẩn VN
    const formattedTotal = new Intl.NumberFormat('vi-VN').format(total);
    document.getElementById('total_price').innerText = `Thành tiền: ${formattedTotal} VNĐ`;
}

// Hàm giảm số lượng
function decreaseQuantity(price) {
    const qtyInput = document.getElementById('quantity');
    let qty = parseInt(qtyInput.value, 10) || 1;
    if (qty > 1) {
        qty--;
        qtyInput.value = qty;
        updateTotal(price);
    }
}

// Hàm tăng số lượng
function increaseQuantity(price) {
    const qtyInput = document.getElementById('quantity');
    let qty = parseInt(qtyInput.value, 10) || 1;
    qty++;
    qtyInput.value = qty;
    updateTotal(price);
}



function addToCart(product, price, quantity) {
    const total = price * quantity;
    alert(`Đã thêm ${quantity} x ${product.name} ${total.toLocaleString('vi-VN')} VNĐ vào giỏ hàng!`);

    // Thực hiện thêm vào giỏ hàng ở đây
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += quantity;
        existingProduct.total += total;
    } else {
        cart.push({ ...product, quantity, total });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Cập nhật giỏ hàng ở trang khác nếu cần
    // loadToCart(); // Nếu bạn có hàm này để cập nhật giỏ hàng trên trang khác
    const a = document.getElementById('number_items');
    const number_item = JSON.parse(localStorage.getItem('cart')) || [];
    a.innerHTML = number_item.length;
    closeProductDetail();
    // Bạn có thể lưu vào localStorage nếu muốn
}  

function closeProductDetail() {
    document.querySelector('.product_detail').classList.remove('product_detail_open');
    document.querySelector('.product_detail_main').classList.remove('product_detail_main_open');
}


function loadProducts(storageKey, containerId, paginationId, href) {
    const productsPerPage = 8;
    let currentPage = 1;
    const allProducts = JSON.parse(localStorage.getItem(storageKey)) || [];
    const container = document.getElementById(containerId);

    if (allProducts.length === 0) {
        $('#' + containerId).addClass('product_container_error');
        container.innerHTML = `
            <div class="product_error">
                <h2 class="product_error_title">Rất tiếc không có sản phẩm nào</h2>
                <p class="product_error_text">Xin lỗi, chúng tôi chưa có sản phẩm nào thuộc danh mục này</p>
                <i class="fa-regular fa-face-sad-cry"></i>
            </div>
        `;
        return;
    }

    function renderPage(page) {
        container.innerHTML = '';
    
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const productsToShow = allProducts.slice(start, end);
    
        productsToShow.forEach((p, index) => {
            const item = document.createElement('div');
            item.className = 'product_item';
            item.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>${Number(p.price).toLocaleString('vi-VN')} VNĐ</p>
                <button><i class="fa-solid fa-cart-shopping"></i>Đặt hàng</button>
            `;
    
            // Sự kiện click khi bấm vào cả item hoặc nút
            item.onclick = () => showProductDetail(p);
    
            item.querySelector('button').onclick = (e) => {
                e.stopPropagation(); // ngăn sự kiện nổi bọt nếu cần
                showProductDetail(p);
            };
    
            container.appendChild(item);
        });
    }  
    

    function renderPagination() {
        const pagination = document.getElementById(paginationId);
        pagination.innerHTML = '';

        const totalPages = Math.ceil(allProducts.length / productsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const a = document.createElement('a');
            a.innerText = i;
            a.onclick = () => {
                currentPage = i;
                renderPage(currentPage);
                renderPagination(); // Thêm dòng này để cập nhật lại nút active
                a.href = href; // Thay đổi href khi click vào trang
            };
            
            if (i === currentPage) {
                a.classList.add('active'); // thêm class active để dễ style
            }
            pagination.appendChild(a);
        }
    }

    renderPage(currentPage);
    renderPagination();
}
$(document).ready(function () {
    loadProducts('mon_chay', 'product_mon_chay', 'pagination_mon_chay', '#mon_chay');
    loadProducts('mon_man', 'product_mon_man', 'pagination_mon_man', '#mon_man');
    loadProducts('mon_lau', 'product_mon_lau', 'pagination_mon_lau', '#mon_lau');
    loadProducts('an_vat', 'product_an_vat', 'pagination_an_vat', '#an_vat');
    loadProducts('hoa_qua', 'product_hoa_qua', 'pagination_hoa_qua', '#hoa_qua');
    loadProducts('nuoc_uong', 'product_nuoc_uong', 'pagination_nuoc_uong', '#nuoc_uong');
    // Thêm các danh mục khác nếu có
    // loadProducts('products2', 'product_mon_nuoc', 'pagination_mon_nuoc');

});
