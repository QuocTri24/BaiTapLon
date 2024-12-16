document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("login");
    const registerButton = document.getElementById("register");
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    // Mở modal Đăng nhập
    loginButton.addEventListener("click", () => {
        loginModal.style.display = "flex";
    });

    // Mở modal Đăng ký
    registerButton.addEventListener("click", () => {
        registerModal.style.display = "flex";
    });

    // Đóng modal khi nhấn nút "Đóng" hoặc click ra ngoài
    document.querySelectorAll(".cancel").forEach(button => {
        button.addEventListener("click", () => {
            loginModal.style.display = "none";
            registerModal.style.display = "none";
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        } else if (event.target === registerModal) {
            registerModal.style.display = "none";
        }
    });
    // Xử lý logic Đăng nhập
    document.getElementById("login-submit").addEventListener("click", () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        if (email && password) {
            alert(`Đăng nhập thành công với email: ${email}`);
            loginModal.style.display = "none";
        } else {
            alert("Vui lòng nhập đủ thông tin!");
        }
    });

    // Xử lý logic Đăng ký
    document.getElementById("register-submit").addEventListener("click", () => {
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (!email || !password || !confirmPassword) {
            alert("Vui lòng nhập đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        alert(`Đăng ký thành công với email: ${email}`);
        registerModal.style.display = "none";
    });
});