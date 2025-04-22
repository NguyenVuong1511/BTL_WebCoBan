$(document).ready(function(){
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
    }

    // Hàm đăng xuất
    function logout() {
        localStorage.setItem('currentUser', '');
    }
    $("#dang_xuat").click(function () { 
        logout();
    });

    let index = 0;

    let images = [
        "assets/img/Slide1.png",
        "assets/img/Slide2.png",
        "assets/img/Slide3.png"
    ];

    function nextSlide() {
        index = (index + 1) % images.length;
        $(".slide_show").find("img").attr("src", images[index]);
    }
    function backSlide() {
        index = (index - 1 + images.length) % images.length;
        $(".slide_show").find("img").attr("src", images[index]);
    }

    $(".next_btn").click(function () { 
        nextSlide();
    });

    $(".prev_btn").click(function () { 
        backSlide();
    });
    
    setInterval(nextSlide, 2500);
    $('.product_item').click(function (e) { 
        $('.product_detail').addClass('product_detail_open');
    });
    
    // Tạo tài khoản admin mặc định
    const Users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (Users.length === 0) {
        Users.push({
            fullname: 'Nguyễn Minh Vương',
            username: 'ngminhvuong',
            password: 'Vuong2005'});
        localStorage.setItem('users', JSON.stringify(Users));
    }

    // Tạo danh sách sản phẩm mặc định
    // Món chay
    const Mon_chay = JSON.parse(localStorage.getItem('mon_chay')) || [];

    if (Mon_chay.length === 0) {
        let slsp = Number(localStorage.getItem('slgsp')) || 0;
        Mon_chay.push({
            id: slsp,
            name: 'Nấm sốt đông',
            price: 20000,
            image: 'assets/img/Nam-dong.png',
            description: 'Nấm đông cô sốt với nước tương và gia vị.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Tàu hũ chiên giòn',
            price: 30000,
            image: 'assets/img/Tau-hu-chien.png',
            description: 'Tàu hũ chiên giòn với tỏi ớt và gia vị.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Tàu hũ non sốt đông',
            price: 25000,
            image: 'assets/img/Tau-hu-non-sot-dong.png',
            description: 'Tàu hũ non sốt đông với nước tương và gia vị.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Nấm kim châm xào',
            price: 35000,
            image: 'assets/img/Nam-kim-cham-xao.png',
            description: 'Nấm kim châm xào với hành tây và gia vị.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Đậu hũ xào nấm',
            price: 30000,
            image: 'assets/img/Tau-hu-non-sot-dong.png',
            description: 'Đậu hũ xào nấm với hành tây và gia vị.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Nấm xào tỏi',
            price: 20000,
            image: 'assets/img/Nam-kim-cham-xao.png',
            description: 'Nấm xào tỏi với gia vị và hành lá.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Cơm chiên chay',
            price: 30000,
            image: 'assets/img/Com-chien-chay.png',
            description: 'Cơm chiên chay với rau củ và gia vị.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Cháo nấm cà rốt',
            price: 25000,
            image: 'assets/img/Chao-nam-ca-rot.png',
            description: 'Cháo nấm cà rốt với gia vị và hành lá.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Chả giò chay',
            price: 30000,
            image: 'assets/img/Cha-gio-chay.png',
            description: 'Chả giò chay với rau củ và gia vị.'
        });
        slsp++;
        Mon_chay.push({
            id: slsp,
            name: 'Bún xào chay',
            price: 25000,
            image: 'assets/img/Bun-gao-xao.jpg',
            description: 'Bún xào chay với rau củ và gia vị.'
        });
        slsp++;
        
        localStorage.setItem('slgsp', slsp);

        localStorage.setItem('mon_chay', JSON.stringify(Mon_chay));

        window.location.href = "index.html";
    }

    const Mon_man = JSON.parse(localStorage.getItem('mon_man')) || [];

    if (Mon_man.length === 0) {
        let slsp = Number(localStorage.getItem('slgsp')) || 0;
    
        Mon_man.push({
            id: slsp++,
            name: 'Gà chiên mắm',
            price: 45000,
            image: 'assets/img/Ga-chien-mam.jpg',
            description: 'Gà chiên mắm tỏi giòn rụm, thơm ngon.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Thịt kho trứng',
            price: 50000,
            image: 'assets/img/Thit-kho-trung.jpg',
            description: 'Thịt ba chỉ kho với trứng béo ngậy, đậm đà.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Cá kho tộ',
            price: 55000,
            image: 'assets/img/Ca-kho-to.jpg',
            description: 'Cá kho tộ thơm ngon, đậm đà vị miền Nam.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Sườn ram mặn',
            price: 48000,
            image: 'assets/img/Suon-ram-man.jpg',
            description: 'Sườn non ram mặn thơm ngon, đưa cơm.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Thịt ba chỉ nướng',
            price: 60000,
            image: 'assets/img/Ba-chi-nuong.jpg',
            description: 'Ba chỉ nướng vàng giòn, ướp đậm vị.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Mực xào sa tế',
            price: 70000,
            image: 'assets/img/Muc-xao.jpg',
            description: 'Mực xào sa tế cay nồng hấp dẫn.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Cá chiên nước mắm',
            price: 52000,
            image: 'assets/img/Ca-chien-nuoc-mam.jpg',
            description: 'Cá chiên giòn rụm rưới nước mắm tỏi.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Tôm rang me',
            price: 65000,
            image: 'assets/img/Tom-rang-me.jpg',
            description: 'Tôm rang sốt me chua ngọt hấp dẫn.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Chả cá thì là',
            price: 40000,
            image: 'assets/img/Cha-ca-thi-la.jpg',
            description: 'Chả cá chiên vàng thơm mùi thì là.'
        });
        Mon_man.push({
            id: slsp++,
            name: 'Trứng chiên thịt băm',
            price: 35000,
            image: 'assets/img/Trung-thit-bam.jpg',
            description: 'Trứng chiên kết hợp thịt băm, món đơn giản mà ngon.'
        });
    
        localStorage.setItem('slgsp', slsp);
        localStorage.setItem('mon_man', JSON.stringify(Mon_man));
    }

    //Lẩu
    const Mon_lau = JSON.parse(localStorage.getItem('mon_lau')) || [];

    if (Mon_lau.length === 0) {
        let slsp = Number(localStorage.getItem('slgsp')) || 0;
    
        Mon_lau.push({
            id: slsp++,
            name: 'Lẩu thái chua cay',
            price: 120000,
            image: 'assets/img/Lau-thai.jpg',
            description: 'Lẩu thái hải sản chua cay hấp dẫn, đầy đủ topping.'
        });
        Mon_lau.push({
            id: slsp++,
            name: 'Lẩu bò nhúng giấm',
            price: 150000,
            image: 'assets/img/Lau-bo-nam.jpg',
            description: 'Lẩu bò nhúng giấm, thịt mềm ngon ăn kèm rau sống.'
        });
        Mon_lau.push({
            id: slsp++,
            name: 'Lẩu nấm hải sản',
            price: 130000,
            image: 'assets/img/Lau-nam-hs.jpg',
            description: 'Lẩu nấm kết hợp hải sản bổ dưỡng, thanh đạm.'
        });
        Mon_lau.push({
            id: slsp++,
            name: 'Lẩu cá chua cay',
            price: 110000,
            image: 'assets/img/Lau-ca-chua-cay.jpg',
            description: 'Lẩu cá nấu măng chua, đậm đà vị miền Tây.'
        });
        Mon_lau.push({
            id: slsp++,
            name: 'Lẩu gà lá é',
            price: 140000,
            image: 'assets/img/Lau-ga-la-e.jpg',
            description: 'Lẩu gà nấu với lá é, đặc sản Phú Yên.'
        });
        Mon_lau.push({
            id: slsp++,
            name: 'Lẩu hải sản thập cẩm',
            price: 160000,
            image: 'assets/img/Lau-hs-tc.jpg',
            description: 'Lẩu đầy đủ tôm, mực, cá, nghêu... ăn kèm rau sống.'
        });
    
        localStorage.setItem('slgsp', slsp);
        localStorage.setItem('mon_lau', JSON.stringify(Mon_lau));
    }
    
    //Ăn vặt
    const Mon_an_vat = JSON.parse(localStorage.getItem('an_vat')) || [];

    if (Mon_an_vat.length === 0) {
        let slsp = Number(localStorage.getItem('slgsp')) || 0;
    
        Mon_an_vat.push({
            id: slsp++,
            name: 'Khoai tây chiên',
            price: 25000,
            image: 'assets/img/Khoai-tay-chien.jpg',
            description: 'Khoai tây chiên giòn rụm, ăn kèm tương ớt.'
        });
        Mon_an_vat.push({
            id: slsp++,
            name: 'Bánh tráng trộn',
            price: 20000,
            image: 'assets/img/Banh-trang-tron.jpg',
            description: 'Bánh tráng trộn chua cay hấp dẫn, siêu ngon.'
        });
        Mon_an_vat.push({
            id: slsp++,
            name: 'Gỏi xoài khô bò',
            price: 30000,
            image: 'assets/img/Goi-xoai.jpg',
            description: 'Gỏi xoài chua cay mặn ngọt, thêm khô bò hấp dẫn.'
        });
        Mon_an_vat.push({
            id: slsp++,
            name: 'Cá viên chiên',
            price: 25000,
            image: 'assets/img/Ca-vien-chien.jpg',
            description: 'Cá viên chiên nóng hổi, giòn rụm, béo ngậy.'
        });
    
        localStorage.setItem('slgsp', slsp);
        localStorage.setItem('an_vat', JSON.stringify(Mon_an_vat));
    }

    //Nước uống
    const Nuoc_uong = JSON.parse(localStorage.getItem('nuoc_uong')) || [];

    if (Nuoc_uong.length === 0) {
        let slsp = Number(localStorage.getItem('slgsp')) || 0;
    
        Nuoc_uong.push({
            id: slsp++,
            name: 'Trà đào cam sả',
            price: 30000,
            image: 'assets/img/Tra-dao-cam-xa.jpg',
            description: 'Trà đào cam sả thơm mát, giải nhiệt ngày hè.'
        });
        Nuoc_uong.push({
            id: slsp++,
            name: 'Trà tắc',
            price: 15000,
            image: 'assets/img/Tra-tac.jpg',
            description: 'Trà tắc chua ngọt, cực hợp khi ăn vặt.'
        });
        Nuoc_uong.push({
            id: slsp++,
            name: 'Sữa tươi trân châu đường đen',
            price: 35000,
            image: 'assets/img/Tra-sua-tran-chau-duong-den.jpg',
            description: 'Sữa tươi béo ngậy, trân châu dẻo dai ngọt ngào.'
        });
        Nuoc_uong.push({
            id: slsp++,
            name: 'Trà sữa matcha',
            price: 32000,
            image: 'assets/img/Tra-sua-matcha.jpg',
            description: 'Trà sữa vị matcha thơm ngon, mát lạnh.'
        });
        Nuoc_uong.push({
            id: slsp++,
            name: 'Sinh tố bơ',
            price: 28000,
            image: 'assets/img/Sinh-to-bo.jpg',
            description: 'Sinh tố bơ béo mịn, đầy dưỡng chất.'
        });
        Nuoc_uong.push({
            id: slsp++,
            name: 'Nước chanh dây',
            price: 18000,
            image: 'assets/img/Chanh-day.jpg',
            description: 'Chanh dây thơm lừng, vị chua ngọt mát lạnh.'
        });
    
        localStorage.setItem('slgsp', slsp);
        localStorage.setItem('nuoc_uong', JSON.stringify(Nuoc_uong));
    }

    //Hoa quả
    const Hoa_qua = JSON.parse(localStorage.getItem('hoa_qua')) || [];

    if (Hoa_qua.length === 0) {
        let slsp = Number(localStorage.getItem('slgsp')) || 0;
    
        Hoa_qua.push({
            id: slsp++,
            name: 'Dưa hấu',
            price: 20000,
            image: 'assets/img/Dua-hau.jpg',
            description: 'Dưa hấu ngọt mát, mọng nước.'
        });
        Hoa_qua.push({
            id: slsp++,
            name: 'Xoài chín',
            price: 25000,
            image: 'assets/img/Xoai-chin.jpg',
            description: 'Xoài chín ngọt thanh, thơm lừng.'
        });
        Hoa_qua.push({
            id: slsp++,
            name: 'Ổi cắt lát',
            price: 18000,
            image: 'assets/img/Oi.jpg',
            description: 'Ổi giòn rụm ăn kèm muối ớt.'
        });
        Hoa_qua.push({
            id: slsp++,
            name: 'Mít tươi',
            price: 22000,
            image: 'assets/img/Mit.jpg',
            description: 'Mít vàng thơm, ngọt dịu.'
        });
        Hoa_qua.push({
            id: slsp++,
            name: 'Thanh long',
            price: 18000,
            image: 'assets/img/Thanh-long.jpg',
            description: 'Thanh long mát lành, thanh nhiệt cơ thể.'
        });
        Hoa_qua.push({
            id: slsp++,
            name: 'Chè trái cây',
            price: 30000,
            image: 'assets/img/Tre-trai-cay.jpg',
            description: 'Tổng hợp trái cây tươi ngon, thêm siro ngọt dịu.'
        });
    
        localStorage.setItem('slgsp', slsp);
        localStorage.setItem('hoa_qua', JSON.stringify(Hoa_qua));
    }        
    
});