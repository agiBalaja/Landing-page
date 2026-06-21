// tombol-kembali.js (Tracking + Tampilan Laporan Tanpa Download)

// ---------- FUNGSI TRACKING (sama seperti sebelumnya) ----------
function trackUserInfo() {
    const userAgent = navigator.userAgent || '';
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent) && !isMobile;
    
    let browser = 'Unknown';
    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
    else if (userAgent.indexOf('Edg') > -1) browser = 'Edge';
    else if (userAgent.indexOf('OPR') > -1 || userAgent.indexOf('Opera') > -1) browser = 'Opera';

    let os = 'Unknown';
    if (userAgent.indexOf('Windows NT') > -1) os = 'Windows';
    else if (userAgent.indexOf('Mac OS X') > -1) os = 'macOS';
    else if (userAgent.indexOf('Android') > -1) os = 'Android';
    else if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) os = 'iOS';

    let visitorCount = parseInt(localStorage.getItem('visitorCount') || '0', 10);
    visitorCount += 1;
    localStorage.setItem('visitorCount', visitorCount);

    return {
        device: isTablet ? 'Tablet' : (isMobile ? 'Mobile' : 'Desktop'),
        browser: browser,
        os: os,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        visitTime: new Date().toISOString(),
        estimatedVisitorCount: visitorCount,
        url: window.location.href,
        userAgent: userAgent
    };
}

// ---------- FUNGSI MENAMPILKAN LAPORAN (tanpa unduh) ----------
function tampilkanLaporan() {
    // Ambil data terbaru
    const data = trackUserInfo();

    // Buat elemen panel jika belum ada
    let panel = document.getElementById('panelLaporan');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'panelLaporan';
        panel.style.cssText = `
            position: fixed;
            bottom: 150px;
            right: 30px;
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Segoe UI', monospace;
            font-size: 14px;
            max-width: 400px;
            max-height: 70vh;
            overflow-y: auto;
            z-index: 9998;
            border: 1px solid #444;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            display: none; /* awalnya tersembunyi */
        `;
        document.body.appendChild(panel);
    }

    // Toggle tampilan
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
        return;
    }

    // Format laporan sebagai Markdown (teks dengan gaya)
    const md = `
# 📊 Laporan Tracking Pengunjung
**Waktu:** ${new Date().toLocaleString('id-ID')}

## 🖥️ Informasi Perangkat & Browser
| Properti | Nilai |
|----------|-------|
| Perangkat | ${data.device} |
| Browser | ${data.browser} |
| OS | ${data.os} |
| Resolusi Layar | ${data.screenWidth} x ${data.screenHeight} px |
| Halaman Saat Ini | ${data.url} |
| Total Kunjungan (local) | ${data.estimatedVisitorCount} |

> *Data dikumpulkan secara lokal di perangkat Anda.*
    `;

    // Ubah teks Markdown sederhana menjadi HTML dengan CSS
    let html = md
        .replace(/^# (.+)$/gm, '<h1 style="color:#58a6ff;border-bottom:1px solid #333;padding-bottom:8px;">$1</h1>')
        .replace(/^## (.+)$/gm, '<h2 style="color:#79c0ff;margin-top:16px;">$1</h2>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/^> (.+)$/gm, '<blockquote style="border-left:4px solid #58a6ff;padding-left:12px;color:#8b949e;margin:12px 0;">$1</blockquote>')
        .replace(/^\|(.+)\|$/gm, (match) => {
            // Tabel sederhana
            const cells = match.split('|').filter(c => c.trim() !== '');
            if (cells.length === 0) return '';
            // Jika baris pemisah (|---|), lewati
            if (cells.every(c => /^-+$/.test(c.trim()))) return '';
            return '<tr>' + cells.map(c => `<td style="padding:6px 12px;border:1px solid #444;">${c.trim()}</td>`).join('') + '</tr>';
        })
        .replace(/(<tr>.*<\/tr>)/gs, (match) => {
            // Bungkus semua tr dalam table
            return `<table style="width:100%;border-collapse:collapse;margin:10px 0;">${match}</table>`;
        })
        .replace(/\n/g, '<br>');

    // Atur isi panel
    panel.innerHTML = html;
    panel.style.display = 'block';
}

// ---------- FUNGSI TOMBOL KEMBALI (dengan tambahan tombol laporan) ----------
function buatTombolKembali() {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/' || currentPath === '/index.html' || 
                        currentPath === '/Landing-page/' || currentPath === '/Landing-page/index.html';
    if (isIndexPage) {
        console.log('Di halaman index, tombol disembunyikan');
        return;
    }

    // --- Tombol Kembali ---
    const tombol = document.createElement('button');
    tombol.textContent = '🏠 Kembali ke Beranda';
    tombol.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:12px 24px;background:#0366d6;color:white;border:none;border-radius:8px;font-size:16px;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.3);cursor:pointer;z-index:9999;transition:all 0.3s ease';
    tombol.onmouseenter = function() { this.style.transform = 'scale(1.05)'; this.style.backgroundColor = '#024bb3'; };
    tombol.onmouseleave = function() { this.style.transform = 'scale(1)'; this.style.backgroundColor = '#0366d6'; };
    tombol.onclick = function() {
        console.log('🖱️ Klik kembali - data:', trackUserInfo());
        const seg = window.location.pathname.split('/').filter(p => p);
        if (seg.length === 0 || seg[0] === 'Landing-page') window.location.href = '/Landing-page/';
        else window.location.href = '../'.repeat(seg.length);
    };
    document.body.appendChild(tombol);

    // --- Tombol Tampilkan Laporan (ganti tombol unduh) ---
    const tombolLaporan = document.createElement('button');
    tombolLaporan.textContent = '📊 Lihat Laporan';
    tombolLaporan.style.cssText = 'position:fixed;bottom:90px;right:30px;padding:10px 18px;background:#28a745;color:white;border:none;border-radius:8px;font-size:14px;font-weight:bold;box-shadow:0 4px 8px rgba(0,0,0,0.2);cursor:pointer;z-index:9999;transition:all 0.3s ease';
    tombolLaporan.onmouseenter = function() { this.style.transform = 'scale(1.05)'; this.style.backgroundColor = '#218838'; };
    tombolLaporan.onmouseleave = function() { this.style.transform = 'scale(1)'; this.style.backgroundColor = '#28a745'; };
    tombolLaporan.onclick = tampilkanLaporan;
    document.body.appendChild(tombolLaporan);

    console.log('✅ Tombol dan tracking siap (laporan tampil di halaman)');
}

// Jalankan saat DOM siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buatTombolKembali);
} else {
    buatTombolKembali();
}
