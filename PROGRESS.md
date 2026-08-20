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
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS utilities (`app/globals.css`)
- **Animasi & Interaktivitas**: Framer Motion, Lucide React Icons, React Icons
- **Design System / Branding**:
  - **Material Blue Primary**: `#1565C0`, `#1976D2`, `#42A5F5`, `#E3F2FD`
  - **Neutrals**: Stone (`#FAFAF9`, `#F5F5F4`, `#E7E5E4`, `#1C1917`)
  - **Dark IDE Mode (GitHub Card)**: `#0d1117`, `#161b22`, `#30363d`
  - **Excel Theme (Showcase 2)**: Microsoft Excel Light Mode `#107C41`
- **Keamanan & Privasi**:
  - Zero hardcoded contact credentials di repo publik.
  - Menggunakan server-side environment variable `WHATSAPP_PHONE` dan client env `NEXT_PUBLIC_CONTACT_EMAIL`.
  - Template konfigurasi tersedia di `.env.example`.

---

## 📐 Struktur Komponen & Status Implementasi

### 1. Header & Navbar (`components/navbar/navbar.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Sticky glassmorphism header (`backdrop-blur-md`).
  - Brand avatar & judul "Haidir Aditya — Systems & Software Engineer".
  - Link navigasi anchor: `#projek`, `#workflow`, `#sosmed`, `#kontak`.

### 2. Hero Section (`components/hero/railway-hero.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Background animasi matrix titik-titik bergerak ke bawah (`moveDotsDown`).
  - Animasi typewriter cepat dengan teks value proposition dinamis.
  - Headline tegas: *Haidir Aditya — Systems & Software Engineer*.
  - Call-to-action ganda: *Diskusi Projek* dan *Lihat Portofolio*.

### 3. GitHub Bento Card (`components/github/github-stats-card.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Sinkronisasi live activity log dari GitHub API `Deearss`.
  - Layout baris header item rapat (`gap-2`) dan `truncate` agar timestamp (`timeAgo`) tetap 1 baris & tinggi ketiga card simetris.
  - Container Dark Mode IDE dengan efek drop shadow tebal.
  - Yearly Activity Heatmap Grid 2026 dengan tooltip interaktif.

### 4. Showcase Kemampuan Ril (`components/projects/project-deck-carousel.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **2 Bagian Utama**:
  1. **Landing Page buatan Haidir**:
     - 3 kartu melayang motif kipas (Jasa AC, Wedding Organizer, Es Batu Kristal).
     - Tombol live demo ke masing-masing subdomain Netlify.
  2. **Restrukturisasi Pembukuan Usaha (`components/projects/excel-before-after.tsx`)**:
     - Simulasi sheet Excel toko sembako dengan toggle Sebelum vs Sesudah.
     - Callout rapi dan minimalis (badge redundan sudah dibersihkan).

### 5. Alur Kerja / General Workflow (`components/workflow/general-workflow.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Judul: *"Gimana Cara Saya Ngerjain Tugasmu?"* (Copywriting sopan & profesional bergaya buku non-fiksi).
  - Carousel horizontal full-width di desktop dengan kartu lebar (`400px` - `440px`).
  - Fitur seret mouse/touch drag mulus dengan momentum snap.
  - Ilustrasi SVG 1:1 di `public/roadmap-image/alur-1.svg` s/d `alur-5.svg` dengan proporsi pas tanpa terpotong di bagian bawah.

### 6. Official Platforms & Social Cards (`components/socials/rich-social-cards.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Ikon resmi SVG (`icon-linkedin.svg`, `icon-projectscoid.svg`).
  - Kedua kartu memiliki lebar dan tinggi simetris (`max-w-4xl`, `items-stretch`).
  - Copywriting terarah: menginformasikan pengunjung diarahkan ke halaman Profil Projects.co.id.

### 7. Interactive Consultation & Contact Form (`components/contact/whatsapp-form.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Toggle segmented: **WhatsApp Chat** (Dark Mode Web UI) vs **Email Draft** (Gmail Compose UI).
  - Tampilan *Penerima* menggunakan badge nama resmi (`Haidir Aditya (Email Resmi)`), tanpa mengekspos email mentah.
  - Tooltip tombol reset draf rata kanan (`right-0`) sehingga tidak terpotong tepi container.
  - Server-side route handler `/api/contact/whatsapp` dengan sanitasi input ketat.

### 8. Footer (`components/footer/footer.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**: Branding minimalis, ikon media sosial resmi (`longicon-github.svg`, `longicon-linkedin.svg`, `longicon-projectscoid.svg`), dan tombol scroll-to-top.

### 9. Rencana Fitur Transisi Evolusi Portofolio
- **Status**: 📝 **Surat Tugas Siap** (`SURAT_TUGAS_TRANSISI_EVOLUSI.md`)
- **Aset**: Tangkapan layar web lama tersimpan di `public/evolution/biodata-2023.png`.
- **Target**: Transisi pembuka 5 detik yang menceritakan perjalanan dari `biodata-vert.vercel.app` (2023) ke versi 2026.

---

## 🔑 Environment Variables Checklist

| Variable Name | Keterangan | Lokasi Konfigurasi |
| :--- | :--- | :--- |
| `WHATSAPP_PHONE` | Nomor WhatsApp tujuan (Format internasional tanpa '+') | Netlify Dashboard & `.env.local` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Alamat email tujuan konsultasi | Netlify Dashboard & `.env.local` |

---

## 🚀 Perintah Verifikasi
```bash
# Linter resmi
npm run lint

# Build produksi
npm run build
```
