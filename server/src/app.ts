import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
const indexRouter = require('./routes/index');
import db from './models';
dotenv.config();

const app = express();
// 데이터베이스 연결
db.sequelize
  .sync()
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err: Error) => {
    console.error(err);
  });

const corsOption = {
  // origin: 'http://debugnote-client.s3-website.ap-northeast-2.amazonaws.com',
  origin: '*',
  // optionsSuccessStatus: 200,
  credentials: true, // allow the Access-Control-Allow-Credentials
  // withcredentials: true, // allow the Access-Control-Allow-Credentials
};

app.use(cors(corsOption));
// app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());
app.use(helmet());

app.use(morgan('dev'));

app.use('/', indexRouter);

// http://15.164.104.171/
app.get('/api', async (req: Request, res: Response) => {});

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
