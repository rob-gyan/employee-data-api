"use strict";
const assert = require("assert");
const dotenv = require("dotenv");

dotenv.config();

const {
  PORT,
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  SQL_DB_POOL_ACQUIRE,
  SQL_DB_POOL_IDLE,
  JWT_SECRET,
  TWOFA_SECRET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env;
assert(PORT, "PORT is require");

module.exports = {
  port: PORT,
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  acquire: SQL_DB_POOL_ACQUIRE,
  idle: SQL_DB_POOL_IDLE,
  jwt: JWT_SECRET,
  twoFASecret: TWOFA_SECRET,
  awsAccessKey: AWS_ACCESS_KEY_ID,
  awsSecretKey: AWS_SECRET_KEY,
  awsRegion: AWS_REGION,
  awsBucket: AWS_BUCKET_NAME,
};
