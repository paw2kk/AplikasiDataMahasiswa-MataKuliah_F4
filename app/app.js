// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');
const db = require('./config/database'); // ⬅️ ambil dari database.js

const app = express();
const PORT = process.env.PORT || 3000;

/* =====================
   TEST KONEKSI DATABASE
===================== */
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Successfully connected to MySQL database');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
})();

/* =====================
   VIEW ENGINE & MIDDLEWARE
===================== */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

/* =====================
   INJECT DATABASE KE REQUEST
===================== */
app.use((req, res, next) => {
  req.db = db; // ⬅️ routes bisa pakai req.db
  next();
});

/* =====================
   ROUTES
===================== */
app.use('/', routes);

/* =====================
   ERROR HANDLER
===================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

/* =====================
   START SERVER
===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
