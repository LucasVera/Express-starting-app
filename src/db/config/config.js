require('dotenv').config();
module.exports = {
  development: {
    username: process.env.SEQ_USER,
    password: process.env.SEQ_PW,
    database: process.env.SEQ_DB,
    port: process.env.SEQ_PORT,
    host: process.env.SEQ_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false
  },
  test: {
    username: process.env.SEQ_USER,
    password: process.env.SEQ_PW,
    database: process.env.SEQ_DB,
    port: process.env.SEQ_PORT,
    host: process.env.SEQ_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false
  },
  production: {
    username: process.env.SEQ_USER,
    password: process.env.SEQ_PW,
    database: process.env.SEQ_DB,
    port: process.env.SEQ_PORT,
    host: process.env.SEQ_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false
  }
};
