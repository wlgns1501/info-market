"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import 'dotenv/config';
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const indexRouter = require('./routes/index');
const models_1 = require("./models");
// import passport from 'passport';
// const passportConfig = require('./passport/index');
dotenv_1.default.config();
const app = (0, express_1.default)();
// 데이터베이스 연결
models_1.sequelize
    .sync()
    .then(() => {
    console.log('데이터베이스 연결 성공');
})
    .catch((err) => {
    console.error(err);
});
const corsOption = {
    origin: 'http://127.0.0.1:3000',
    // optionsSuccessStatus: 200,
    credentials: true, // allow the Access-Control-Allow-Credentials
    // withcredentials: true, // allow the Access-Control-Allow-Credentials
};
// app.use(cors(corsOption));
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
// app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express_1.default.json({}));
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// passport 초기화 및 세션 연결
// app.use(passport.initialize());
// app.use(passport.session());
// passportConfig();
app.use('/', indexRouter);
// http://15.164.104.171/
// app.get('/api', async (req: Request, res: Response) => {});
// // 지원하지 않는 api
app.use((req, res, next) => {
    res.sendStatus(404);
});
// 서버 에러
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});
app.get('/', (req, res) => {
    console.log('get');
    res.send('Hello!!');
});
app.listen(8000, () => {
    console.log(`8000번 포트에서 대기중`);
});
