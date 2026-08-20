# 📋 SURAT TUGAS: IMPLEMENTASI FITUR TRANSISI & SHOWCASE EVOLUSI PORTOFOLIO

> **Pemberi Tugas**: Haidir Aditya (Dier / Deearss) — *Systems & Software Engineer*  
> **Projek**: `portfolio-v2` (Next.js 16 App Router, Tailwind CSS v4, TypeScript, Lucide React)  
> **Tujuan**: Membuat transisi pembuka (~5 detik) interaktif yang memperlihatkan progres kemampuan dari website lawas ("burik" 2 tahun lalu) menuju website modern saat ini.

---

## 🎯 1. Latar Belakang & Konteks

Haidir ingin memberikan *storytelling / progression showcase* kepada pengunjung saat pertama kali masuk ke website portofolionya. Tujuannya adalah mengedukasi pengunjung bahwa kemampuan engineering Haidir adalah hasil dari proses belajar dan bertumbuh yang konsisten, bukan hasil instan.

### Data Website:
1. **Website Lawas (2 Tahun Lalu / ~2023 - 2024)**:
   - **URL Live**: [`https://biodata-vert.vercel.app`](https://biodata-vert.vercel.app)
   - **Repo GitHub**: [`https://github.com/Deearss/biodata`](https://github.com/Deearss/biodata)
   - **Ciri Khas**: Tampilan warna hijau toska terang, foto masa SMA berkacamata hitam, badge meme "MEMBERI LAIKS", HTML + JS dasar sederhana.
   - **Aset Screenshot**: Tersedia di `public/evolution/biodata-2023.png`.
2. **Website Baru (Sekarang / 2026)**:
   - **Tech Stack**: Next.js 16, TypeScript, Tailwind CSS v4, arsitektur modular, interaktif (Live GitHub Activity, Demo Excel Before-After, WhatsApp Form Interactive, General Workflow Carousel).
   - **Persona**: *Systems & Software Engineer*.

---

## 📐 2. Spesifikasi Kebutuhan Fitur (Requirements)

### A. Mekanisme & Alur Animasi
1. **Trigger Awal (Slide/Drawer/Overlay dari Bawah)**:
   - Saat pengunjung membuka halaman pertama kali, muncul animasi transisi/slider dari bawah layar yang memperkenalkan versi website lama.
2. **Durasi Showcase (~5 Detik)**:
   - Durasi penayangan sekitar 5 detik sebelum otomatis meluncur turun kembali (slide-down) dan memperlihatkan website baru yang modern secara utuh.
   - Dilengkapi visual countdown timer / progress bar.
   - *(Opsional/Disarankan)*: Hover/interaksi pengunjung dapat menjeda (pause) timer agar pengunjung bisa melihat lebih leluasa jika berminat.
3. **Fitur Skip (Lewati) & Persistensi `localStorage`**:
   - Wajib ada tombol **"Lewati / Skip"** agar pengunjung yang buru-buru tidak terhambat.
   - Status penayangan disimpan di `localStorage` (misal: `portfolio_evolution_seen`), sehingga saat pengunjung merefresh website, transisi 5 detik ini **TIDAK MUNCUL LAGI**.
4. **Pemicu Ulang (Replay Trigger)**:
   - Sediakan tombol pemicu manual (misal di Footer atau Navbar) dengan teks seperti `"Lihat Versi Lawas / Evolusi Web"`, agar pengunjung yang penasaran tetap bisa memutar ulang transisinya kapan saja.

---

## 🎨 3. Ekspektasi Kualitas Desain (Design Expectations)

- **Jangan Buat Modal Kaku / Pop-up Mengganggu**: Transisi harus terasa seperti intro sinematik / sliding showcase yang halus, modern, dan bernilai estetika tinggi.
- **Kombinasi Elemen**:
  - Tampilkan cuplikan visual web lama (`public/evolution/biodata-2023.png` atau iframe/mockup).
  - Tampilkan perbandingan transformasi (contoh: *2023: HTML/JS Dasar* ➔ *2026: Systems & Software Engineer*).
- **Animasi 60 FPS**: Transisi masuk dan keluar wajib menggunakan CSS transforms / spring animation yang mulus tanpa lag.

---

## 📁 4. Struktur File Terkait

```text
portfolio-v2/
├── app/
│   ├── layout.tsx
│   └── page.tsx                      <-- Lokasi pemasangan komponen transisi
├── components/
│   ├── evolution/                    <-- Tempat komponen baru dibuat
│   │   └── (buat komponen transisi di sini)
│   ├── footer/
│   │   └── footer.tsx                <-- Pasang tombol trigger replay di sini
│   └── hero/
│       └── railway-hero.tsx
└── public/
    └── evolution/
        └── biodata-2023.png          <-- Screenshot web lawas
```

---

## 💡 5. Catatan untuk AI Selanjutnya

- Jangan membuat dialog / alert / modal pop-up standar yang menutupi layar secara kaku.
- Utamakan kenyamanan UX (fitur skip harus responsif dan mudah dijangkau).
- Pastikan kompatibel dan responsif baik di layar mobile maupun desktop.
- Jalankan verifikasi `npx tsc --noEmit` setelah kode selesai diimplementasikan.
