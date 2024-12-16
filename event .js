document.addEventListener("DOMContentLoaded", function() {
    const texts = [{
        text: "Gấu Hot Trends",
        link: "#"
    }, {
        text: "Thú Nhồi Bông",
        link: "#"
    }, {
        text: "Gấu Bông Hoạt Hình",
        link: "#"
    }];

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
});