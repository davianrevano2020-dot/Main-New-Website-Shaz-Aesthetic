# SHAZ Aesthetic Clinic — Website & CMS

Website resmi dan panel manajemen konten (Back-Office) untuk **SHAZ Aesthetic Clinic**. Dibangun menggunakan **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, dan **Prisma ORM (MySQL / MariaDB)**.

---

## 🚀 Fitur Utama

- **Halaman Publik**:
  - Beranda / Home (Hero Banner, Limited Time Offer Banner, Brand Philosophy, Featured Treatments, Packages, Doctors, Transformations Before/After Slider, Client Reviews, Lokasi Klinik).
  - Treatment & Paket Lengkap.
  - Halaman Dokter & Profil Klinik.
  - Blog & Artikel Edukasi Kecantikan.
  - Review Google & Formulir Kontak / Reservasi.
- **Panel Back-Office (CMS)**:
  - Kelola konten teks, gambar banner, logo, dan menu navigasi secara dinamis.
  - Manajemen artikel & blog.
  - Pengaturan promosi & penawaran terbatas.
  - Pengaturan footer, FAQ, dokter, dan paket.
  - Keamanan akses via otentikasi admin.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi & Interaksi**: [Motion (Framer Motion)](https://motion.dev/) & [Lucide Icons](https://lucide.dev/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) dengan provider **MySQL / MariaDB**
- **Email Service**: [Resend](https://resend.com/)

---

## 📋 Prasyarat Sistem

Sebelum menjalankan proyek, pastikan perangkat atau server Anda telah terpasang:
- **Node.js**: Versi `18.18+` atau `20.x` (LTS direkomendasikan)
- **NPM** atau **Yarn** / **PNPM**
- **Database MySQL / MariaDB** (bisa menggunakan XAMPP, Laragon, MySQL lokal, atau cPanel/Cloud Database)

---

## ⚙️ Panduan Instalasi & Menjalankan Lokal

### 1. Clone Repositori
```bash
git clone <URL_REPOSITORY_GITHUB>
cd <NAMA_FOLDER>
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Buka file `.env` dan sesuaikan nilainya:
```env
# URL Database MySQL
DATABASE_URL="mysql://username:password@localhost:3306/nama_database"

# URL Aplikasi (untuk local: http://localhost:3000)
APP_URL="http://localhost:3000"

# Kredensial Login Back-Office
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

# (Opsional) API Key untuk Layanan Tambahan
RESEND_API_KEY=""
GEMINI_API_KEY=""
```

### 4. Sinkronisasi Skema Database (Prisma)
Jalankan perintah ini untuk membuat tabel otomatis di database Anda:
```bash
npm run db:push
```

### 5. Jalankan Mode Pengembangan (Development)
```bash
npm run dev
```
Buka browser dan akses:
- **Website Utama**: [http://localhost:3000](http://localhost:3000)
- **Panel Back-Office**: [http://localhost:3000/back-office](http://localhost:3000/back-office)

---

## 📦 Panduan Build & Deploy ke Produksi

### 1. Build Proyek
```bash
npm run build
```
Perintah ini akan secara otomatis melakukan:
1. `npx prisma generate` (menyiapkan Prisma Client)
2. `next build` (mengoptimasi halaman dan aset untuk produksi)

### 2. Menjalankan Server Produksi
```bash
npm run start
```

### Catatan Deploy (cPanel / VPS / Vercel):
- **cPanel (Node.js App)**:
  - Buat database MySQL via cPanel Database Wizard.
  - Masukkan variabel lingkungan (`DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, dll) di menu **Setup Node.js App**.
  - Jalankan `npm run db:push` lalu `npm run build`.
  - Application startup file: `node_modules/next/dist/bin/next` dengan argumen `start`.
- **VPS / Docker / Cloud Run**:
  - Pastikan port `3000` (atau `PORT` env) terbuka.
  - Jalankan proses di background dengan tools seperti `pm2` (`pm2 start npm --name "shaz-clinic" -- start`).

---

## 🔐 Keamanan & Rekomendasi Sebelum Go-Live

1. **Ganti Password Admin**: Pastikan untuk mengubah nilai `ADMIN_PASSWORD` dan `ADMIN_USERNAME` di file `.env` server produksi sebelum diserahkan ke publik.
2. **File `.env`**: Jangan pernah mengunggah atau membagikan file `.env` asli (berisi password database) ke repositori publik GitHub. File `.env` sudah masuk dalam `.gitignore`.

---

© SHAZ Aesthetic Clinic. All rights reserved.
