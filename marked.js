function tampilkanMarkdownDiHalaman() {
    const data = trackUserInfo();
    const markdown = `# Laporan Tracking\n- **Device:** ${data.device}\n- **Browser:** ${data.browser}\n- **OS:** ${data.os}\n- **Kunjungan:** ${data.estimatedVisitorCount}`;
    
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed; bottom:150px; right:30px; background:#1e1e1e; color:#d4d4d4; padding:15px; border-radius:8px; font-family:monospace; font-size:13px; max-width:300px; z-index:9998; white-space:pre-wrap; border: 1px solid #444;';
    box.textContent = markdown; // Tampilkan sebagai teks biasa
    document.body.appendChild(box);
}
