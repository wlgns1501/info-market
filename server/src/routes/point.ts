import express from 'express';
const router = express.Router();
const pointControllers = require('../controlloers/point');
const auth = require('../middlewares/auth');

router.get('/getToken', auth.me, pointControllers.getToken);

router.post('/approve', auth.me, pointControllers.approve);

// router.post('/cancel', pointControllers.cancel);

// router.post('/order', pointControllers.order);

module.exports = router;
