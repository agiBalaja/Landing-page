// Data produk Shopee Affiliate Anda
const affiliateProducts = [
    {
        name: "Mechanical Keyboard RGB",
        image: "https://unsplash.com", // Ganti URL gambar produk
        link: "https://shope.ee" // Ganti dengan link affiliate Anda
    },
    {
        name: "Mouse Gaming Wireless",
        image: "https://unsplash.com",
        link: "https://shope.ee"
    },
    {
        name: "Stand Laptop Aluminium",
        image: "https://unsplash.com",
        link: "https://shope.ee"
    }
];

// Menunggu DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    // 1. Buat kontainer utama untuk widget melayang
    const container = document.createElement("div");
    container.id = "shopee-affiliate-float";
    
    // Style kontainer (Letak di kanan bawah)
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
        transition: "all 0.3s ease"
    });

    // 2. Buat bagian Header Widget
    const header = document.createElement("div");
    Object.assign(header.style, {
        backgroundColor: "#ee4d2d", // Warna khas Shopee
        color: "#ffffff",
        padding: "10px 14px",
        fontSize: "14px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "between",
        alignItems: "center",
        cursor: "pointer"
    });
    header.innerHTML = `
        <span style="flex-grow: 1;">🧡 Rekomendasi Produk</span>
        <span id="float-toggle-btn" style="font-size: 12px; margin-left: auto;">[Sembunyikan]</span>
    `;
    container.appendChild(header);

    // 3. Buat bodi/list produk
    const listBody = document.createElement("div");
    listBody.id = "float-product-list";
    Object.assign(listBody.style, {
        maxHeight: "320px",
        overflowY: "auto",
        padding: "8px 0"
    });

    // Masukkan data produk ke dalam list
    affiliateProducts.forEach(prod => {
        const item = document.createElement("a");
        item.href = prod.link;
        item.target = "_blank";
        item.rel = "noopener noreferrer";
        Object.assign(item.style, {
            display: "flex",
            alignItems: "center",
            padding: "10px 14px",
            textDecoration: "none",
            color: "#333",
            borderBottom: "1px solid #f5f5f5",
            transition: "background 0.2s"
        });
        
        // Efek hover item
        item.onmouseenter = () => item.style.backgroundColor = "#fef6f4";
        item.onmouseleave = () => item.style.backgroundColor = "transparent";

        item.innerHTML = `
            <img src="${prod.image}" alt="${prod.name}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px; margin-right: 12px; border: 1px solid #eee;">
            <div style="flex-grow: 1; font-size: 13px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                ${prod.name}
            </div>
            <span style="background-color: #ee4d2d; color: white; font-size: 11px; padding: 4px 8px; border-radius: 4px; font-weight: bold; margin-left: 8px; white-space: nowrap;">Beli</span>
        `;
        listBody.appendChild(item);
    });
    container.appendChild(listBody);

    // 4. Masukkan widget ke dalam halaman web
    document.body.appendChild(container);

    // 5. Fitur Minimize / Sembunyikan List saat header diklik
    let isOpen = true;
    const toggleBtn = document.getElementById("float-toggle-btn");
    
    header.addEventListener("click", () => {
        if (isOpen) {
            listBody.style.display = "none";
            toggleBtn.innerText = "[Tampilkan]";
            container.style.width = "200px"; // Mengecil saat ditutup
        } else {
            listBody.style.display = "block";
            toggleBtn.innerText = "[Sembunyikan]";
            container.style.width = "280px";
        }
        isOpen = !isOpen;
    });
});
