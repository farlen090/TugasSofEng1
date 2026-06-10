# 01. Requirements Clarification - Student Task Tracker

## Product Idea
Aplikasi pencatat dan pemantau tugas kuliah (*Student Task Tracker*) berbasis web yang berjalan secara lokal pada browser pengguna, dilengkapi dengan fitur manajemen prioritas otomatis berbasis tenggat waktu (*deadline*) dan fitur pencadangan data.

## Problem Statement
Mahasiswa seringkali kesulitan mengelola banyak tugas kuliah dengan tenggat waktu yang berbeda-beda. Akibatnya, mereka sering melewatkan tugas atau salah menentukan tugas mana yang harus dikerjakan terlebih dahulu. Di sisi lain, aplikasi *task tracker* yang ada sering kali terlalu rumit atau membutuhkan koneksi internet dan pembuatan akun yang memakan waktu.

## Target Users
* **Pengguna Utama:** Mahasiswa individual yang membutuhkan alat simpel dan cepat untuk mencatat tugas pribadi tanpa perlu proses *login/register*.

## User Goals
* Mencatat tugas kuliah beserta mata kuliah dan *deadline*-nya dengan cepat.
* Mengetahui secara instan tugas mana yang paling mendesak (prioritas tinggi) tanpa perlu menghitung sisa hari manual.
* Memantau progres tugas yang belum selesai dan yang sudah diselesaikan secara terpisah.
* Mengamankan data tugas agar tidak hilang jika *cache* browser dibersihkan.

## Functional Requirements
* **Sistem Input Tugas:** Pengguna dapat menambahkan tugas baru dengan mengisi nama tugas, nama mata kuliah, dan tanggal *deadline*.
* **Sistem Tabulasi:** Aplikasi memiliki 2 tab utama:
    * **Tab 1 (Daftar Tugas):** Menampilkan daftar tugas aktif (belum selesai) yang berisi nama mata kuliah, nama tugas, tanggal *deadline*, dan tingkat prioritas.
    * **Tab 2 (Status):** Menampilkan dua sub-bagian: daftar tugas yang "Belum Selesai" dan daftar tugas yang "Sudah Selesai".
* **Prioritas Otomatis (Dynamic Countdown):** Sistem secara otomatis menentukan tingkat prioritas berdasarkan sisa waktu menuju *deadline*:
    * Sisa waktu $\le 1$ hari $\rightarrow$ **Tinggi** (Indikator Merah)
    * Sisa waktu $2 - 3$ hari $\rightarrow$ **Normal** (Indikator Kuning)
    * Sisa waktu $\ge 7$ hari $\rightarrow$ **Rendah** (Indikator Hijau)
* **Manajemen Status:** Pengguna dapat mencentang (*checkbox*) tugas di Tab 1. Ketika dicentang, tugas otomatis pindah ke kategori "Sudah Selesai" di Tab 2 dan disembunyikan dari Tab 1.
* **Backup & Restore (JSON):** * Pengguna dapat mengekspor seluruh data tugas menjadi satu file teks berformat `.json` ke penyimpanan lokal komputer.
    * Pengguna dapat mengimpor kembali file `.json` tersebut untuk memulihkan data jika data di browser terhapus.

## Non-Functional Requirements
* **Performance:** Aplikasi harus responsif dan memuat data secara instan (< 1 detik) karena semua komputasi dilakukan di sisi klien (browser).
* **Usability:** Antarmuka yang bersih, intuitif, dan nyaman digunakan di laptop maupun *smartphone* (Responsive Design).
* **Data Persistence:** Data disimpan di browser menggunakan `LocalStorage`.

## Assumptions
* Pengguna menggunakan browser modern yang mendukung `LocalStorage` dan API untuk *download/upload* file JSON (seperti Google Chrome, Edge, atau Safari).
* Pengguna hanya melacak tugas mereka dari satu perangkat utama, kecuali jika mereka mengekspor-impor file JSON secara manual ke perangkat lain.

## Constraints
* Waktu pengembangan dibatasi hanya **2 hari**.
* Tidak menggunakan database eksternal ataupun server backend (Serverless/Client-side only).

## Open Questions
* *Bagaimana jika sisa hari berada di antara 4 hingga 6 hari?* -> **Keputusan:** Akan dimasukkan ke dalam kategori prioritas **Rendah** atau dibuatkan kategori baru "Menengah" jika diperlukan saat tahap desain. Untuk saat ini, aturan $\le 1$ hari (Tinggi), $2-3$ hari (Normal), sisanya dianggap Rendah.