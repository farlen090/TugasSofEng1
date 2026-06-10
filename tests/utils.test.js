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

const { calculatePriority } = require('../src/utils');

describe('Issue 3: Kalkulasi Sisa Hari dan Prioritas Otomatis (TDD Cycle 2)', () => {
    
    beforeAll(() => {
        // Mengunci tanggal "Hari Ini" ke 11 Juni 2026 agar hasil tes stabil
        jest.useFakeTimers().setSystemTime(new Date('2026-06-11'));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('Harus memberikan label Tinggi jika deadline adalah hari ini (11 Juni 2026)', () => {
        const result = calculatePriority('2026-06-11');
        expect(result.daysLeft).toBe(0);
        expect(result.priority).toBe('Tinggi');
        expect(result.colorClass).toBe('bg-red-500');
    });

    test('Harus memberikan label Normal jika deadline 2 hari lagi (13 Juni 2026)', () => {
        const result = calculatePriority('2026-06-13');
        expect(result.daysLeft).toBe(2);
        expect(result.priority).toBe('Normal');
        expect(result.colorClass).toBe('bg-yellow-500');
    });

    test('Harus memberikan label Rendah jika deadline 5 hari lagi (16 Juni 2026)', () => {
        const result = calculatePriority('2026-06-16');
        expect(result.daysLeft).toBe(5);
        expect(result.priority).toBe('Rendah');
        expect(result.colorClass).toBe('bg-green-500');
    });
});