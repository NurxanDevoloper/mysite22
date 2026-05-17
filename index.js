document.addEventListener("DOMContentLoaded", function () {

    const nameDisplay = document.getElementById("user-name-display");
    const logoutBtn = document.querySelector(".btn-logout");
    const loginBtn = document.querySelector(".login-btn");

    const token = localStorage.getItem("token");
    const savedName = localStorage.getItem("userName");

    if (token && savedName) {

        // Пользователь залогинен
        if (nameDisplay) nameDisplay.textContent = savedName;

        if (logoutBtn) logoutBtn.style.display = "inline-block";

        if (loginBtn) loginBtn.style.display = "none";

    } else {

        // Пользователь НЕ залогинен
        if (nameDisplay) nameDisplay.textContent = "";

        if (logoutBtn) logoutBtn.style.display = "none";

        if (loginBtn) loginBtn.style.display = "inline-block";

    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {

            localStorage.clear();

            window.location.href = "../Login/login.html";

        });
    }

});




// ===============================
// Promotion Countdown Timer
// ===============================
const promoEndDate = new Date(2026, 8, 1, 0, 0, 0); // 1 September 2026
function updateCountdown() {
    const now = new Date();
    const diff = promoEndDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===============================
// Particle Rain Background
// ===============================
const canvas = document.getElementById("particle-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 120;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.6;
            this.speed = Math.random() * 0.6 + 0.2;
            this.opacity = Math.random() * 0.6 + 0.2;
        }

        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 160, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// ===============================
// Product Card Interactions
// ===============================
document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
});