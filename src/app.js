/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./Routes/userRoutes');
const auth = require('./Middlewares/auth')

const app = express();
dotenv.config({ path: './config.env' });
const dbURL = process.env.DATABASE;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connection Successful`);
  });

//Middlewares
app.use(express.json());
app.use(auth)
app.use('/api/v1/users', userRouter);

module.exports = app;
