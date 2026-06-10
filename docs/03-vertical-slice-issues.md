# 03. Vertical-Slice Issues Breakdown

Dokumen ini memetakan rencana implementasi fitur secara bertahap berbasis *vertical slice*. Setiap tugas dirancang agar mandiri, dapat diuji, dan mencakup fungsionalitas dari antarmuka pengguna hingga penyimpanan data secara vertikal.

## Daftar Urutan Dependency (Urutan Pengerjaan)
1. **Issue 1:** Setup Struktur Project dan Antarmuka Tab Utama (Dasar) `[HITL]`
2. **Issue 2:** Pengguna dapat menambahkan tugas baru melalui Form Validasi `[AFK]`
3. **Issue 3:** Pengguna dapat melihat daftar tugas aktif dan kalkulasi prioritas otomatis `[AFK]`
4. **Issue 4:** Pengguna dapat menandai tugas sebagai selesai melalui tombol centang `[AFK]`
5. **Issue 5:** Antarmuka Tab Status memisahkan tugas Selesai dan Belum Selesai `[AFK]`
6. **Issue 6:** Pengguna dapat mengekspor data tugas ke dalam file JSON `[AFK]`
7. **Issue 7:** Pengguna dapat mengimpor data tugas dari file JSON `[HITL]`

---

## Detail Spesifikasi Issues

### # Issue 1: Setup Struktur Project dan Antarmuka Tab Utama
* **Type:** HITL (Human-in-the-Loop)
* **What to build:** Membuat struktur repositori dasar (`src/`, `tests/`) dan membangun layout dasar web yang memiliki 2 Tab utama (Daftar Tugas & Status) yang bisa diklik untuk berpindah halaman.
* **Acceptance criteria:**
    * [ ] Struktur folder sesuai dengan instruksi tugas.
    * [ ] Pengguna dapat melihat halaman web dengan komponen navbar/tab yang jelas.
    * [ ] Mengklik Tab 1 and Tab 2 berhasil mengubah tampilan konten secara bergantian tanpa eror.
* **Blocked by:** None.
* **Testing notes:** Verifikasi visual langsung di browser dan pastikan tidak ada pesan eror di Chrome DevTools Console.
* **AI usage notes:** Gunakan AI untuk memberikan rekomendasi boilerplate/struktur file HTML/JS/CSS yang paling simpel untuk pemula.

### # Issue 2: Fitur Tambah Tugas Baru via Form dengan Validasi
* **Type:** AFK
* **What to build:** Membuat form input yang berisi field: Nama Tugas, Nama Mata Kuliah, dan Tanggal Deadline. Ketika tombol "Tambah" diklik, data disimpan ke `LocalStorage` sebagai array objek.
* **User stories covered:** *As a student, I want to record my tasks so that I don't forget my college responsibilities.*
* **Acceptance criteria:**
    * [ ] Form memiliki input teks untuk Nama Tugas, Nama Matkul, dan Input Date untuk Deadline.
    * [ ] Jika ada salah satu input yang kosong saat disubmit, muncul pesan eror validasi ("Semua kolom wajib diisi").
    * [ ] Data yang valid berhasil tersimpan di `LocalStorage` setelah tombol Tambah diklik.
* **Blocked by:** Issue 1
* **Testing notes:** Gunakan TDD (Tulis tes gagal dulu) untuk menguji fungsi validasi input kosong.
* **AI usage notes:** Minta AI menuliskan fungsi validasi form dan fungsi `push` data ke array objek.

### # Issue 3: Tampilan Daftar Tugas Aktif dan Kalkulasi Prioritas Otomatis
* **Type:** AFK
* **What to build:** Menampilkan data dari `LocalStorage` ke dalam list di Tab 1. Sistem harus menghitung sisa hari secara real-time dari tanggal hari ini menuju tanggal deadline untuk memunculkan label prioritas (Tinggi/Normal/Rendah).
* **User stories covered:** *As a busy student, I want the system to automatically tag urgent tasks so that I know what to work on tonight.*
* **Acceptance criteria:**
    * [ ] Hanya tugas dengan status belum selesai yang muncul di Tab 1.
    * [ ] Tugas dengan deadline hari ini atau besok ($\le 1$ hari) otomatis mendapat label MERAH / "Tinggi".
    * [ ] Tugas dengan deadline 2-3 hari otomatis mendapat label KUNING / "Normal".
    * [ ] Tugas dengan deadline $\ge 4$ hari otomatis mendapat label HIJAU / "Rendah".
* **Blocked by:** Issue 2
* **Testing notes:** Gunakan TDD untuk menguji fungsi kalkulator sisa hari dengan memalsukan tanggal saat ini (*mocking date*).
* **AI usage notes:** Minta AI membuat logika pengurangan tanggal di JavaScript untuk menentukan kategori prioritas.

### # Issue 4: Fitur Ubah Status Tugas (Mark as Done) via Checkbox
* **Type:** AFK
* **What to build:** Menambahkan elemen *checkbox* di setiap baris tugas pada Tab 1. Ketika dicentang, properti `isCompleted` pada data objek berubah menjadi `true`, disimpan ke `LocalStorage`, dan tugas langsung hilang dari layar Tab 1.
* **User stories covered:** *As an organized student, I want to separate completed tasks from ongoing ones.*
* **Acceptance criteria:**
    * [ ] Setiap item tugas memiliki checkbox yang berfungsi.
    * [ ] Mengklik checkbox memicu pembaruan data status di `LocalStorage`.
    * [ ] Item tugas langsung terhapus dari tampilan visual Tab 1 seketika setelah dicentang.
* **Blocked by:** Issue 3
* **Testing notes:** Lakukan browser verification di Chrome untuk memastikan transisi visual berjalan mulus tanpa perlu me-refresh halaman.
* **AI usage notes:** Minta AI membuat fungsi *event handler* ketika checkbox diubah (*onchange*).

### # Issue 5: Antarmuka Tab Status (Pemisah Progres Kerja)
* **Type:** AFK
* **What to build:** Membangun tampilan di dalam Tab 2 yang membagi halaman menjadi dua bagian visual: Kolom "Belum Selesai" dan Kolom "Sudah Selesai". Data diambil dari sumber `LocalStorage` yang sama.
* **User stories covered:** *As an organized student, I want to separate completed tasks from ongoing ones to keep my list clean.*
* **Acceptance criteria:**
    * [ ] Tab 2 terbagi secara visual (misal: dua kolom bersebelahan atau dua list vertikal atas-bawah).
    * [ ] Kolom "Belum Selesai" hanya menampilkan nama tugas dan mata kuliah yang belum dicentang.
    * [ ] Kolom "Sudah Selesai" hanya menampilkan nama tugas dan mata kuliah yang sudah dicentang.
* **Blocked by:** Issue 4
* **Testing notes:** Pastikan data yang dicentang di Issue 4 otomatis muncul di kolom "Sudah Selesai" saat Tab 2 dibuka.
* **AI usage notes:** Minta AI membantu filter array JavaScript menggunakan `.filter(task => task.isCompleted)` dan `.filter(task => !task.isCompleted)`.

### # Issue 6: Ekspor Data ke File JSON (Backup)
* **Type:** AFK
* **What to build:** Membuat tombol "Export Data" di bagian pengaturan atau pojok halaman. Ketika diklik, aplikasi mengambil seluruh string data dari `LocalStorage` dan mengubahnya menjadi file unduhan `.json` secara otomatis.
* **User stories covered:** *As an offline app user, I want to download my task data so that I don't lose it when clearing the browser.*
* **Acceptance criteria:**
    * [ ] Tombol "Export Data" terlihat dan bisa diklik di halaman web.
    * [ ] Mengklik tombol memicu proses unduhan file otomatis melalui browser dengan nama file berformat `.json`.
* **Blocked by:** Issue 1
* **Testing notes:** Periksa isi file `.json` yang terunduh menggunakan Notepad/VS Code untuk memastikan strukturnya berupa JSON yang valid.
* **AI usage notes:** Minta AI menuliskan cuplikan kode trik membuat *download link  menggunakan komponen `Blob` di JavaScript.

### # Issue 7: Impor Data dari File JSON (Restore)
* **Type:** HITL (Human-in-the-Loop)
* **What to build:** Menyediakan input tipe file bertuliskan "Import Data". Pengguna mengunggah file `.json` hasil backup, sistem memvalidasi apakah format teks di dalamnya sesuai, lalu menimpa `LocalStorage` lama dengan data baru tersebut dan me-refresh tampilan.
* **User stories covered:** *As an offline app user, I want to restore my task data from a file.*
* **Acceptance criteria:**
    * [ ] Menyediakan input file yang hanya menerima ekstensi `.json`.
    * [ ] Jika file yang diunggah rusak atau bukan format data tugas yang valid, aplikasi memunculkan pesan peringatan eror dan tidak merusak data lama.
    * [ ] Jika file valid, data di halaman langsung terupdate dengan daftar tugas baru dari file tersebut.
* **Blocked by:** Issue 6
* **Testing notes:** Lakukan uji coba mengunggah file teks kosong atau file gambar, pastikan sistem berhasil menolak (*edge case handling*).
* **AI usage notes:** Gunakan AI untuk berdiskusi mengenai penanganan eror (*try-catch block*) saat melakukan `JSON.parse()` data yang diunggah pengguna.