// ================================
// KINGSULA BLOG - SCRIPT
// ================================

document.addEventListener("DOMContentLoaded", async () => {
    const siteLoader = document.getElementById("siteLoader");

    if (siteLoader) {
        window.addEventListener("load", () => {
            siteLoader.classList.add("is-hidden");
        }, { once: true });
    }

    // ================================
    // HERO TYPING
    // ================================
    const heroTyping = document.getElementById("heroTyping");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (heroTyping && !prefersReducedMotion) {
        const typingMessages = [
            "SELAMAT DATANG DI BLOG KU",
            "SELAMAT DATANG DI DUNIA KINGSULA"
        ];
        let messageIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typeHeroMessage = () => {
            const message = typingMessages[messageIndex];
            heroTyping.textContent = message.slice(0, characterIndex);

            if (!deleting && characterIndex < message.length) {
                characterIndex += 1;
                window.setTimeout(typeHeroMessage, 80);
                return;
            }

            if (!deleting) {
                deleting = true;
                window.setTimeout(typeHeroMessage, 1800);
                return;
            }

            if (characterIndex > 0) {
                characterIndex -= 1;
                window.setTimeout(typeHeroMessage, 42);
                return;
            }

            deleting = false;
            messageIndex = (messageIndex + 1) % typingMessages.length;
            window.setTimeout(typeHeroMessage, 350);
        };

        typeHeroMessage();
    }

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
    const visitorCount = document.getElementById("jumlahPengunjung");

    if (visitorCount) {
        visitorCount.textContent = "0";
    }

    try {
        const res = await fetch("https://api.countapi.xyz/hit/kingsula-blog/beranda");

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (visitorCount && typeof data.value !== "undefined") {
            visitorCount.textContent = data.value;
        }
    } catch (err) {
        console.log("Gagal ambil data pengunjung");

        if (visitorCount) {
            visitorCount.textContent = "0";
        }
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
    // SCROLL REVEAL
    // ================================
    const revealElements = document.querySelectorAll(
        ".highlights, .focus-card, .profile-card, .profile-visual, .articles, .article-card, .order-section, .store-section, .store-card, .about-content, .cta-banner, .article-header, .article-cover, .article-content"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    }

    // ================================
    // BACK TO TOP
    // ================================
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("is-visible", window.scrollY > 420);
        }, { passive: true });

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ================================
    // CONSOLE
    // ================================
    console.log("================================");
    console.log("KINGSULA BLOG");
    console.log("Website Loaded Successfully");
    console.log("================================");
});
