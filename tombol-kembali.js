// tombol-kembali.js - Versi Otomatis
function buatTombolKembali() {
    // Cek apakah di index
    if (window.location.pathname === '/' || 
        window.location.pathname === '/index.html') {
        return;
    }

    const tombol = document.createElement('button');
    tombol.textContent = '🏠 Kembali';
    tombol.className = 'tombol-kembali';
    
    // Hitung berapa level folder
    const pathSegments = window.location.pathname.split('/').filter(p => p && p !== 'index.html');
    const level = pathSegments.length;
    
    // Buat path kembali
    let backPath = '';
    if (level > 0) {
        // Jika di subfolder (about/, blog/, dll)
        backPath = '../'.repeat(level);
    } else {
        // Jika di root
        backPath = '/';
    }
    
    tombol.onclick = () => {
        window.location.href = backPath;
    };

    document.body.appendChild(tombol);
}

document.addEventListener('DOMContentLoaded', buatTombolKembali);
