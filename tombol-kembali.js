// ---------- FUNGSI TRACKING (Diperbaiki) ----------
// Ambil/Update visitor count HANYA SEKALI saat script dimuat
let cachedVisitorCount = parseInt(localStorage.getItem('visitorCount') || '0', 10) + 1;
localStorage.setItem('visitorCount', cachedVisitorCount);

function getUserInfo() {
    const userAgent = navigator.userAgent || '';
    
    // Deteksi mobile/tablet lebih akurat (termasuk iPad iOS baru)
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = /Mobi|Android|iPhone|iPod/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent) || (hasTouch && navigator.platform === 'MacIntel');

    let browser = 'Unknown';
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari';
    else if (userAgent.includes('Edg')) browser = 'Edge';
    else if (userAgent.includes('OPR') || userAgent.includes('Opera')) browser = 'Opera';

    let os = 'Unknown';
    if (userAgent.includes('Windows NT')) os = 'Windows';
    else if (userAgent.includes('Mac OS X')) os = 'macOS';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

    return {
        device: isTablet ? 'Tablet' : (isMobile ? 'Mobile' : 'Desktop'),
        browser: browser,
        os: os,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        visitTime: new Date().toISOString(),
        estimatedVisitorCount: cachedVisitorCount,
        url: window.location.href
    };
}

// ---------- FUNGSI LAPORAN ----------
function tampilkanLaporan() {
    const data = getUserInfo();
    let panel = document.getElementById('panelLaporan');

    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'panelLaporan';
        panel.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Segoe UI', system-ui, sans-serif;
            font-size: 14px;
            width: 320px;
            max-height: 70vh;
            overflow-y: auto;
            z-index: 9998;
            border: 1px solid #444;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            display: none;
        `;
        document.body.appendChild(panel);
    }

    if (panel.style.display === 'block') {
        panel.style.display = 'none';
        return;
    }

    // Render HTML langsung tanpa regex tabel yang rawan bug
    panel.innerHTML = `
        <h3 style="color:#58a6ff;margin-top:0;border-bottom:1px solid #333;padding-bottom:8px;">📊 Laporan Pengunjung</h3>
        <p style="font-size:12px;color:#8b949e;">Waktu: ${new Date().toLocaleString('id-ID')}</p>
        <table style="width:100%;border-collapse:collapse;margin:10px 0;font-size:13px;">
            <tr><td style="padding:6px;border:1px solid #444;">Perangkat</td><td style="padding:6px;border:1px solid #444;"><strong>${data.device}</strong></td></tr>
            <tr><td style="padding:6px;border:1px solid #444;">Browser</td><td style="padding:6px;border:1px solid #444;"><strong>${data.browser}</strong></td></tr>
            <tr><td style="padding:6px;border:1px solid #444;">OS</td><td style="padding:6px;border:1px solid #444;"><strong>${data.os}</strong></td></tr>
            <tr><td style="padding:6px;border:1px solid #444;">Resolusi</td><td style="padding:6px;border:1px solid #444;"><strong>${data.screenWidth}x${data.screenHeight} px</strong></td></tr>
            <tr><td style="padding:6px;border:1px solid #444;">Total Kunjungan</td><td style="padding:6px;border:1px solid #444;"><strong>${data.estimatedVisitorCount}</strong></td></tr>
        </table>
        <blockquote style="border-left:3px solid #58a6ff;padding-left:8px;color:#8b949e;margin:10px 0;font-size:11px;">
            Data disimpan lokal di perangkat Anda.
        </blockquote>
    `;
    panel.style.display = 'block';
}

// ---------- TOMBOL KEMBALI ----------
function buatTombolKembali() {
    const tombol = document.createElement('button');
    tombol.textContent = '🏠 Beranda';
    tombol.id = 'tombolKembali';
    tombol.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        padding: 12px 24px; background: #0366d6; color: white;
        border: none; border-radius: 8px; font-size: 16px;
        font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer; z-index: 9999; transition: all 0.3s ease;
    `;

    tombol.addEventListener('click', () => {
        // Kembali ke halaman utama dengan aman
        window.location.href = window.location.origin + '/';
    });

    document.body.appendChild(tombol);
}

// ---------- TOMBOL LAPORAN ----------
function buatTombolLaporan() {
    const tombol = document.createElement('button');
    tombol.textContent = '📊 Lihat Laporan';
    tombol.id = 'tombolLaporan';
    tombol.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        padding: 12px 24px; background: #28a745; color: white;
        border: none; border-radius: 8px; font-size: 16px;
        font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer; z-index: 9999; transition: all 0.3s ease;
    `;

    tombol.addEventListener('click', tampilkanLaporan);
    document.body.appendChild(tombol);
}

// ---------- CSS RESPONSIVE ----------
function tambahkanCSSResponsive() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 480px) {
            #tombolKembali, #tombolLaporan {
                bottom: 15px !important; right: 15px !important;
                padding: 8px 14px !important; font-size: 12px !important;
            }
            #panelLaporan {
                right: 5% !important; left: 5% !important;
                width: 90% !important; bottom: 70px !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ---------- INIT ----------
function init() {
    const path = window.location.pathname.toLowerCase();
    // Deteksi index fleksibel (mencakup /, /index.html, /landing-page/, dll)
    const isIndexPage = path === '/' || 
                        path.endsWith('/index.html') || 
                        path.endsWith('/landing-page/') ||
                        path.endsWith('/landing-page');

    tambahkanCSSResponsive();

    if (isIndexPage) {
        buatTombolLaporan();
    } else {
        buatTombolKembali();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
