// tombol-kembali.js
function buatTombolKembali() {
    // Ambil path saat ini
    const currentPath = window.location.pathname;
    
    // Cek apakah kita di halaman index (root)
    const isIndexPage = currentPath === '/' || 
                        currentPath === '/index.html' || 
                        currentPath === '/nama-repo/' || // untuk GitHub Pages subfolder
                        currentPath === '/nama-repo/index.html';
    
    // Jika sudah di index, tombol tidak perlu muncul
    if (isIndexPage) {
        return;
    }

    // Buat elemen tombol
    const tombol = document.createElement('button');
    tombol.textContent = '🏠 Kembali ke Beranda';
    tombol.id = 'tombolKembali';

    // Style tombol melayang
    tombol.style.position = 'fixed';
    tombol.style.bottom = '30px';
    tombol.style.right = '30px';
    tombol.style.padding = '12px 24px';
    tombol.style.backgroundColor = '#0366d6';
    tombol.style.color = 'white';
    tombol.style.border = 'none';
    tombol.style.borderRadius = '8px';
    tombol.style.fontSize = '16px';
    tombol.style.fontWeight = 'bold';
    tombol.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    tombol.style.cursor = 'pointer';
    tombol.style.zIndex = '9999';
    tombol.style.transition = 'all 0.3s ease';

    // Efek hover
    tombol.onmouseenter = function() {
        this.style.transform = 'scale(1.05)';
        this.style.backgroundColor = '#024bb3';
    };
    tombol.onmouseleave = function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#0366d6';
    };

    // 🔥 FUNGSI KHUSUS UNTUK STRUKTUR ANDA
    tombol.onclick = function() {
        // Deteksi apakah kita di subfolder atau root
        const pathSegments = window.location.pathname.split('/').filter(p => p);
        
        if (pathSegments.length === 0) {
            // Di root
            window.location.href = '/';
        } else if (pathSegments[0] === 'nama-repo') {
            // Di GitHub Pages dengan subfolder
            window.location.href = '/nama-repo/';
        } else {
            // Di subfolder lain, naik ke root
            window.location.href = '/';
        }
    };

    // Tambahkan tombol ke halaman
    document.body.appendChild(tombol);
}

// Jalankan saat halaman selesai dimuat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buatTombolKembali);
} else {
    buatTombolKembali();
}
