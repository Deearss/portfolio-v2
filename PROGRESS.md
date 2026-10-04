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
  - Mengadaptasi layout Luputer: Logo "Deearss" di kiri, menu navigasi `EDUCATION`, `TECHSTACK`, `PROJECTS`, `CONTACT` di tengah (labelnya disamain sama judul section tujuannya), dan CTA `HIRE ME` di kanan.
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
    - **Per 4 Okt 2026 tombol *Download CV* disembunyiin** karena CV aslinya belum ada (file placeholder-nya udah dihapus). Buat munculin lagi: taruh PDF CV asli di `public/`, lalu isi konstanta `CV_URL` di `components/hero/railway-hero.tsx` (misal `"/cv-haidir-aditya.pdf"`).
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
    - **Solid White Body Fill**: Tubuh/bahu keempat avatar chibi diisi warna putih solid (`#FFFFFF`) sinkron dengan kepala/wajah (menghilangkan efek badan transparan berongga saat kartu di-hover dan avatar menyembul naik).
  - Mengadaptasi estetika lembaran kertas arsitektur yang ditempel (*pasted paper sheet*) dengan sudut siku tajam murni (`rounded-none`), border tipis 1px (`#DDD5C7`), latar kartu warm pebble lembut (`#FAF7F2`), dan **tanpa bayangan drop-shadow**.
  - Format pohon dependensi sub-cabang dihilangkan total; setiap teknologi hanya tampil 1 kali.
  - Header section bersih & selaras dengan Education section:
    - Overline mini teks dihapus total (clean & non-redundant).
    - Judul utama: `Techstack` diperbesar menjadi `text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight` (seragam presisi dengan header section Education).
    - Teks deskripsi: Dibatasi padding terkalibrasi (`max-w-lg sm:px-10 mx-auto`) sehingga selalu rapi terbungkus dalam 2 baris proporsional di mode desktop maupun mobile: *"Core technologies and engineering tools used to build modern web applications."*
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
- **Status**: 🟡 **Header & ikon beres (4 Okt 2026), sisa isinya belum dicek Dier**
- **Fitur**:
  - Menggantikan *GeneralWorkflow* dan *WhatsappForm* (berkasnya sudah dihapus dari repo).
  - Header disamain formatnya sama Education/Techstack/Featured Projects: overline dibuang, judul *"Get In Touch"* (sama kayak tombol hero yang ngarah ke sini), deskripsi 2 baris (satu kalimat per baris, dipisah `<br />`).
  - Deskripsi: *"Ready to join my first development team. Know of a remote opening? Let's talk."* Gantiin versi lama yang nawarin jasa *technical consulting* (kesannya kayak programmer senior). Arahnya: jujur belum pernah kerja bareng tim programmer + lagi nyari lowongan remote, tanpa nada melas.
  - Tombol WhatsApp pakai logo WhatsApp (`SiWhatsapp`); tombol Email sekarang juga buka tab baru (`target="_blank"`) + panah, seragam sama tombol WhatsApp.
  - Kartu profil eksternal: GitHub `@Deearss` (`SiGithub`), LinkedIn (`FaLinkedin`), dan Projects.co.id (`public/footer-image/icon-projectscoid.webp`), masing-masing dengan logo di kiri biar pengunjung tahu tujuannya.

### 6. Footer (`components/footer/footer.tsx`)
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Identitas resmi: Haidir Aditya, Fullstack Developer.
  - Latar charcoal gelap `#2D2A28` yang kontras dan tenang di akhir halaman.

### 9. Rencana Fitur Transisi Evolusi Portofolio
- **Status**: ❌ **Dibatalkan (Deprecated)**
- **Keterangan**: Dibatalkan permanen atas instruksi user (tidak relevan dan tidak diperlukan). Surat tugasnya (`SURAT_TUGAS_TRANSISI_EVOLUSI.md`) dan screenshot `public/evolution/` sudah dihapus 4 Okt 2026.

### 7. Metadata, Brand Favicon & Open Graph Banner
- **Status**: ✅ **Selesai & Teruji**
- **Fitur**:
  - Seluruh avatar biru lama diganti total dengan avatar chibi baru (`public/avatar-chibi.webp`). Berkas sumber resolusi tingginya (`new-avatar.png`, `new-avatar-bw.png`) sudah dihapus dari folder kerja 4 Okt 2026, ambil lagi dari riwayat git kalau perlu.
  - Favicon bulat (circular mask): `public/favicon.ico` dan `app/favicon.ico` dibuat dalam format multi-size RGBA 32-bit (`16x16`, `32x32`, `48x48`) dengan mask lingkaran antialiased dan sudut transparan (`alpha=0`) agar tampil bulat natural di tab browser dark/light mode.
  - Ikon PNG bulat: `public/icon.png` (`32x32` RGBA) dan `public/apple-touch-icon.png` (`180x180` RGBA) memakai mask lingkaran antialiased transparan.
  - Open Graph Banner: `public/og-image.png` (`1200x630`, ~80 KB) dirender dari templat `scripts/og-image.html` lewat `npm run og` (`scripts/render-og.mjs`). Isinya nyontek hero: palet Warm Pebble, kartu profil dengan pil "Open to Work", tipografi Source Serif 4 + Cactus Classical Serif. Script-nya ngendaliin Brave/Chrome headless lewat DevTools Protocol, karena Brave nyuekin flag `--screenshot`.
  - Metadata layout: judul & deskripsi di `app/layout.tsx` dipusatin di konstanta `TITLE` / `DESCRIPTION` / `OG_IMAGE`, dipakai bareng sama OpenGraph & Twitter card. Deskripsinya = tagline hero. **Kalau tagline hero berubah:** ubah `DESCRIPTION`, ubah teks di `scripts/og-image.html`, jalanin `npm run og`, lalu naikin `?v=` di `OG_IMAGE` biar WhatsApp/sosmed ngambil banner baru.

---

## 🎯 Status Sesi Saat Ini: Standardisasi Bahasa Inggris Natural (Global i18n Polish)
- **Fokus**: Menuntaskan standardisasi seluruh konten teks, metadata, dan atribut aksesibilitas (`aria-label`) ke dalam bahasa Inggris natural (idiomatic US English) di semua section aktif tanpa em-dash (`—`), tanpa AI clichés, dan tanpa penerjemahan harfiah kaku:
  - **Metadata & Root Layout** (`app/layout.tsx`): Atribut `lang` di-set ke `"en"`, dan OpenGraph `locale` di-set ke `"en_US"`.
  - **Navbar** (`components/navbar/navbar.tsx`): Menu links (`EDUCATION`, `SKILLS`, `WORK`, `CONTACT`), tombol `HIRE ME`, serta `aria-label` mobile hamburger toggle (*"Open navigation menu"* / *"Close navigation menu"*).
  - **Education Section** (`components/about/about-section.tsx`): Format paper akademik 50:50 dengan corner accents L-shaped, hanging bullet points almond, dan narasi kurikulum perguruan tinggi (*Applied Statistics & Artificial Intelligence*, *Relational Database & OOP Architecture*) serta SMK (*Vocational Competency Exam (UKK)*, *External Industry Assessment*).
  - **Skills Section** (`components/skills/skills-section.tsx`): Header diselaraskan dengan Education (tanpa overline redundan, judul besar `text-3xl sm:text-4xl md:text-5xl`, dan deskripsi terbungkus 2 baris seimbang di desktop), 4 pilar stack (*Frontend*, *Backend*, *Databases*, *DevOps*), serta keempat avatar chibi diperbarui dengan tubuh/bahu putih solid (`#FFFFFF`) tanpa efek tembus pandang saat hover.
  - **Selected Web Projects** (`components/projects/project-deck-carousel.tsx`): Judul showcase (*Commercial HVAC & AC Service Platform*, *Boutique Wedding Organizer Landing Page*, *Crystal Ice Supply & B2B Subscription*), overline (*"Featured Works & Demonstrations"*), subtitle, direct demo pill buttons, serta seluruh kontrol navigasi (`aria-label` next/prev project).
  - **Contact Section** (`components/contact/minimal-contact.tsx`): Overline (*"Get In Touch"*), title (*"Start a Conversation"*), direct message gateway (*Message on WhatsApp*, *Send an Email*), dan 3 kartu profil eksternal (*Repositories & Code*, *Career Profile*, *Client Reviews & Rating*).
  - **Footer** (`components/footer/footer.tsx`): Tautan profil sosial dan kontrol tombol kembali ke atas (*"Back to top"*).
  - **Contact Redirect Gateway** (`lib/kontak-redirect.ts`): Pesan fallback 503 saat env belum disetel diterjemahkan ke bahasa Inggris profesional.
- **Status Git & Remote Backup**: Seluruh commit dan progres terkini telah diamankan ke GitHub pada branch non-produksi `wip/v2-redesign` (bukan branch `main`). Langkah ini melindungi seluruh kode hasil evolusi dari risiko kehilangan data lokal (PC crash/musibah), tanpa memicu auto-deploy publik di Netlify (karena Netlify hanya men-deploy dari branch `main`). Website produksi publik tetap aman dan utuh.

---

## 🎯 Status Sesi Saat Ini: Redesain Seksi Proyek ("Featured Projects" Horizontal Slider & Detail Modal)
- **Status**: ✅ **Selesai & Teruji** (Commit `32902d0` di branch `wip/v2-redesign`)
- **Fitur & Perubahan**:
  - **Slider Horizontal Interaktif** (`components/projects/project-deck-carousel.tsx`):
    - Mengganti tumpukan kartu statis (fan deck) menjadi horizontal draggable slider catalog dengan snap points, drag momentum, dan kursor `cursor-grabbing` di seluruh layar saat drag.
    - Menghapus efek shadow hover pada kartu agar sejalan dengan prinsip minimalis (flat 1px stone border `#E3DDD5` dengan transisi warna halus `#B8AEA4`).
    - Overlay gelap (`bg-[#1F1C1B]/75`) pada gambar 16:9 dengan transisi fade murni saat di-hover, memunculkan ikon tangan tunjuk (`FaHandPointer`) dan micro-copy `"Click to view details"`.
  - **Modal Detail Interaktif**:
    - Memisahkan narasi panjang ke modal popup (mengadopsi pola Luputer) untuk menyelesaikan bentrok antara drag mouse dan seleksi teks (`select-text`).
    - Gambar polos tanpa dekorasi header jendela palsu atau border putih samping.
    - Konten modal terfokus: judul, narasi *About the Project*, dan daftar *Technologies & Libraries*.
    - Tombol close murni ikon `X` minimalis tanpa wrapper kotak putih.
    - Tombol *Open Live Demo* dibuat lebih proporsional (`px-4 py-2`, `text-xs`) tanpa drop shadow.
  - **Header & Navigasi**:
    - Judul section diubah menjadi `"Featured Projects"`.
    - Padding dan max-width diselaraskan dengan section Techstack (`max-w-lg sm:px-10 mx-auto`).
    - Deskripsi mobile dipendekkan dan diratakan (`max-sm:px-4`) agar pas 2 baris seimbang.
    - Kontrol panah chevron (`<` dan `>`) ditata vertikal di bawah hint interaksi, tanpa pembungkus lingkaran putih, dengan warna disabled `#B8AEA4` yang tetap kontras.
  - **Penyederhanaan Konten & Data**:
    - Menghapus overline teks *"Featured Works & Demonstrations"*.
    - Menghapus badge/label kategori (*Commercial Showcase*, dll) serta field `category` dari interface dan data.
    - Menghapus bagian *Key Engineering Highlights* beserta field `highlights` dari interface dan data.
    - Mempersingkat judul ketiga proyek: *AC Service Landing Page*, *Wedding Organizer Landing Page*, dan *Ice Supply Landing Page*.
    - ~~Menyeragamkan techstack: `Next.js`, `TypeScript`, dan `Tailwind CSS`.~~ **Salah, dikoreksi 4 Okt 2026.** Stack asli tiap demo (dicek dari repo-nya): AC (`Deearss/mycvacku`) dan Es Batu (`Deearss/myesbatuku`) = Astro + TypeScript + CSS biasa; Wedding (`Deearss/myeowoku`) = Next.js + TypeScript + Tailwind CSS.

---

## 🎯 Sesi 4 Okt 2026 (Claude Code): Blocker, CTA, & Bersih-bersih
- **Aturan yang dikonfirmasi Dier**: aturan klaim dari Agustus tetap berlaku (tiap klaim wajib bisa dibuktiin pengunjung dalam 1 klik), aturan nama gugur ("Deearss" kapital boleh). Rak Timesheet Kapal sengaja dibuang.
- **Klaim projek dibenerin** (`project-deck-carousel.tsx`): deskripsi modal sebelumnya nyebut kalkulator harga, penjadwalan, dan tracking yang nggak ada di demo. Sekarang isinya cuma yang beneran ada di demo, plus keterangan demo-nya berbahasa Indonesia. Techstack dikoreksi (lihat catatan di atas).
- **Aksesibilitas**: kartu projek sekarang bisa dibuka pakai keyboard (Tab + Enter/Spasi). Modal: fokus pindah ke tombol tutup pas dibuka, Tab muter di dalam modal, Esc nutup, lalu fokus balik ke kartu. Subjudul Techstack digelapin ke `#655B53` (dulu `#7A6F66` cuma 3,8:1 di latar `#EAE2D5`).
- **Font**: cuma ada dua font yang kepakai, Cactus Classical Serif + Source Serif 4. Dua kebocoran ditambal di `globals.css`: `kbd` "Esc" di modal (sebelumnya monospace) dan span nama di judul hero (sebelumnya Cactus, padahal judulnya Source Serif 4).
- **Navbar**: `SKILLS` → `TECHSTACK`, `WORK` → `PROJECTS` (id anchor `#skills` & `#work` tetap).
- **Bersih-bersih**: 7 berkas kode mati (6 komponen lama + `lib/sanitize.ts`), 24 aset `public/` yang nggak kepakai, CSS sisa tema lama, surat tugas evolusi, dan README bawaan create-next-app (diganti README singkat). Semua masih bisa diambil lagi dari riwayat git.
- **Section baru "Working with AI"** (`components/ai/ai-workflow-section.tsx`, `#ai`, link navbar `AI`): latar gelap `#1F1C1B` (satu-satunya section gelap), header seformat section lain. Isinya dari jawaban Dier: pembagian kerja (Dier pegang DoD dasar, gaya visual, dan keputusan bisnis; AI ngerjain kode, checklist DoD detail, dan gambar), 4 syarat Definition of Done (cek desktop & HP, tsc/lint/build, klaim cocok fakta, teman dekat udah nggak ada kritik), plus "Receipts": proses avatar chibi (Canva AI dari foto muka Dier → versi warna & hitam-putih, Antigravity nambahin beret/headset/topi), redesain web ini, dan cerita AI ngarang fitur demo yang ketangkep sebelum tayang.
- **Projek ke-4 di katalog**: web portofolio ini sendiri, dengan tombol "View Source on GitHub" (repo `Deearss/portfolio-v2` publik; repo 3 demo lainnya privat). Thumbnail `public/showcase/portfolio.webp` dipotret pakai fungsi `potret()` dari `scripts/render-og.mjs`. Dots katalog sekarang nandain kartu terakhir pas track mentok kanan.
- **Metadata**: keyword era freelance (`Freelance Indonesia`, `Systems Designer`, `Web Performance Optimization`, dll) diganti; `twitter:creator "@Deearss"` dibuang (akun X-nya belum dikonfirmasi punya Dier). Pesan otomatis tombol WhatsApp/Email diganti dari "discuss a project" (bahasa klien freelance) jadi soal lowongan.
- **Link preview produksi masih versi lama**: selama `wip/v2-redesign` belum di-merge, link `deearss.netlify.app` di WhatsApp/sosmed masih nampilin judul "Systems & Software Engineer" + deskripsi Indonesia era freelance.
- **CV**: placeholder "INI BUKAN CV ASLI" dihapus dan tombol *Download CV* disembunyiin lewat `CV_URL = null` sebelum merge ke `main`. Tinggal nunggu PDF CV asli dari Dier.

---

## 🚀 Perintah Verifikasi
```bash
# Type check resmi
npx tsc --noEmit

# Audit aksesibilitas lokal (ringan & cepat)
# AWAS: jalan di jsdom, jadi kontras warna NGGAK ikut dicek walau hasilnya "100% pass".
# Buat cek kontras, jalanin axe-core di browser beneran.
npm run audit:a11y

# Build produksi
npm run build
```
