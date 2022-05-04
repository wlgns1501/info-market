import express from 'express';
const router = express.Router();
const pointControllers = require('../controlloers/point');
const auth = require('../middlewares/auth');

router.post('/ready', pointControllers.ready);

router.post('/approve', pointControllers.approve);

router.post('/cancel', pointControllers.cancel);

router.post('/order', pointControllers.order);

module.exports = router;
