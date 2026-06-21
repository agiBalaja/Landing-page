// ============================================================
// tombol-kembali.js
// Gabungan: Tombol Kembali + Google Analytics 4 Tracking
// ============================================================

(function() {
    'use strict';

    // ==========================================================
    // 1. GOOGLE ANALYTICS 4 - INISIALISASI
    // ==========================================================

    // 🔥 GANTI 'G-XXXXXXXXXX' dengan Measurement ID milik Anda!
    // Cara dapatkan: analytics.google.com → Admin → Data Streams → Web
    const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

    // Fungsi untuk memuat gtag.js dan menginisialisasi GA4
    function initGoogleAnalytics() {
        // Cegah duplikasi script
        if (document.querySelector('script[src*="gtag/js?id="]')) {
            console.log('⚠️ GA4 sudah terload sebelumnya');
            return;
        }

        // 1a. Load library gtag.js
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // 1b. Inisialisasi dataLayer dan fungsi gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag; // Expose ke global

        // 1c. Kirim pageview pertama
        gtag('js', new Date());
        gtag('config', GA4_MEASUREMENT_ID, {
            send_page_view: true
        });

        console.log(`✅ GA4 initialized dengan ID: ${GA4_MEASUREMENT_ID}`);
    }

    // ==========================================================
    // 2. FUNGSI TRACKING CUSTOM EVENT
    // ==========================================================

    function trackEvent(eventName, params = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
            console.log(`📊 Event terkirim: ${eventName}`, params);
        } else {
            console.warn('⚠️ gtag belum siap, event tidak terkirim');
        }
    }

    // ==========================================================
    // 3. DETEKSI PERANGKAT (untuk dikirim ke GA4)
    // ==========================================================

    function getDeviceInfo() {
        const ua = navigator.userAgent || '';
        const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(ua);
        const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua) && !isMobile;
        
        let browser = 'Unknown';
        if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) browser = 'Chrome';
        else if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
        else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
        else if (ua.indexOf('Edg') > -1) browser = 'Edge';
        else if (ua.indexOf('OPR') > -1 || ua.indexOf('Opera') > -1) browser = 'Opera';

        return {
            device_type: isTablet ? 'tablet' : (isMobile ? 'mobile' : 'desktop'),
            browser: browser,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            user_agent: ua
        };
    }

    // ==========================================================
    // 4. FUNGSI TOMBOL KEMBALI
    // ==========================================================

    function buatTombolKembali() {
        const currentPath = window.location.pathname;

        // ✅ HANYA tampil di halaman utama (index)
        const isIndexPage = currentPath === '/' ||
                            currentPath === '/index.html' ||
                            currentPath === '/Landing-page/' ||
                            currentPath === '/Landing-page/index.html';

        // Jika BUKAN halaman utama, tombol & tracking tidak muncul
        if (!isIndexPage) {
            console.log('ℹ️ Bukan halaman utama, tombol & tracking disembunyikan');
            return;
        }

        console.log('✅ Tracking aktif di halaman utama');

        // --- Buat elemen tombol ---
        const tombol = document.createElement('button');
        tombol.textContent = '🏠 Kembali ke Beranda';
        tombol.id = 'tombolKembali';

        // --- Style DASAR (Desktop) ---
        tombol.style.position = 'fixed';
        tombol.style.bottom = '20px';
        tombol.style.right = '20px';
        tombol.style.padding = '12px 24px';
        tombol.style.backgroundColor = '#0366d6';
        tombol.style.color = '#ffffff';
        tombol.style.border = 'none';
        tombol.style.borderRadius = '8px';
        tombol.style.fontSize = '16px';
        tombol.style.fontWeight = 'bold';
        tombol.style.fontFamily = 'Arial, sans-serif';
        tombol.style.boxShadow = '0 4px 16px rgba(3, 102, 214, 0.4)';
        tombol.style.cursor = 'pointer';
        tombol.style.zIndex = '9999';
        tombol.style.transition = 'all 0.3s ease';
        tombol.style.letterSpacing = '0.5px';

        // --- Style RESPONSIF MOBILE (via CSS) ---
        const style = document.createElement('style');
        style.textContent = `
            /* Mobile (≤ 480px) */
            @media (max-width: 480px) {
                #tombolKembali {
                    bottom: 15px !important;
                    right: 15px !important;
                    padding: 8px 14px !important;
                    font-size: 12px !important;
                    border-radius: 6px !important;
                    box-shadow: 0 2px 10px rgba(3, 102, 214, 0.3) !important;
                }
            }
            /* Tablet (481px - 768px) */
            @media (min-width: 481px) and (max-width: 768px) {
                #tombolKembali {
                    bottom: 20px !important;
                    right: 20px !important;
                    padding: 10px 18px !important;
                    font-size: 14px !important;
                }
            }
            /* Hover effect (non-touch) */
            @media (hover: hover) {
                #tombolKembali:hover {
                    transform: scale(1.05);
                    background-color: #024bb3 !important;
                    box-shadow: 0 6px 20px rgba(3, 102, 214, 0.5) !important;
                }
            }
        `;
        document.head.appendChild(style);

        // --- Event Click: Kembali + Tracking ---
        tombol.addEventListener('click', function() {
            // 📊 Track klik tombol ke GA4
            const deviceInfo = getDeviceInfo();
            trackEvent('button_click', {
                button_name: 'kembali_ke_beranda',
                page_url: window.location.href,
                device_type: deviceInfo.device_type,
                browser: deviceInfo.browser
            });

            // 🔥 Aksi navigasi kembali
            const pathSegments = window.location.pathname.split('/').filter(p => p);
            if (pathSegments.length === 0 || pathSegments[0] === 'Landing-page') {
                window.location.href = '/Landing-page/';
            } else {
                const level = pathSegments.length;
                window.location.href = '../'.repeat(level);
            }
        });

        // Tambahkan tombol ke halaman
        document.body.appendChild(tombol);
        console.log('✅ Tombol kembali siap (hanya di halaman utama, responsive)');

        // 📊 Track pageview dengan info perangkat
        const deviceInfo = getDeviceInfo();
        trackEvent('page_view_details', {
            page_title: document.title || 'Landing Page',
            device_type: deviceInfo.device_type,
            browser: deviceInfo.browser,
            screen_resolution: `${deviceInfo.screen_width}x${deviceInfo.screen_height}`
        });
    }

    // ==========================================================
    // 5. EKSEKUSI
    // ==========================================================

    function init() {
        // 5a. Inisialisasi GA4 terlebih dahulu
        initGoogleAnalytics();

        // 5b. Tunggu sebentar agar gtag siap, lalu buat tombol
        // (gtag butuh waktu load, tapi kita tetap jalankan)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                // Beri jeda 200ms agar gtag.js sempat load
                setTimeout(buatTombolKembali, 200);
            });
        } else {
            setTimeout(buatTombolKembali, 200);
        }
    }

    // Jalankan
    init();

})();
