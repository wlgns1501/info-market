"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const pointControllers = require('../controlloers/point');
const auth = require('../middlewares/auth');
router.get('/getToken', auth.me, pointControllers.getToken);
router.post('/approve', auth.me, pointControllers.approve);
router.post('/cancel', pointControllers.cancel);
// router.post('/order', pointControllers.order);
module.exports = router;
