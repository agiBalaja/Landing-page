// Data produk Shopee Affiliate Anda
const affiliateProducts = [
    {
        name: "Rubtrack R-05 Sepatu Gunung",
        image: "https://down-tx-id.img.susercontent.com/id-11134207-8224u-mhfp919kd4i6b9.webp",
        link: "https://s.shopee.co.id/3B6E1XWQTf"
    },
    {
        name: "Kaos Lengan HUT RI",
        image: "https://down-tx-id.img.susercontent.com/id-11134207-822wk-mp1oxb62thj41a.webp",
        link: "https://s.shopee.co.id/8pkalloPyB"
    },
    {
        name: "Topi Rimba Mountchild Hiking",
        image: "https://down-tx-id.img.susercontent.com/id-11134207-8224t-migyopadp2x3db.webp",
        link: "https://s.shopee.co.id/AAFyMLKO2X"
    }
];

// Pengaturan Waktu Rotasi (dalam milidetik: 5000 = 5 detik)
const ROTATION_INTERVAL = 5000; 

document.addEventListener("DOMContentLoaded", () => {
    // 1. Buat kontainer utama
    const container = document.createElement("div");
    container.id = "shopee-affiliate-float";
    
    Object.assign(container.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "280px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
        borderRadius: "12px",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        zIndex: "99999",
        overflow: "hidden",
        border: "1px solid #e0e0e0",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    });

    // 2. Buat Header Widget
    const header = document.createElement("div");
    Object.assign(header.style, {
        backgroundColor: "#ee4d2d",
        color: "#ffffff",
        padding: "10px 14px",
        fontSize: "13px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none"
    });
    header.innerHTML = `
        🧡 Rekomendasi Spesial
        [Sembunyikan]
    `;
    container.appendChild(header);

    // 3. Buat Container untuk 1 Produk
    const singleProductCard = document.createElement("a");
    singleProductCard.id = "float-product-card";
    singleProductCard.target = "_blank";
    singleProductCard.rel = "noopener noreferrer";
    Object.assign(singleProductCard.style, {
        display: "flex",
        alignItems: "center",
        padding: "12px 14px",
        textDecoration: "none",
        color: "#333",
        transition: "opacity 0.3s ease, background 0.2s"
    });

    singleProductCard.onmouseenter = () => singleProductCard.style.backgroundColor = "#fef6f4";
    singleProductCard.onmouseleave = () => singleProductCard.style.backgroundColor = "transparent";

    // Elemen internal produk
    singleProductCard.innerHTML = `
        
        
        Beli
    `;
    container.appendChild(singleProductCard);
    document.body.appendChild(container);

    // 4. Logika Pemilihan Acak & Rotasi
    let currentIndex = -1;

    function renderRandomProduct() {
        if (affiliateProducts.length === 0) return;

        // Pilih indeks acak yang berbeda dari produk yang sedang tampil
        let newIndex;
        if (affiliateProducts.length > 1) {
            do {
                newIndex = Math.floor(Math.random() * affiliateProducts.length);
            } while (newIndex === currentIndex);
        } else {
            newIndex = 0;
        }
        currentIndex = newIndex;

        const prod = affiliateProducts[currentIndex];

        // Efek transisi pudar (fade out -> update -> fade in)
        singleProductCard.style.opacity = "0";
        setTimeout(() => {
            singleProductCard.href = prod.link;
            document.getElementById("float-prod-img").src = prod.image;
            document.getElementById("float-prod-img").alt = prod.name;
            document.getElementById("float-prod-name").innerText = prod.name;
            singleProductCard.style.opacity = "1";
        }, 300);
    }

    // Tampilkan pertama kali
    renderRandomProduct();

    // Jalankan timer rotasi otomatis
    let rotationTimer = setInterval(renderRandomProduct, ROTATION_INTERVAL);

    // Pause rotasi saat mouse berada di atas produk (agar nyaman diklik pengguna)
    singleProductCard.addEventListener("mouseenter", () => clearInterval(rotationTimer));
    singleProductCard.addEventListener("mouseleave", () => {
        rotationTimer = setInterval(renderRandomProduct, ROTATION_INTERVAL);
    });

    // 5. Fitur Minimize / Toggle
    let isOpen = true;
    const toggleBtn = header.querySelector("#float-toggle-btn");
    
    header.addEventListener("click", () => {
        if (isOpen) {
            singleProductCard.style.display = "none";
            toggleBtn.innerText = "[Tampilkan]";
            container.style.width = "200px";
        } else {
            singleProductCard.style.display = "flex";
            toggleBtn.innerText = "[Sembunyikan]";
            container.style.width = "280px";
        }
        isOpen = !isOpen;
    });
});
