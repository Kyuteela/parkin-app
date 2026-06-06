# ParkIn — Aplikasi Manajemen Slot Parkir Kampus

ParkIn adalah prototipe aplikasi berbasis web dengan pendekatan *mobile-first* yang dirancang untuk mempermudah civitas akademika dalam mencari, memantau ketersediaan kuota, hingga memesan slot parkir di area kampus secara *real-time*. 

Proyek ini dibangun menggunakan teknologi web dasar tanpa *framework* (Vanilla) untuk mendemonstrasikan implementasi desain UI/UX Figma ke dalam kode fungsional yang saling terintegrasi.

---

## Fitur & Alur Halaman

Aplikasi ini terdiri dari 8 halaman utama yang mencakup seluruh proses bisnis dari manajemen parkir, mulai dari proses masuk hingga penerbitan tiket digital:

| No | Halaman | Pengembang | Deskripsi Fitur |
| :--- | :--- | :--- | :--- |
| **01** | `halaman-login` | Muhammad Ushaim | Alur autentikasi dan validasi akun pengguna masuk ke sistem. |
| **02** | `halaman-beranda` | Muhammad Ushaim | Dashboard utama menampilkan simulasi peta interaktif (CSS Grid) dan list parkir terdekat. |
| **03** | `halaman-detail-lokasi` | Muhammad Ushaim | Informasi mendalam mengenai tarif, jarak, sisa slot, jam operasional, dan fasilitas. |
| **04** | `halaman-pilih-kendaraan` | Ezhy | Opsi pemilihan kategori kendaraan (Motor atau Mobil) sebelum masuk ke area parkir. |
| **05** | `halaman-pilih-slot` | Ezhy | Pemilihan koordinat nomor slot parkir yang kosong secara visual. |
| **06** | `halaman-konfirmasi` | Alan | Ringkasan pesanan, data kendaraan, dan kalkulasi total tarif pembayaran. |
| **07** | `halaman-pilih-metode-pembayaran`| Deba | Integrasi opsi gerbang pembayaran digital (QRIS, GoPay, OVO, Dana). |
| **08** | `halaman-pembayaran-berhasil` | Abi | Penerbitan tiket digital (e-ticket) beserta QR Code bukti transaksi parkir. |

---

##ga  Tech Stack yang Digunakan

* **HTML5** – Sebagai fondasi pembuatan struktur komponen di setiap halaman.
* **CSS3** – Mengatur tata letak responsif (*Mobile View*), pewarnaan tema (*Dark Navy & Orange Accent*), tata letak peta menggunakan **CSS Grid**, serta interaksi mikro animasi tombol.
* **JavaScript (Vanilla)** – Menangani logika interaksi pengguna, manipulasi DOM, dan manajemen rute (*routing*) perpindahan antarhalaman.
* **Google Fonts & SVG Graphics** – Menggunakan font **Poppins** untuk tipografi yang modern dan merender ikon pin peta berbasis vektor agar tidak pecah.

---

## Struktur Repositori

Proyek ini menggunakan pendekatan arsitektur **Struktur per Fitur (Modular)** untuk mempermudah kolaborasi tim tanpa menimbulkan konflik kode:

```text
parkin-app/
├── halaman-login/
│   ├── index.html
│   ├── style.css
│   └── login.js
├── halaman-beranda/
│   ├── index.html
│   ├── style.css
│   └── beranda.js
├── halaman-detail-lokasi/
│   ├── index.html
│   └── style.css
├── halaman-pilih-kendaraan/
│   └── ...
├── halaman-pilih-slot/
│   └── ...
├── halaman-konfirmasi/
│   └── ...
├── halaman-pilih-metode-pembayaran/
│   └── ...
└── halaman-pembayaran-berhasil/
    └── ...
