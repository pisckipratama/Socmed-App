const dotenv = require('dotenv')

dotenv.config();
module.exports = {
  MONGOURI: process.env.MONGOURI,
  JWT_SECRET: process.env.JWT_SECRET
};