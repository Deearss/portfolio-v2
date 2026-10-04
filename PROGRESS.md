# Project Progress & Handover Documentation: Portfolio v2 (Deearss)

Dokumentasi ini dibuat untuk merekam status pengerjaan website portofolio **Haidir Aditya (Deearss)** agar dapat dilanjutkan secara mulus di sesi selanjutnya tanpa perlu briefing ulang dari nol.

---

## 👤 Profil & Konteks Pemilik
- **Nama**: Haidir Aditya (Dier / Deearss)
- **Role / Headline**: *Fullstack Developer*
- **Domisili / Identitas**: Mahasiswa Computer Science, Indonesia
- **Target Domain**: `my.id` (Personal Branding & Freelance Service)
- **Repositori GitHub Portofolio**: `https://github.com/Deearss/portfolio-v2` (Branch: `main`)
- **Repositori Terkait**: `Deearss/biodata` (Website portofolio lama di `https://biodata-vert.vercel.app`)

---

## 🛠️ Tech Stack & Konfigurasi Arsitektur
- **Framework**: Next.js 16 (App Router, Static Export `output: "export"`), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS utilities (`app/globals.css`)
- **Tipografi**:
  - `Cactus Classical Serif` (Body text, paragraf, tombol, link)
  - `Source Serif 4` (Headings h1-h6, highlight text, weight 600 slender)
- **Desain & Tema (Warm Pebble & Anthropic Minimalist UI)**:
  - Palet: `#FAF7F2` (Latar utama), `#E3DDD5` (Border tipis), `#B8AEA4` (Aksen netral), `#7A6F66` (Teks sekunder), `#2D2A28` (Charcoal gelap teks/tombol), `#c48b6d` (Almond Nuts untuk highlight selection teks)
  - Text Selection: Menggunakan `::selection` custom dengan warna almond nuts `#c48b6d` dan teks `#FAF7F2` (menggantikan warna biru default browser).
  - Prinsip: Bersih, lapang, tanpa glassmorphism, tanpa badge spam, tanpa bayangan neobrutalisme kaku.
- **Icon & Gambar**: Native WebP + SVG Vector, Lucide React Icons
- **Keamanan & Privasi**:
  - **Nomor WhatsApp dan alamat email dua-duanya nggak ada di repo maupun di
    bundle browser.** Tombolnya nunjuk ke `/go/wa` dan `/go/email`; perantara
    di sisi server yang baca `WHATSAPP_PHONE` / `CONTACT_EMAIL` dari env lalu
    balikin redirect 302 ke `wa.me` / Gmail compose.
  - Logikanya satu berkas, `lib/kontak-redirect.ts`, dipakai bareng oleh dua
    pintu masuk supaya nggak bisa diam-diam beda perilaku:
    `netlify/functions/*.mts` (produksi) dan `app/go/*/route.dev.ts` (waktu
    `npm run dev`). Berkas `route.dev.ts` cuma dikenali sebagai route waktu
    dev — lihat `pageExtensions` di `next.config.ts`.
  - Masukan dibersihin dari karakter kontrol sebelum nempel di header
    `Location` (cegah suntik header), isi dipotong di 1.200 karakter, subjek
    di 200. Jawabannya `cache-control: no-store, private` supaya nggak
    nyangkut di CDN atau cache peramban.
  - Dua env var itu **sengaja tanpa awalan `NEXT_PUBLIC_`**. Awalan itu bikin
    Next.js nyelipin nilainya ke bundle yang diunduh tiap pengunjung.
  - **Batas yang jujur:** pengunjung yang beneran mengklik tombolnya tetap
    lihat nomor/email di bilah alamat setelah diarahkan — memang nggak bisa
    dihindari, WhatsApp dan Gmail butuh alamat tujuan. Yang dicegat adalah
    pemanen otomatis yang cuma baca HTML/JS halaman.

---

## 📐 Struktur Komponen & Status Implementasi (Evolusi Sesi Ini)

### 1. Header & Navbar (`components/navbar/navbar.tsx`)
- **Status**: ✅ **Selesai & Teruji (Minimalist UI)**
- **Fitur**:
  - Mengadaptasi layout Luputer: Logo "Deearss" di kiri, menu navigasi `ABOUT`, `SKILLS`, `WORK`, `CONTACT` di tengah, dan CTA `HIRE ME` di kanan.
  - Teks navigasi dikalibrasi ke ukuran sweet spot `text-xs font-semibold tracking-widest` (12px) dengan kontras tegas dan keterbacaan tinggi.
  - Tombol CTA `HIRE ME` dilengkapi ikon `UserPlus` dari `lucide-react` (`w-3.5 h-3.5`, `strokeWidth={1.8}`) dengan posisi center vertikal presisi (`leading-none`).
  - Gaya visual 100% Minimalist UI: Tombol charcoal padat, border 1px stone, bebas efek neobrutalisme / drop-shadow blok.
  - Solid background `#FAF7F2` tanpa backdrop-blur (sesuai aturan no-glassmorphism).

### 2. Hero Section (`components/hero/railway-hero.tsx`)
- **Status**: ✅ **Selesai & Terkalibrasi Penuh (English Copy & Clean Styling)**
- **Fitur**:
  - **Layout 2-Kolom Responsif**: Sisi kiri untuk identitas dan aksi, sisi kanan untuk Profile Card Chibi.
  - **Status Remote & Open to Work (No Pill Badge)**: Kedua indikator kesiapan (di sisi kiri *"Available for Remote Work"* dan di kartu profil *"Open to Work"*) diformat sebagai teks murni bersanding dengan ikon Rocket presisi, 100% bebas dari kontainer kapsul, border tambahan, maupun green dot.
  - **Headline & Role (English & Animated)**: *"Hi, I'm Haidir Aditya"* dilengkapi animasi garis bawah (underline) yang meluncur halus dari kiri ke kanan saat halaman pertama kali dimuat (`scaleX(0)` ke `scaleX(1)` via GPU transform), dipadu peran *"Fullstack Developer"*.
  - **Tagline Disiplin Engineering**: *"I build scalable web apps with a rigorous Definition of Done and clean systems architecture. Powered by modern AI tools daily."*
  - **3 Tombol Aksi Terkalibrasi (Adaptive Mobile Ordering)**:
    - Di layar desktop: Urutan tetap berjajar horizontal (*View My Work* -> *Get In Touch* -> *Download CV*).
    - Khusus mode mobile: Tombol *Download CV* otomatis naik ke posisi paling atas (`order-1 w-full`), diberikan jarak ekstra lega (`mb-2.5`), sedangkan tombol *View My Work* dan *Get In Touch* berada di bawahnya membagi baris secara simetris (`flex-1`).
    - Skema warna: *View My Work* (solid charcoal `#2D2A28`), *Get In Touch* (outline stone `#B8AEA4`, hover putih terang), dan *Download CV* (almond hangat `#e49a4c`).
  - **Ikon Sosial Tanpa Kotak**: Tiga ikon (GitHub `@Deearss`, LinkedIn, Email relay) borderless langsung dapat diklik dengan ukuran lebih besar (`w-5 h-5 sm:w-6 sm:h-6`).
  - **Tipografi & Ikon Simetris Mobile**: Khusus tampilan mobile (`< sm`), header status, judul utama, role, tagline, serta deretan tombol sosial diformat rata tengah (`items-center text-center justify-center`) agar harmonis dan simetris dengan tombol aksi dan kartu profil di bawahnya. Pada layar desktop (`sm:`), perataan tetap rata kiri elegan.
  - **Background Canvas Bersih (Solid Warm Pebble)**: Berdasarkan evaluasi visual langsung, tekstur grafis dibatalkan demi mempertahankan estetika minimalis yang tenang, lapang, dan kontras tajam dengan warna dasar `#FAF7F2` tanpa noise/glitch.
  - **Chibi Profile Card**: Avatar chibi duduk natural tanpa garis border lingkaran tambahan, header status *"Open to Work"* dengan ikon Rocket, lokasi *"Banjarmasin, Indonesia"*, serta kontak terproteksi via proxy (`/go/wa` dan `/go/email`).

### 2b. My Education Section (`components/about/about-section.tsx`)
- **Status**: ✅ **Selesai & Teruji (Side-by-Side 50:50 Dual Education Cards, 100% English)**
- **Fitur**:
  - Konteks resmi dialihkan dari klaim generic menjadi **"My Education"**, berfokus murni pada rekam jejak akademis dan pengalaman nyata belajar IT.
  - Bahasa: 100% natural US English, bebas klaim angka fiktif maupun em-dash.
  - Kartu 1 (Kiri): **Higher Education (B.S. in Computer Science)** di Universitas Islam Kalimantan MAB, Banjarmasin (Aktif, 2024 - Sekarang). Mengulas pendalaman rekayasa database relasional dan Object-Oriented Architecture (PBO).
  - Kartu 2 (Kanan): **Vocational High School (Software Engineering / RPL)** di SMK Negeri 4 Banjarmasin (Lulus, 2021 - 2024). Mengabadikan pencapaian Uji Kompetensi Keahlian (UKK) membangun aplikasi kasir web offline (multi-role admin & staff, CRUD barang & pelanggan, transaksi) secara mandiri dengan CSS murni dan PHP tanpa bantuan AI sama sekali di bawah penilaian penguji eksternal industri.
  - Navigasi: Menu navbar desktop dan drawer mobile disinkronkan menjadi `EDUCATION` (`#education`).
  - Tipografi paper: Header kartu diformat ala paper akademik (kategori di atas, judul degree tebal, nama institusi, lokasi, dan masa pendidikan teks murni tanpa kotak) dipadu deskripsi ikhtisar `text-justify`.
  - Desain adaptif: Berjajar 2 kartu sejajar tinggi simetris (`items-stretch`, `lg:grid-cols-2`) di desktop dan bertumpuk proporsional di layar mobile.

### 3. Skills Section (`components/skills/skills-section.tsx`)
- **Status**: ✅ **Selesai & Teruji (1-Row 4 Flat Warm Pebble Cards + Peeking Themed Chibi Avatars)**
- **Fitur**:
  - **Brand Avatar Peeking**: Mengintegrasikan avatar chibi hitam-putih khas Dier yang menyembul dari balik tiap kartu (`z-0`, bagian badan tersembunyi di balik kartu, seluruh kepala, wajah tersenyum, dan dagu mencuat jelas ke atas kanvas dengan offset terkalibrasi `pt-14 sm:pt-[70px]`) dengan micro-interaksi angkat saat kartu di-hover (`group-hover:-translate-y-2.5`):
    - **Frontend**: Avatar chibi memakai topi seniman (*artist beret* — visual/UI designer).
    - **Backend**: Avatar chibi memakai headset developer lengkap dengan mic (real-time/API engineer).
    - **Databases**: Avatar chibi default asli (rambut ikal signature Dier dengan kacamata baca bulat dan senyum natural).
    - **DevOps**: Avatar chibi memakai topi insinyur proyek (*engineer work cap*).
  - Mengadaptasi estetika lembaran kertas arsitektur yang ditempel (*pasted paper sheet*) dengan sudut siku tajam murni (`rounded-none`), border tipis 1px (`#DDD5C7`), latar kartu warm pebble lembut (`#FAF7F2`), dan **tanpa bayangan drop-shadow**.
  - Format pohon dependensi sub-cabang dihilangkan total; setiap teknologi hanya tampil 1 kali.
  - Header section diperkaya berbobot:
    - Overline mini teks: `PERALATAN & FONDASI TEKNIS` (uppercase, tracking-widest, `#7A6F66`).
    - Judul utama: `Techstack` (`text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight`).
    - Teks deskripsi adaptif: 2 baris ringkas di mobile (`block sm:hidden`) dan 2 baris proporsional di desktop (`hidden sm:inline`).
  - Judul tiap kartu disederhanakan murni:
    - **Frontend**: Next.js, Astro.js, React.js, TypeScript, Tailwind CSS, JavaScript, HTML5 & CSS3 (7 items).
    - **Backend**: Node.js, PHP, Laravel, RESTful API, Route & Middleware, Schema Validation, Webhook (7 items).
    - **Databases**: PostgreSQL, MySQL, SQLite, Relational Schema, Query Optimization, Database Indexing (6 items).
    - **DevOps**: Linux Ubuntu, Git, GitHub, SSH, Cloudflare, Vercel, Netlify (7 items).
  - Layout adaptif:
    - **Mobile (<1024px)**: 2 kolom kartu (`grid-cols-2`) dengan padding `p-3`, font `text-[11px]`, dan jarak vertikal antar-baris `gap-y-12 sm:gap-y-14` memberi ruang leluasa bagi avatar baris kedua untuk menyembul tanpa tabrakan.
    - **Desktop (>=1024px)**: 1 baris sejajar 4 kartu (`lg:grid-cols-4`, container `max-w-4xl`, celah `gap-3`).
  - Micro-icon monokromatik resmi (`react-icons/si` dan `lucide-react`) dengan hover transisi deep roasted almond kontras tinggi (`#8c4b26`).
  - Latar kanvas warm stone (`#EAE2D5`) berbingkai `border-y border-[#DDD5C7]`.

### 4. Showcase Karya Web Pilihan (`components/projects/project-deck-carousel.tsx`)
- **Status**: ✅ **Selesai & Teruji (Pembersihan Selesai)**
- **Fitur**:
  - 3 Showcase Landing Page: Jasa AC Skala Proyek, Wedding Organizer, dan Langganan Es Batu Kristal.
  - Section *Timesheet Bongkar Muat Kapal* dan *Otomatisasi Pembukuan Toko* sudah dihapus sepenuhnya.
  - Kartu preview dan tautan Live Demo menggunakan visual Warm Pebble minimalis.

### 5. Komunikasi & Kontak (`components/contact/minimal-contact.tsx`)
- **Status**: ✅ **Selesai & Teruji (Baru)**
- **Fitur**:
  - Menggantikan *GeneralWorkflow* dan *WhatsappForm* yang telah dihapus total.
  - Tombol akses instan langsung ke WhatsApp dan Email resmi.
  - Kartu profil eksternal: GitHub `@Deearss`, LinkedIn, dan Projects.co.id.

### 6. Footer (`components/footer/footer.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Identitas resmi: Haidir Aditya, Fullstack Developer.
  - Latar charcoal gelap `#2D2A28` yang kontras dan tenang di akhir halaman.

### 9. Rencana Fitur Transisi Evolusi Portofolio
- **Status**: ❌ **Dibatalkan (Deprecated)**
- **Keterangan**: Dibatalkan permanen atas instruksi user (tidak relevan dan tidak diperlukan).

### 7. Metadata, Brand Favicon & Open Graph Banner
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Seluruh avatar biru lama diganti total dengan avatar chibi baru ([public/new-avatar.png](file:///home/dier/Ngoding/vibe-coding/gemini-code/portfolio-v2/public/new-avatar.png)).
  - Favicon bulat (circular mask): `public/favicon.ico` dan `app/favicon.ico` dibuat dalam format multi-size RGBA 32-bit (`16x16`, `32x32`, `48x48`) dengan mask lingkaran antialiased dan sudut transparan (`alpha=0`) agar tampil bulat natural di tab browser dark/light mode.
  - Ikon PNG bulat: `public/icon.png` (`32x32` RGBA) dan `public/apple-touch-icon.png` (`180x180` RGBA) memakai mask lingkaran antialiased transparan.
  - Open Graph Banner: `public/og-image.png` (`1200x630`) di-render presisi di runtime Next.js dengan palet Warm Pebble `#FAF7F2`, kartu profil putih `#FFFFFF`, kanvas gelap `#2D2A28`, serta tipografi identik Source Serif 4 + Cactus Classical Serif.
  - Metadata layout: `app/layout.tsx` disinkronkan deskripsi dan OpenGraph-nya mengikuti tagline resmi Hero Section.

---

## 🎯 Status Sesi Saat Ini: Standardisasi Bahasa Inggris Natural (Global i18n Polish)
- **Fokus**: Menuntaskan standardisasi seluruh konten teks, metadata, dan atribut aksesibilitas (`aria-label`) ke dalam bahasa Inggris natural (idiomatic US English) di semua section aktif tanpa em-dash (`—`), tanpa AI clichés, dan tanpa penerjemahan harfiah kaku:
  - **Metadata & Root Layout** (`app/layout.tsx`): Atribut `lang` di-set ke `"en"`, dan OpenGraph `locale` di-set ke `"en_US"`.
  - **Navbar** (`components/navbar/navbar.tsx`): Menu links (`EDUCATION`, `SKILLS`, `WORK`, `CONTACT`), tombol `HIRE ME`, serta `aria-label` mobile hamburger toggle (*"Open navigation menu"* / *"Close navigation menu"*).
  - **Education Section** (`components/about/about-section.tsx`): Format paper akademik 50:50 dengan corner accents L-shaped, hanging bullet points almond, dan narasi kurikulum perguruan tinggi (*Applied Statistics & Artificial Intelligence*, *Relational Database & OOP Architecture*) serta SMK (*Vocational Competency Exam (UKK)*, *External Industry Assessment*).
  - **Skills Section** (`components/skills/skills-section.tsx`): Header overline (*"Technical Stack & Tooling"*), deskripsi adaptif, dan 4 pilar stack (*Frontend*, *Backend*, *Databases*, *DevOps*).
  - **Selected Web Projects** (`components/projects/project-deck-carousel.tsx`): Judul showcase (*Commercial HVAC & AC Service Platform*, *Boutique Wedding Organizer Landing Page*, *Crystal Ice Supply & B2B Subscription*), overline (*"Featured Works & Demonstrations"*), subtitle, direct demo pill buttons, serta seluruh kontrol navigasi (`aria-label` next/prev project).
  - **Contact Section** (`components/contact/minimal-contact.tsx`): Overline (*"Get In Touch"*), title (*"Start a Conversation"*), direct message gateway (*Message on WhatsApp*, *Send an Email*), dan 3 kartu profil eksternal (*Repositories & Code*, *Career Profile*, *Client Reviews & Rating*).
  - **Footer** (`components/footer/footer.tsx`): Tautan profil sosial dan kontrol tombol kembali ke atas (*"Back to top"*).
  - **Contact Redirect Gateway** (`lib/kontak-redirect.ts`): Pesan fallback 503 saat env belum disetel diterjemahkan ke bahasa Inggris profesional.
- **Status Git**: Siap di-commit secara lokal (tanpa push, sesuai aturan no autonomous push).

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
