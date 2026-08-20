# Project Progress & Handover Documentation: Portfolio v2 (Deearss)

Dokumentasi ini dibuat untuk merekam status pengerjaan website portofolio **Haidir Aditya (Deearss)** agar dapat dilanjutkan secara mulus di environment lain (seperti PC Windows) tanpa perlu briefing ulang dari nol.

---

## 👤 Profil & Konteks Pemilik
- **Nama**: Haidir Aditya (Dier / Deearss)
- **Role / Headline**: *Systems & Software Engineer*
- **Domisili / Identitas**: Mahasiswa Computer Science, Indonesia
- **Target Domain**: `my.id` (Personal Branding & Freelance Service)
- **Repositori GitHub Portofolio**: `https://github.com/Deearss/portfolio-v2` (Branch: `main`)
- **Repositori Privat Terkait**: `Deearss/kaspul-hudur` (Aplikasi Presensi Custom PWA)

---

## 🛠️ Tech Stack & Konfigurasi Arsitektur
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS utilities (`app/globals.css`)
- **Animasi & Interaktivitas**: Framer Motion (`motion/react`), Lucide React Icons
- **Design System / Branding**:
  - **Material Blue Primary**: `#1565C0`, `#1976D2`, `#42A5F5`, `#E3F2FD`
  - **Neutrals**: Stone (`#FAFAF9`, `#F5F5F4`, `#E7E5E4`, `#1C1917`)
  - **Dark IDE Mode (GitHub Card)**: `#0d1117`, `#161b22`, `#30363d`
  - **Excel Theme (Card 2)**: Microsoft Excel Light Mode `#107C41` dengan font `Calibri, Aptos, 'Segoe UI', sans-serif`
- **Global Rules**:
  - Semua tombol, link, dan elemen interaktif wajib memiliki `cursor: pointer` (sudah dikonfigurasi di `app/globals.css`).
  - Tone komunikasi & copy: Cool Gen-Z style, profesional, to the point, tanpa fluff, tanpa kutipan mentah.

---

## 📐 Struktur Komponen & Status Implementasi

### 1. Header & Navbar (`components/navbar/navbar.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Sticky glassmorphism header (`backdrop-blur-md`).
  - Brand avatar & judul "Haidir Aditya — Systems & Software Engineer".
  - Tombol avatar memiliki fungsi smooth scroll ke atas: `window.scrollTo({ top: 0, behavior: "smooth" })`.
  - Link navigasi anchor: `#projek`, `#workflow`, `#sosmed`, `#kontak`.

### 2. Hero Section (`components/hero/railway-hero.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Background animasi matrix titik-titik bergerak ke bawah (`moveDotsDown`).
  - Animasi typewriter cepat (25ms forward, 12ms delete, 2s pause) dengan teks value proposition dinamis.
  - Headline utama tebal & tegas: *Haidir Aditya — Systems & Software Engineer*.
  - Call-to-action ganda: *Diskusi Projek via WhatsApp* dan *Lihat Portofolio* (scroll ke `#projek`).

### 3. GitHub Bento Card (`components/github/github-stats-card.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Data profil sinkron real-time via GitHub API `https://api.github.com/users/Deearss` (`bio`, `avatar`, `repos`).
  - Container Dark Mode IDE dengan efek drop shadow melayang tebal (`shadow-[0_8px_40px_rgba(0,0,0,0.45)]`) agar kontras terhadap canvas putih Hero.
  - AI Collaborator Badges: Avatar bulat Claude & Google Antigravity dengan custom dark tooltip.
  - Yearly Activity Heatmap Grid: 4 baris (minggu) × 12 kolom (Jan–Des 2026) dengan tooltip rentang tanggal akurat per sel dan level aktivitas commit.
  - Terminal Footer autentik: `$ git log --oneline -1 → a3f7b2c feat: overhaul hero section...`.

### 4. Showcase Kemampuan Ril (`components/projects/project-deck-carousel.tsx`)
- **Status**: ✅ **Selesai & Teruji** (Mengalir secara vertikal dari atas ke bawah, **tanpa carousel**)
- **Header Section**: *"Haidir Bisa Ngapain Aja?"* (Subjudul: *"Dari landing page modern hingga restrukturisasi pembukuan & permak file Excel berantakan."*).
- **2 Bagian Utama**:
  1. **01. Landing Page buatan Haidir**:
     - 3 kartu melayang motif kipas (*fanned cards deck*).
     - Menampilkan screenshot hero section asli:
       - **Kiri**: *Jasa AC Skala Proyek & Gedung* (`/showcase/ac.png` -> `demo-jasa-ac.netlify.app`)
       - **Tengah (Lebih Besar / Dominan)**: *Wedding & Event Organizer* (`/showcase/wedding.png` -> `demo-wedding-organizer.netlify.app`)
       - **Kanan**: *Langganan Es Batu Kristal* (`/showcase/es-batu.png` -> `demo-es-batu.netlify.app`)
     - Dilengkapi tombol direct link *Live Demo* ke masing-masing website Netlify.
  2. **02. Restrukturisasi Pembukuan Usaha (`components/projects/excel-before-after.tsx`)**:
     - Komponen interaktif Light Mode khas Microsoft Excel (`#107C41`) dengan font autentik `Calibri`.
     - Skenario nyata pembukuan & stok **Toko Sembako** (Beras Premium, Minyak Goreng, Gula Pasir).
     - Toggle *Sebelum (File Berhamburan)* vs *Sesudah (Dipermak Rapi)* yang menunjukkan perbaikan error `#VALUE!`, otomatisasi omset harian (`Rp 1.876.000`), dan rekap stok terstruktur.

### 5. Alur Kerja / General Workflow (`components/workflow/general-workflow.tsx`)
- **Status**: ✅ Selesai (5 langkah transparan dari konsultasi awal, penentuan alur, eksekusi, review, hingga serah terima).

### 6. Rich Social & Official Profiles (`components/socials/rich-social-cards.tsx`)
- **Status**: ✅ Selesai (Kartu profil GitHub `@Deearss`, LinkedIn, dan Projects.co.id `dier-dieeerrr`).

### 7. Interactive Consultation & Contact Form (`components/contact/whatsapp-form.tsx`)
- **Status**: ✅ Selesai
- **Fitur**:
  - Segmented toggle dinamis antara **WhatsApp Chat** dan **Email Draft**.
  - **Dynamic Theme Adaptation**:
    - **Mode WhatsApp**: Tema aksen emerald `#25D366`, badge WA direct channel, form fokus hijau, preview autentik **WhatsApp Web Dark Mode** (Header dengan avatar Haidir & status online tanpa tombol call/search/menu, dark doodle canvas `#0b141a`, sent bubble hijau `#005c4b` dengan status read tick `✓✓`, dan chat bar bawah `+`, `🙂`, `Type a message`, `🎤`), direct link `https://wa.me/NOMOR-WA-DIHAPUS-DARI-RIWAYAT`.
    - **Mode Email**: Tema aksen indigo `#6366F1`, badge official email channel, form fokus indigo, preview compose window email (Kepada, Subjek, dan body tersusun rapi), direct link `mailto:kontak-dihapus@contoh.invalid`.
  - Tombol **Salin Teks / Draf** dengan feedback toast "Tersalin!".
  - Catatan keamanan & reassurance interaktif (tidak langsung terkirim tanpa konfirmasi user).

### 8. Footer (`components/footer/footer.tsx`)
- **Status**: ✅ Selesai (Branding ringkas, link sosial media, dan tombol scroll-to-top).

---

## 🚀 Panduan Menjalankan Projek di PC Windows

1. **Clone / Pull Repositori**:
   ```bash
   git pull origin main
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser.

4. **Verifikasi Build & Linter**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 📌 Checklist / Rencana Selanjutnya untuk Antigravity di PC Windows

- [ ] Lakukan review responsive testing di resolusi layar mobile / tablet.
- [ ] Sesuaikan copy teks atau link portofolio jika ada tambahan projek baru di masa mendatang.
- [ ] Optimasi aset gambar showcase (jika ingin format WebP / SVG tambahan).
- [ ] Setup deployment otomatis di Netlify / Vercel dengan custom domain `my.id`.
