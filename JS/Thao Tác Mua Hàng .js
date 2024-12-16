document.addEventListener("DOMContentLoaded", function() {
    const texts = [
        { text: "Gấu Hot Trends", link: "#" },
        { text: "Thú Nhồi Bông", link: "#" },
        { text: "Gấu Bông Hoạt Hình", link: "#" }
    ];

    let currentIndex = Math.floor(Math.random() * texts.length); // Chọn ngẫu nhiên dòng chữ ban đầu
    const textDisplay = document.getElementById("textDisplay");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    // Hàm cập nhật văn bản kèm liên kết
    function updateText() {
        const currentText = texts[currentIndex];
        textDisplay.innerHTML = `<a href="${currentText.link}" target="_blank">${currentText.text}</a>`;
    }

    // Sự kiện nút ">"
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % texts.length; // Quay vòng về đầu
        updateText();
        resetAutoSwitch(); // Reset tự động chuyển đổi khi nhấn nút
    });

    // Sự kiện nút "<"
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + texts.length) % texts.length; // Quay vòng về cuối
        updateText();
        resetAutoSwitch(); // Reset tự động chuyển đổi khi nhấn nút
    });

    // Tự động chuyển đổi dòng chữ
    let autoSwitch = setInterval(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        updateText();
    }, 3000); // Chuyển đổi mỗi 3 giây

    // Hàm reset tính năng tự động chuyển đổi
    function resetAutoSwitch() {
        clearInterval(autoSwitch);
        autoSwitch = setInterval(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            updateText();
        }, 3000);
    }

    // Hiển thị ban đầu
    updateText();

    // Lấy tất cả các nút menu-trigger
    const menuTriggers = document.querySelectorAll('.menu-trigger');

    // Thêm sự kiện click cho từng nút
    menuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            // Lấy id của menu tương ứng
            const menuId = this.getAttribute('data-menu');
            const menu = document.getElementById(menuId);

            // Đóng tất cả các menu trước khi mở menu được click
            document.querySelectorAll('.menu').forEach(m => m.classList.remove('active'));

            // Toggle menu tương ứng
            menu.classList.toggle('active');
            event.stopPropagation();
        });
    });

    // Ẩn menu khi click ra ngoài
    document.addEventListener('click', function() {
        document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
    });

    const sizeButtons = document.querySelectorAll(".size-btn");
    sizeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const priceId = button.getAttribute("data-price-id");

            // Remove 'active' from other buttons in the same product
            document
                .querySelectorAll(`[data-price-id="${priceId}"]`)
                .forEach((btn) => btn.classList.remove("active"));

            // Add 'active' to the clicked button
            button.classList.add("active");

            // Update price
            const priceElement = document.getElementById(priceId);
            const newPrice = button.getAttribute("data-price");
            priceElement.textContent = `${parseInt(newPrice).toLocaleString()} VND`;
        });
    });

    const modal = document.getElementById("modal-form");

    document.querySelectorAll(".buy-now").forEach((button, index) => {
        button.addEventListener("click", () => {
            // Mở modal
            modal.style.display = "flex";

            // Lưu thông tin sản phẩm
            modal.dataset.productIndex = index; // Dùng chỉ số để tham chiếu đến sản phẩm tương ứng
        });
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.classList.contains("cancel")) {
            modal.style.display = "none";
        }
    });

    const modalForm = document.getElementById("modal-form"); // Modal "Thông tin thanh toán"
    const cartModal = document.getElementById("cart-modal"); // Modal "Giỏ hàng"
    const cartTableBody = document.getElementById("cart-table-body"); // Bảng trong modal "Giỏ hàng"
    const cartItems = []; // Danh sách giỏ hàng thực tế

    // Thêm sự kiện vào nút "MUA NGAY" để mở modal "Thông tin thanh toán"
    document.querySelectorAll(".buy-now").forEach((button, index) => {
        button.addEventListener("click", () => {
            modalForm.style.display = "flex"; // Hiển thị modal
            modalForm.dataset.productIndex = index; // Lưu chỉ số sản phẩm
        });
    });

    // Xử lý nút "Xác nhận thanh toán" trong modal "Thông tin thanh toán"
    document.querySelector(".confirm").addEventListener("click", () => {
        addToCart("Đang chờ giao hàng", "Hủy đơn hàng");
        modalForm.style.display = "none"; // Đóng modal
    });

    // Xử lý nút "Thêm vào giỏ hàng" trong modal "Thông tin thanh toán"
    document.querySelector(".cart").addEventListener("click", () => {
        addToCart("Đang chờ thanh toán", "Xác nhận mua");
        modalForm.style.display = "none"; // Đóng modal
    });

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(status, actionText) {
        const productIndex = modalForm.dataset.productIndex; // Lấy chỉ số sản phẩm
        const productCard = document.querySelectorAll(".product-card")[productIndex]; // Tìm sản phẩm tương ứng
        const productName = productCard.querySelector(".product-name").textContent; // Tên sản phẩm
        const productPrice = productCard.querySelector(".product-price").textContent; // Giá sản phẩm

        const order = {
            id: randomOrderId(),
            name: productName,
            price: productPrice,
            status: status,
            action: actionText,
        };

        cartItems.push(order); // Lưu thông tin vào giỏ hàng
        console.log(cartItems); // Debug: Xem thông tin giỏ hàng trong console
    }

    // Hiển thị modal "Giỏ hàng" khi click vào nút "Giỏ hàng"
    document.querySelector(".cart-container").addEventListener("click", () => {
        //cartTableBody.innerHTML = ""; // Xóa dữ liệu cũ

        cartItems.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.status}</td>
                <td><button class="action-btn" data-index="${index}">${item.action}</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        cartModal.style.display = "flex"; // Hiển thị modal "Giỏ hàng"
    });

    // Đóng modal "Giỏ hàng" khi nhấn ra ngoài hoặc nút "Đóng"
    cartModal.addEventListener("click", (event) => {
        if (event.target === cartModal || event.target.classList.contains("cancel")) {
            cartModal.style.display = "none";
        }
    });

    // Xử lý các thao tác trên modal "Giỏ hàng"
    cartTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("action-btn")) {
            const index = event.target.dataset.index; // Lấy chỉ số đơn hàng
            const item = cartItems[index];

            if (item.action === "Hủy đơn hàng") {
                // Xóa đơn hàng
                cartItems.splice(index, 1);
            } else if (item.action === "Xác nhận mua") {
                // Cập nhật trạng thái và thao tác
                item.status = "Đang chờ giao hàng";
                item.action = "Hủy đơn hàng";
            }

            // Cập nhật lại giao diện modal
            cartTableBody.innerHTML = "";
            cartItems.forEach((item, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.status}</td>
                    <td><button class="action-btn" data-index="${index}">${item.action}</button></td>
                `;
                cartTableBody.appendChild(row);
            });
        }
    });

    // Hàm tạo mã đơn hàng ngẫu nhiên
    function randomOrderId() {
        return `DH${Math.floor(100000 + Math.random() * 900000)}`;
    }

    // Tham chiếu đến thanh tìm kiếm và nút tìm kiếm
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-button");

    // Xử lý sự kiện khi người dùng nhập vào thanh tìm kiếm
    searchBar.addEventListener("keyup", handleSearch);
    searchButton.addEventListener("click", handleSearch);

    function handleSearch() {
        const keyword = searchBar.value.toLowerCase(); // Lấy từ khóa tìm kiếm và chuyển về chữ thường
        const products = document.querySelectorAll(".product-card"); // Lấy tất cả các sản phẩm

        // Duyệt qua từng sản phẩm
        products.forEach((product) => {
            const productName = product.querySelector(".product-name").textContent.toLowerCase(); // Lấy tên sản phẩm
            if (productName.includes(keyword)) {
                product.style.display = "block"; // Hiển thị sản phẩm nếu khớp
            } else {
                product.style.display = "none"; // Ẩn sản phẩm nếu không khớp
            }
        });
    }

});