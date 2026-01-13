// TODO: Definisikan semua jalur (Route) aplikasi kalian disini (GET, POST, PUT, DELETE)
const express = require('express');
const router = express.Router();

/* =====================
   HALAMAN UTAMA
===================== */
router.get('/', async (req, res) => {
  try {
    const db = req.db;

    const [mahasiswa] = await db.query(`
      SELECT 
        m.*,
        COALESCE(SUM(mk.sks), 0) AS total_sks,
        COUNT(mk.id) AS jumlah_mk
      FROM mahasiswa m
      LEFT JOIN matakuliah mk ON m.id = mk.mahasiswa_id
      GROUP BY m.id
      ORDER BY m.id DESC
    `);

    const [matakuliah] = await db.query(`
      SELECT 
        mk.*, 
        m.nama AS nama_mahasiswa
      FROM matakuliah mk
      JOIN mahasiswa m ON mk.mahasiswa_id = m.id
      ORDER BY mk.id DESC
    `);

    res.render('index', {
      mahasiswa,
      matakuliah
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengambil data');
  }
});

/* =====================
   TAMBAH MAHASISWA
===================== */
router.post('/mahasiswa', async (req, res) => {
  const { nama, nim, jurusan } = req.body;

  try {
    await req.db.query(
      'INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)',
      [nama, nim, jurusan]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menambah mahasiswa');
  }
});

/* =====================
   TAMBAH MATA KULIAH
===================== */
// TAMBAH MATA KULIAH
router.post('/matakuliah', async (req, res) => {
  const { kode_mk, nama_mk, sks, mahasiswa_id } = req.body;

  try {
    await req.db.query(
      'INSERT INTO matakuliah (kode_mk, nama_mk, sks, mahasiswa_id) VALUES (?, ?, ?, ?)',
      [kode_mk, nama_mk, sks, mahasiswa_id]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menambah mata kuliah');
  }
});

/* =====================
   HAPUS MAHASISWA
===================== */
router.post('/mahasiswa/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await req.db.query('DELETE FROM matakuliah WHERE mahasiswa_id = ?', [id]);
    await req.db.query('DELETE FROM mahasiswa WHERE id = ?', [id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menghapus mahasiswa');
  }
});

/* =====================
   HAPUS MATA KULIAH
===================== */
router.post('/matakuliah/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await req.db.query(
      'DELETE FROM matakuliah WHERE id = ?',
      [id]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal menghapus mata kuliah');
  }
});
/* =====================
   UPDATE MAHASISWA
===================== */

router.post('/mahasiswa/update/:id', async (req, res) => {
  const { nama, nim, jurusan } = req.body;
  const { id } = req.params;

  try {
    await req.db.query(
      'UPDATE mahasiswa SET nama = ?, nim = ?, jurusan = ? WHERE id = ?',
      [nama, nim, jurusan, id]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengupdate mahasiswa');
  }
});

/* =====================
   UPDATE MATA KULIAH
===================== */

router.post('/matakuliah/update/:id', async (req, res) => {
  const { kode_mk, nama_mk, sks } = req.body;
  const { id } = req.params;

  try {
    await req.db.query(
      'UPDATE matakuliah SET kode_mk = ?, nama_mk = ?, sks = ? WHERE id = ?',
      [kode_mk, nama_mk, sks, id]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Gagal mengupdate mata kuliah');
  }
});


module.exports = router;
