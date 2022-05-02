"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import indexRouter from '../routes/index.js';
// import { sequelize } from '../models/index.js';
// const db = require('./models');
const models_1 = __importDefault(require("./models"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// 데이터베이스 연결
models_1.default.sequelize
    .sync()
    .then(() => {
    console.log('데이터베이스 연결 성공');
})
    .catch((err) => {
    console.error(err);
});
const corsOption = {
    // origin: 'http://debugnote-client.s3-website.ap-northeast-2.amazonaws.com',
    origin: '*',
    // optionsSuccessStatus: 200,
    credentials: true, // allow the Access-Control-Allow-Credentials
    // withcredentials: true, // allow the Access-Control-Allow-Credentials
};
app.use((0, cors_1.default)(corsOption));
// app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express_1.default.json({}));
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// app.use('/', indexRouter);
// http://15.164.104.171/
app.get('/api', (req, res) => {
    res.send('infomarket API');
});
// // 지원하지 않는 api
app.use((req, res, next) => {
    res.sendStatus(404);
});
// 서버 에러
// app.use((error, req, res, next) => {
//   console.error(error);
//   res.sendStatus(500);
// });
app.get('/', (req, res) => {
    console.log('get');
    res.send('Hello!!');
});
app.listen(8080, () => {
    console.log(`8080번 포트에서 대기중`);
});
