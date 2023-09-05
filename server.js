/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const app = require('./src/app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 4999;
app.listen(port, () => {
  console.log(`Live on port : ${port}`);
});
