const express = require('express');
const chortleRouter = require('./chortles');

const router = express.Router();


router.use('/chortles', chortleRouter);

module.exports = router; 