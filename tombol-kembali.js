// tombol-kembali.js (Lengkap + Tracking + Export .MD)

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

function downloadMarkdownReport() {
    const data = trackUserInfo();
    const md = `# 📊 Laporan Tracking Pengunjung
**Waktu:** ${new Date().toLocaleString('id-ID')}

## Informasi Perangkat
| Properti | Nilai |
|----------|-------|
| Perangkat | ${data.device} |
| Browser | ${data.browser} |
| OS | ${data.os} |
| Resolusi | ${data.screenWidth}x${data.screenHeight} |
| Halaman | ${data.url} |
| Total Kunjungan (local) | ${data.estimatedVisitorCount} |

---
*Dihasilkan otomatis oleh sistem.*`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `laporan-${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function buatTombolKembali() {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/' || currentPath === '/index.html' || 
                        currentPath === '/Landing-page/' || currentPath === '/Landing-page/index.html';
    if (isIndexPage) return;

    const tombol = document.createElement('button');
    tombol.textContent = '🏠 Kembali ke Beranda';
    tombol.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:12px 24px;background:#0366d6;color:white;border:none;border-radius:8px;font-size:16px;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.3);cursor:pointer;z-index:9999;transition:all 0.3s ease';
    tombol.onmouseenter = function() { this.style.transform = 'scale(1.05)'; this.style.backgroundColor = '#024bb3'; };
    tombol.onmouseleave = function() { this.style.transform = 'scale(1)'; this.style.backgroundColor = '#0366d6'; };
    tombol.onclick = function() {
        console.log('🖱️ Klik kembali:', trackUserInfo());
        const seg = window.location.pathname.split('/').filter(p => p);
        if (seg.length === 0 || seg[0] === 'Landing-page') window.location.href = '/Landing-page/';
        else window.location.href = '../'.repeat(seg.length);
    };
    document.body.appendChild(tombol);

    // 🔥 Tambahkan Tombol Download .MD
    const tombolUnduh = document.createElement('button');
    tombolUnduh.textContent = '📥 Download .MD';
    tombolUnduh.style.cssText = 'position:fixed;bottom:90px;right:30px;padding:10px 18px;background:#28a745;color:white;border:none;border-radius:8px;font-size:14px;font-weight:bold;box-shadow:0 4px 8px rgba(0,0,0,0.2);cursor:pointer;z-index:9999;';
    tombolUnduh.onclick = downloadMarkdownReport;
    document.body.appendChild(tombolUnduh);

    console.log('✅ Tombol dan tracking siap!');
}

// Jalankan
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buatTombolKembali);
else buatTombolKembali();
