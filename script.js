// ================================
// KINGSULA BLOG - SCRIPT
// ================================

document.addEventListener("DOMContentLoaded", async () => {
    // ================================
    // THEME BUTTON
    // ================================
    const themeButton = document.getElementById("themeButton");

    if (themeButton) {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeButton.textContent = "☀️";
        } else {
            document.body.classList.remove("light-mode");
            themeButton.textContent = "🌙";
        }

        themeButton.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-mode");
            themeButton.textContent = isLight ? "☀️" : "🌙";
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }

    // ================================
    // JUMLAH PENGUNJUNG
    // ================================
    try {
        const res = await fetch("https://api.countapi.xyz/hit/kingsula-blog/beranda");
        const data = await res.json();
        const elemen = document.getElementById("jumlahPengunjung");

        if (elemen && typeof data.value !== "undefined") {
            elemen.textContent = data.value;
        }
    } catch (err) {
        console.log("Gagal ambil data pengunjung");
    }

    // ================================
    // SMOOTH SCROLL
    // ================================
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ================================
    // CONSOLE
    // ================================
    console.log("================================");
    console.log("KINGSULA BLOG");
    console.log("Website Loaded Successfully");
    console.log("================================");
});
