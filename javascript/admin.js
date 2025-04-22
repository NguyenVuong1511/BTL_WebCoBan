const input = document.getElementById("new-price");
let price_real = 0;

input.addEventListener("input", function () {
  let rawValue = this.value.replace(/[^0-9]/g, '');
  this.value = rawValue ? Number(rawValue).toLocaleString('vi-VN') : '';
  price_real = rawValue;
});

let slgsp = Number(localStorage.getItem('slgsp'));
if (slgsp == null) {
  slgsp = 0;
}

function addProduct() {
  const selected = document.getElementById('category').value;
  const storageKeys = {
    mon_chay: 'mon_chay',
    mon_man: 'mon_man',
    mon_lau: 'mon_lau',
    an_vat: 'an_vat',
    nuoc_uong: 'nuoc_uong',
    hoa_qua: 'hoa_qua'
  };
  const key = storageKeys[selected];

  const name = document.getElementById('new-name').value;
  const price = price_real; // đã xử lý giá
  const image = "assets/img/" + document.getElementById('link-img').value;
  const description = document.getElementById('new-description').value;

  if (!name || !price || !image) {
    alert("Vui lòng nhập đầy đủ tên, giá và link ảnh.");
    return;
  }
  let id = slgsp;
  const products = JSON.parse(localStorage.getItem(key)) || [];
  products.push({id, name, price, image, description });
  localStorage.setItem(key, JSON.stringify(products));
  slgsp++;
  localStorage.setItem('slgsp', slgsp);

  document.getElementById('new-name').value = '';
  document.getElementById('new-price').value = '';
  document.getElementById('link-img').value = '';
  document.getElementById('new-description').value = '';
  price_real = 0; // reset giá trị thực
  loadAdminProducts();
}

// Hàm xóa sản phẩm
function deleteAdminProduct(categoryKey, index) {
    const storageKeys = {
        mon_chay: 'mon_chay',
        mon_man: 'mon_man',
        mon_lau: 'mon_lau',
        an_vat: 'an_vat',
        nuoc_uong: 'nuoc_uong',
        hoa_qua: 'hoa_qua'
    };
    const key = storageKeys[categoryKey];
    const products = JSON.parse(localStorage.getItem(key)) || [];

    if (!products[index]) return;
    if (confirm(`Xoá "${products[index].name}"?`)) {
        products.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(products));
        loadAdminProducts();
    }
    slgsp--;
    localStorage.setItem('slgsp', slgsp);
}

function loadAdminProducts() {
    const selected = document.getElementById('category').value;
    const storageKeys = {
        mon_chay: 'mon_chay',
        mon_man: 'mon_man',
        mon_lau: 'mon_lau',
        an_vat: 'an_vat',
        nuoc_uong: 'nuoc_uong',
        hoa_qua: 'hoa_qua'
    };
    const key = storageKeys[selected];
    const listDiv = document.getElementById('product-list');
    listDiv.innerHTML = '';

    const products = JSON.parse(localStorage.getItem(key)) || [];

    if (products.length === 0) {
        listDiv.innerHTML = '<p>Chưa có sản phẩm nào.</p>';
        return;
    }

    products.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <div class="border">
                <img src="${p.image}">
            </div>
            <div class="border">
                <strong>${p.name}</strong>
            </div>
            <div class="border">
                Giá: ${Number(p.price).toLocaleString('vi-VN')} VNĐ
            </div>
            <div class="border">
                <em>${p.description || ''}</em>
            </div>
            <button onclick="deleteAdminProduct('${selected}', ${index})">Xoá</button>
        `;
        listDiv.appendChild(item);
    });
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
        if (!(JSON.parse(currentUser).username == 'ngminhvuong')) {
            $('#admin').addClass('close');
            document.body.innerHTML = `
                <div class="err_404">
                    <img src="assets/img/access-denied.webp" alt="404" class="img_404">
                </div>
            `;
        }
        const cart = document.getElementById('number_items');
        const number_item = JSON.parse(localStorage.getItem('cart')) || [];
        cart.innerHTML = number_item.length;
    }
    else {
        $('.no_acc').removeClass('close');
        $('.yes_acc').addClass('close');
        container = document.getElementById('ten_tk');
        container.innerHTML = `
            Tài khoản <i class="fa-solid fa-caret-down"></i>
        `;
        document.body.innerHTML = `
            <div class="err_404">
                <img src="assets/img/access-denied.webp" alt="404" class="img_404">
            </div>
        `;
    }

    // Hàm đăng xuất
    function logout() {
        localStorage.setItem('currentUser', '');
    }
    $("#dang_xuat").click(function () { 
        logout();
    });

    loadAdminProducts();
    $('#category').change(function () {
        loadAdminProducts();
    });

});