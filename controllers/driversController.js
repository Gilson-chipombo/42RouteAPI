const db = require('../db');
const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

exports.getAllDrivers = (req, res) => {
  db.query('SELECT id, full_name, username FROM drivers', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createDriver = (req, res) => {
  const { full_name, username, passwrd } = req.body;
  const hashedPassword = md5(passwrd);

  db.query(
    'INSERT INTO drivers (full_name, username, passwrd) VALUES (?, ?, ?)',
    [full_name, username, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, full_name, username });
    }
  );
};

exports.loginDriver = (req, res) => {
  const { username, passwrd } = req.body;
  const hashedPassword = md5(passwrd);

  db.query(
    'SELECT id, full_name, username FROM drivers WHERE username = ? AND passwrd = ?',
    [username, hashedPassword],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (results.length > 0) {
        res.json({
          success: true,
          message: 'Login bem-sucedido',
          driver: results[0]
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Credenciais inválidas'
        });
      }
    }
  );
};
