const mongoose = require('mongoose');
require('dotenv').config()
const app = require('./app');
const port = process.env.PORT || 3000;


async function start() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.x5rxy.mongodb.net/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    ;
    app.listen(port, () => {
      console.log(`Server has been started on ${port} port.`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
