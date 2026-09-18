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
    // MOBILE SIDEBAR
    // ================================
    const menuButton = document.getElementById("menuButton");
    const mobileSidebar = document.getElementById("mobileSidebar");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const sidebarLinks = document.querySelectorAll(".sidebar-links a");

    const setSidebarState = (isOpen) => {
        if (!menuButton || !mobileSidebar || !sidebarOverlay) return;

        menuButton.setAttribute("aria-expanded", String(isOpen));
        mobileSidebar.setAttribute("aria-hidden", String(!isOpen));
        mobileSidebar.classList.toggle("is-open", isOpen);
        sidebarOverlay.classList.toggle("is-visible", isOpen);
        document.body.classList.toggle("sidebar-open", isOpen);
    };

    if (menuButton && mobileSidebar && sidebarClose && sidebarOverlay) {
        menuButton.addEventListener("click", () => setSidebarState(true));
        sidebarClose.addEventListener("click", () => setSidebarState(false));
        sidebarOverlay.addEventListener("click", () => setSidebarState(false));

        sidebarLinks.forEach((link) => {
            link.addEventListener("click", () => setSidebarState(false));
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") setSidebarState(false);
        });
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
    // ARTICLE SEARCH AND FILTER
    // ================================
    const articleSearch = document.getElementById("articleSearch");
    const articleCategory = document.getElementById("articleCategory");
    const articleResult = document.getElementById("articleResult");
    const articleEmpty = document.getElementById("articleEmpty");
    const articleCards = document.querySelectorAll(".article-card");

    if (articleSearch && articleCategory && articleResult && articleEmpty && articleCards.length) {
        const updateArticleList = () => {
            const searchTerm = articleSearch.value.trim().toLowerCase();
            const selectedCategory = articleCategory.value;
            let visibleArticles = 0;

            articleCards.forEach((card) => {
                const category = card.querySelector(".category")?.textContent.trim().toLowerCase() || "";
                const searchableText = card.textContent.toLowerCase();
                const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
                const matchesCategory = selectedCategory === "all" || category === selectedCategory;
                const isVisible = matchesSearch && matchesCategory;

                card.hidden = !isVisible;
                if (isVisible) visibleArticles += 1;
            });

            articleResult.textContent = `${visibleArticles} artikel ditemukan`;
            articleEmpty.hidden = visibleArticles !== 0;
        };

        articleSearch.addEventListener("input", updateArticleList);
        articleCategory.addEventListener("change", updateArticleList);
        updateArticleList();
    }

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
