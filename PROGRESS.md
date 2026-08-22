# Project Progress & Handover Documentation: Portfolio v2 (Deearss)

Dokumentasi ini dibuat untuk merekam status pengerjaan website portofolio **Haidir Aditya (Deearss)** agar dapat dilanjutkan secara mulus di sesi selanjutnya tanpa perlu briefing ulang dari nol.

---

## 👤 Profil & Konteks Pemilik
- **Nama**: Haidir Aditya (Dier / Deearss)
- **Role / Headline**: *Systems & Software Engineer*
- **Domisili / Identitas**: Mahasiswa Computer Science, Indonesia
- **Target Domain**: `my.id` (Personal Branding & Freelance Service)
- **Repositori GitHub Portofolio**: `https://github.com/Deearss/portfolio-v2` (Branch: `main`)
- **Repositori Terkait**: `Deearss/biodata` (Website portofolio lama di `https://biodata-vert.vercel.app`)

---

## 🛠️ Tech Stack & Konfigurasi Arsitektur
- **Framework**: Next.js 16 (App Router, Static Export `output: "export"`), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS utilities (`app/globals.css`)
- **Tipografi**: `Plus Jakarta Sans` (`next/font/google` dengan `display: "swap"`)
- **Icon & Gambar**: Native WebP + SVG Vector, Lucide React Icons
- **Design System / Branding**:
  - **Hero Section**: Solid Dark IDE (`#0d1117`, `#161b22`, `#30363d`), Brand Blue `#58a6ff` & `#1f6feb`
  - **Material Blue Primary**: `#1565C0`, `#1976D2`, `#42A5F5`, `#E3F2FD`
  - **Neutrals**: Stone (`#FAFAF9`, `#F5F5F4`, `#E7E5E4`, `#1C1917`)
  - **Excel Theme (Showcase 2)**: Microsoft Excel Light Mode `#107C41`
- **Keamanan & Privasi**:
  - Nomor WhatsApp **tidak ada di repo maupun di bundle browser**. Tombol WA
    nunjuk ke `/go/wa`, sebuah Netlify Function (`netlify/functions/wa.mts`)
    yang baca `WHATSAPP_PHONE` dari env server lalu balikin redirect 302 ke
    `wa.me`. Teksnya dibersihin dari karakter kontrol (cegah suntik header
    `Location`) dan dipotong di 1.200 karakter.
  - **Batas yang jujur:** pengunjung yang mengklik tombolnya tetap lihat
    nomornya di bilah alamat setelah diarahkan — itu memang nggak bisa
    dihindari, karena WhatsApp butuh nomor tujuan. Yang dicegat adalah
    pemanen otomatis yang cuma baca HTML/JS halaman. Nomor lama juga masih
    tersimpan di riwayat git (commit `e4e20fe`, 20 Agt 2026) dan cuma bisa
    hilang lewat penulisan ulang riwayat.
  - `NEXT_PUBLIC_CONTACT_EMAIL` memang dibaca browser, jadi wajar ikut bundle.
  - Template konfigurasi tersedia di `.env.example`.
  - Konsekuensi buat development: tombol WhatsApp **nggak jalan di
    `next dev` biasa**, karena Netlify Function cuma hidup waktu dideploy
    atau waktu dijalanin lewat `npx netlify dev`.

---

## 📐 Struktur Komponen & Status Implementasi

### 1. Header & Navbar (`components/navbar/navbar.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Dynamic scroll transparency: 100% transparan di posisi atas Hero, beralih ke `backdrop-blur-md` saat di-scroll.
  - Brand avatar & judul "Haidir Aditya — Systems & Software Engineer".
  - Link navigasi anchor: `#projek`, `#workflow`, `#sosmed`, `#kontak`.

### 2. Hero Section (`components/hero/railway-hero.tsx`)
- **Status**: ✅ **Selesai & Teruji (Super Kencang & Ringan)**
- **Fitur**:
  - Latar solid Dark `#0d1117` tanpa background matrix dot yang membebani CPU/GPU mobile.
  - Value proposition statis yang to-the-point dan mudah dibaca.
  - Headline tegas: *Haidir Aditya — Systems & Software Engineer* (`#58a6ff`).
  - Call-to-action ganda: *Diskusi Projek* dan *Lihat Portofolio*.

### 3. GitHub Bento Card (`components/github/github-stats-card.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Sinkronisasi live activity log dari GitHub API `Deearss`.
  - Avatar AI Claude & Google Antigravity transparan murni tanpa background kotak hitam.
  - Container Dark Mode IDE dengan efek drop shadow tebal.
  - Yearly Activity Heatmap Grid 2026 dengan tooltip interaktif.

### 4. Showcase Kemampuan Ril (`components/projects/project-deck-carousel.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **2 Bagian Utama**:
  1. **Landing Page buatan Haidir**:
     - 3 kartu melayang motif kipas (Jasa AC, Wedding Organizer, Es Batu Kristal) berbasis format WebP (~58 KB).
     - Tombol live demo ke masing-masing subdomain Netlify dengan `aria-label` aksesibilitas.
  2. **Restrukturisasi Pembukuan Usaha (`components/projects/excel-before-after.tsx`)**:
     - Simulasi sheet Excel toko sembako dengan toggle Sebelum vs Sesudah.
     - Callout rapi, minimalis, dan berlabel aksesibilitas lengkap.

### 5. Alur Kerja / General Workflow (`components/workflow/general-workflow.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Judul: *"Gimana Cara Saya Ngerjain Tugasmu?"*.
  - Carousel horizontal full-width di desktop dengan kartu lebar (`400px` - `440px`).
  - 5 Ilustrasi WebP line art berlatar transparan (total hanya ~370 KB, turun 95% dari 7.02 MB).
  - Menggunakan `<Image />` dari `next/image` dengan native `loading="lazy"`.

### 6. Official Platforms & Social Cards (`components/socials/rich-social-cards.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Ikon resmi LinkedIn (`icon-linkedin.webp`) dan Projects.co.id (`icon-projectscoid.webp`) bersih & tajam.
  - Kedua kartu memiliki lebar dan tinggi simetris (`max-w-4xl`, `items-stretch`).
  - Hirarki heading `h3` yang sesuai standar SEO & WCAG.

### 7. Interactive Consultation & Contact Form (`components/contact/whatsapp-form.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Toggle segmented: **WhatsApp Chat** vs **Email Draft**.
  - Tampilan *Penerima* menggunakan badge nama resmi (`Haidir Aditya (Email Resmi)`).
  - Server-side route handler `/api/contact/whatsapp` dengan sanitasi input ketat.

### 8. Footer (`components/footer/footer.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**: Branding minimalis, ikon media sosial resmi transparan (`longicon-github.webp`, `longicon-linkedin.webp`, `longicon-projectscoid.webp`), dan tombol scroll-to-top.

### 9. Rencana Fitur Transisi Evolusi Portofolio
- **Status**: 📝 **Ditunda (Sesuai Arahan User Sesi Ini Tidak Disentuh)**
- **Aset**: Tersimpan aman di `public/evolution/biodata-2023.png`.

---

## 📱 Status Optimasi Responsivitas Mobile (Samsung Galaxy S8+ 360×740)
- **Status**: ✅ **Selesai & Teruji Mulus**
- **Cakupan Optimasi**:
  1. **Navbar**: Mobile drawer navigation & scaling brand badge anti-overflow.
  2. **Hero & GitHub Card**: Penataan CTA full-width mobile, padding ergonomis, reposisi badge AI commit stream, dan smooth touch-pan heatmap.
  3. **Showcase Landing Page**: Adaptive Dual-Layout (Interactive Touch Card Deck di mobile, 3D Fanned Cards di desktop).
  4. **Excel Before-After**: Ribbon responsif, toggle pills simetris, dan table touch scrolling.
  5. **General Workflow**: Ilustrasi proporsional `h-52` (tidak memakan 100% viewport) dan touch drag snap.
  6. **Social & Contact Form**: Tooltip sticky-hover dinonaktifkan di mobile, modal safe-scrolling `max-h-[85vh]` saat virtual keyboard aktif, dan `scroll-mt` di semua anchor link.

---

## 🔑 Environment Variables Checklist

| Variable Name | Keterangan | Lokasi Konfigurasi |
| :--- | :--- | :--- |
| `WHATSAPP_PHONE` | Nomor WhatsApp tujuan (format internasional tanpa '+'). **Server-side only** — dibaca `netlify/functions/wa.mts`, sengaja tanpa awalan `NEXT_PUBLIC_` | Netlify Dashboard & `.env.local` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Alamat email tujuan konsultasi | Netlify Dashboard & `.env.local` |

---

## 🎯 Agenda Sesi Selanjutnya (Next Session)
- **Fokus**: Implementasi Fitur Transisi & Showcase Evolusi Portofolio (sesuai dokumen `SURAT_TUGAS_TRANSISI_EVOLUSI.md`) jika diinstruksikan oleh user.

---

## 🚀 Perintah Verifikasi
```bash
# Type check resmi
npx tsc --noEmit

# Audit aksesibilitas lokal (ringan & cepat)
npm run audit:a11y

# Build produksi
npm run build
```
