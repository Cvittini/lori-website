const express = require('express');
const router = express.Router();
const { submitPlan } = require('../controllers/planController');

router.post('/', submitPlan);

module.exports = router;
