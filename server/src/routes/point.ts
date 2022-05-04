import express from 'express';
const router = express.Router();
const pointControllers = require('../controlloers/point');
const auth = require('../middlewares/auth');

router.post('/ready', auth.me, pointControllers.ready);

router.post('/approve', auth.me, pointControllers.approve);

router.post('/cancel', auth.me, pointControllers.cancel);

router.post('/order', auth.me, pointControllers.order);

module.exports = router;
