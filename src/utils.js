/**
 * Fungsi untuk memvalidasi input form tugas kuliah
 */
function validateTaskInput(title, course, deadline) {
    if (!title || !title.trim() || !course || !course.trim() || !deadline) {
        return {
            isValid: false,
            errorMessage: 'Semua kolom wajib diisi'
        };
    }
    return {
        isValid: true,
        errorMessage: ''
    };
}

/**
 * Fungsi untuk menghitung sisa hari dan menentukan tingkat prioritas
 * @param {string} deadlineDateStr - Tanggal deadline format YYYY-MM-DD
 * @returns {object} - Objek berisi jumlah sisa hari, teks prioritas, dan class warna Tailwind
 */
function calculatePriority(deadlineDateStr) {
    const today = new Date();
    const deadline = new Date(deadlineDateStr);

    // Mengatur jam ke 00:00:00 agar perhitungan selisih hari murni tanggalnya saja
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    // Menghitung selisih waktu dalam milidetik
    const differenceInTime = deadline.getTime() - today.getTime();
    
    // Mengubah milidetik menjadi hitungan hari
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    let priority = 'Rendah';
    let colorClass = 'bg-green-500';

    // Logika penentuan prioritas sesuai dokumen PRD
    if (daysLeft <= 1) {
        priority = 'Tinggi';
        colorClass = 'bg-red-500';
    } else if (daysLeft >= 2 && daysLeft <= 3) {
        priority = 'Normal';
        colorClass = 'bg-yellow-500';
    }

    return {
        daysLeft,
        priority,
        colorClass
    };
}

// Mengekspor semua fungsi agar bisa dibaca oleh Jest
module.exports = {
    validateTaskInput,
    calculatePriority
};