// ================================
// KINGSULA BLOG - SCRIPT
// ================================
// ================================
// JUMLAH PENGUNJUNG
// ================================
async function tampilkanPengunjung() {
  try {
    const res = await fetch("https://api.countapi.xyz/hit/kingsula-blog/beranda");
    const data = await res.json();
    
    const elemen = document.getElementById("jumlahPengunjung");
    if (elemen) {
      elemen.textContent = data.value;
    }
  } catch (err) {
    console.log("Gagal ambil data pengunjung");
  }
}

document.addEventListener("DOMContentLoaded", tampilkanPengunjung);


document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // THEME BUTTON
    // ================================

    const themeButton = document.getElementById("themeButton");

    if (themeButton) {

        // Cek tema yang tersimpan
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeButton.textContent = "☀️";
        } else {
            document.body.classList.remove("light-mode");
            themeButton.textContent = "🌙";
        }

        // Tombol ganti tema
        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {

                themeButton.textContent = "☀️";

                localStorage.setItem("theme", "light");

            } else {

                themeButton.textContent = "🌙";

                localStorage.setItem("theme", "dark");

            }

        });
    }


    // ================================
    // SMOOTH SCROLL
    // ================================

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

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

// ================================
// JUMLAH PENGUNJUNG
// ================================
async function tampilkanPengunjung() {
  try {
    const res = await fetch("https://api.countapi.xyz/hit/kingsula-blog/beranda");
    const data = await res.json();
    
    const elemen = document.getElementById("jumlahPengunjung");
    if (elemen) {
      elemen.textContent = data.value;
    }
  } catch (err) {
    console.log("Gagal ambil data pengunjung");
  }
}

document.addEventListener("DOMContentLoaded", tampilkanPengunjung);
