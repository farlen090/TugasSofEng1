/**
 * Fungsi untuk memvalidasi input form tugas kuliah
 */
function validateTaskInput(title, course, deadline) {
    // Jika nama tugas kosong, nama matkul kosong, atau tanggal tidak dipilih
    if (!title || !title.trim() || !course || !course.trim() || !deadline) {
        return {
            isValid: false,
            errorMessage: 'Semua kolom wajib diisi'
        };
    }

    // Jika semua kolom terisi dengan benar
    return {
        isValid: true,
        errorMessage: ''
    };
}

// Mengekspor fungsi agar bisa dibaca oleh file tests/utils.test.js
module.exports = {
    validateTaskInput
};