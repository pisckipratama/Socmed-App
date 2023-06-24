const mongoose = require('mongoose');
const { MONGOURI } = require('./key');

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    console.log('success connect to mongodb!!');
  } catch (err) {
    console.error(err);
  }
};

module.exports = InitiateMongoServer;