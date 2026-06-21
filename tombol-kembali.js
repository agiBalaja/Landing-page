// tombol-kembali-sederhana.js
function buatTombolKembali() {
    const tombol = document.createElement('button');
    tombol.textContent = '🏠 Kembali ke Beranda';
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
    
    tombol.onclick = function() {
        window.location.href = 'Landing-page/index.html';
    };
    
    document.body.appendChild(tombol);
}

document.addEventListener('DOMContentLoaded', buatTombolKembali);
