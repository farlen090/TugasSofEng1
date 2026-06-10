const { validateTaskInput } = require('../src/utils');

describe('Issue 2: Validasi Form Input Tugas (TDD Cycle 1)', () => {
    
    test('Harus mengembalikan error jika Nama Tugas kosong', () => {
        const result = validateTaskInput('', 'Matematika', '2026-06-15');
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('Semua kolom wajib diisi');
    });

    test('Harus mengembalikan error jika Nama Mata Kuliah kosong', () => {
        const result = validateTaskInput('Tugas Alpro', '', '2026-06-15');
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('Semua kolom wajib diisi');
    });

    test('Harus sukses (isValid: true) jika semua kolom diisi dengan benar', () => {
        const result = validateTaskInput('Tugas Alpro', 'Informatika', '2026-06-15');
        expect(result.isValid).toBe(true);
        expect(result.errorMessage).toBe('');
    });
});