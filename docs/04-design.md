# 04. Design Document - Student Task Tracker

Dokumen desain ini dibuat sebelum proses koding dimulai untuk mendefinisikan arsitektur sistem, struktur data, alur pengguna, serta keputusan teknologi yang diambil untuk project *Student Task Tracker*.

## 1. Technology Stack (Pilihan Teknologi)
Untuk memastikan project dapat diselesaikan secara stabil dalam waktu 2 hari, teknologi yang dipilih adalah teknologi web dasar tanpa framework (*Vanilla Web Stack*):
* **Frontend:** HTML5 (Struktur halaman), CSS3 (Desain antarmuka responsif), dan JavaScript (Logika aplikasi).
* **CSS Framework:** Tailwind CSS (via CDN) – Dipilih untuk mempercepat proses pembuatan antarmuka yang rapi dan responsif tanpa perlu menulis file CSS manual yang panjang.
* **Testing Tool:** Jest – Digunakan untuk menjalankan unit testing di sisi JavaScript guna memenuhi syarat TDD.
* **Penyimpanan Data:** Browser `LocalStorage` API.

*Alasan Trade-off:* Menghindari framework besar seperti React atau Angular untuk memangkas waktu konfigurasi (*setup time*) yang rumit, sehingga waktu 2 hari bisa difokuskan penuh pada pemenuhan kriteria TDD dan kualitas *engineering*.

## 2. Data Model (Struktur Data)
Aplikasi hanya menggunakan satu struktur data utama berupa Array of Objects yang disimpan di `LocalStorage` dengan kunci (`key`) bernama `student_tasks`.

Setiap objek tugas memiliki skema sebagai berikut:
```json
{
  "id": "string (UUID atau timestamp unik)",
  "title": "string (Nama Tugas)",
  "course": "string (Nama Mata Kuliah)",
  "deadline": "string (Format Tanggal YYYY-MM-DD)",
  "isCompleted": "boolean (Status Penyelesaian)"
}