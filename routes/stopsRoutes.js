const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stopsController');

router.get('/', stopsController.getAllStops);
router.post('/', stopsController.createStop);

module.exports = router;
