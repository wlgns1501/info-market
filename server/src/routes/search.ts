import express from 'express';
const router = express.Router();
const searchControllers = require('../controlloers/search');

router.get('/', searchControllers.get);

module.exports = router;
