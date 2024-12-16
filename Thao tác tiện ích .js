document.addEventListener("DOMContentLoaded", () => {
    const guideBtn = document.getElementById("guide-btn");
    const promoBtn = document.getElementById("promo-btn");
    const contactBtn = document.getElementById("contact-btn");

    const guideModal = document.getElementById("guide-modal");
    const promoModal = document.getElementById("promo-modal");
    const contactModal = document.getElementById("contact-modal");

    // Mở modal Hướng dẫn
    guideBtn.addEventListener("click", () => {
        guideModal.style.display = "flex";
    });

    // Mở modal Ưu đãi
    promoBtn.addEventListener("click", () => {
        promoModal.style.display = "flex";
    });

    // Mở modal Thông tin liên hệ
    contactBtn.addEventListener("click", () => {
        contactModal.style.display = "flex";
    });

    // Đóng modal khi nhấn nút "Đóng" hoặc click ra ngoài
    document.querySelectorAll(".cancel").forEach(button => {
        button.addEventListener("click", () => {
            guideModal.style.display = "none";
            promoModal.style.display = "none";
            contactModal.style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === guideModal) {
            guideModal.style.display = "none";
        } else if (event.target === promoModal) {
            promoModal.style.display = "none";
        } else if (event.target === contactModal) {
            contactModal.style.display = "none";
        }
    });
});