const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();
const PORT = 3000;

const menuRouter = require('./routes/menus.router');
const orderRouter = require('./routes/orders.router');
const pageRouter = require('./routes/index.js');
const storeListRouter = require('./routes/stores.router');

app.use(express.json()); // json 파싱
app.use(cookieParser()); // 쿠키 파싱

app.use(express.static('public'));

app.use('/api', [storeListRouter, menuRouter, orderRouter]);
app.use('/', pageRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번 포트로 서버가 열렸습니다.`);
});
