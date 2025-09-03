# 🚀 Base Project Next.js

Proyek ini dibuat sebagai **base project** yang mengacu pada [Standarisasi Next.js](https://www.notion.so/Standarisasi-Next-Js-1d8bec233321805bac23c3ef20bd3099).  
Tujuan utamanya adalah menyediakan pondasi standar agar pengembangan lebih konsisten, mudah dikelola, dan scalable.  

---

## 📌 Fitur Utama
- **TypeScript** untuk type safety
- **TailwindCSS** untuk styling
- **React Query (TanStack Query)** untuk data fetching & state management
- **Zod** + **React Hook Form** untuk validasi form
- **Axios** dengan Request Adapter untuk request API standar
- **Zustand** untuk global state management
- Struktur folder mengikuti standarisasi yang telah ditentukan
- Contoh implementasi **Authentication (Login)**
- Contoh crud sederhana dengan **React Query**

---

## ⚙️ Persiapan & Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/aangardam/base-project.git
   cd base-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   atau
   ```bash
   yarn install
   ```
3. **Setup environment variables**

   Buat file .env.local di root project:
   ```env
    # API Configuration
    NEXT_PUBLIC_API_URL=https://base-project-be.vercel.app/api/v1/

    # Google OAuth
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=978808544343-mthl8gcpfmesvrt4ud5fif4hd9ojjg5q.apps.googleusercontent.com

    # reCAPTCHA
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc6Ot0pAAAAAFgFFA9TW78uqOlhwTAFUpInirsE

    # Security
    NEXT_PUBLIC_SECRET_KEY=Gv2rT1E+1LS3FjG9A0pZ5/Z2oYJt5e7FjxvX2L6KHxE=

    # Feature Flags
    NEXT_PUBLIC_ENABLE_CAPTCHA=true
    ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   atau
   ```bash
   yarn dev
   ```  
   lalu buka browser dan masuk ke `http://localhost:3000`

---

## 🔑 Dummy Login
Gunakan kredensial berikut untuk mengakses halaman login:
- Username: `admin.dummy@gmail.com`
- Password: `Admin123_`

---

## 📝 Dokumentasi
Detail aturan coding, guideline, dan standar bisa dilihat di:
👉 [Standarisasi Next.js](https://www.notion.so/Standarisasi-Next-Js-1d8bec233321805bac23c3ef20bd3099)

Jika akan memulai dari 0 silahkan baca [dokumentasi Next.js](https://nextjs.org/docs/getting-started)
atau bisa mengikuti panduan [Insatallasi Next.js](https://interesting-family-136.notion.site/Instalasi-Nextjs-263bec2333218074bd2fc671b46cbedc?pvs=73)

---

## 📄 Lisensi
Silakan digunakan dan dikembangkan sesuai kebutuhan.  
Lisensi proyek ini menggunakan [MIT License](./LICENSE).

