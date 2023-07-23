require('dotenv').config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_AWS_HOST, // DB연결하는 과정에서 MYSQL_HOST => MYSQL_AWS_HOST 로 바꿈
  dialect: 'mysql',
};

module.exports = { development };
