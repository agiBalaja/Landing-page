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
    },
    {
        name: "V380 Pro Kamera Dual Lens",
        image: "https://down-tx-id.img.susercontent.com/id-11134207-81zth-mq47tkp1qhhpdf.webp",
        link: "https://s.shopee.co.id/4LIBRD2Bqf"
    },
    {
        name: "Sepatu Lari Pria Wanita",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-7ra0s-mctr45tbbiuf23.webp",
        link: "https://s.shopee.co.id/6VMg1N8TLT"
    },
    {
        name: "Bendera Indonesia",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-822wi-moaif47y8m4u6c.webp",
        link: "https://s.shopee.co.id/gOt4pKFro"
    },
    {
        name: "Tumbler Cangkir Termos Motif",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-822wj-mojpkkuik07f1c.webp",
        link: "https://s.shopee.co.id/AAFyOQ7bEX"
    },
    {
        name: "Kasur Spring Bed IDEAL",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-81zte-mq65hwx16zv0f8.webp",
        link: "https://s.shopee.co.id/70Iwcerdn1"
    },
    {
        name: "Jaket Olahraga",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-822wt-mny65aeqi13448.webp",
        link: "https://s.shopee.co.id/5LAidg9RLF"
    },
    {
        name: "Helm Bogo Retro",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-8224q-mkx9ypjf1vcwa3.webp",
        link: "https://s.shopee.co.id/2VqXGZ9xvf"
    },
    {
        name: "Xiaomi Redmi 15C 5G",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-81ztl-mqivlvpwm22oe3.webp",
        link: "https://s.shopee.co.id/5ArIRWJqPf"
    },
    {
        name: "Proyektor Mini Portable",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-7rbk8-m75w2iujh5r5a8.webp",
        link: "https://s.shopee.co.id/30mnrbYepe"
    },
    {
        name: "Jet Cleaner Tekanan Tinggi",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-822wn-mphok98ztx4w34.webp",
        link: "https://s.shopee.co.id/5VU8qH2Uro"
    },
    {
        name: "Nokia 130 2023 Dual SIM",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-81zto-mq36ndjc6o7i28.webp",
        link: "https://s.shopee.co.id/8fRAc9wrwa"
    },
    {
        name: "Korean Top Baju Knit",
        image: "https://down-bs-id.img.susercontent.com/id-11134207-8224x-ml1w3zspenlu1f.webp",
        link: "https://s.shopee.co.id/19CISb8Ce"
    }
];

// Pengaturan Waktu Rotasi (dalam milidetik: 5000 = 5 detik)
const ROTATION_INTERVAL = 5000; 

document.addEventListener("DOMContentLoaded", () => {
    // 1. Buat kontainer utama (Kartu Melayang)
    const container = document.createElement("div");
    container.id = "shopee-affiliate-float";
    
    Object.assign(container.style, {
        position: "fixed",
        bottom: "10px",
        right: "10px",
        width: "280px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
        borderRadius: "12px",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        zIndex: "99999",
        overflow: "hidden",
        border: "1px solid #e0e0e0"
    });

    // 2. Buat Elemen Kartu Produk (Tanpa Header)
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

    // Isi elemen dalam kartu produk
    singleProductCard.innerHTML = `
        <img id="float-prod-img" src="" alt="" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; margin-right: 12px; border: 1px solid #eee; flex-shrink: 0;">
        <div style="flex-grow: 1; font-size: 13px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;" id="float-prod-name"></div>
        <span style="background-color: #ee4d2d; color: white; font-size: 11px; padding: 6px 10px; border-radius: 6px; font-weight: bold; margin-left: 8px; white-space: nowrap; flex-shrink: 0;">Beli</span>
    `;
    
    container.appendChild(singleProductCard);
    document.body.appendChild(container);

    // 3. Logika Rotasi Produk Acak
    let currentIndex = -1;

    function renderRandomProduct() {
        if (affiliateProducts.length === 0) return;

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

        // Transisi Halus (Fade Out -> Fade In)
        singleProductCard.style.opacity = "0";
        setTimeout(() => {
            singleProductCard.href = prod.link;
            document.getElementById("float-prod-img").src = prod.image;
            document.getElementById("float-prod-img").alt = prod.name;
            document.getElementById("float-prod-name").innerText = prod.name;
            singleProductCard.style.opacity = "1";
        }, 300);
    }

    // Jalankan pertama kali
    renderRandomProduct();

    // Timer Rotasi Otomatis
    let rotationTimer = setInterval(renderRandomProduct, ROTATION_INTERVAL);

    // Jeda rotasi saat mouse diarahkan ke kartu produk
    singleProductCard.addEventListener("mouseenter", () => clearInterval(rotationTimer));
    singleProductCard.addEventListener("mouseleave", () => {
        rotationTimer = setInterval(renderRandomProduct, ROTATION_INTERVAL);
    });
});
