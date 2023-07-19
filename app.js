const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const storeRouter = require('./routes/stores.router');
const orderRouter = require('./routes/orders.router');
const orderRouter = require('./routes/orders.router');

app.use(express.json()); // json 파싱
app.use(cookieParser()); // 쿠키 파싱

app.use(express.static('public'));

app.use('/api', [storeRouter, menuRouter, orderRouter]);

app.listen(3000, () => {
  console.log('3000번 포트로 서버가 열렸습니다.');
});
