-- TODO: Tulis query SQL kalian di sini (CREATE TABLE & INSERT) untuk inisialisasi database otomatis
-- Sistem Manajemen Mahasiswa & Mata Kuliah
-- Database: MySQL 8.0

-- Buat tabel mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nim VARCHAR(20) UNIQUE NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) 
;
-- Buat tabel mata_kuliah
CREATE TABLE IF NOT EXISTS matakuliah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kode_mk VARCHAR(10) NOT NULL,
    nama_mk VARCHAR(100) NOT NULL,
    sks INT NOT NULL CHECK (sks >= 1 AND sks <= 6),
    mahasiswa_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- Insert data contoh mahasiswa
INSERT INTO mahasiswa (nama, nim, jurusan) VALUES
('Budi Santoso', '220101', 'Teknik Informatika'),
('Siti Aminah', '220102', 'Sistem Informasi'),
('Ahmad Rizki', '220103', 'Teknik Komputer'),
('Dewi Lestari', '220104', 'Teknik Informatika'),
('Eko Prasetyo', '220105', 'Sistem Informasi');

-- Insert data contoh mata kuliah
INSERT INTO mata_kuliah (kode_mk, nama_mk, sks, mahasiswa_id) VALUES
('TIF101', 'Pemrograman Web', 3, 1),
('TIF102', 'Basis Data', 3, 1),
('TIF103', 'Algoritma dan Struktur Data', 4, 1),
('TIF104', 'Pemrograman Mobile', 3, 1),
('SIF101', 'Analisis Sistem', 3, 2),
('SIF102', 'Manajemen Proyek', 2, 2),
('SIF103', 'Sistem Informasi Manajemen', 3, 2),
('TK101', 'Arsitektur Komputer', 3, 3),
('TK102', 'Sistem Digital', 4, 3),
('TIF105', 'Kecerdasan Buatan', 3, 4),
('TIF106', 'Machine Learning', 3, 4),
('SIF104', 'E-Business', 2, 5),
('SIF105', 'Business Intelligence', 3, 5);
