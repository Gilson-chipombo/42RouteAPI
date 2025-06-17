const express = require('express');
const router = express.Router();
const driversController = require('../controllers/driversController');

router.get('/', driversController.getAllDrivers);
router.post('/', driversController.createDriver);
router.post('/login', driversController.loginDriver);

module.exports = router;
