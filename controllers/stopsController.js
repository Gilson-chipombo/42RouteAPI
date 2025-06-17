const db = require('../db');

exports.getAllStops = (req, res) => {
  db.query('SELECT * FROM mini_bus_stop', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createStop = (req, res) => {
  const { stop_name, distrit, latitude, longitude } = req.body;
  db.query(
    'INSERT INTO mini_bus_stop (stop_name, distrit, latitude, longitude) VALUES (?, ?, ?, ?)',
    [stop_name, distrit, latitude, longitude],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, stop_name, distrit, latitude, longitude });
    }
  );
};
