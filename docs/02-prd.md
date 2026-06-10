# 02. Product Requirements Document (PRD) - Student Task Tracker

## 1. Product Overview
Student Task Tracker adalah aplikasi web berbasis *client-side* yang dirancang khusus untuk membantu mahasiswa mengelola dan melacak tenggat waktu (*deadline*) tugas kuliah mereka secara mandiri. Aplikasi ini berfokus pada kesederhanaan penggunaan tanpa proses pendaftaran akun, visualisasi status tugas yang rapi, dan sistem penentuan prioritas tugas secara otomatis guna mencegah keterlambatan pengumpulan tugas.

## 2. Goals (Tujuan Project)
* Menyediakan antarmuka yang intuitif bagi mahasiswa untuk mencatat, melihat, dan memperbarui status tugas kuliah.
* Membantu mahasiswa mengidentifikasi tugas yang paling mendesak secara otomatis lewat sistem indikator prioritas berbasis sisa waktu.
* Memastikan keamanan data lokal pengguna dengan fitur ekspor dan impor data (Backup & Restore).
* Menyelesaikan pengembangan produk yang berfungsi penuh dalam kurun waktu 2 hari.

## 3. Non-Goals (Hal yang Sengaja Tidak Dibuat)
* **Tidak ada** fitur pembuatan akun (*User Authentication/Login*).
* **Tidak ada** sinkronisasi data antar-perangkat secara otomatis lewat internet (cloud database).
* **Tidak ada** fitur kolaborasi tim atau pembagian tugas kelompok.
* **Tidak ada** fitur pengingat otomatis berbentuk notifikasi email atau WhatsApp.

## 4. Target Users
* Mahasiswa individu yang aktif dan memiliki banyak tugas kuliah dari berbagai mata kuliah berbeda.

## 5. User Stories
* **Mencatat Tugas:** Sebagai seorang mahasiswa, saya ingin mencatat nama tugas, nama mata kuliah, dan tanggal *deadline* agar saya tidak lupa dengan kewajiban kuliah saya.
* **Melihat Prioritas:** Sebagai mahasiswa yang sibuk, saya ingin sistem secara otomatis menandai tugas yang tenggat waktunya besok sebagai "Prioritas Tinggi" agar saya tahu tugas mana yang harus dikerjakan malam ini.
* **Melacak Progres:** Sebagai mahasiswa yang terorganisir, saya ingin memisahkan tugas yang belum selesai dan sudah selesai agar daftar kerjaan saya terlihat bersih.
* **Mengamankan Data:** Sebagai pengguna aplikasi lokal, saya ingin bisa mendownload data tugas saya ke laptop agar data tersebut tidak hilang saat saya membersihkan browser.

## 6. Core Features (Fitur Utama)
1. **Form Input Tugas:** Form sederhana untuk memasukkan Judul Tugas, Nama Mata Kuliah, dan Tanggal Tenggat Waktu (*Deadline*).
2. **Tabulasi Manajemen:**
   * **Tab Utama (Daftar Tugas):** Hanya menampilkan tugas yang aktif (belum selesai) beserta detail mata kuliah, tanggal *deadline*, dan label prioritasnya.
   * **Tab Status (Progres):** Memisahkan tugas ke dalam dua kolom/bagian visual: "Belum Selesai" dan "Sudah Selesai".
3. **Dynamic Priority Engine (Kalkulator Prioritas Otomatis):**
   * Logika di sisi klien yang menghitung selisih hari antara tanggal hari ini dengan tanggal *deadline*:
     * Sisa $\le 1$ hari $\rightarrow$ **Tinggi** (Warna Merah)
     * Sisa $2 - 3$ hari $\rightarrow$ **Normal** (Warna Kuning)
     * Sisa lainnya ($\ge 4$ hari) $\rightarrow$ **Rendah** (Warna Hijau)
4. **Mekanisme Centang (Mark as Done):** Tombol *checkbox* di sebelah setiap tugas. Jika dicentang, status tugas langsung berubah dan memicu perpindahan tab/kategori secara instan.
5. **JSON Data Portability (Backup/Restore):**
   * Tombol **"Export JSON"** untuk mengunduh semua data dari `LocalStorage` menjadi file `.json`.
   * Tombol **"Import JSON"** untuk mengunggah kembali file `.json` tersebut ke dalam `LocalStorage` aplikasi.

## 7. Acceptance Criteria (Kriteria Penerimaan)
* **AC 1 - Tambah Tugas:** Ketika user mengisi form dan menekan tombol "Tambah", data harus langsung muncul di Tab Daftar Tugas. Jika ada kolom form yang kosong, aplikasi harus menampilkan pesan eror validasi.
* **AC 2 - Perhitungan Prioritas:** Jika tanggal hari ini adalah 10 Juni 2026 dan user memasukkan tugas dengan *deadline* 11 Juni 2026, maka label prioritas yang muncul wajib berwarna MERAH dengan tulisan "Tinggi".
* **AC 3 - Transisi Status:** Ketika tombol centang pada tugas diklik, tugas tersebut harus langsung hilang dari Tab Utama (Daftar Tugas) dan muncul di dalam daftar "Sudah Selesai" pada Tab Status.
* **AC 4 - Cadangan Data:** File JSON yang di-export harus berisi struktur data array objek tugas yang valid. Ketika file tersebut di-import di browser yang datanya kosong, aplikasi harus berhasil merestore dan menampilkan kembali seluruh daftar tugas tersebut.

## 8. Risks & Out-of-Scope Items
* **Risiko Format Tanggal:** Browser pengguna yang berbeda mungkin menghasilkan format zona waktu yang berbeda. Solusinya, perhitungan sisa hari akan disederhanakan berbasis pembulatan tanggal kalender murni (YYYY-MM-DD).
* **Out-of-Scope:** Pengeditan nama tugas setelah disimpan (*Task Editing*) tidak dimasukkan dalam cakupan sisa waktu 2 hari demi menjaga stabilitas fitur utama. Pengguna harus menghapus dan membuat ulang tugas jika ada salah ketik.