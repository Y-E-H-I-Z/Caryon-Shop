// script.js

document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Menú hamburguesa responsive
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // 2️⃣ Scroll suave y marcar enlace activo
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if(target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            // Cerrar menú en móviles
            if(navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
            }
        });
    });

    // Detectar sección visible y activar enlace
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active-link");
            }
        });
    });

    // 3️⃣ Slider tipo vitrina de productos
    const productGrid = document.querySelector(".product-grid");
    let scrollAmount = 0;
    const scrollStep = 250; // pixeles por desplazamiento
    const scrollInterval = 3000; // tiempo en ms

    if(productGrid) {
        setInterval(() => {
            if(scrollAmount >= productGrid.scrollWidth - productGrid.clientWidth) {
                scrollAmount = 0;
            } else {
                scrollAmount += scrollStep;
            }
            productGrid.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
            });
        }, scrollInterval);
    }

    // 4️⃣ Efecto hover animado en productos
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.05)";
            card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
            card.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
        });
    });
});

// MENU HAMBURGUESA
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
        }
    });
});

// SMOOTH SCROLL
navLinks.forEach(link => {
    if (link.hash) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Ajusta según altura del header
                    behavior: "smooth"
                });
            }
        });
    }
});
