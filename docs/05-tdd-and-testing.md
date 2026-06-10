# 05. TDD and Testing Report

Dokumen ini berisi bukti rekam jejak proses *Test-Driven Development* (TDD) menggunakan siklus *Red-Green-Refactor* sesuai dengan kriteria penilaian laboratorium *Software Engineering*.

---

## TDD Cycle 1: Validasi Form Input Tugas

### 1. Issue Tested
* **GitHub Issue Link:** Menangani [Issue #2: Fitur Tambah Tugas Baru via Form dengan Validasi]
* **Behavior under test:** Memastikan sistem menolak proses simpan jika pengguna mengosongkan Nama Tugas atau Nama Mata Kuliah, serta meloloskan data jika semua kolom terisi.

### 2. Public Interface
* **File:** `src/utils.js`
* **Fungsi yang Diuji:** `validateTaskInput(title, course, deadline)`

### 3. RED (Siklus Gagal)
* **Kondisi Awal:** File pengujian `tests/utils.test.js` dibuat terlebih dahulu sebelum fungsi logika di `src/utils.js` diimplementasikan.
* **Hasil Error Terminal:** `Cannot find module '../src/utils'` (Fungsi tidak ditemukan karena folder/file aplikasi belum dibuat).
* **Bukti Dokumen:** Screenshot kegagalan disimpan di `assets/screenshots/test-failed-red.png`.

### 4. GREEN (Siklus Berhasil)
* **Implementasi Minimal:** Membuat folder `src/` dan file `utils.js`, lalu menulis fungsi `validateTaskInput` yang memeriksa string kosong menggunakan metode `.trim()`.
* **Hasil Terminal:** `PASS tests/utils.test.js` dengan 3 pengujian berhasil lolos murni (`3 passed, 3 total`).
* **Bukti Dokumen:** Screenshot keberhasilan disimpan di `assets/screenshots/test-passed-green.png`.

### 5. REFACTOR
* **Catatan Perbaikan:** Struktur kode saat ini sudah cukup bersih dan efisien menggunakan teknik pengondisian tunggal `if (!title || !title.trim() ...)` untuk menangani kasus string kosong maupun spasi kosong (*whitespace*), sehingga belum diperlukan modifikasi arsitektur lanjutan pada siklus ini.

### 6. Final Result
* **Status:** PASS (Lolos Sempurna).